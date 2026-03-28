const AFFILIATE_LINKS: Record<string, { url: string; categories: string[]; keywords: string[] }> = {
  Groww: {
    url: 'https://groww.in?utm_source=paisaguru',
    categories: ['mutual-funds', 'investments'],
    keywords: ['mutual fund', 'sip', 'elss', 'index fund', 'liquid fund', 'groww'],
  },
  Zerodha: {
    url: 'https://zerodha.com?utm_source=paisaguru',
    categories: ['stock-market', 'investments'],
    keywords: ['stock', 'demat', 'trading', 'ipo', 'nifty', 'sensex', 'share', 'zerodha'],
  },
  PolicyBazaar: {
    url: 'https://www.policybazaar.com?utm_source=paisaguru',
    categories: ['insurance'],
    keywords: ['insurance', 'term plan', 'health insurance', 'life insurance', 'ulip', 'policybazaar'],
  },
};

export function insertAffiliateLinks(content: string, category: string): string {
  let modified = content;
  const insertedLinks = new Set<string>();

  for (const [name, config] of Object.entries(AFFILIATE_LINKS)) {
    // Only insert if category matches
    if (!config.categories.includes(category)) continue;

    // Check if any keyword appears in the content
    const hasKeyword = config.keywords.some(kw => modified.toLowerCase().includes(kw));
    if (!hasKeyword) continue;

    // Don't insert the same affiliate link twice
    if (insertedLinks.has(name)) continue;

    // Find a natural place to insert — after a relevant paragraph
    for (const keyword of config.keywords) {
      const pattern = new RegExp(`(${keyword}[^.]*\\.)`, 'i');
      const match = modified.match(pattern);
      if (match && match.index !== undefined) {
        const insertPoint = match.index + match[0].length;
        const linkText = ` You can start with [${name}](${config.url}) which offers a simple, beginner-friendly platform.`;
        modified = modified.slice(0, insertPoint) + linkText + modified.slice(insertPoint);
        insertedLinks.add(name);
        break;
      }
    }
  }

  return modified;
}
