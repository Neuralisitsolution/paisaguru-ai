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
  'Mumbai',
  'Delhi',
  'Bangalore',
  'Hyderabad',
  'Chennai',
  'Pune',
  'Kolkata',
  'Ahmedabad',
];

// Track rotation state per category
const rotationState: Record<string, { templateIndex: number; cityIndex: number }> = {};

export function getNextTemplate(category: string): number {
  if (!rotationState[category]) {
    rotationState[category] = { templateIndex: 0, cityIndex: 0 };
  }

  const state = rotationState[category];
  const templateNumber = (state.templateIndex % 5) + 1;
  state.templateIndex++;

  return templateNumber;
}

function getNextCity(category: string): string {
  if (!rotationState[category]) {
    rotationState[category] = { templateIndex: 0, cityIndex: 0 };
  }

  const state = rotationState[category];
  const city = INDIAN_CITIES[state.cityIndex % INDIAN_CITIES.length];
  state.cityIndex++;

  return city;
}

export function getPrompt(template: number, topic: string, category: string): string {
  const city = getNextCity(category);
  const currentYear = new Date().getFullYear();
  const financialYear = `${currentYear}-${(currentYear + 1).toString().slice(2)}`;

  const baseInstructions = `
IMPORTANT INSTRUCTIONS:
- Write for an Indian audience. Use Indian Rupee (₹) for all amounts.
- Reference Indian financial institutions (SEBI, RBI, IRDA, AMFI, NSE, BSE).
- Include Indian tax laws, sections, and regulations where relevant.
- Use relatable Indian examples (salaried employees, NRIs, small business owners).
- The article MUST be a minimum of 1000 words.
- Use proper markdown formatting with H2 (##) and H3 (###) headings.
- Include practical, actionable advice.
- Mention current financial year ${financialYear} where relevant.
- Reference Indian cities like ${city} for relatable examples.
- Add 4-5 FAQs at the end in a dedicated section.
- Write in a professional yet conversational tone.

Return the response in this JSON format inside a code block:
\`\`\`json
{
  "title": "Article title here",
  "content": "Full markdown article content here",
  "excerpt": "2-3 sentence summary (max 200 chars)",
  "metaDescription": "SEO meta description (max 160 chars)",
  "faqs": [
    { "question": "FAQ question?", "answer": "FAQ answer." }
  ]
}
\`\`\`
`;

  switch (template) {
    case TEMPLATE_TYPES.HOW_TO:
      return `You are an expert Indian personal finance writer. Write a comprehensive HOW-TO GUIDE about "${topic}" in the "${category}" category.

Structure the article as a step-by-step guide:
1. Start with a relatable scenario (e.g., a person in ${city} facing this financial situation)
2. Explain WHY this matters to Indian investors/taxpayers
3. Provide numbered steps with clear instructions
4. Include specific ₹ amounts, percentages, and calculations
5. Add a "Common Mistakes to Avoid" section
6. Include a "Key Takeaways" box
7. End with FAQs

Example amounts to use:
- Monthly salary: ₹50,000 - ₹1,50,000
- Investment amounts: ₹5,000 - ₹25,000 per month
- Insurance coverage: ₹10,00,000 - ₹1,00,00,000

${baseInstructions}`;

    case TEMPLATE_TYPES.COMPARISON:
      return `You are an expert Indian personal finance writer. Write a detailed COMPARISON ARTICLE about "${topic}" in the "${category}" category.

Structure the article as a thorough comparison:
1. Open with why Indian investors in ${city} and other cities need to understand this comparison
2. Create a clear comparison table/matrix with key parameters
3. Compare features, returns, tax implications, lock-in periods, and risks
4. Include real ₹ amount examples showing returns over 5, 10, and 20 years
5. Add a "Who Should Choose What?" section based on investor profiles
6. Include tax implications under current Indian tax laws
7. Provide a clear verdict/recommendation
8. End with FAQs

Use these Indian investor profiles:
- Young professional (25-30 years, ₹6-10 LPA salary)
- Mid-career (35-40 years, ₹15-25 LPA salary)
- Pre-retirement (50-55 years, ₹20-35 LPA salary)
- Homemaker investing household savings

${baseInstructions}`;

    case TEMPLATE_TYPES.NEWS_ANALYSIS:
      return `You are an expert Indian financial journalist and analyst. Write an in-depth NEWS ANALYSIS article about "${topic}" in the "${category}" category.

Structure the article as a news analysis:
1. Start with the latest developments and why they matter to investors in ${city} and across India
2. Provide background context and historical perspective
3. Analyze the impact on Indian retail investors, mutual fund holders, and taxpayers
4. Include expert perspectives and market data
5. Discuss how RBI, SEBI, or government policies affect this topic
6. Compare with global trends where relevant
7. Provide actionable advice for Indian investors based on this analysis
8. Include a "What Should Investors Do Now?" section
9. End with FAQs

Reference recent trends:
- Nifty 50 and Sensex performance
- RBI repo rate decisions
- Government budget announcements
- FII/DII investment patterns
- Indian GDP growth and inflation data

${baseInstructions}`;

    case TEMPLATE_TYPES.CASE_STUDY:
      return `You are an expert Indian personal finance writer. Write a compelling CASE STUDY article about "${topic}" in the "${category}" category.

Structure the article as a real-world case study:
1. Introduce a fictional but realistic Indian individual/family from ${city}
2. Describe their financial situation in detail (income, expenses, goals in ₹)
3. Identify the financial challenge or goal they face
4. Walk through the analysis and decision-making process
5. Show the solution/strategy implemented with exact ₹ amounts
6. Present results with calculations and projections
7. Include "Lessons Learned" section applicable to readers
8. Add alternative approaches they could have taken
9. End with FAQs

Case study character guidelines:
- Use common Indian names and relatable professions
- Monthly income between ₹40,000 and ₹2,00,000
- Include family considerations (spouse, children, parents)
- Factor in Indian life events (wedding, children's education, home purchase)
- Reference EMIs, SIPs, and Indian investment products

${baseInstructions}`;

    case TEMPLATE_TYPES.ULTIMATE_GUIDE:
      return `You are an expert Indian personal finance writer. Write a comprehensive ULTIMATE GUIDE about "${topic}" in the "${category}" category.

Structure the article as the definitive guide:
1. Start with a powerful introduction explaining why every Indian (especially in cities like ${city}) needs this guide
2. Cover the topic from basics to advanced strategies
3. Include a "Quick Summary" table at the top
4. Break into clear sections: Basics, Intermediate Strategies, Advanced Tips, Tax Implications
5. Add comparison tables, calculations, and real ₹ amount examples
6. Include a "Step-by-Step Action Plan" section
7. Add a "Tools and Resources" section (Indian apps, websites, calculators)
8. Cover common myths and misconceptions in India
9. Include regulatory framework (SEBI, RBI, Income Tax Act sections)
10. End with a comprehensive FAQ section (at least 5 questions)

Make this the most thorough guide available:
- Cover every aspect from beginner to expert level
- Include at least 3 worked-out examples with ₹ calculations
- Reference official Indian sources and regulations
- Make it actionable with clear next steps

${baseInstructions}`;

    default:
      return `You are an expert Indian personal finance writer. Write a comprehensive article about "${topic}" in the "${category}" category for an Indian audience.

Include practical examples with ₹ amounts relevant to people in ${city} and other Indian cities.

${baseInstructions}`;
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
