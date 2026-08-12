import React, { useState } from 'react';
import { ArrowDownRight, Mail, FileText, ArrowUpRight, Repeat, Wifi, Send, Layers, Layout, Code } from 'lucide-react';
import profileImg from '../assets/profile.jpeg';

export default function Hero({ name, onNavigate, onDownloadResume }) {
  const [activeTab, setActiveTab] = useState('payment');

  return (
    <section className="hero-section">
      <div className="container hero-grid">
        
        {/* Hero Left Content */}
        <div className="hero-content">
          <div className="badge badge-status">
            <span className="pulse-dot"></span>
            Available for Q3/Q4 Projects & Advisory
          </div>

          <div className="hero-name-badge">
            <img src={profileImg} alt={name} className="hero-avatar-mini" />
            <span className="hero-name-text">Hello, I'm <strong>{name}</strong></span>
          </div>

          <h1 className="hero-headline">
            Designing digital experiences that connect <span className="gradient-text">technology and people.</span>
          </h1>

          <p className="hero-subtext">
            I create intuitive user experiences and scalable frontend solutions for fintech, SaaS, and emerging technologies.
          </p>

          <div className="hero-ctas">
            <button className="btn btn-primary" onClick={() => onNavigate('projects')}>
              View Projects <ArrowDownRight size={18} />
            </button>
            <button className="btn btn-secondary" onClick={() => onNavigate('contact')}>
              Contact Me <Mail size={18} />
            </button>
            <button className="btn btn-secondary" onClick={onDownloadResume}>
              <FileText size={18} /> Download CV (PDF)
            </button>
          </div>

          <div style={{ display: 'flex', gap: '18px', color: 'var(--text-dark)', fontSize: '0.82rem' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Layers size={14} /> Product Strategy</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Layout size={14} /> UI/UX Design</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Code size={14} /> React / TypeScript</span>
          </div>
        </div>

        {/* Hero Right Floating UI Showcase */}
        <div className="ui-showcase-wrapper">
          <div className="ui-deck-container">
            
            <div className="ui-deck-header">
              <div className="ui-deck-dots">
                <span className="dot dot-red"></span>
                <span className="dot dot-yellow"></span>
                <span className="dot dot-green"></span>
              </div>

              <div className="ui-deck-tabs">
                <button className={`ui-deck-tab ${activeTab === 'payment' ? 'active' : ''}`} onClick={() => setActiveTab('payment')}>Payment</button>
                <button className={`ui-deck-tab ${activeTab === 'mobile' ? 'active' : ''}`} onClick={() => setActiveTab('mobile')}>Mobile App</button>
                <button className={`ui-deck-tab ${activeTab === 'ai' ? 'active' : ''}`} onClick={() => setActiveTab('ai')}>AI Chat</button>
                <button className={`ui-deck-tab ${activeTab === 'analytics' ? 'active' : ''}`} onClick={() => setActiveTab('analytics')}>Analytics</button>
              </div>
            </div>

            {/* 1. Payment Dashboard Panel */}
            {activeTab === 'payment' && (
              <div className="showcase-panel active">
                <div className="widget-payment-card">
                  <div className="payment-balance-row">
                    <div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>TOTAL REVENUE (USD)</span>
                      <div className="balance-val">$284,950.40</div>
                    </div>
                    <span className="balance-growth">+24.8% ↑</span>
                  </div>

                  <svg className="payment-chart-svg" viewBox="0 0 300 80">
                    <defs>
                      <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--accent-primary)" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="var(--accent-primary)" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path d="M0,60 Q40,20 80,45 T160,25 T240,40 T300,10" fill="none" stroke="var(--accent-primary)" strokeWidth="3" />
                    <path d="M0,60 Q40,20 80,45 T160,25 T240,40 T300,10 L300,80 L0,80 Z" fill="url(#chartGrad)" />
                  </svg>

                  <div className="payment-history-list">
                    <div className="payment-item">
                      <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <ArrowUpRight size={14} style={{ color: '#34D399' }} /> Stripe Payout #9481
                      </span>
                      <strong style={{ color: 'var(--text-main)' }}>+$12,450.00</strong>
                    </div>
                    <div className="payment-item">
                      <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Repeat size={14} style={{ color: 'var(--accent-cyan)' }} /> Crypto Settlement (USDC)
                      </span>
                      <strong style={{ color: 'var(--text-main)' }}>+$48,200.00</strong>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 2. Mobile App Panel */}
            {activeTab === 'mobile' && (
              <div className="showcase-panel active">
                <div className="widget-mobile-frame">
                  <div className="mobile-app-header">
                    <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#fff' }}>VaultPay Mobile</span>
                    <Wifi size={14} style={{ color: 'var(--text-muted)' }} />
                  </div>
                  <div className="mobile-app-card">
                    <div style={{ fontSize: '0.72rem', opacity: 0.8 }}>Primary Card</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: '700', margin: '6px 0' }}>$42,890.15</div>
                    <div style={{ fontSize: '0.68rem', opacity: 0.9 }}>•••• •••• •••• 9012</div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    <button className="btn btn-secondary" style={{ fontSize: '0.7rem', padding: '6px 8px' }}>Transfer</button>
                    <button className="btn btn-primary" style={{ fontSize: '0.7rem', padding: '6px 8px' }}>Invest</button>
                  </div>
                </div>
              </div>
            )}

            {/* 3. AI Chat Panel */}
            {activeTab === 'ai' && (
              <div className="showcase-panel active">
                <div className="widget-ai-chat">
                  <div className="ai-msg">
                    <div className="ai-avatar">AI</div>
                    <div className="ai-bubble">How can I help optimize your React design system today?</div>
                  </div>
                  <div className="ai-msg">
                    <div className="ai-avatar" style={{ background: '#3B82F6' }}>YOU</div>
                    <div className="ai-bubble" style={{ background: 'var(--accent-glow-subtle)', borderColor: 'var(--border-accent)' }}>
                      Generate tokenized glassmorphism components.
                    </div>
                  </div>
                  <div className="ai-input-box">
                    <input type="text" className="ai-input-field" value="Optimizing layout latency..." readOnly />
                    <button className="ai-send-btn"><Send size={14} /></button>
                  </div>
                </div>
              </div>
            )}

            {/* 4. Analytics Panel */}
            {activeTab === 'analytics' && (
              <div className="showcase-panel active">
                <div className="widget-analytics-grid">
                  <div className="stat-box">
                    <div className="stat-title">Active Users</div>
                    <div className="stat-number">142,890</div>
                    <span style={{ fontSize: '0.7rem', color: '#34D399' }}>+18.4% this week</span>
                  </div>
                  <div className="stat-box">
                    <div className="stat-title">Avg Latency</div>
                    <div className="stat-number">28ms</div>
                    <span style={{ fontSize: '0.7rem', color: 'var(--accent-primary)' }}>⚡ Ultra fast</span>
                  </div>
                  <div className="stat-box">
                    <div className="stat-title">Conversion Rate</div>
                    <div className="stat-number">4.85%</div>
                    <span style={{ fontSize: '0.7rem', color: '#34D399' }}>+2.1% top tier</span>
                  </div>
                  <div className="stat-box">
                    <div className="stat-title">Uptime</div>
                    <div className="stat-number">99.99%</div>
                    <span style={{ fontSize: '0.7rem', color: '#34D399' }}>SLA Maintained</span>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>

      </div>
    </section>
  );
}
