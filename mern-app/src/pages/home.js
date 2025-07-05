import React, { useEffect, useState } from 'react';
import './home.css'; // Make sure this CSS file exists in the same folder
import Header from '../layout/header';

export default function SymptomCompanionLanding() {
  const [showFeatures, setShowFeatures] = useState(false);

  useEffect(() => {
    const cards = document.querySelectorAll('.feature-card');

    const initCards = () => {
      cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      });
    };

    const isInViewport = el => {
      const r = el.getBoundingClientRect();
      return r.top < window.innerHeight && r.bottom >= 0;
    };

    const handleScroll = () => {
      cards.forEach((card, idx) => {
        if (isInViewport(card)) {
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, idx * 200);
        }
      });
    };

    initCards();
    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleGetStarted = () => {
    setShowFeatures(prev => !prev);
  };

  return (
    <>
  
      <Header/>

      <section className="hero">
        <div className="floating-element" />
        <div className="floating-element" />
        <div className="floating-element" />
        <div className="floating-element" />

        <div className="hero-content">
          <h1 className="hero-title">Welcome to Your Symptom Companion</h1>
          <p className="hero-subtitle">
            Your personal health assistant that helps you track, understand, and manage your symptoms effectively.
          </p>
          <button className="btn-get-started" onClick={handleGetStarted}>
            {showFeatures ? 'Hide Features' : 'Get Started'}
          </button>
        </div>

        <div className="wave" />
        <div className="wave" />
        <div className="wave" />
      </section>

      {/* ================= FEATURES ================= */}
     
    </>
  );
}