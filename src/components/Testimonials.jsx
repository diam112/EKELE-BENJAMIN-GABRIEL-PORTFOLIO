import React from 'react';

export default function Testimonials() {
  const testimonials = [
    {
      quote: 'Benjamin is a rare hybrid talent who can design world-class fintech interfaces in Figma and then ship high-performance React code independently. He elevated our entire platform experience.',
      author: 'Elena Rostova',
      role: 'VP of Product, NexusPay',
      avatar: 'ER'
    },
    {
      quote: 'The design system and frontend architecture built for our solar telemetry platform allowed us to launch 3 months ahead of schedule with zero UI debt.',
      author: 'David Koster',
      role: 'CTO, Orange Business Solutions',
      avatar: 'DK'
    },
    {
      quote: 'Extremely detail-oriented, obsessed with micro-interactions, and a clear communicator. Benjamin turned complex AI workspace concepts into an extraordinarily sleek product.',
      author: 'Sarah Jenkins',
      role: 'Founder, Aether AI Studio',
      avatar: 'SJ'
    }
  ];

  return (
    <section className="testimonials-section" id="testimonials">
      <div className="container">
        <div style={{ marginBottom: '50px' }}>
          <div className="section-tag">Client Recommendations</div>
          <h2 className="section-title">What Tech Leaders Say</h2>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((t, idx) => (
            <div key={idx} className="testimonial-card">
              <p className="testimonial-quote">{t.quote}</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">{t.avatar}</div>
                <div className="testimonial-info">
                  <h4>{t.author}</h4>
                  <p>{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
