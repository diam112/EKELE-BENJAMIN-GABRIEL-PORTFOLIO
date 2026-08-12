import React from 'react';
import { Eye, Cpu, Sparkles, Palette, Code2 } from 'lucide-react';
import profileImg from '../assets/profile.jpeg';

export default function About() {
  return (
    <section className="about-section" id="about">
      <div className="container about-grid">
        
        {/* Profile Card */}
        <div className="about-profile-card">
          <div className="about-img-container">
            <img src={profileImg} alt="Ekele Benjamin Gabriel" />
          </div>
          <div className="about-metrics-bar">
            <div className="metric-item">
              <div className="metric-value">7+</div>
              <div className="metric-label">Years Exp</div>
            </div>
            <div className="metric-item">
              <div className="metric-value">40+</div>
              <div className="metric-label">Products</div>
            </div>
            <div className="metric-item">
              <div className="metric-value">$50M+</div>
              <div className="metric-label">Client Value</div>
            </div>
          </div>
        </div>

        {/* Bio Content */}
        <div>
          <div className="section-tag">About Me</div>
          <h2 className="section-title">Bridging high-craft design and engineering excellence.</h2>
          <p className="about-bio">
            I am a Senior Product Designer and Frontend Architect with experience crafting digital products for high-growth fintechs, SaaS unicorns, and tech pioneers. I combine human-centered UI/UX design with clean, modular TypeScript & React engineering to turn complex technical challenges into frictionless user experiences.
          </p>

          <div className="philosophy-grid">
            <div className="philosophy-card">
              <div className="philosophy-icon"><Eye size={22} /></div>
              <h3 className="philosophy-title">Clarity First</h3>
              <p className="philosophy-desc">Eliminating cognitive clutter to make high-stake workflows feel effortless and intuitive.</p>
            </div>
            <div className="philosophy-card">
              <div className="philosophy-icon"><Cpu size={22} /></div>
              <h3 className="philosophy-title">Systemic Logic</h3>
              <p className="philosophy-desc">Designing robust design tokens & scalable component architectures that scale effortlessly.</p>
            </div>
            <div className="philosophy-card">
              <div className="philosophy-icon"><Sparkles size={22} /></div>
              <h3 className="philosophy-title">Micro-Delight</h3>
              <p className="philosophy-desc">Polishing dynamic micro-interactions, haptics, and smooth animations that wow users.</p>
            </div>
          </div>

          <div className="skills-dual-column">
            <div>
              <div className="skill-box-title"><Palette size={16} /> Design Stack</div>
              <div className="skill-pills">
                <span className="skill-pill">UI Design</span>
                <span className="skill-pill">UX Research</span>
                <span className="skill-pill">Wireframing</span>
                <span className="skill-pill">Design Systems</span>
                <span className="skill-pill">Prototyping</span>
                <span className="skill-pill">User Testing</span>
              </div>
            </div>
            <div>
              <div className="skill-box-title"><Code2 size={16} /> Development Stack</div>
              <div className="skill-pills">
                <span className="skill-pill">React</span>
                <span className="skill-pill">Next.js</span>
                <span className="skill-pill">React Native</span>
                <span className="skill-pill">JavaScript</span>
                <span className="skill-pill">TypeScript</span>
                <span className="skill-pill">Firebase</span>
                <span className="skill-pill">APIs</span>
                <span className="skill-pill">Frontend Architecture</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
