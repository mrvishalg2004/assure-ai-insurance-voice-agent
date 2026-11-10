import { chromium } from 'playwright';
import path from 'path';

async function captureAll() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });

  const page = await context.newPage();
  const baseDir = path.resolve('docs/readme-assets/actual');

  console.log('--- 1. Capturing Landing Page ---');
  await page.goto('http://localhost:3001', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(baseDir, '01_homepage_viewport.png') });
  await page.screenshot({ path: path.join(baseDir, '01_homepage_fullpage.png'), fullPage: true });

  console.log('--- 2. Capturing Login Page ---');
  await page.goto('http://localhost:3001/login', { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(baseDir, '02_login_viewport.png') });

  console.log('--- 3. Capturing Register Page ---');
  await page.goto('http://localhost:3001/register', { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(baseDir, '03_register_viewport.png') });

  console.log('--- Authenticating Admin User ---');
  // Log in using the form to ensure token and user are stored in localStorage
  await page.goto('http://localhost:3001/login', { waitUntil: 'networkidle' });
  await page.fill('#email', 'admin@assureai.com');
  await page.fill('#password', 'Password@123');
  await page.click('button[type="submit"]');
  await page.waitForNavigation({ waitUntil: 'networkidle' }).catch(() => {});
  await page.waitForTimeout(1500);

  console.log('--- 4. Capturing Bulk Calls Dashboard (/admin/bulk-calls) ---');
  await page.goto('http://localhost:3001/admin/bulk-calls', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: path.join(baseDir, '04_bulk_calls_dashboard_viewport.png') });
  await page.screenshot({ path: path.join(baseDir, '04_bulk_calls_dashboard_fullpage.png'), fullPage: true });

  console.log('--- 5. Capturing Call Interaction Modal ---');
  // Find the first eye button on completed call (Sunita Agarwal)
  const eyeButtons = await page.$$('button:has(svg.lucide-eye)');
  if (eyeButtons.length > 0) {
    await eyeButtons[0].click();
    await page.waitForTimeout(1200);
    await page.screenshot({ path: path.join(baseDir, '05_call_interaction_modal.png') });
    // Close dialog
    await page.keyboard.press('Escape');
    await page.waitForTimeout(500);
  } else {
    console.warn('Could not find eye button for call interaction modal');
  }

  console.log('--- 6. Capturing User Management (/admin/users) ---');
  await page.goto('http://localhost:3001/admin/users', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: path.join(baseDir, '06_user_management_viewport.png') });
  await page.screenshot({ path: path.join(baseDir, '06_user_management_fullpage.png'), fullPage: true });

  console.log('--- 7. Capturing Chat Assistant (/chat) ---');
  await page.goto('http://localhost:3001/chat', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: path.join(baseDir, '07_chat_assistant_viewport.png') });

  console.log('--- 8. Capturing Voice Assistant (/assistant) ---');
  await page.goto('http://localhost:3001/assistant', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1200);
  await page.screenshot({ path: path.join(baseDir, '08_voice_assistant_viewport.png') });

  console.log('--- 9. Capturing Admin Voice Console (/admin/dashboard) ---');
  await page.goto('http://localhost:3001/admin/dashboard', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1200);
  await page.screenshot({ path: path.join(baseDir, '09_admin_voice_console_viewport.png') });

  console.log('--- 10. Capturing Call History (/history) ---');
  await page.goto('http://localhost:3001/history', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: path.join(baseDir, '10_call_history_viewport.png') });
  await page.screenshot({ path: path.join(baseDir, '10_call_history_fullpage.png'), fullPage: true });

  console.log('--- 11. Capturing Settings Page (/settings) ---');
  await page.goto('http://localhost:3001/settings', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1200);
  await page.screenshot({ path: path.join(baseDir, '11_settings_viewport.png') });

  await browser.close();
  console.log('🎉 All actual screenshots captured successfully!');
}

captureAll().catch((err) => {
  console.error('Error during capture:', err);
  process.exit(1);
});
