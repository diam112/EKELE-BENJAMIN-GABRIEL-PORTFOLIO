import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

export default function Projects({ onOpenCaseStudy }) {
  const [filter, setFilter] = useState('all');

  const projectsData = [
    {
      id: '1',
      title: 'Fintech Payment Gateway Platform',
      category: 'fintech',
      categoryLabel: 'Fintech Platform',
      desc: 'A modern payment ecosystem designed for online payments, crypto transactions, merchant financial management, and developer API tools.',
      img: '/assets/images/fintech_dashboard.png',
      tags: ['React', 'TypeScript', 'Design Systems', 'Stripe API'],
      role: 'Role: Lead UI/UX & Frontend'
    },
    {
      id: '2',
      title: 'Solar Energy Platform',
      category: 'solar',
      categoryLabel: 'Sustainability / SaaS',
      desc: 'A digital platform showcasing renewable energy solutions, smart grid metrics, and solar infrastructure telemetry.',
      img: '/assets/images/solar_energy_platform.png',
      tags: ['Next.js', 'Tailwind CSS', 'IoT Telemetry', 'Recharts'],
      role: 'Role: Product Designer'
    },
    {
      id: '3',
      title: 'AI Chatbot Platform',
      category: 'ai',
      categoryLabel: 'AI & Machine Learning',
      desc: 'An intelligent multi-domain AI assistant built with machine learning technologies, prompt engineering studio, and streaming UI.',
      img: '/assets/images/ai_chatbot_platform.png',
      tags: ['React', 'OpenAI API', 'Framer Motion', 'Firebase'],
      role: 'Role: Full-Stack Product Architect'
    }
  ];

  const filteredProjects = filter === 'all'
    ? projectsData
    : projectsData.filter(p => p.category === filter);

  return (
    <section className="projects-section" id="projects">
      <div className="container">
        
        <div className="projects-header">
          <div>
            <div className="section-tag">Featured Work</div>
            <h2 className="section-title">Selected Case Studies</h2>
          </div>

          <div className="filter-tabs">
            <button className={`filter-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>All Projects</button>
            <button className={`filter-btn ${filter === 'fintech' ? 'active' : ''}`} onClick={() => setFilter('fintech')}>Fintech</button>
            <button className={`filter-btn ${filter === 'solar' ? 'active' : ''}`} onClick={() => setFilter('solar')}>Renewable Energy</button>
            <button className={`filter-btn ${filter === 'ai' ? 'active' : ''}`} onClick={() => setFilter('ai')}>AI Platforms</button>
          </div>
        </div>

        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <div key={project.id} className="project-card" onClick={() => onOpenCaseStudy(project.id)}>
              <div className="project-img-wrapper">
                <span className="project-category-tag">{project.categoryLabel}</span>
                <img src={project.img} alt={project.title} />
              </div>
              <div className="project-body">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-desc">{project.desc}</p>
                <div className="project-tags">
                  {project.tags.map((tag, idx) => (
                    <span key={idx} className="tech-tag">{tag}</span>
                  ))}
                </div>
                <div className="project-footer">
                  <span className="project-role">{project.role}</span>
                  <span className="view-case-btn">
                    View Case Study <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
