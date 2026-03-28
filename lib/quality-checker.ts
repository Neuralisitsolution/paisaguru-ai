export interface QualityResult {
  score: number;
  wordCount: number;
  issues: string[];
  passed: boolean;
}

export function checkArticleQuality(content: string, title: string): QualityResult {
  const issues: string[] = [];
  let score = 100;

  // Word count check
  const wordCount = content.split(/\s+/).filter(Boolean).length;
  if (wordCount < 1000) {
    issues.push(`Word count too low: ${wordCount} (minimum 1000)`);
    score -= 30;
  } else if (wordCount < 1500) {
    issues.push(`Word count could be higher: ${wordCount} (recommended 1500+)`);
    score -= 10;
  }

  // Title check
  if (!title || title.length < 20) {
    issues.push('Title is too short (minimum 20 characters)');
    score -= 10;
  }
  if (title && title.length > 100) {
    issues.push('Title is too long (maximum 100 characters)');
    score -= 5;
  }

  // Heading structure check
  const h2Count = (content.match(/^## /gm) || []).length;
  if (h2Count < 3) {
    issues.push(`Not enough H2 headings: ${h2Count} (minimum 3)`);
    score -= 10;
  }

  // Indian context check
  const indianTerms = ['₹', 'rupee', 'india', 'sebi', 'rbi', 'nse', 'bse', 'nifty', 'sensex', 'lakh', 'crore'];
  const lowerContent = content.toLowerCase();
  const indianTermCount = indianTerms.filter(term => lowerContent.includes(term)).length;
  if (indianTermCount < 3) {
    issues.push('Insufficient Indian financial context');
    score -= 15;
  }

  // FAQ check
  const hasFAQ = lowerContent.includes('faq') || lowerContent.includes('frequently asked');
  if (!hasFAQ) {
    issues.push('Missing FAQ section');
    score -= 10;
  }

  // Paragraph length check (no wall of text)
  const paragraphs = content.split(/\n\n+/).filter(p => p.trim() && !p.trim().startsWith('#'));
  const longParagraphs = paragraphs.filter(p => p.split(/\s+/).length > 200);
  if (longParagraphs.length > 0) {
    issues.push(`${longParagraphs.length} paragraphs are too long (200+ words)`);
    score -= 5;
  }

  // Links and formatting check
  const hasBold = content.includes('**');
  const hasList = content.includes('- ') || content.includes('1. ');
  if (!hasBold) {
    issues.push('No bold text formatting found');
    score -= 5;
  }
  if (!hasList) {
    issues.push('No lists found in content');
    score -= 5;
  }

  score = Math.max(0, Math.min(100, score));

  return {
    score,
    wordCount,
    issues,
    passed: score >= 60,
  };
}
