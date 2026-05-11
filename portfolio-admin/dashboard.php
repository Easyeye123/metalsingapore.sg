<?php
declare(strict_types=1);

require_once __DIR__ . '/lib/auth.php';
require_once __DIR__ . '/lib/security_headers.php';
require_once __DIR__ . '/lib/projects.php';
require_once __DIR__ . '/lib/view.php';

SecurityHeaders::send();

$auth = new AdminAuth();
$auth->requireLogin();

$store = new ProjectsStore();
$flash = null;
$errors = [];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!$auth->checkCsrf($_POST['csrf'] ?? null)) {
        $errors[] = 'Session expired. Reload and try again.';
    }
    $action = $_POST['action'] ?? '';

    try {
        if (!$errors && $action === 'save_project') {
            $title = trim((string) ($_POST['title'] ?? ''));
            if ($title === '') {
                $errors[] = 'Project title is required.';
            }
            $description = trim((string) ($_POST['description'] ?? ''));
            if (ProjectsStore::wordCount($description) > 50) {
                $errors[] = 'Description must be 50 words or fewer.';
            }
            $status = ($_POST['status'] ?? 'draft') === 'published' ? 'published' : 'draft';

            if (!$errors) {
                $idInput = trim((string) ($_POST['id'] ?? ''));
                $id = $idInput !== '' ? ProjectsStore::slug($idInput) : ProjectsStore::slug($title);
                $existing = $store->find($id) ?? [];
                $alt = trim((string) ($_POST['alt'] ?? '')) ?: $title;
                $newImages = isset($_FILES['images'])
                    ? $store->storeUploadedImages($_FILES['images'], $id, $alt)
                    : [];
                $images = $newImages;
                if (!$images && !empty($existing['images']) && is_array($existing['images'])) {
                    $images = $existing['images'];
                }
                $project = [
                    'id'                    => $id,
                    'status'                => $status,
                    'featured'              => isset($_POST['featured']),
                    'title'                 => $title,
                    'category'              => trim((string) ($_POST['category'] ?? '')),
                    'location'              => trim((string) ($_POST['location'] ?? '')),
                    'date'                  => trim((string) ($_POST['date'] ?? '')),
                    'year'                  => trim((string) ($_POST['date'] ?? '')),
                    'access_method'         => trim((string) ($_POST['access_method'] ?? '')),
                    'scope'                 => trim((string) ($_POST['scope'] ?? '')),
                    'materials_equipment'   => trim((string) ($_POST['materials_equipment'] ?? '')),
                    'safety_considerations' => trim((string) ($_POST['safety_considerations'] ?? '')),
                    'challenge'             => trim((string) ($_POST['challenge'] ?? '')),
                    'outcome'               => trim((string) ($_POST['outcome'] ?? '')),
                    'description'           => $description,
                    'summary'               => $description,
                    'image_alt'             => $alt,
                    'images'                => $images,
                ];
                $store->upsert($project);
                $flash = 'Project saved.';
            }
        } elseif (!$errors && $action === 'delete_project') {
            $id = ProjectsStore::slug((string) ($_POST['id'] ?? ''));
            if ($id !== '') {
                $store->delete($id);
                $flash = 'Project removed.';
            }
        } elseif (!$errors && $action === 'change_password') {
            $current = (string) ($_POST['current_password'] ?? '');
            $currentTotp = (string) ($_POST['current_code'] ?? '');
            $new = (string) ($_POST['new_password'] ?? '');
            $newConfirm = (string) ($_POST['new_password_confirm'] ?? '');
            if (strlen($new) < 12) {
                $errors[] = 'New passcode must be at least 12 characters.';
            } elseif ($new !== $newConfirm) {
                $errors[] = 'New passcodes do not match.';
            } else {
                if ($auth->changePassword($current, $currentTotp, $new)) {
                    $flash = 'Passcode updated.';
                } else {
                    $errors[] = 'Current passcode or Authenticator code is incorrect.';
                }
            }
        }
    } catch (Throwable $e) {
        $errors[] = $e->getMessage();
    }
}

$data = $store->load();
$projects = $data['projects'];
$published = array_filter($projects, static fn($p) => ($p['status'] ?? '') === 'published');
$csrf = View::escape($auth->csrfToken());

View::header('Project portfolio admin');
echo '<p class="lead">Add, update or remove approved project entries. Saved projects appear on the public site immediately at <a href="../projects/">/projects/</a>, <a href="../gallery/">/gallery/</a> and the home page.</p>';
View::heroClose();
?>
<section class="section">
  <div class="container">
    <div class="callout callout--info" style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem">
      <span>
        Signed in. <strong><?= count($published) ?></strong> published / <strong><?= count($projects) ?></strong> total.
      </span>
      <span>
        <a class="btn btn--ghost btn--sm" href="logout.php">Sign out</a>
      </span>
    </div>

    <?php if ($flash): ?>
      <div class="callout callout--info" role="status"><strong><?= View::escape($flash) ?></strong></div>
    <?php endif; ?>
    <?php if ($errors): ?>
      <div class="callout" style="border-color:#a12c2c;color:#a12c2c">
        <strong>Action error:</strong>
        <ul>
          <?php foreach ($errors as $err): ?>
            <li><?= View::escape($err) ?></li>
          <?php endforeach; ?>
        </ul>
      </div>
    <?php endif; ?>

    <div class="grid grid--2" style="margin-top:1.4rem">
      <div class="form-card">
        <h2>Add or update project</h2>
        <form method="post" enctype="multipart/form-data">
          <input type="hidden" name="csrf" value="<?= $csrf ?>">
          <input type="hidden" name="action" value="save_project">
          <div class="form-row">
            <label for="p-id">Existing project ID (leave blank to create)</label>
            <input id="p-id" name="id" placeholder="auto from title">
          </div>
          <div class="form-row">
            <label for="p-title">Project title</label>
            <input id="p-title" name="title" required maxlength="120">
          </div>
          <div class="form-row">
            <label for="p-category">Service category</label>
            <select id="p-category" name="category">
              <option value="custom-metal-works">Custom metal works</option>
              <option value="stainless-steel-fabrication">Stainless steel fabrication</option>
              <option value="metal-gates">Metal gates</option>
              <option value="metal-railings">Metal railings</option>
              <option value="fencing-and-grilles">Fencing and grilles</option>
              <option value="cat-ladders-and-access-metalwork">Cat ladders and access metalwork</option>
              <option value="outdoor-trellis-and-structural-metalwork">Outdoor trellis and structural metalwork</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div class="form-row">
            <label for="p-location">Location</label>
            <input id="p-location" name="location" maxlength="120">
          </div>
          <div class="form-row">
            <label for="p-date">Project date</label>
            <input id="p-date" name="date" maxlength="32" placeholder="2026 or May 2026">
          </div>
          <div class="form-row">
            <label for="p-description">50-word portfolio summary</label>
            <textarea id="p-description" name="description" maxlength="600" required></textarea>
            <p class="form-help">About 50 words is the design target; the server rejects summaries longer than 50 words on save.</p>
          </div>
          <div class="form-row">
            <label for="p-scope">Scope</label>
            <textarea id="p-scope" name="scope" maxlength="500"></textarea>
          </div>
          <div class="form-row">
            <label for="p-access-method">Access method (rope, gondola, scaffold, MEWP…)</label>
            <input id="p-access-method" name="access_method" maxlength="160">
          </div>
          <div class="form-row">
            <label for="p-materials">Materials &amp; equipment</label>
            <input id="p-materials" name="materials_equipment" maxlength="240" placeholder="Sealant, paint, anchors, harness, descender…">
          </div>
          <div class="form-row">
            <label for="p-safety">Safety considerations</label>
            <textarea id="p-safety" name="safety_considerations" maxlength="500" placeholder="Fall prevention plan, working line / safety line, anchorage, rescue, public protection…"></textarea>
          </div>
          <div class="form-row">
            <label for="p-challenge">Challenge</label>
            <textarea id="p-challenge" name="challenge" maxlength="500"></textarea>
          </div>
          <div class="form-row">
            <label for="p-outcome">Outcome</label>
            <textarea id="p-outcome" name="outcome" maxlength="500"></textarea>
          </div>
          <div class="form-row">
            <label for="p-status">Publish status</label>
            <select id="p-status" name="status">
              <option value="draft">Draft / needs approval</option>
              <option value="published">Published</option>
            </select>
          </div>
          <div class="form-row">
            <label><input type="checkbox" name="featured" value="1"> Mark as featured (shown on home page)</label>
          </div>
          <div class="form-row">
            <label for="p-images">Project images (JPG / PNG / WebP / GIF, ≤6 MB each)</label>
            <input id="p-images" name="images[]" type="file" accept="image/*" multiple>
            <p class="form-help">If you leave this empty when editing an existing project, current images are kept.</p>
          </div>
          <div class="form-row">
            <label for="p-alt">Image alt text</label>
            <input id="p-alt" name="alt" maxlength="200">
          </div>
          <div class="form-actions">
            <button class="btn btn--primary" type="submit">Save project</button>
          </div>
        </form>
      </div>

      <div class="form-card">
        <h2>Change passcode</h2>
        <form method="post">
          <input type="hidden" name="csrf" value="<?= $csrf ?>">
          <input type="hidden" name="action" value="change_password">
          <div class="form-row">
            <label for="cp-current">Current passcode</label>
            <input id="cp-current" name="current_password" type="password" autocomplete="current-password" required>
          </div>
          <div class="form-row">
            <label for="cp-code">Current 6-digit Authenticator code</label>
            <input id="cp-code" name="current_code" type="text" inputmode="numeric" pattern="[0-9]{6}" maxlength="6" required>
          </div>
          <div class="form-row">
            <label for="cp-new">New passcode (min 12 characters)</label>
            <input id="cp-new" name="new_password" type="password" autocomplete="new-password" minlength="12" required>
          </div>
          <div class="form-row">
            <label for="cp-new-confirm">Confirm new passcode</label>
            <input id="cp-new-confirm" name="new_password_confirm" type="password" autocomplete="new-password" minlength="12" required>
          </div>
          <div class="form-actions">
            <button class="btn btn--accent" type="submit">Update passcode</button>
          </div>
        </form>
        <hr class="divider">
        <h3>Reset 2FA (server-side)</h3>
        <p class="form-help">To rotate the Authenticator secret, delete <code>portfolio-admin/config/credentials.json</code> on the server (cPanel File Manager or FTP). The next visit to the admin will trigger fresh setup.</p>
      </div>
    </div>

    <div class="section" style="padding-bottom:0">
      <h2>Current portfolio entries (<?= count($projects) ?>)</h2>
      <?php if (!$projects): ?>
        <div class="callout"><strong>No entries yet.</strong> Add the first project using the form above.</div>
      <?php else: ?>
        <div class="portfolio-admin-list">
          <?php foreach ($projects as $project): ?>
            <?php
              $img = $project['images'][0] ?? null;
              $imgSrc = '';
              if ($img && !empty($img['src'])) {
                  $src = (string) $img['src'];
                  $imgSrc = $src[0] === '/' ? '..' . $src : '../' . ltrim($src, '/');
              }
              $words = ProjectsStore::wordCount((string) ($project['description'] ?? ''));
            ?>
            <article class="portfolio-admin-item">
              <?php if ($imgSrc): ?>
                <img src="<?= View::escape($imgSrc) ?>" alt="<?= View::escape($img['alt'] ?? $project['title'] ?? 'Project') ?>">
              <?php else: ?>
                <div class="tile tile--graphite"><span class="tile__title">No image</span></div>
              <?php endif; ?>
              <div>
                <p class="card__meta">
                  <?= View::escape($project['status'] ?? 'draft') ?>
                  · <?= View::escape($project['category'] ?? '—') ?>
                  · <?= View::escape($project['location'] ?? '—') ?>
                  <?php if (!empty($project['featured'])): ?> · <strong>featured</strong><?php endif; ?>
                </p>
                <h3><?= View::escape($project['title'] ?? 'Untitled') ?></h3>
                <p><?= View::escape($project['description'] ?? '') ?></p>
                <p class="form-help"><?= $words ?>/50 words · ID <code><?= View::escape($project['id'] ?? '') ?></code> · <?= count($project['images'] ?? []) ?> image(s)</p>
                <form method="post" onsubmit="return confirm('Delete this project?')">
                  <input type="hidden" name="csrf" value="<?= $csrf ?>">
                  <input type="hidden" name="action" value="delete_project">
                  <input type="hidden" name="id" value="<?= View::escape($project['id'] ?? '') ?>">
                  <button class="btn btn--ghost btn--sm" type="submit">Remove</button>
                </form>
              </div>
            </article>
          <?php endforeach; ?>
        </div>
      <?php endif; ?>
    </div>
  </div>
</section>
<?php View::footer(); ?>
