export const TEMPLATE_TYPES = {
  HOW_TO: 1,
  COMPARISON: 2,
  NEWS_ANALYSIS: 3,
  CASE_STUDY: 4,
  ULTIMATE_GUIDE: 5,
} as const;

export const TEMPLATE_NAMES: Record<number, string> = {
  1: 'How-To Guide',
  2: 'Comparison Article',
  3: 'News Analysis',
  4: 'Case Study',
  5: 'Ultimate Guide',
};

const INDIAN_CITIES = [
  'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai',
  'Pune', 'Kolkata', 'Ahmedabad', 'Jaipur', 'Lucknow',
  'Chandigarh', 'Indore', 'Nagpur', 'Coimbatore', 'Kochi',
];

const INDIAN_NAMES = [
  'Rahul', 'Sneha', 'Vikram', 'Ananya', 'Suresh',
  'Priyanka', 'Manoj', 'Divya', 'Arjun', 'Meera',
  'Sanjay', 'Kavita', 'Rohan', 'Pooja', 'Deepak',
];

const PROFESSIONS = [
  'IT professional earning around ₹8 lakh per year',
  'school teacher with a monthly salary of ₹35,000',
  'small business owner running a kirana store',
  'freelance graphic designer billing ₹50,000-70,000 a month',
  'government employee with a basic pay of ₹45,000',
  'doctor running a private clinic',
  'CA working at a mid-size firm in the city',
  'delivery executive saving from daily earnings',
  'retired bank manager living on pension',
  'young marketing executive in her first job at ₹4.5 LPA',
];

// Track rotation state per category
const rotationState: Record<string, { templateIndex: number; cityIndex: number; nameIndex: number; profIndex: number }> = {};

export function getNextTemplate(category: string): number {
  if (!rotationState[category]) {
    rotationState[category] = { templateIndex: 0, cityIndex: 0, nameIndex: 0, profIndex: 0 };
  }
  const state = rotationState[category];
  const templateNumber = (state.templateIndex % 5) + 1;
  state.templateIndex++;
  return templateNumber;
}

function getNextCity(category: string): string {
  if (!rotationState[category]) {
    rotationState[category] = { templateIndex: 0, cityIndex: 0, nameIndex: 0, profIndex: 0 };
  }
  const state = rotationState[category];
  const city = INDIAN_CITIES[state.cityIndex % INDIAN_CITIES.length];
  state.cityIndex++;
  return city;
}

function getNextName(category: string): string {
  if (!rotationState[category]) {
    rotationState[category] = { templateIndex: 0, cityIndex: 0, nameIndex: 0, profIndex: 0 };
  }
  const state = rotationState[category];
  const name = INDIAN_NAMES[state.nameIndex % INDIAN_NAMES.length];
  state.nameIndex++;
  return name;
}

function getNextProfession(category: string): string {
  if (!rotationState[category]) {
    rotationState[category] = { templateIndex: 0, cityIndex: 0, nameIndex: 0, profIndex: 0 };
  }
  const state = rotationState[category];
  const prof = PROFESSIONS[state.profIndex % PROFESSIONS.length];
  state.profIndex++;
  return prof;
}

export function getPrompt(template: number, topic: string, category: string): string {
  const city = getNextCity(category);
  const personName = getNextName(category);
  const profession = getNextProfession(category);
  const currentYear = new Date().getFullYear();
  const financialYear = `${currentYear}-${(currentYear + 1).toString().slice(2)}`;

  const writingStyle = `
WRITING STYLE — THIS IS CRITICAL, READ CAREFULLY:
You are writing as an experienced Indian finance blogger who talks like a friend explaining money matters over chai.

DO NOT use these AI giveaway phrases (Google will flag them):
- "In conclusion", "It's worth noting", "Delve into", "Comprehensive guide"
- "Moreover", "Furthermore", "It is important to note", "In today's fast-paced world"
- "Navigating the complexities", "Landscape", "Unlock the secrets"
- "Game-changer", "Paradigm shift", "Leverage", "Harness the power"
- "Without further ado", "Let's dive in", "In this article we will"

INSTEAD write like this:
- Use short punchy sentences. Then a longer one. Mix it up.
- Start some paragraphs with "Look," or "Here's the thing —" or "So basically,"
- Use Indian English naturally: "lakh", "crore", "FY ${financialYear}", "ITR"
- Throw in real numbers: "If you put ₹5,000 every month in an ELSS fund for 10 years at 12% returns, you'd end up with roughly ₹11.6 lakh"
- Reference real things: "My neighbour's son just got a job at Infosys and asked me about tax saving"
- Be opinionated: "Honestly, most ULIPs are a waste of money. There, I said it."
- Use questions: "But what if you're already maxed out on 80C? That's where NPS comes in."
- Vary paragraph length — some just one line. Others 3-4 sentences.
- Sound like a real person, not a textbook
`;

  const jsonFormat = `
RESPONSE FORMAT — Return ONLY a JSON code block, nothing else:
\`\`\`json
{
  "title": "Your article title here — make it click-worthy but honest",
  "content": "Full article in markdown. Use ## for sections, **bold** for emphasis, bullet points, numbered lists. Minimum 1200 words.",
  "excerpt": "2-3 sentence summary, max 200 characters",
  "metaDescription": "SEO meta description, max 155 characters, include main keyword",
  "faqs": [
    { "question": "A real question someone would Google", "answer": "A direct, helpful answer in 2-3 sentences with specific numbers." }
  ]
}
\`\`\`

IMPORTANT: Return ONLY the JSON code block. No text before or after it.
`;

  switch (template) {
    case TEMPLATE_TYPES.HOW_TO:
      return `Write a practical how-to guide about "${topic}" for the "${category}" section of an Indian personal finance blog.

Start with a quick real-life scenario: ${personName}, a ${profession} in ${city}, needs help with this exact topic. What's their situation? Make the reader think "that's literally me."

Then walk them through it step by step:
- Use numbered steps with clear actions
- After each step, give a real ₹ amount example
- Include at least one "Pro Tip" that feels like insider knowledge
- Add a "Mistakes I've Seen People Make" section — write it like you've personally seen these mistakes
- Mention which forms to fill, which websites to use, which apps help
- End with 4-5 FAQs that people actually search for on Google

${writingStyle}

Reference FY ${financialYear} rules. Use ${city} for location-specific examples (rent, cost of living, etc).

${jsonFormat}`;

    case TEMPLATE_TYPES.COMPARISON:
      return `Write a comparison article about "${topic}" for the "${category}" section of an Indian personal finance blog.

Imagine ${personName} from ${city} (${profession}) asked you: "Which one should I pick?" Write your answer.

Structure:
- Open with WHY this comparison matters right now in ${financialYear}
- Create a clear comparison with specific parameters: returns, risk, lock-in, tax benefit, liquidity
- Use real ₹ numbers: "If ${personName} invests ₹10,000/month for 15 years..."
- Show calculations for at least 3 different amounts and time periods
- Have a "Quick Verdict" section: who should pick what, based on salary and age
- Add a "What I'd Personally Recommend" section — be direct
- Include 4-5 FAQs

Compare for these profiles:
- Fresh graduate (22-25 yrs, ₹4-6 LPA)
- Working professional (28-35 yrs, ₹10-20 LPA)
- Senior professional (40-50 yrs, ₹25-40 LPA)
- Homemaker managing household savings

${writingStyle}

${jsonFormat}`;

    case TEMPLATE_TYPES.NEWS_ANALYSIS:
      return `Write a news analysis article about "${topic}" for the "${category}" section of an Indian personal finance blog.

Write like you're a finance journalist who actually understands what this means for regular people in ${city} and across India.

Structure:
- Start with what happened — in plain English, no jargon dump
- Then: "Why should you care?" — explain the direct impact on someone like ${personName} (${profession})
- Give the backstory: how did we get here?
- What do the numbers say? Use real data — Nifty levels, RBI rates, inflation numbers
- "What this means for your wallet" — practical impact section
- "What should you do right now?" — actionable 3-5 steps
- End with 4-5 FAQs

${writingStyle}

Reference the current financial year ${financialYear}. Mention real institutions: SEBI, RBI, AMFI, NSE, BSE where relevant.

${jsonFormat}`;

    case TEMPLATE_TYPES.CASE_STUDY:
      return `Write a case study article about "${topic}" for the "${category}" section of an Indian personal finance blog.

Create a detailed, realistic story:
- Main character: ${personName} from ${city}, a ${profession}
- They have a specific financial challenge related to "${topic}"
- Walk through their situation in detail: monthly income, expenses, EMIs, family obligations
- Show the analysis: what options did they have?
- Show the solution: what did they actually do? Include exact ₹ amounts, specific product names, timelines
- Show the result: what happened after 1 year, 3 years, 5 years? Show the math.
- "What ${personName} Wishes They Knew Earlier" — lessons section
- End with 4-5 FAQs

Use realistic Indian middle-class numbers:
- Monthly income: ₹40,000 to ₹1,50,000
- Rent in ${city}: appropriate to the city
- EMIs, school fees, insurance premiums — include them
- Parents' health expenses, wedding planning — real life stuff

${writingStyle}

${jsonFormat}`;

    case TEMPLATE_TYPES.ULTIMATE_GUIDE:
      return `Write the ultimate guide about "${topic}" for the "${category}" section of an Indian personal finance blog.

This should be THE resource someone bookmarks and comes back to. Think "everything ${personName} from ${city} (${profession}) needs to know about this topic in one place."

Structure:
- Quick summary box at the top (5-6 bullet points for people in a hurry)
- "The Basics" — explain like they're 18 and just opened their first bank account
- "Getting Started" — exact first steps with specific amounts
- "Intermediate Strategies" — for people who've been at it 2-3 years
- "Advanced Moves" — for experienced investors/taxpayers
- "Tax Angles" — which sections of Income Tax Act apply? Calculate the savings.
- "Common Myths Exposed" — bust 4-5 myths with facts
- "Tools That Actually Help" — mention real Indian apps and websites
- "Your Action Plan" — numbered steps to start this week
- 5-6 FAQs

Use real calculations throughout. Show compounding with specific numbers. Reference ${financialYear} tax slabs and rules.

${writingStyle}

${jsonFormat}`;

    default:
      return `Write a detailed article about "${topic}" for the "${category}" section of an Indian personal finance blog.

Write for someone like ${personName} from ${city} — a ${profession} who wants practical, no-BS money advice.

Include specific ₹ amounts, real examples, Indian tax implications for FY ${financialYear}, and actionable steps. Add 4-5 FAQs at the end.

${writingStyle}

${jsonFormat}`;
  }
}

export function getTemplateName(template: number): string {
  return TEMPLATE_NAMES[template] || 'Standard Article';
}

export function resetRotation(category?: string): void {
  if (category) {
    delete rotationState[category];
  } else {
    Object.keys(rotationState).forEach((key) => delete rotationState[key]);
  }
}
