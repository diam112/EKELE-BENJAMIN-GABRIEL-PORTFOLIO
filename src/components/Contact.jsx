import React, { useState } from 'react';
import { Mail, Copy, ExternalLink, Download, Send, Globe, Code2 } from 'lucide-react';

export default function Contact({ name, onShowToast, onOpenResume }) {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const primaryEmail = 'superemediamond7@gmail.com';
  const secondaryEmail = 'kdcreatives.online@gmail.com';
  const githubUsername = 'diam112';

  const handleCopyEmail = (email) => {
    navigator.clipboard.writeText(email).then(() => {
      onShowToast(`Copied email: ${email}`);
    }).catch(() => {
      onShowToast('Email copied to clipboard!');
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Construct mailto string to actually dispatch message to user's emails
    const subjectEncoded = encodeURIComponent(`[Portfolio Inquiry] ${formData.subject || 'New Message'}`);
    const bodyEncoded = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nSubject: ${formData.subject}\n\nMessage:\n${formData.message}`
    );

    const mailtoUrl = `mailto:${primaryEmail},${secondaryEmail}?subject=${subjectEncoded}&body=${bodyEncoded}`;
    
    // Trigger email client
    window.location.href = mailtoUrl;

    onShowToast('Opening email client to send message...');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <section className="contact-section">
      <div className="container contact-grid">
        
        {/* Contact Info */}
        <div className="contact-info-card">
          <div className="section-tag">Get In Touch</div>
          <h2 className="section-title">Let's build something extraordinary together.</h2>
          <p className="section-subtitle" style={{ marginBottom: '24px' }}>
            Available for senior product design roles, frontend consulting, design system advisory, and high-value project engagements.
          </p>

          <div className="contact-methods">
            {/* Primary Email */}
            <div className="contact-method-item" onClick={() => handleCopyEmail(primaryEmail)} title="Click to copy primary email">
              <div className="contact-method-icon"><Mail size={18} /></div>
              <div className="contact-method-text">
                <h5 style={{ fontSize: '0.78rem', color: 'var(--text-dark)' }}>Primary Email (Click to Copy)</h5>
                <p style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-main)' }}>{primaryEmail}</p>
              </div>
              <Copy size={16} style={{ marginLeft: 'auto', color: 'var(--text-muted)' }} />
            </div>

            {/* Secondary Email */}
            <div className="contact-method-item" onClick={() => handleCopyEmail(secondaryEmail)} title="Click to copy agency email">
              <div className="contact-method-icon"><Mail size={18} /></div>
              <div className="contact-method-text">
                <h5 style={{ fontSize: '0.78rem', color: 'var(--text-dark)' }}>Agency / Work Email</h5>
                <p style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-main)' }}>{secondaryEmail}</p>
              </div>
              <Copy size={16} style={{ marginLeft: 'auto', color: 'var(--text-muted)' }} />
            </div>

            {/* GitHub */}
            <a href={`https://github.com/${githubUsername}`} target="_blank" rel="noopener noreferrer" className="contact-method-item">
              <div className="contact-method-icon"><Code2 size={18} /></div>
              <div className="contact-method-text">
                <h5 style={{ fontSize: '0.78rem', color: 'var(--text-dark)' }}>GitHub Repositories</h5>
                <p style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-main)' }}>github.com/{githubUsername}</p>
              </div>
              <ExternalLink size={16} style={{ marginLeft: 'auto', color: 'var(--text-muted)' }} />
            </a>
          </div>

          <button className="btn btn-primary" onClick={onOpenResume} style={{ width: '100%' }}>
            <Download size={18} /> Download Portfolio & Resume (PDF)
          </button>
        </div>

        {/* Functional Form Card */}
        <div className="contact-form-card">
          <h3 style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '20px' }}>
            Send a Direct Message
          </h3>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="contact-name">Your Name</label>
              <input
                type="text"
                id="contact-name"
                className="form-input"
                placeholder="e.g. Sarah Connor"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="contact-email">Email Address</label>
              <input
                type="email"
                id="contact-email"
                className="form-input"
                placeholder="name@company.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="contact-subject">Project Topic / Inquiry</label>
              <input
                type="text"
                id="contact-subject"
                className="form-input"
                placeholder="e.g. Fintech Product Design or Advisory"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="contact-message">Project Details</label>
              <textarea
                id="contact-message"
                className="form-textarea"
                placeholder="Tell me about your goals, timelines, and product vision..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
              Send Message <Send size={18} />
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}
