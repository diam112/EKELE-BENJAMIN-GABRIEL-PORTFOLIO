import React from 'react';
import { X, Download, Mail, Phone, MapPin, ExternalLink, GraduationCap, Briefcase, Wrench, Sparkles } from 'lucide-react';

export default function ResumeModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const handlePrint = () => {
    const link = document.createElement('a');
    link.href = '/EKELE BENJAMIN GABRIEL RECENT CV.pdf';
    link.download = 'EKELE BENJAMIN GABRIEL RECENT CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 3000 }}>
      <div
        className="modal-container"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '850px', background: '#0B0D14', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)' }}
      >
        {/* Header Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px', borderBottom: '1px solid var(--border-subtle)', background: 'rgba(255,255,255,0.02)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span className="badge badge-status" style={{ fontSize: '0.75rem' }}>Official Curriculum Vitae</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button className="btn btn-primary" onClick={handlePrint} style={{ fontSize: '0.82rem', padding: '8px 16px' }}>
              <Download size={14} /> Download / Print PDF
            </button>
            <button className="modal-close-btn" onClick={onClose} style={{ position: 'static' }}>
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Printable Resume Body */}
        <div className="resume-printable-area" style={{ padding: '36px', color: 'var(--text-main)', fontSize: '0.9rem', lineHeight: '1.6' }}>
          
          {/* Header Info */}
          <div style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: '24px', marginBottom: '24px' }}>
            <h1 style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '2.2rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', marginBottom: '6px' }}>
              EKELE BENJAMIN GABRIEL
            </h1>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--accent-primary)', marginBottom: '14px' }}>
              Product Designer | UI/UX Designer | Frontend Developer
            </h3>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Phone size={14} /> +234 812 385 6017</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Mail size={14} /> superemediamond7@gmail.com</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Mail size={14} /> kdcreatives.online@gmail.com</span>
              <a href="https://github.com/diam112" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent-primary)', textDecoration: 'none' }}>
                <ExternalLink size={14} /> GitHub: diam112
              </a>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><MapPin size={14} /> Karu site, Abuja, Nigeria</span>
            </div>
          </div>

          {/* Professional Summary */}
          <div style={{ marginBottom: '28px' }}>
            <h4 style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '1.05rem', fontWeight: 700, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sparkles size={16} style={{ color: 'var(--accent-primary)' }} /> Professional Summary
            </h4>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.7' }}>
              Creative and detail-oriented Product Designer, UI/UX Designer, and Frontend Developer with experience designing and developing intuitive, user-centered digital products. Passionate about creating modern web and mobile experiences with a strong emphasis on usability, accessibility, and scalable design systems. Skilled in translating business requirements into elegant user interfaces and interactive prototypes while collaborating effectively across multidisciplinary teams.
            </p>
          </div>

          {/* Education */}
          <div style={{ marginBottom: '28px' }}>
            <h4 style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '1.05rem', fontWeight: 700, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <GraduationCap size={16} style={{ color: 'var(--accent-primary)' }} /> Education
            </h4>
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-subtle)', padding: '16px', borderRadius: 'var(--radius-md)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                <strong style={{ color: '#fff', fontSize: '0.95rem' }}>National Open University of Nigeria (NOUN)</strong>
                <span style={{ fontSize: '0.8rem', color: 'var(--accent-primary)', fontWeight: 600 }}>2024 – Present</span>
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '4px 0 10px 0' }}>
                Bachelor's Degree in Information Technology (In Progress)
              </div>
              <ul style={{ paddingLeft: '18px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                <li>Pursuing a degree in Information Technology with a focus on software development, networking, databases, and modern computing.</li>
                <li>Continuously applying academic knowledge to real-world projects in UI/UX design, frontend development, fintech, and AI.</li>
              </ul>
            </div>
          </div>

          {/* Project Experience */}
          <div style={{ marginBottom: '28px' }}>
            <h4 style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '1.05rem', fontWeight: 700, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Briefcase size={16} style={{ color: 'var(--accent-primary)' }} /> Featured Project Experience
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              
              {/* Project 1 */}
              <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-subtle)', padding: '16px', borderRadius: 'var(--radius-md)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong style={{ color: '#fff' }}>Fintech Payment Gateway Platform</strong>
                  <span style={{ fontSize: '0.75rem', color: 'var(--accent-primary)' }}>Product Designer & Frontend Developer</span>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '6px 0 10px 0' }}>
                  Designed and developed a modern payment platform supporting digital payments, merchant services, and cryptocurrency features.
                </p>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-dark)', fontFamily: 'JetBrains Mono, monospace' }}>
                  Technologies: React • Firebase • Figma • REST APIs
                </div>
              </div>

              {/* Project 2 */}
              <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-subtle)', padding: '16px', borderRadius: 'var(--radius-md)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong style={{ color: '#fff' }}>AI Chatbot Platform</strong>
                  <span style={{ fontSize: '0.75rem', color: 'var(--accent-primary)' }}>UI/UX & AI Frontend Architect</span>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '6px 0 10px 0' }}>
                  Designed and developed an intelligent AI-powered chatbot capable of assisting users across multiple subject areas.
                </p>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-dark)', fontFamily: 'JetBrains Mono, monospace' }}>
                  Technologies: React • Python • Machine Learning • Firebase
                </div>
              </div>

              {/* Project 3 */}
              <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-subtle)', padding: '16px', borderRadius: 'var(--radius-md)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong style={{ color: '#fff' }}>Solar Energy Digital Platform</strong>
                  <span style={{ fontSize: '0.75rem', color: 'var(--accent-primary)' }}>Lead Designer</span>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '6px 0 10px 0' }}>
                  Designed a modern digital experience showcasing renewable energy solutions, solar products, and clean energy services.
                </p>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-dark)', fontFamily: 'JetBrains Mono, monospace' }}>
                  Technologies: Figma • React • HTML5 • CSS3
                </div>
              </div>

            </div>
          </div>

          {/* Technical Skills & Competencies */}
          <div>
            <h4 style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '1.05rem', fontWeight: 700, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Wrench size={16} style={{ color: 'var(--accent-primary)' }} /> Skills & Tools
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-subtle)', padding: '14px', borderRadius: 'var(--radius-md)' }}>
                <strong style={{ color: '#fff', fontSize: '0.85rem', display: 'block', marginBottom: '6px' }}>Frontend & Languages</strong>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>React, React Native, JavaScript (ES6+), TypeScript, HTML5, CSS3, Tailwind CSS, REST APIs</span>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-subtle)', padding: '14px', borderRadius: 'var(--radius-md)' }}>
                <strong style={{ color: '#fff', fontSize: '0.85rem', display: 'block', marginBottom: '6px' }}>Design & Tools</strong>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>UI/UX Design, Figma, Adobe Photoshop, Adobe Illustrator, Design Systems, Wireframing, VS Code, Git/GitHub, Firebase</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
