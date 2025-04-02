import React from "react";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#1E2A38', color: '#FFFFFF', padding: '40px 20px', fontFamily: 'Arial, sans-serif' }}>
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '20px',
          marginBottom: '30px'
        }}
      >
        <div>
          <h3 style={{ marginBottom: '15px', fontWeight: 'bold' }}>Shop</h3>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            <li><Link to="/men" style={{ color: '#FFFFFF', textDecoration: 'none', display: 'block', margin: '8px' }}>Men</Link></li>
            <li><Link to="/women" style={{ color: '#FFFFFF', textDecoration: 'none', display: 'block', margin: '8px' }}>Women</Link></li>
            <li><Link to="/kids" style={{ color: '#FFFFFF', textDecoration: 'none', display: 'block', margin: '8px' }}>Kids</Link></li>
          </ul>
        </div>

        <div>
          <h3 style={{ marginBottom: '15px', fontWeight: 'bold' }}>Customer Service</h3>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            <li><Link to="/help" style={{ color: '#FFFFFF', textDecoration: 'none', display: 'block', marginBottom: '8px' }}>Help Center</Link></li>
            <li><Link to="/returns" style={{ color: '#FFFFFF', textDecoration: 'none', display: 'block', marginBottom: '8px' }}>Returns</Link></li>
            <li><Link to="/shipping" style={{ color: '#FFFFFF', textDecoration: 'none', display: 'block', marginBottom: '8px' }}>Shipping Info</Link></li>
          </ul>
        </div>

        <div>
          <h3 style={{ marginBottom: '15px', fontWeight: 'bold' }}>Policies</h3>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            <li><Link to="/Policy" style={{ color: '#FFFFFF', textDecoration: 'none', display: 'block', marginBottom: '8px' }}>Privacy Policy</Link></li>
            <li><Link to="/terms" style={{ color: '#FFFFFF', textDecoration: 'none', display: 'block', marginBottom: '8px' }}>Terms of Service</Link></li>
            <li><Link to="/cookies" style={{ color: '#FFFFFF', textDecoration: 'none', display: 'block', marginBottom: '8px' }}>Cookie Settings</Link></li>
          </ul>
        </div>

        <div>
          <h3 style={{ marginBottom: '15px', fontWeight: 'bold' }}>Connect</h3>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            <li><Link to="/contact" style={{ color: '#FFFFFF', textDecoration: 'none', display: 'block', marginBottom: '8px' }}>Contact Us</Link></li>
            <li><Link to="/affiliate" style={{ color: '#FFFFFF', textDecoration: 'none', display: 'block', marginBottom: '8px' }}>Affiliate Program</Link></li>
            <li><Link to="/careers" style={{ color: '#FFFFFF', textDecoration: 'none', display: 'block', marginBottom: '8px' }}>Careers</Link></li>
          </ul>
        </div>

        <div>
          <h3 style={{ marginBottom: '15px', fontWeight: 'bold' }}>About Us</h3>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            <li><Link to="/About" style={{ color: '#FFFFFF', textDecoration: 'none', display: 'block', marginBottom: '8px' }}>Our Story</Link></li>
            <li><Link to="/sustainability" style={{ color: '#FFFFFF', textDecoration: 'none', display: 'block', marginBottom: '8px' }}>Sustainability</Link></li>
            <li><Link to="/press" style={{ color: '#FFFFFF', textDecoration: 'none', display: 'block', marginBottom: '8px' }}>Press</Link></li>
          </ul>
        </div>
      </div>

      <div style={{ borderTop: '1px solid #FFFFFF', paddingTop: '15px', textAlign: 'center' }}>
        <p>All rights reserved &copy; 2025 ZL Classic | Designed by Ajitkumar Singh</p>
      </div>
    </footer>

  );
};

export default Footer;
