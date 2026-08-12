import React, { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X } from 'lucide-react';
import logoImg from '../assets/logo.jpeg';

export default function Navbar({
  name = 'Ekele Benjamin Gabriel',
  accent,
  setAccent,
  themeMode,
  toggleThemeMode,
  activePage,
  onNavigate
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'skills', label: 'Skills' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'flex', label: 'Flex' },
    { id: 'contact', label: 'Contact' }
  ];

  const accentColors = ['blue', 'violet', 'cyan', 'emerald'];

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        {/* Logo / Brand */}
        <a
          href="#hero"
          className="logo-brand"
          onClick={(e) => {
            e.preventDefault();
            if (onNavigate) onNavigate('hero');
            setMobileOpen(false);
          }}
        >
          <img src={logoImg} alt={name} className="logo-mark-img" />
          <span>{name ? name.split(' ')[0] : 'Ekele'}</span>
        </a>

        {/* Navigation Menu Links */}
        <ul className={`nav-menu ${mobileOpen ? 'mobile-open' : ''}`}>
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                className={`nav-link ${activePage === item.id ? 'active' : ''}`}
                onClick={() => {
                  if (onNavigate) onNavigate(item.id);
                  setMobileOpen(false);
                }}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Header Actions */}
        <div className="header-actions">
          {/* Accent Theme Switcher */}
          <div className="accent-picker">
            {accentColors.map((color) => (
              <button
                key={color}
                type="button"
                className={`accent-dot ${accent === color ? 'active' : ''}`}
                data-color={color}
                onClick={() => setAccent && setAccent(color)}
                title={`${color} accent`}
                aria-label={`Set ${color} accent`}
              />
            ))}
          </div>

          {/* Theme Toggle Button */}
          <button
            type="button"
            className="theme-toggle-btn"
            onClick={toggleThemeMode}
            title={`Switch to ${themeMode === 'dark' ? 'light' : 'dark'} mode`}
            aria-label="Toggle theme"
          >
            {themeMode === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Mobile Navigation Toggle */}
          <button
            type="button"
            className="mobile-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
}