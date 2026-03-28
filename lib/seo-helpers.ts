const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.paisaguru.com';
const SITE_NAME = 'PaisaGuru';

interface MetaPage {
  title: string;
  description: string;
  url: string;
  image?: string;
  type?: string;
}

interface MetaTags {
  title: string;
  description: string;
  openGraph: {
    title: string;
    description: string;
    url: string;
    siteName: string;
    images: { url: string; width: number; height: number; alt: string }[];
    locale: string;
    type: string;
  };
  twitter: {
    card: string;
    title: string;
    description: string;
    images: string[];
  };
  alternates: {
    canonical: string;
  };
}

/**
 * Generates comprehensive meta tags for a page.
 */
export function generateMetaTags(page: MetaPage): MetaTags {
  const title = `${page.title} | ${SITE_NAME}`;
  const description = page.description.substring(0, 160);
  const image = page.image || `${SITE_URL}/images/og-default.jpg`;
  const url = page.url.startsWith('http') ? page.url : `${SITE_URL}${page.url}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: page.title,
        },
      ],
      locale: 'en_IN',
      type: page.type || 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
    alternates: {
      canonical: url,
    },
  };
}

/**
 * Generates JSON-LD schema for an Article.
 */
export function generateArticleSchema(article: {
  title: string;
  description: string;
  content: string;
  slug: string;
  author: { name: string; slug: string; title: string; image: string };
  publishedAt: string;
  lastUpdated?: string;
  featuredImage?: string;
  category?: string;
  wordCount?: number;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    image: article.featuredImage || `${SITE_URL}/images/og-default.jpg`,
    author: {
      '@type': 'Person',
      name: article.author.name,
      url: `${SITE_URL}/author/${article.author.slug}`,
      jobTitle: article.author.title,
      image: article.author.image,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/images/logo.png`,
      },
    },
    datePublished: article.publishedAt,
    dateModified: article.lastUpdated || article.publishedAt,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/articles/${article.slug}`,
    },
    articleSection: article.category || 'Finance',
    wordCount: article.wordCount || 0,
    inLanguage: 'en-IN',
  };
}

/**
 * Generates JSON-LD schema for FAQs.
 */
export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generates JSON-LD schema for a Calculator (SoftwareApplication).
 */
export function generateCalculatorSchema(name: string, description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: `${name} - ${SITE_NAME}`,
    description,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
    },
    provider: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}

/**
 * Generates JSON-LD schema for BreadcrumbList.
 */
export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}

/**
 * Generates JSON-LD schema for the PaisaGuru Organization.
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo.png`,
    description:
      'PaisaGuru is India\'s trusted AI-powered personal finance platform offering expert advice on mutual funds, tax planning, insurance, stock market, and more.',
    foundingDate: '2024',
    sameAs: [
      'https://twitter.com/paisaguru',
      'https://facebook.com/paisaguru',
      'https://instagram.com/paisaguru',
      'https://youtube.com/@paisaguru',
      'https://linkedin.com/company/paisaguru',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: 'support@paisaguru.com',
      availableLanguage: ['English', 'Hindi'],
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Mumbai',
      addressRegion: 'Maharashtra',
      addressCountry: 'IN',
    },
  };
}

/**
 * Converts text to a URL-friendly slug.
 */
export function formatSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Calculates estimated reading time in minutes.
 * Average reading speed: 200 words per minute (slightly lower for technical/finance content).
 */
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).filter((w) => w.length > 0).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return Math.max(1, minutes);
}

export default {
  generateMetaTags,
  generateArticleSchema,
  generateFAQSchema,
  generateCalculatorSchema,
  generateBreadcrumbSchema,
  generateOrganizationSchema,
  formatSlug,
  calculateReadingTime,
};
