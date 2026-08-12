import React from 'react';
import { Layout, Code2, Database, Bot } from 'lucide-react';

export default function Skills() {
  const skillCategories = [
    {
      title: 'Design',
      icon: <Layout size={20} />,
      items: [
        { name: 'UI Design', level: '98%' },
        { name: 'UX Research', level: '90%' },
        { name: 'Wireframing', level: '95%' },
        { name: 'Design Systems', level: '98%' },
        { name: 'Prototyping', level: '94%' },
        { name: 'User Testing', level: '88%' }
      ]
    },
    {
      title: 'Frontend',
      icon: <Code2 size={20} />,
      items: [
        { name: 'React', level: '98%' },
        { name: 'Next.js', level: '95%' },
        { name: 'React Native', level: '86%' },
        { name: 'JavaScript / TypeScript', level: '94%' },
        { name: 'Tailwind CSS', level: '98%' }
      ]
    },
    {
      title: 'Backend',
      icon: <Database size={20} />,
      items: [
        { name: 'Firebase', level: '90%' },
        { name: 'APIs (REST / GraphQL)', level: '92%' },
        { name: 'Database Integration', level: '85%' }
      ]
    },
    {
      title: 'AI & Innovation',
      icon: <Bot size={20} />,
      items: [
        { name: 'Machine Learning Basics', level: '82%' },
        { name: 'AI Integration (OpenAI API)', level: '94%' },
        { name: 'Prompt Engineering', level: '92%' }
      ]
    }
  ];

  return (
    <section className="skills-section" id="skills">
      <div className="container">
        <div style={{ marginBottom: '50px' }}>
          <div className="section-tag">Capabilities</div>
          <h2 className="section-title">Technical & Design Mastery</h2>
        </div>

        <div className="skills-matrix-grid">
          {skillCategories.map((cat, idx) => (
            <div key={idx} className="skill-category-card">
              <div className="skill-cat-header">
                <div className="skill-cat-icon">{cat.icon}</div>
                <div className="skill-cat-title">{cat.title}</div>
              </div>
              <div className="skill-items-list">
                {cat.items.map((item, iIdx) => (
                  <div key={iIdx} className="skill-item">
                    <div className="skill-item-header">
                      <span className="skill-item-name">{item.name}</span>
                      <span className="skill-item-level" style={{ color: 'var(--accent-primary)' }}>{item.level}</span>
                    </div>
                    <div className="skill-bar-bg">
                      <div className="skill-bar-fill" style={{ width: item.level }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
