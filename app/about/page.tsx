import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About PaisaGuru | India\'s Trusted Finance Guide',
  description:
    'Learn about PaisaGuru — India\'s most trusted personal finance platform. Meet our team of certified experts helping 1.4 billion Indians make smarter money decisions.',
  openGraph: {
    title: 'About PaisaGuru | India\'s Trusted Finance Guide',
    description:
      'Meet the team behind PaisaGuru and learn how we\'re making personal finance accessible to every Indian.',
  },
};

const teamMembers = [
  {
    name: 'Rajesh Kumar',
    title: 'CFP - Certified Financial Planner',
    experience: '12 years',
    role: 'Investment Specialist',
    bio: 'Rajesh is a SEBI-registered investment advisor and Certified Financial Planner with over 12 years of experience in the Indian financial markets. He has guided thousands of investors through bull and bear markets, helping them build diversified portfolios tailored to their risk profiles. His deep understanding of mutual funds, equities, and fixed-income instruments makes him one of the most sought-after voices in Indian personal finance.',
    expertise: ['Mutual Funds', 'Equity Markets', 'Portfolio Management', 'Retirement Planning'],
    color: 'bg-primary-600',
    initials: 'RK',
  },
  {
    name: 'Priya Sharma',
    title: 'CA - Chartered Accountant',
    experience: '10 years',
    role: 'Tax Expert',
    bio: 'Priya is a practicing Chartered Accountant with a decade of experience in Indian taxation, both direct and indirect. She has helped hundreds of salaried professionals, freelancers, and small business owners optimize their tax liabilities through legitimate planning strategies. Her articles on income tax, GST, and tax-saving investments have been read by millions of Indians during every tax season.',
    expertise: ['Income Tax', 'GST', 'Tax-Saving Investments', 'ITR Filing'],
    color: 'bg-secondary-600',
    initials: 'PS',
  },
  {
    name: 'Amit Verma',
    title: 'MBA Finance - IIM Ahmedabad',
    experience: '8 years',
    role: 'Investment Advisor',
    bio: 'Amit holds an MBA in Finance from IIM Ahmedabad and has spent 8 years in the wealth management industry. He previously worked with two of India\'s top asset management companies before joining PaisaGuru to democratize financial knowledge. His specialty lies in breaking down complex investment concepts like SIP strategies, sectoral fund analysis, and global diversification into simple, actionable advice.',
    expertise: ['SIP Strategies', 'Wealth Management', 'NPS', 'Financial Planning'],
    color: 'bg-blue-600',
    initials: 'AV',
  },
  {
    name: 'Sunita Rao',
    title: 'IRDA Licensed Insurance Advisor',
    experience: '15 years',
    role: 'Insurance Expert',
    bio: 'Sunita brings 15 years of insurance industry experience to PaisaGuru, making her our most seasoned contributor. She has worked with leading insurance companies in India and has an unmatched ability to simplify insurance jargon. From term life and health insurance to ULIPs and pension plans, Sunita has helped thousands of families secure their financial futures with the right coverage at the best premiums.',
    expertise: ['Life Insurance', 'Health Insurance', 'ULIPs', 'Pension Plans'],
    color: 'bg-purple-600',
    initials: 'SR',
  },
];

const trustSignals = [
  { number: '5M+', label: 'Monthly Readers' },
  { number: '2,500+', label: 'Expert Articles' },
  { number: '50+', label: 'Financial Calculators' },
  { number: '4.8/5', label: 'Reader Trust Rating' },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary-400 rounded-full blur-3xl" />
        </div>
        <div className="container-custom relative py-20 md:py-28">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-4 py-1.5 bg-white/20 rounded-full text-sm font-medium mb-6">
              India&apos;s Most Trusted Finance Platform
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Making Finance <span className="text-secondary-400">Simple</span> for Every Indian
            </h1>
            <p className="text-lg md:text-xl text-primary-100 leading-relaxed max-w-2xl mx-auto">
              PaisaGuru is on a mission to empower 1.4 billion Indians with the financial knowledge
              they need to build wealth, save taxes, and secure their families&apos; futures — all in
              simple, jargon-free language.
            </p>
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="relative -mt-10 z-10">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {trustSignals.map((signal) => (
              <div
                key={signal.label}
                className="bg-white rounded-xl shadow-lg p-6 text-center border border-gray-100"
              >
                <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-1">
                  {signal.number}
                </div>
                <div className="text-sm text-gray-600 font-medium">{signal.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="section-title">Our Story</h2>
              <div className="w-16 h-1 bg-primary-600 mx-auto mt-4" />
            </div>
            <div className="prose prose-lg max-w-none">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="bg-gradient-to-br from-primary-100 to-primary-50 rounded-2xl p-8 flex items-center justify-center min-h-[300px]">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <span className="text-white text-3xl font-bold">&#8377;</span>
                    </div>
                    <p className="text-primary-700 font-semibold text-lg">Founded in 2020</p>
                    <p className="text-primary-600 text-sm mt-1">Mumbai, India</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">
                    PaisaGuru was founded in 2020 with a singular vision: to bridge the massive
                    financial literacy gap in India. Despite being one of the world&apos;s
                    fastest-growing economies, India&apos;s financial literacy rate remains below 30%.
                    Millions of Indians make suboptimal money decisions every day — not because they
                    lack intelligence, but because they lack access to clear, trustworthy, and
                    actionable financial guidance.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Our founders, a group of finance professionals and technologists from Mumbai, saw
                    an opportunity to change this. They believed that if financial knowledge were
                    presented in simple language, supported by interactive tools and calculators, and
                    backed by certified experts, every Indian could take control of their financial
                    destiny.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Today, PaisaGuru reaches over 5 million readers every month. Our articles cover
                    everything from basic budgeting and income tax filing to advanced investment
                    strategies and retirement planning. Every piece of content is written or reviewed
                    by certified professionals — because when it comes to your money, accuracy is
                    non-negotiable.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="section-title mb-4">Our Mission</h2>
            <div className="w-16 h-1 bg-secondary-600 mx-auto mb-8" />
            <p className="text-xl text-gray-700 leading-relaxed mb-12">
              To make personal finance accessible, understandable, and actionable for 1.4 billion
              Indians — regardless of their education, income level, or language.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-6 rounded-xl bg-primary-50 border border-primary-100">
                <div className="w-14 h-14 bg-primary-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Educate</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  We publish in-depth, expert-reviewed articles that break down complex financial
                  topics into simple, actionable guidance that anyone can follow.
                </p>
              </div>
              <div className="p-6 rounded-xl bg-secondary-50 border border-secondary-100">
                <div className="w-14 h-14 bg-secondary-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Empower</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Our free financial calculators and tools help Indians make informed decisions about
                  investments, taxes, loans, and insurance without needing a financial advisor.
                </p>
              </div>
              <div className="p-6 rounded-xl bg-blue-50 border border-blue-100">
                <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Protect</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  We help Indians avoid financial scams, understand their rights, and make decisions
                  that protect their hard-earned money and their families&apos; futures.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Expert Team */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="section-title">Meet Our Expert Authors</h2>
            <p className="section-subtitle max-w-2xl mx-auto">
              Every article on PaisaGuru is written or reviewed by certified finance professionals
              with decades of combined experience in the Indian financial industry.
            </p>
            <div className="w-16 h-1 bg-primary-600 mx-auto" />
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="p-6 md:p-8">
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className={`w-16 h-16 ${member.color} rounded-xl flex items-center justify-center flex-shrink-0`}
                    >
                      <span className="text-white text-xl font-bold">{member.initials}</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                      <p className="text-primary-600 font-medium text-sm">{member.title}</p>
                      <p className="text-gray-500 text-sm">
                        {member.role} &middot; {member.experience} experience
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{member.bio}</p>
                  <div className="flex flex-wrap gap-2">
                    {member.expertise.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial Standards */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="section-title">Our Editorial Standards</h2>
              <p className="section-subtitle">
                We hold ourselves to the highest standards of accuracy and transparency.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                {
                  title: 'Expert Reviewed',
                  desc: 'Every article is reviewed by at least one certified professional (CA, CFP, or SEBI-registered advisor) before publication.',
                },
                {
                  title: 'Fact Checked',
                  desc: 'All data points, statistics, and regulatory references are verified against official SEBI, RBI, and government sources.',
                },
                {
                  title: 'Regularly Updated',
                  desc: 'Articles are reviewed and updated whenever tax laws, interest rates, or regulations change to ensure accuracy.',
                },
                {
                  title: 'No Conflicts of Interest',
                  desc: 'Our editorial team operates independently. Product recommendations are based on merit, not advertising relationships.',
                },
              ].map((standard) => (
                <div key={standard.title} className="flex gap-4 p-4 rounded-lg bg-gray-50">
                  <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg
                      className="w-5 h-5 text-primary-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">{standard.title}</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">{standard.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-primary-600 to-primary-700 text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Have Questions? We&apos;d Love to Hear From You
            </h2>
            <p className="text-primary-100 text-lg mb-8 max-w-xl mx-auto">
              Whether you have a finance question, want to contribute content, or are interested in
              partnering with PaisaGuru, our team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3.5 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
              >
                Contact Us
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
              <Link
                href="/calculators"
                className="inline-flex items-center justify-center px-8 py-3.5 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
              >
                Explore Our Tools
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
