// src/pages/About.js
import React from 'react';
import '../css/About.css'; // We will create this CSS file next

const About = () => {
  return (
    <div className="about-page-container">
      {/* The main title of the page itself, not the site header */}
      <h1 className="about-main-heading">About Us</h1>
      
      <main className="about-content">
        <section className="about-section">
          <h3 className="section-heading">Our Project</h3>
          <p>Symptom Companion is a mini project developed by students from Vignan's Institute of Information Technology. We've created this application specifically for patients seeking guidance on medications, diet recommendations, and educational resources for common symptoms.</p>
        </section>
        
        <section className="about-section">
          <h3 className="section-heading">Our Purpose</h3>
          <p>Symptom Companion aims to provide a comprehensive approach to symptom management by offering medication guidance, symptom-specific dietary recommendations, and educational webinars - all in one platform. Our patient-centered solution goes beyond simple medication advice to address overall wellness and health education.</p>
        </section>
        
        <section className="about-section">
          <h3 className="section-heading">Who We Are</h3>
          <p>We are a team of students from Vignan Institute of Information Technology working on this mini project. Recognizing the need for a more holistic approach to symptom management, we've developed this application to support patients with both immediate treatment options and longer-term health strategies.</p>
        </section>
        
        <section className="about-section">
          <h3 className="section-heading">What Sets Us Apart</h3>
          
          <div className="feature-cards-container">
            <div className="feature-card">
              <h4>Symptom-Specific Diet Recommendations</h4>
              <p>Unlike standard medication guides, Symptom Companion provides customized dietary advice specifically tailored to each symptom. Our recommendations help patients understand which foods may help alleviate their symptoms and which might make them worse.</p>
            </div>
            
            <div className="feature-card">
              <h4>Educational Webinars</h4>
              <p>We offer regular webinars focused on health awareness and consultation, giving patients access to:</p>
              <ul>
                <li>Expert discussions on common health concerns</li>
                <li>Live Q&A sessions for personalized guidance</li>
                <li>Community support from others experiencing similar symptoms</li>
                <li>Preventative health education to reduce future occurrences</li>
              </ul>
            </div>
          </div> {/* End feature-cards-container */}
        </section>
        
        <section className="about-section">
          <h3 className="section-heading">Core Features</h3>
          <ul className="core-features-list">
            <li><strong>Medication Guidance:</strong> Clear recommendations for over-the-counter medications based on symptoms</li>
            <li><strong>Age-Appropriate Dosages:</strong> Customized medication dosage information for different age groups</li>
            <li><strong>Symptom-Specific Diet Plans:</strong> Nutritional recommendations tailored to specific health concerns</li>
            <li><strong>Interactive Webinars:</strong> Regular online sessions for education and consultation</li>
            <li><strong>Patient-Friendly Interface:</strong> An intuitive design that makes finding information simple</li>
          </ul>
        </section>
        
        <section className="about-section important-note">
          <h3 className="section-heading">Important Note</h3>
          <p>This application is designed as a student project to provide information to patients for normal, non-serious symptoms. While we strive for accuracy in our recommendations, please consult healthcare providers for persistent, severe, or concerning symptoms.</p>
        </section>
        
        <section className="about-section">
          <h3 className="section-heading">Project Goals</h3>
          <p>Through Symptom Companion, we aim to:</p>
          <ul className="project-goals-list">
            <li>Revolutionize symptom management by addressing both medication and nutrition</li>
            <li>Build a community of informed patients through our webinar series</li>
            <li>Provide a more comprehensive approach to everyday health concerns</li>
            <li>Demonstrate how technology can support holistic healthcare solutions</li>
          </ul>
        </section>
        
        <div className="project-signature">
          <p><em>A student project from Vignan Institute of Information Technology, bringing together medication guidance, dietary advice, and health education</em></p>
        </div>
      </main>
    </div>
  );
};

export default About;
