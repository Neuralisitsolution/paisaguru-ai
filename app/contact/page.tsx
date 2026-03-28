'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: 'General Inquiry', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="container-custom py-10">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-primary-600">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">Contact Us</span>
      </nav>

      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-3">Contact PaisaGuru</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Have a question about personal finance, found an error in one of our articles, or want to work with us? We read every message and typically respond within 24 hours on business days.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            {submitted ? (
              <div className="card p-8 text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="font-heading font-bold text-xl text-gray-900 mb-2">Message Sent Successfully!</h2>
                <p className="text-gray-600 mb-4">Thank you for reaching out, {form.name || 'friend'}. Our team will get back to you within 24 hours on business days.</p>
                <button onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: 'General Inquiry', message: '' }); }} className="text-primary-600 font-medium text-sm hover:underline">
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="card p-6 space-y-5">
                <h2 className="font-heading font-bold text-lg text-gray-900">Send Us a Message</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1">Full Name <span className="text-red-500">*</span></label>
                    <input type="text" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="input-field" placeholder="Rahul Sharma" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1">Email Address <span className="text-red-500">*</span></label>
                    <input type="email" required value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="input-field" placeholder="rahul@example.com" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">What is this about?</label>
                  <select value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} className="input-field">
                    <option>General Inquiry</option>
                    <option>Content Feedback or Correction</option>
                    <option>Calculator Bug Report</option>
                    <option>Advertising and Sponsorship</option>
                    <option>Content Collaboration</option>
                    <option>Technical Issue</option>
                    <option>Privacy and Data Request</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">Your Message <span className="text-red-500">*</span></label>
                  <textarea required rows={6} value={form.message} onChange={e => setForm({...form, message: e.target.value})} className="input-field" placeholder="Please describe your question or feedback in detail..." />
                </div>
                <button type="submit" className="btn-primary w-full sm:w-auto">Send Message</button>
                <p className="text-xs text-gray-400">By submitting this form, you agree to our <Link href="/privacy-policy" className="text-primary-600 hover:underline">Privacy Policy</Link>.</p>
              </form>
            )}
          </div>

          <div className="space-y-6">
            <div className="card p-6">
              <h3 className="font-heading font-bold text-lg text-gray-900 mb-4">Contact Information</h3>
              <div className="space-y-5 text-sm">
                <div>
                  <p className="font-semibold text-gray-900 mb-1">Email</p>
                  <p className="text-gray-600">General: <strong>contact@paisaguru.com</strong></p>
                  <p className="text-gray-600">Privacy: <strong>privacy@paisaguru.com</strong></p>
                  <p className="text-gray-600">Advertising: <strong>ads@paisaguru.com</strong></p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-1">Operated By</p>
                  <p className="text-gray-600">Neuralis IT Solutions<br />India</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-1">Business Hours</p>
                  <p className="text-gray-600">Monday to Friday<br />9:00 AM - 6:00 PM IST</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-1">Social Media</p>
                  <div className="flex gap-3 mt-2">
                    <span className="text-gray-400 text-xs">Twitter/X</span>
                    <span className="text-gray-400 text-xs">LinkedIn</span>
                    <span className="text-gray-400 text-xs">YouTube</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="card p-6 bg-primary-50 border-primary-100">
              <h3 className="font-heading font-bold text-sm text-gray-900 mb-2">Response Time</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                We typically respond within <strong>24 hours</strong> on business days. For urgent matters, please mention &quot;URGENT&quot; in your subject line. Privacy and data deletion requests are processed within 30 days as per our policy.
              </p>
            </div>

            <div className="card p-6 bg-yellow-50 border-yellow-100">
              <h3 className="font-heading font-bold text-sm text-gray-900 mb-2">Financial Questions?</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                For quick finance questions, try our <Link href="/" className="text-primary-600 hover:underline font-medium">PaisaGuru AI Chatbot</Link> on the homepage. It can help with tax queries, investment basics, insurance guidance, and more — instantly!
              </p>
            </div>

            <div className="card p-6">
              <h3 className="font-heading font-bold text-sm text-gray-900 mb-2">Write for PaisaGuru</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Are you a CA, CFP, or finance professional who wants to contribute articles? We welcome expert guest contributors. Select &quot;Content Collaboration&quot; in the form and share your credentials.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section for SEO */}
        <section className="mt-16 max-w-3xl mx-auto">
          <h2 className="font-heading font-bold text-2xl text-gray-900 mb-6 text-center">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {[
              { q: 'Is PaisaGuru free to use?', a: 'Yes, PaisaGuru is completely free. All our calculators, articles, quizzes, and AI chatbot are available at no cost. We sustain our operations through advertising revenue.' },
              { q: 'Can I trust the financial information on PaisaGuru?', a: 'Our content is written and reviewed by certified professionals (CA, CFP, MBA Finance). However, PaisaGuru provides educational content only — not personalized financial advice. Always consult a SEBI-registered advisor for investment decisions.' },
              { q: 'How do I report an error in an article or calculator?', a: 'Use the contact form above and select "Content Feedback or Correction." Please include the article URL and describe the error. We take accuracy very seriously and will investigate within 24 hours.' },
              { q: 'Can I republish PaisaGuru articles on my website?', a: 'Short quotes (up to 200 words) with a link back to the original article are allowed. Full republication requires written permission. Contact us with "Content Collaboration" for details.' },
              { q: 'How can I advertise on PaisaGuru?', a: 'For advertising inquiries, select "Advertising and Sponsorship" in the contact form or email ads@paisaguru.com. We offer display ads, sponsored content, and calculator sponsorships.' },
            ].map((faq, i) => (
              <details key={i} className="bg-gray-50 border border-gray-200 rounded-lg">
                <summary className="px-5 py-4 cursor-pointer font-medium text-gray-900 hover:text-primary-600">{faq.q}</summary>
                <p className="px-5 pb-4 text-sm text-gray-600">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
