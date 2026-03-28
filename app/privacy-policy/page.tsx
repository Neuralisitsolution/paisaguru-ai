import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy | PaisaGuru',
  description: 'PaisaGuru privacy policy. Learn how we collect, use, and protect your personal information.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="container-custom py-10">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-primary-600">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">Privacy Policy</span>
      </nav>

      <div className="max-w-3xl mx-auto">
        <h1 className="section-title">Privacy Policy</h1>
        <p className="text-sm text-gray-500 mb-8">Last updated: March 1, 2025</p>

        <div className="prose prose-gray max-w-none space-y-6">
          <section>
            <h2 className="text-xl font-heading font-bold text-gray-900 mb-3">1. Information We Collect</h2>
            <p className="text-gray-700 mb-3">We collect information you provide directly to us, including:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              <li>Name and email address when you subscribe to our newsletter</li>
              <li>Contact information when you fill out our contact form</li>
              <li>Quiz scores and preferences when you use our quiz feature</li>
              <li>Calculator inputs (processed locally, not stored on servers)</li>
            </ul>
            <p className="text-gray-700 mt-3">We automatically collect:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              <li>Log data (IP address, browser type, pages visited)</li>
              <li>Device information (device type, operating system)</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-heading font-bold text-gray-900 mb-3">2. How We Use Your Information</h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              <li>To send you our finance newsletter and guides you requested</li>
              <li>To respond to your inquiries and support requests</li>
              <li>To improve our website content and user experience</li>
              <li>To analyze website traffic and usage patterns</li>
              <li>To display relevant advertisements through Google AdSense</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-heading font-bold text-gray-900 mb-3">3. Cookies</h2>
            <p className="text-gray-700">We use cookies for analytics (Google Analytics), advertising (Google AdSense), and basic site functionality. You can control cookie preferences through your browser settings.</p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-bold text-gray-900 mb-3">4. Third-Party Services</h2>
            <p className="text-gray-700 mb-2">We use the following third-party services:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              <li><strong>Google AdSense:</strong> For displaying advertisements. Google may use cookies to serve ads based on your browsing history.</li>
              <li><strong>Google Analytics:</strong> For website traffic analysis and user behavior insights.</li>
              <li><strong>Disqus:</strong> For article comments. Disqus has its own privacy policy.</li>
              <li><strong>MongoDB Atlas:</strong> For secure data storage with encryption at rest.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-heading font-bold text-gray-900 mb-3">5. Data Security</h2>
            <p className="text-gray-700">We implement industry-standard security measures including SSL encryption, secure data storage, and access controls. However, no method of transmission over the Internet is 100% secure.</p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-bold text-gray-900 mb-3">6. Your Rights</h2>
            <p className="text-gray-700">You have the right to:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              <li>Access your personal data we hold</li>
              <li>Request correction or deletion of your data</li>
              <li>Unsubscribe from our newsletter at any time</li>
              <li>Opt out of personalized advertising</li>
              <li>Request a copy of your data in portable format</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-heading font-bold text-gray-900 mb-3">7. Children&apos;s Privacy</h2>
            <p className="text-gray-700">Our website is not intended for children under 13. We do not knowingly collect personal information from children.</p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-bold text-gray-900 mb-3">8. Changes to This Policy</h2>
            <p className="text-gray-700">We may update this privacy policy periodically. We will notify you of significant changes by posting a notice on our website.</p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-bold text-gray-900 mb-3">9. Contact Us</h2>
            <p className="text-gray-700">For privacy-related inquiries, contact us at <strong>privacy@paisaguru.com</strong> or through our <Link href="/contact" className="text-primary-600 hover:underline">contact page</Link>.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
