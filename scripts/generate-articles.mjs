/**
 * Run this script locally to:
 * 1. Delete broken articles (titles with ```json, raw JSON artifacts)
 * 2. Generate new articles via the API
 *
 * Usage:
 *   node scripts/generate-articles.mjs
 *
 * Make sure your dev server is running: npm run dev
 */

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Satish143@';

async function main() {
  console.log('🔧 Generating articles via API...');
  console.log(`   Base URL: ${BASE_URL}\n`);

  try {
    const response = await fetch(`${BASE_URL}/api/admin/generate-articles`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        password: ADMIN_PASSWORD,
        categories: ['investments', 'mutual-funds', 'income-tax', 'insurance', 'stock-market', 'banking'],
        count: 1,
      }),
    });

    const data = await response.json();
    console.log('Result:', JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('Error:', err.message);
    console.log('\nMake sure your dev server is running: npm run dev');
  }
}

main();
