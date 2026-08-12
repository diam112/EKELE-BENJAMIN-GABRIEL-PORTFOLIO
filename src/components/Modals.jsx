import React, { useState } from 'react';
import { X, CheckCircle2 } from 'lucide-react';

export function CaseStudyModal({ projectId, onClose }) {
  if (!projectId) return null;

  const projectDetailsMap = {
    '1': {
      title: 'Fintech Payment Gateway Platform',
      subtitle: 'A high-throughput multi-currency payment ecosystem with developer API portal and real-time transaction telemetry.',
      img: '/assets/images/fintech_dashboard.png',
      stats: [
        { val: '+142%', lbl: 'Checkout Conv' },
        { val: '<45ms', lbl: 'API Latency' },
        { val: '$180M+', lbl: 'Monthly Vol' },
        { val: '4.9/5', lbl: 'NPS Score' }
      ]
    },
    '2': {
      title: 'Solar Energy Infrastructure Platform',
      subtitle: 'Real-time solar smart grid monitoring dashboard built for industrial battery telemetry and carbon offset reporting.',
      img: '/assets/images/solar_energy_platform.png',
      stats: [
        { val: '50k+', lbl: 'Grid Nodes' },
        { val: '99.99%', lbl: 'Telemetry Uptime' },
        { val: '-38%', lbl: 'Carbon Footprint' },
        { val: '<50ms', lbl: 'Load Speed' }
      ]
    },
    '3': {
      title: 'AI Chatbot & Prompt Studio',
      subtitle: 'Multi-model generative AI workspace with real-time SSE streaming, prompt node graphs, and context visualization.',
      img: '/assets/images/ai_chatbot_platform.png',
      stats: [
        { val: '12', lbl: 'LLM Engines' },
        { val: '2.4M', lbl: 'Prompts/Day' },
        { val: '94%', lbl: 'Accuracy' },
        { val: '3x', lbl: 'Dev Speed' }
      ]
    }
  };

  const data = projectDetailsMap[projectId] || projectDetailsMap['1'];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>
        <img src={data.img} alt={data.title} style={{ width: '100%', height: '320px', objectFit: 'cover' }} />
        <div style={{ padding: '32px' }}>
          <h2 style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '2rem', fontWeight: 800, color: '#fff', marginBottom: '12px' }}>
            {data.title}
          </h2>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', marginBottom: '24px', lineHeight: 1.6 }}>
            {data.subtitle}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '30px', background: 'rgba(255, 255, 255, 0.02)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            {data.stats.map((s, idx) => (
              <div key={idx} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent-primary)' }}>{s.val}</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-dark)', textTransform: 'uppercase' }}>{s.lbl}</div>
              </div>
            ))}
          </div>

          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '10px' }}>The Challenge</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '20px' }}>
            Legacy interfaces suffer from overwhelming density, cryptic error states, and high drop-off during onboarding. The goal was to build a clean, dark-mode focused console that makes complex multi-currency workflows simple and transparent.
          </p>

          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '10px' }}>Architectural Solution</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
            Created a tokenized design system in Figma and implemented it in React/TypeScript with modular micro-frontends. Implemented optimistic UI updates, WebSocket real-time telemetry, and resilient fallback states.
          </p>
        </div>
      </div>
    </div>
  );
}

export function EditNameModal({ isOpen, currentName, onSave, onClose }) {
  const [inputName, setInputName] = useState(currentName);
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" style={{ maxWidth: '480px' }} onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>
        <div style={{ padding: '32px' }}>
          <h3 style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '1.4rem', fontWeight: 700, color: '#fff', marginBottom: '12px' }}>
            Customize Portfolio Name
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
            Enter your name below to personalize this portfolio website instantly across all headers, titles, bio sections, and branding.
          </p>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-input"
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
              placeholder="e.g. Elena Vance"
            />
          </div>
          <button className="btn btn-primary" onClick={() => onSave(inputName)} style={{ width: '100%', marginTop: '10px' }}>
            Save & Update Portfolio
          </button>
        </div>
      </div>
    </div>
  );
}

export function Toast({ message }) {
  if (!message) return null;

  return (
    <div className="toast-notification">
      <CheckCircle2 size={18} />
      <span>{message}</span>
    </div>
  );
}
