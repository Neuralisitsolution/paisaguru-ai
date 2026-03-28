'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: 'General', message: '' });
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
        <h1 className="section-title text-center">Contact Us</h1>
        <p className="section-subtitle text-center max-w-2xl mx-auto">
          Have a question about personal finance or our website? We&apos;d love to hear from you.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-10">
          <div className="md:col-span-2">
            {submitted ? (
              <div className="card p-8 text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="font-heading font-bold text-xl text-gray-900 mb-2">Message Sent!</h2>
                <p className="text-gray-600">Thank you for reaching out. We&apos;ll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="card p-6 space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1">Name</label>
                    <input type="text" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="input-field" placeholder="Your name" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1">Email</label>
                    <input type="email" required value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="input-field" placeholder="your@email.com" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">Subject</label>
                  <select value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} className="input-field">
                    <option>General Inquiry</option>
                    <option>Content Feedback</option>
                    <option>Advertising</option>
                    <option>Technical Issue</option>
                    <option>Partnership</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">Message</label>
                  <textarea required rows={5} value={form.message} onChange={e => setForm({...form, message: e.target.value})} className="input-field" placeholder="Your message..." />
                </div>
                <button type="submit" className="btn-primary">Send Message</button>
              </form>
            )}
          </div>

          <div className="space-y-6">
            <div className="card p-6">
              <h3 className="font-heading font-bold text-lg text-gray-900 mb-4">Get in Touch</h3>
              <div className="space-y-4 text-sm">
                <div>
                  <p className="font-medium text-gray-900">Email</p>
                  <p className="text-gray-600">contact@paisaguru.com</p>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Address</p>
                  <p className="text-gray-600">PaisaGuru Media Pvt. Ltd.<br />Lower Parel, Mumbai 400013<br />Maharashtra, India</p>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Business Hours</p>
                  <p className="text-gray-600">Mon - Fri: 9:00 AM - 6:00 PM IST</p>
                </div>
              </div>
            </div>
            <div className="card p-6 bg-primary-50">
              <h3 className="font-heading font-bold text-sm text-gray-900 mb-2">Response Time</h3>
              <p className="text-xs text-gray-600">We typically respond within 24 hours on business days.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
