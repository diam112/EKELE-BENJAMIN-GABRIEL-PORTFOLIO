import React from 'react';

export default function Experience() {
  const experiences = [
    {
      role: 'Lead Product Designer & Frontend Architect',
      period: '2026 — Present',
      company: 'MRPAYPA (Fintech & AI)',
      bullets: [
        'Spearheaded redesign of core merchant payment flow, increasing checkout conversion rate by +34%.',
        'Architected multi-brand design system in React/Tailwind used across 14 product modules.',
        'Mentored team of 6 designers and developers across UI design and frontend code architecture.'
      ]
    },
    {
      role: 'Senior UI/UX & React Developer',
      period: '2024 — Present',
      company: 'Orange Business Solutions and Services Ltd',
      bullets: [
        'Designed and built IoT solar telemetry platform handling 50,000+ connected smart battery nodes.',
        'Reduced dashboard bundle size by 45% and improved page load performance to sub-50ms.',
        'Conducted user research with commercial grid operators to streamline alarm dispatch workflows.'
      ]
    },
    {
      role: 'Product Designer & Developer Consultant',
      period: '2019 — 2021',
      company: 'Freelance / High-Growth Startups',
      bullets: [
        'Delivered custom web applications, mobile app prototypes, and brand identity systems for 20+ clients.',
        'Integrated Firebase, Supabase, and GraphQL APIs into responsive React web apps.'
      ]
    }
  ];

  return (
    <section className="experience-section" id="experience">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <div className="section-tag" style={{ justifyContent: 'center' }}>Career Timeline</div>
          <h2 className="section-title">Experience & Technical Achievements</h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            A history of leading product design, scaling frontend systems, and collaborating with fast-growing technology companies.
          </p>
        </div>

        <div className="timeline">
          {experiences.map((exp, idx) => (
            <div key={idx} className="timeline-item">
              <div className="timeline-node"></div>
              <div className="timeline-card">
                <div className="timeline-header">
                  <h3 className="timeline-role">{exp.role}</h3>
                  <span className="timeline-period">{exp.period}</span>
                </div>
                <div className="timeline-company">{exp.company}</div>
                <ul className="timeline-bullets">
                  {exp.bullets.map((b, bIdx) => (
                    <li key={bIdx}>{b}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
