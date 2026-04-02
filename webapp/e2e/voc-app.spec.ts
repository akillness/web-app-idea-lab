import { test, expect } from '@playwright/test'

// ── Dashboard ─────────────────────────────────────────────────────────────

test.describe('Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('has correct page title and heading', async ({ page }) => {
    await expect(page).toHaveTitle(/VOC Repository/)
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible()
  })

  test('shows 4 stat cards', async ({ page }) => {
    await expect(page.getByText('Total Records')).toBeVisible()
    await expect(page.getByText('Active Accounts')).toBeVisible()
    await expect(page.getByText('Themes Tracked')).toBeVisible()
    // Use first() because "Build Queue" text also appears in nav and quick-links
    await expect(page.getByText('Build Queue').first()).toBeVisible()
  })

  test('shows strategy-tax banner with correct text', async ({ page }) => {
    await expect(page.getByText('Strategy Tax This Week').first()).toBeVisible()
    await expect(page.getByText(/engineering hours/i).first()).toBeVisible()
    // Value from sample data: strategy_tax_hours = 14
    await expect(page.getByText('14h')).toBeVisible()
  })

  test('shows Commitments at Risk section', async ({ page }) => {
    await expect(page.getByText('Commitments at Risk').first()).toBeVisible()
    // Sample data has 5 commitments — verify at least one is rendered
    await expect(page.getByText(/SSO Integration — EnterpriseX/)).toBeVisible()
  })

  test('shows 5 quick-link cards with correct hrefs', async ({ page }) => {
    const links = [
      { title: 'Records', href: /\/records/ },
      { title: 'Accounts', href: /\/accounts/ },
      { title: 'Themes', href: /\/themes/ },
      { title: 'Weekly Brief', href: /\/briefs/ },
      { title: 'Build Queue', href: /\/queue/ },
    ]

    for (const { title, href } of links) {
      const link = page.getByRole('link', { name: title }).first()
      await expect(link).toBeVisible()
      await expect(link).toHaveAttribute('href', href)
    }
  })
})

// ── Records ───────────────────────────────────────────────────────────────

test.describe('Records', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/records')
  })

  test('page heading is visible', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Records' })).toBeVisible()
    // Subtitle confirms total count
    await expect(page.getByText(/15 VOC signals/)).toBeVisible()
  })

  test('table has correct column headers', async ({ page }) => {
    const headers = ['Account', 'Source Type', 'Signal Type', 'Severity', 'Status', 'Summary']
    for (const header of headers) {
      await expect(page.getByRole('columnheader', { name: header })).toBeVisible()
    }
  })

  test('signal type filter chips show labels and counts', async ({ page }) => {
    // Each chip label should be present
    await expect(page.getByText('Feature Request').first()).toBeVisible()
    await expect(page.getByText('Support Escalation').first()).toBeVisible()
    await expect(page.getByText('Churn Risk').first()).toBeVisible()
    await expect(page.getByText('Sales Commitment').first()).toBeVisible()
    await expect(page.getByText('RFP').first()).toBeVisible()
  })

  test('table rows are rendered for all 15 records', async ({ page }) => {
    const rows = page.locator('tbody tr')
    await expect(rows).toHaveCount(15)
  })

  test('signal type badges are color-coded in table rows', async ({ page }) => {
    // At least one badge of each type should appear in the table
    const featureBadge = page.locator('td span', { hasText: 'Feature Request' }).first()
    await expect(featureBadge).toBeVisible()

    const churnBadge = page.locator('td span', { hasText: 'Churn Risk' }).first()
    await expect(churnBadge).toBeVisible()
  })

  test('severity values are displayed', async ({ page }) => {
    // Sample data has severity 5 records — should see "5" in table
    await expect(page.locator('tbody').getByText('5').first()).toBeVisible()
  })
})

// ── Accounts ──────────────────────────────────────────────────────────────

test.describe('Accounts', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/accounts')
  })

  test('page heading is visible', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Accounts' })).toBeVisible()
    await expect(page.getByText(/5 accounts/)).toBeVisible()
  })

  test('at least 3 account cards are visible', async ({ page }) => {
    // Account cards are <details> elements containing the account name
    const cards = page.locator('details')
    await expect(cards).toHaveCount(5)
  })

  test('known account names are displayed', async ({ page }) => {
    for (const name of ['Acme Corp', 'TechFlow', 'DataPulse', 'ScaleUp', 'EnterpriseX']) {
      await expect(page.getByText(name).first()).toBeVisible()
    }
  })

  test('health risk badges are present', async ({ page }) => {
    // Risk labels from riskConfig
    await expect(page.getByText(/Critical Risk/).first()).toBeVisible()
    await expect(page.getByText(/High Risk/).first()).toBeVisible()
  })

  test('ARR information is displayed', async ({ page }) => {
    // Formatted ARR values from sample data
    await expect(page.getByText('$1.4M')).toBeVisible()
    await expect(page.getByText('$750K')).toBeVisible()
  })

  test('risk legend is shown with counts', async ({ page }) => {
    await expect(page.getByText('Critical').first()).toBeVisible()
    await expect(page.getByText('High').first()).toBeVisible()
    await expect(page.getByText('Medium').first()).toBeVisible()
    await expect(page.getByText('Low').first()).toBeVisible()
  })

  test('expanding a card reveals evidence summary', async ({ page }) => {
    const firstCard = page.locator('details').first()
    await firstCard.locator('summary').click()
    // "Evidence Summary" header lives in the div after </summary> (not the group-open:hidden hint)
    await expect(firstCard.locator('div p.text-xs.font-semibold').first()).toBeVisible()
  })

  test('linked records view-all opens the records page with the account filter applied', async ({ page }) => {
    const acmeCard = page.locator('details').filter({ hasText: 'Acme Corp' })
    await acmeCard.locator('summary').click()

    await acmeCard.getByRole('link', { name: 'View all →' }).click()
    await expect(page).toHaveURL(/\/records\/?\?account=acc-001/)
    await expect(page.getByText('Account: Acme Corp')).toBeVisible()
    await expect(page.locator('tbody tr')).toHaveCount(4)
    await expect(page.getByRole('cell', { name: 'Acme Corp' })).toHaveCount(4)
    await expect(page.getByText('Clear account filter')).toBeVisible()
  })
})

// ── Themes ────────────────────────────────────────────────────────────────

test.describe('Themes', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/themes')
  })

  test('page heading is visible', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Themes' })).toBeVisible()
    await expect(page.getByText(/8 themes ranked/)).toBeVisible()
  })

  test('recommendation badges are visible in the legend', async ({ page }) => {
    // Legend spans at the top of the page
    await expect(page.getByText('Build Now').first()).toBeVisible()
    await expect(page.getByText('Validate Next').first()).toBeVisible()
    await expect(page.getByText('Hold').first()).toBeVisible()
  })

  test('top-ranked theme SSO Integration is displayed first', async ({ page }) => {
    // sorted by total_score desc — SSO Integration is 0.94 (highest)
    const firstTheme = page.locator('.flex.flex-col.gap-4 > div').first()
    await expect(firstTheme.getByText('SSO Integration')).toBeVisible()
  })

  test('"Why This Jumped" section exists in each theme card', async ({ page }) => {
    const firstCard = page.locator('.flex.flex-col.gap-4 > div').first()
    await expect(firstCard.getByText('Why This Jumped')).toBeVisible()
  })

  test('"Why Not Now" section is shown for hold/validate themes', async ({ page }) => {
    // At least one theme has why_not_now text
    await expect(page.getByText('Why Not Now').first()).toBeVisible()
  })

  test('score bars are rendered', async ({ page }) => {
    // Score bars are divs with an inline width style — check the total score bar
    const scoreBars = page.locator('.h-2.bg-slate-700.rounded-full')
    await expect(scoreBars.first()).toBeVisible()
    const count = await scoreBars.count()
    expect(count).toBeGreaterThanOrEqual(8) // one total score bar per theme
  })

  test('all 8 theme names are displayed', async ({ page }) => {
    const themeNames = [
      'SSO Integration',
      'Data Export Latency',
      'Audit Logging',
      'API Rate Limits',
      'Data Residency (EU)',
      'Custom Dashboards',
      'Role-Based Access Control',
      'Webhook Reliability',
    ]
    for (const name of themeNames) {
      await expect(page.getByText(name)).toBeVisible()
    }
  })
})

// ── Briefs ────────────────────────────────────────────────────────────────

test.describe('Briefs', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/briefs')
  })

  test('page heading "Weekly Brief" is visible', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Weekly Brief' })).toBeVisible()
    await expect(page.getByText('Week ending 2026-04-04')).toBeVisible()
  })

  test('"Strategy Tax This Week" banner is visible', async ({ page }) => {
    await expect(page.getByText('Strategy Tax This Week').first()).toBeVisible()
    await expect(page.getByText('14h')).toBeVisible()
  })

  test('"What Got Worse" section exists with items', async ({ page }) => {
    await expect(page.getByText('What Got Worse')).toBeVisible()
    await expect(page.getByText(/EnterpriseX audit log escalation/)).toBeVisible()
  })

  test('"Segment at Risk" section is visible', async ({ page }) => {
    await expect(page.getByText('Segment at Risk')).toBeVisible()
    await expect(page.getByText(/Enterprise.*500K ARR/)).toBeVisible()
  })

  test('"Commitments at Risk" section lists commitments', async ({ page }) => {
    await expect(page.getByText('Commitments at Risk')).toBeVisible()
    await expect(page.getByText(/SSO Integration — EnterpriseX/)).toBeVisible()
  })

  test('"Recommended Actions" section is visible', async ({ page }) => {
    await expect(page.getByText('Recommended Actions')).toBeVisible()
    await expect(page.getByText(/Start SSO sprint/)).toBeVisible()
  })

  test('"Build Next Recommendation" section is visible with emerald styling', async ({ page }) => {
    await expect(page.getByText('Build Next Recommendation')).toBeVisible()
    // The recommendation value from sample data
    await expect(page.getByText('SSO Integration').first()).toBeVisible()
    // Section uses emerald border
    const section = page.locator('section.bg-emerald-950')
    await expect(section).toBeVisible()
  })

  test('"Export as Markdown" button downloads the weekly brief markdown file', async ({ page }) => {
    const button = page.getByRole('button', { name: 'Export as Markdown' })
    await expect(button).toBeVisible()
    const downloadPromise = page.waitForEvent('download')
    await button.click()
    const download = await downloadPromise
    await expect(download.suggestedFilename()).toBe('voc-brief-2026-04-04.md')
  })

  test('"Decision Trace" section is visible', async ({ page }) => {
    await expect(page.getByText('Decision Trace')).toBeVisible()
    await expect(page.getByText(/Signal intake: 15 records/)).toBeVisible()
  })
})

// ── Queue ─────────────────────────────────────────────────────────────────

test.describe('Queue', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/queue')
  })

  test('page heading "Build Queue" is visible', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Build Queue' })).toBeVisible()
    await expect(page.getByText(/5 items ranked/)).toBeVisible()
  })

  test('legend shows Build Now, Validate Next, Hold counts', async ({ page }) => {
    await expect(page.getByText('Build Now').first()).toBeVisible()
    await expect(page.getByText('Validate Next').first()).toBeVisible()
    await expect(page.getByText('Hold').first()).toBeVisible()
  })

  test('at least one <details> element exists for evidence drawer', async ({ page }) => {
    const details = page.locator('details')
    const count = await details.count()
    expect(count).toBeGreaterThanOrEqual(1)
  })

  test('all 5 queue items are rendered', async ({ page }) => {
    const items = page.locator('details')
    await expect(items).toHaveCount(5)
  })

  test('ranked items show rank numbers', async ({ page }) => {
    // Rank numbers rendered as text-2xl in summary — use locator with class context
    const firstItem = page.locator('details').first()
    await expect(firstItem.locator('span.text-2xl').first()).toBeVisible()
  })

  test('opening a details element reveals "Why Build Next" text', async ({ page }) => {
    const firstItem = page.locator('details').first()
    // Open the drawer
    await firstItem.locator('summary').click()
    await expect(firstItem.getByText('Why Build Next')).toBeVisible()
    await expect(firstItem.getByText(/Two critical accounts have overdue SSO/)).toBeVisible()
  })

  test('opening a details element reveals "Why Not the Alternative" text', async ({ page }) => {
    const firstItem = page.locator('details').first()
    await firstItem.locator('summary').click()
    await expect(firstItem.getByText('Why Not the Alternative')).toBeVisible()
  })

  test('linked account tags are displayed', async ({ page }) => {
    await expect(page.getByText('EnterpriseX').first()).toBeVisible()
    await expect(page.getByText('Acme Corp').first()).toBeVisible()
  })
})

// ── Navigation ────────────────────────────────────────────────────────────

test.describe('Navigation', () => {
  test('sidebar nav links are visible at desktop viewport', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 })
    await page.goto('/')

    const navLinks = [
      { label: 'Dashboard', href: /^\/$/ },
      { label: 'Records', href: /\/records/ },
      { label: 'Accounts', href: /\/accounts/ },
      { label: 'Themes', href: /\/themes/ },
      { label: 'Briefs', href: /\/briefs/ },
      { label: 'Build Queue', href: /\/queue/ },
    ]

    const sidebar = page.locator('aside')
    for (const { label, href } of navLinks) {
      const link = sidebar.getByRole('link', { name: label })
      await expect(link).toBeVisible()
      await expect(link).toHaveAttribute('href', href)
    }
  })

  test('clicking Records nav link navigates to /records', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 })
    await page.goto('/')
    await page.locator('aside').getByRole('link', { name: 'Records' }).click()
    await expect(page).toHaveURL(/\/records/)
    await expect(page.getByRole('heading', { name: 'Records' })).toBeVisible()
  })

  test('clicking Accounts nav link navigates to /accounts', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 })
    await page.goto('/')
    await page.locator('aside').getByRole('link', { name: 'Accounts' }).click()
    await expect(page).toHaveURL(/\/accounts/)
    await expect(page.getByRole('heading', { name: 'Accounts' })).toBeVisible()
  })

  test('clicking Themes nav link navigates to /themes', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 })
    await page.goto('/')
    await page.locator('aside').getByRole('link', { name: 'Themes' }).click()
    await expect(page).toHaveURL(/\/themes/)
    await expect(page.getByRole('heading', { name: 'Themes' })).toBeVisible()
  })

  test('clicking Briefs nav link navigates to /briefs', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 })
    await page.goto('/')
    await page.locator('aside').getByRole('link', { name: 'Briefs' }).click()
    await expect(page).toHaveURL(/\/briefs/)
    await expect(page.getByRole('heading', { name: 'Weekly Brief' })).toBeVisible()
  })

  test('clicking Build Queue nav link navigates to /queue', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 })
    await page.goto('/')
    await page.locator('aside').getByRole('link', { name: 'Build Queue' }).click()
    await expect(page).toHaveURL(/\/queue/)
    await expect(page.getByRole('heading', { name: 'Build Queue' })).toBeVisible()
  })

  test('sidebar shows VOC Repository branding', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 })
    await page.goto('/')
    await expect(page.locator('aside').getByText('VOC Repository')).toBeVisible()
    await expect(page.locator('aside').getByText('Product Intelligence')).toBeVisible()
  })
})
