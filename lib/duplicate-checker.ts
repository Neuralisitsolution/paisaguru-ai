/**
 * Tokenizes text into a set of normalized words, removing common stop words.
 */
function tokenize(text: string): Set<string> {
  const stopWords = new Set([
    'the', 'a', 'an', 'is', 'are', 'was', 'were', 'be', 'been', 'being',
    'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could',
    'should', 'may', 'might', 'shall', 'can', 'to', 'of', 'in', 'for',
    'on', 'with', 'at', 'by', 'from', 'as', 'into', 'through', 'during',
    'before', 'after', 'above', 'below', 'between', 'and', 'but', 'or',
    'nor', 'not', 'so', 'yet', 'both', 'either', 'neither', 'each',
    'every', 'all', 'any', 'few', 'more', 'most', 'other', 'some',
    'such', 'no', 'only', 'own', 'same', 'than', 'too', 'very',
    'just', 'because', 'if', 'when', 'where', 'how', 'what', 'which',
    'who', 'whom', 'this', 'that', 'these', 'those', 'i', 'you', 'he',
    'she', 'it', 'we', 'they', 'me', 'him', 'her', 'us', 'them',
    'my', 'your', 'his', 'its', 'our', 'their',
  ]);

  const words = text
    .toLowerCase()
    .replace(/[^\w\s₹]/g, '')
    .split(/\s+/)
    .filter((word) => word.length > 2 && !stopWords.has(word));

  return new Set(words);
}

/**
 * Calculates Jaccard similarity between two sets.
 * Returns a value between 0 and 1 (0 = no overlap, 1 = identical).
 */
function jaccardSimilarity(setA: Set<string>, setB: Set<string>): number {
  if (setA.size === 0 && setB.size === 0) return 0;

  let intersectionSize = 0;
  Array.from(setA).forEach(item => {
    if (setB.has(item)) {
      intersectionSize++;
    }
  });

  const unionSize = setA.size + setB.size - intersectionSize;
  if (unionSize === 0) return 0;

  return intersectionSize / unionSize;
}

/**
 * Checks how similar the new content is to existing article titles.
 * Uses word-level Jaccard similarity.
 *
 * @param newContent - The new article content or title to check
 * @param existingTitles - Array of existing article titles to compare against
 * @returns Similarity percentage (0-100). Higher means more similar/duplicate.
 */
export function checkDuplicate(newContent: string, existingTitles: string[]): number {
  if (!newContent || existingTitles.length === 0) return 0;

  const newTokens = tokenize(newContent);
  if (newTokens.size === 0) return 0;

  let maxSimilarity = 0;

  for (const title of existingTitles) {
    const existingTokens = tokenize(title);
    if (existingTokens.size === 0) continue;

    const similarity = jaccardSimilarity(newTokens, existingTokens);
    if (similarity > maxSimilarity) {
      maxSimilarity = similarity;
    }
  }

  // Convert to percentage
  return Math.round(maxSimilarity * 100);
}

/**
 * Checks content-level similarity between two full articles.
 * Uses shingling (n-gram) approach for more accurate content comparison.
 *
 * @param contentA - First article content
 * @param contentB - Second article content
 * @param shingleSize - Number of words per shingle (default 3)
 * @returns Similarity percentage (0-100)
 */
export function checkContentSimilarity(
  contentA: string,
  contentB: string,
  shingleSize: number = 3
): number {
  if (!contentA || !contentB) return 0;

  const getShingles = (text: string): Set<string> => {
    const words = text
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter((w) => w.length > 0);

    const shingles = new Set<string>();
    for (let i = 0; i <= words.length - shingleSize; i++) {
      shingles.add(words.slice(i, i + shingleSize).join(' '));
    }
    return shingles;
  };

  const shinglesA = getShingles(contentA);
  const shinglesB = getShingles(contentB);

  return Math.round(jaccardSimilarity(shinglesA, shinglesB) * 100);
}

export default checkDuplicate;
