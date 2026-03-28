import { GoogleGenerativeAI } from '@google/generative-ai';
import { getPrompt } from './prompt-rotator';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

function ensureApiKey() {
  if (!GEMINI_API_KEY || GEMINI_API_KEY === 'your-gemini-api-key-here') {
    throw new Error(
      'GEMINI_API_KEY is not configured. Get a free key at https://aistudio.google.com/app/apikey and add it to .env.local'
    );
  }
}

export const AUTHORS = [
  {
    name: 'Rajesh Kumar',
    title: 'Certified Financial Planner (CFP)',
    bio: 'Rajesh Kumar is a SEBI-registered Certified Financial Planner with over 15 years of experience helping Indian families build wealth through disciplined investing. He specializes in mutual funds, tax planning, and retirement strategies tailored for the Indian market.',
    expertise: ['mutual-funds', 'tax-planning', 'retirement-planning', 'wealth-management'],
    slug: 'rajesh-kumar',
    image: '/images/authors/rajesh-kumar.webp',
  },
  {
    name: 'Priya Sharma',
    title: 'Chartered Accountant (CA)',
    bio: 'Priya Sharma is a practicing Chartered Accountant and financial educator who has helped thousands of Indians navigate the complexities of income tax, GST, and corporate finance. She is passionate about making financial literacy accessible to every Indian household.',
    expertise: ['income-tax', 'gst', 'corporate-finance', 'accounting', 'tax-saving'],
    slug: 'priya-sharma',
    image: '/images/authors/priya-sharma.webp',
  },
  {
    name: 'Amit Verma',
    title: 'MBA Finance & Investment Analyst',
    bio: 'Amit Verma holds an MBA in Finance from IIM Ahmedabad and has spent a decade analyzing Indian equity markets, IPOs, and stock portfolios. He breaks down complex market trends into actionable insights for everyday investors.',
    expertise: ['stock-market', 'ipos', 'equity-analysis', 'portfolio-management', 'trading'],
    slug: 'amit-verma',
    image: '/images/authors/amit-verma.webp',
  },
  {
    name: 'Sunita Rao',
    title: 'Insurance & Risk Management Expert',
    bio: 'Sunita Rao is an IRDA-certified insurance advisor with 12 years of experience in life insurance, health insurance, and risk management. She helps Indian families choose the right insurance policies without falling for mis-selling traps.',
    expertise: ['life-insurance', 'health-insurance', 'term-insurance', 'risk-management', 'claims'],
    slug: 'sunita-rao',
    image: '/images/authors/sunita-rao.webp',
  },
];

function pickAuthor(category: string) {
  const categoryAuthorMap: Record<string, number> = {
    'mutual-funds': 0,
    'tax-planning': 1,
    'income-tax': 1,
    'gst': 1,
    'stock-market': 2,
    'ipos': 2,
    'trading': 2,
    'insurance': 3,
    'health-insurance': 3,
    'life-insurance': 3,
    'term-insurance': 3,
  };

  const authorIndex = categoryAuthorMap[category] ?? Math.floor(Math.random() * AUTHORS.length);
  return AUTHORS[authorIndex];
}

export async function generateArticle(
  topic: string,
  category: string,
  templateType: number
): Promise<{
  title: string;
  content: string;
  excerpt: string;
  metaDescription: string;
  faqs: { question: string; answer: string }[];
  author: typeof AUTHORS[0];
}> {
  ensureApiKey();
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
  const prompt = getPrompt(templateType, topic, category);

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  // Parse the AI response
  const parsed = parseArticleResponse(text);
  const author = pickAuthor(category);

  return {
    title: parsed.title,
    content: parsed.content,
    excerpt: parsed.excerpt,
    metaDescription: parsed.metaDescription,
    faqs: parsed.faqs,
    author,
  };
}

function cleanJsonString(raw: string): string {
  // Remove markdown code fences and language tags
  return raw
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/\s*```\s*$/i, '')
    .trim();
}

function isValidTitle(title: string): boolean {
  if (!title || title.length < 10) return false;
  // Reject if title looks like raw JSON/markdown artifacts
  const bad = ['```', '{', '}', '"title"', '"content"', '\\n'];
  return !bad.some(b => title.includes(b));
}

function parseArticleResponse(text: string): {
  title: string;
  content: string;
  excerpt: string;
  metaDescription: string;
  faqs: { question: string; answer: string }[];
} {
  // Strategy 1: Extract JSON from code fences (handles ```json ... ``` with any whitespace)
  try {
    const jsonMatch = text.match(/```(?:json)?\s*\n?([\s\S]*?)\n?\s*```/i);
    if (jsonMatch) {
      const cleaned = cleanJsonString(jsonMatch[1]);
      const parsed = JSON.parse(cleaned);
      if (parsed.title && isValidTitle(parsed.title)) {
        return {
          title: parsed.title.trim(),
          content: (parsed.content || '').trim(),
          excerpt: (parsed.excerpt || '').substring(0, 200).trim(),
          metaDescription: (parsed.metaDescription || parsed.meta_description || '').substring(0, 160).trim(),
          faqs: Array.isArray(parsed.faqs) ? parsed.faqs : [],
        };
      }
    }
  } catch {
    // Fall through
  }

  // Strategy 2: Try parsing entire response as JSON (no code fences)
  try {
    const trimmed = text.trim();
    if (trimmed.startsWith('{')) {
      const parsed = JSON.parse(trimmed);
      if (parsed.title && isValidTitle(parsed.title)) {
        return {
          title: parsed.title.trim(),
          content: (parsed.content || '').trim(),
          excerpt: (parsed.excerpt || '').substring(0, 200).trim(),
          metaDescription: (parsed.metaDescription || parsed.meta_description || '').substring(0, 160).trim(),
          faqs: Array.isArray(parsed.faqs) ? parsed.faqs : [],
        };
      }
    }
  } catch {
    // Fall through
  }

  // Strategy 3: Find any JSON object in the text
  try {
    const jsonObjectMatch = text.match(/\{[\s\S]*"title"\s*:\s*"[\s\S]*?\}/);
    if (jsonObjectMatch) {
      const parsed = JSON.parse(jsonObjectMatch[0]);
      if (parsed.title && isValidTitle(parsed.title)) {
        return {
          title: parsed.title.trim(),
          content: (parsed.content || '').trim(),
          excerpt: (parsed.excerpt || '').substring(0, 200).trim(),
          metaDescription: (parsed.metaDescription || parsed.meta_description || '').substring(0, 160).trim(),
          faqs: Array.isArray(parsed.faqs) ? parsed.faqs : [],
        };
      }
    }
  } catch {
    // Fall through
  }

  // Strategy 4: Manual parsing fallback — strip all code fences first
  const cleanText = text
    .replace(/```(?:json)?\s*/gi, '')
    .replace(/```/g, '')
    .trim();

  const lines = cleanText.split('\n');
  let title = '';
  let content = '';
  let excerpt = '';
  let metaDescription = '';
  const faqs: { question: string; answer: string }[] = [];

  // Extract title from first heading
  const titleMatch = cleanText.match(/^#\s+(.+)$/m);
  if (titleMatch && isValidTitle(titleMatch[1].trim())) {
    title = titleMatch[1].trim();
  } else {
    // Find first non-empty line that looks like a title
    for (const line of lines) {
      const cleaned = line.replace(/^#+\s*/, '').replace(/^\*+/, '').trim();
      if (cleaned.length >= 15 && cleaned.length <= 120 && !cleaned.startsWith('{') && !cleaned.startsWith('```')) {
        title = cleaned;
        break;
      }
    }
    if (!title) title = 'Untitled Article';
  }

  // Extract meta description
  const metaMatch = cleanText.match(/Meta Description:\s*(.+)/i);
  if (metaMatch) {
    metaDescription = metaMatch[1].trim();
  }

  // Extract FAQs
  const faqSection = cleanText.match(/(?:## )?(?:FAQs?|Frequently Asked Questions)([\s\S]*?)(?=##\s|$)/i);
  if (faqSection) {
    const faqText = faqSection[1];
    const questionBlocks = faqText.split(/(?:###?\s*(?:Q\d*[.:])?\s*)/);
    for (const block of questionBlocks) {
      if (!block.trim()) continue;
      const parts = block.split(/(?:\n\s*(?:A[.:])?\s*)/);
      if (parts.length >= 2) {
        const question = parts[0].replace(/\*\*/g, '').replace(/\??\s*$/, '?').trim();
        const answer = parts.slice(1).join(' ').replace(/\*\*/g, '').trim();
        if (question && answer) {
          faqs.push({ question, answer });
        }
      }
    }
  }

  // Content is the full text minus meta lines
  content = cleanText
    .replace(/^Meta Description:.*$/gm, '')
    .replace(/^Excerpt:.*$/gm, '')
    .trim();

  // Generate excerpt
  const excerptMatch = cleanText.match(/^(?!#)(?!Meta)(?!Excerpt)(.{50,200}[.!?])/m);
  if (excerptMatch) {
    excerpt = excerptMatch[1].trim();
  } else {
    excerpt = content.substring(0, 200).replace(/\n/g, ' ').trim() + '...';
  }

  if (!metaDescription) {
    metaDescription = excerpt.substring(0, 160);
  }

  return { title, content, excerpt, metaDescription, faqs };
}

export async function generateQuiz(
  category: string,
  count: number = 10
): Promise<
  {
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
  }[]
> {
  ensureApiKey();
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

  const prompt = `You are an Indian personal finance expert. Generate ${count} multiple-choice quiz questions about "${category}" for an Indian audience.

Requirements:
- All amounts should be in Indian Rupees (₹)
- Reference Indian financial products, regulations, and institutions (SEBI, RBI, IRDA, etc.)
- Include questions about Indian tax laws (Section 80C, 80D, HRA, etc.)
- Mix difficulty levels: 40% easy, 40% medium, 20% hard
- Each question must have exactly 4 options
- Provide clear explanations for each correct answer

Return the response as a JSON array with this structure:
\`\`\`json
[
  {
    "question": "What is the maximum deduction under Section 80C of the Income Tax Act?",
    "options": ["₹1,00,000", "₹1,50,000", "₹2,00,000", "₹2,50,000"],
    "correctAnswer": 1,
    "explanation": "Under Section 80C, the maximum deduction allowed is ₹1,50,000 per financial year. This includes investments in PPF, ELSS, NSC, life insurance premiums, and more."
  }
]
\`\`\`

Generate exactly ${count} questions about ${category}.`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  try {
    const jsonMatch = text.match(/```json\n?([\s\S]*?)\n?```/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[1]);
    }
    // Try parsing the entire response as JSON
    return JSON.parse(text);
  } catch {
    // Return a default question set if parsing fails
    return [
      {
        question: `What is a key concept in ${category}?`,
        options: [
          'Option A - Basic concept',
          'Option B - Intermediate concept',
          'Option C - Advanced concept',
          'Option D - Expert concept',
        ],
        correctAnswer: 0,
        explanation: `This is a fundamental concept in ${category} that every Indian investor should understand.`,
      },
    ];
  }
}

export async function chatResponse(
  question: string,
  history: string[] = []
): Promise<string> {
  ensureApiKey();
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

  const contextHistory = history
    .slice(-10)
    .map((msg, i) => (i % 2 === 0 ? `User: ${msg}` : `Assistant: ${msg}`))
    .join('\n');

  const prompt = `You are PaisaGuru AI, a friendly and knowledgeable Indian personal finance assistant. You help Indian users with questions about:
- Mutual funds, SIPs, and investment strategies
- Income tax planning and filing (ITR)
- Insurance (life, health, term, motor)
- Stock market, IPOs, and trading
- Banking, fixed deposits, and savings
- Loans (home, personal, education, car)
- Credit cards and credit score (CIBIL)
- Government schemes (PPF, NPS, SSY, PMJDY)
- Real estate investment in India
- Retirement planning

Guidelines:
- Always use Indian Rupee (₹) for amounts
- Reference Indian regulations, institutions (SEBI, RBI, IRDA, AMFI)
- Mention relevant Indian tax sections when applicable
- Be conversational but accurate
- If you're unsure, recommend consulting a SEBI-registered advisor or CA
- Never provide specific stock tips or guaranteed return promises
- Keep responses concise but informative (200-400 words)

${contextHistory ? `Previous conversation:\n${contextHistory}\n\n` : ''}

User's question: ${question}

Provide a helpful, accurate response:`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}
