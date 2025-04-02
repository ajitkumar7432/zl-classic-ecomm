import React, { useState } from "react";
import Layout from "./../components/Layout/Layout";

const Policy = () => {
  const [activeIndex, setActiveIndex] = useState(-1);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? -1 : index);
  };

  const policyPoints = [
    { question: "Why do we collect your data?", answer: "We collect your data to enhance our services and provide a personalized experience." },
    { question: "How do we secure your transactions?", answer: "Your payment and transaction information are secured with encryption." },
    { question: "Do we share your data?", answer: "Your data is not shared with third parties without consent, except trusted partners." },
    { question: "What about cookies?", answer: "Cookies help us analyze preferences and optimize website performance." },
    { question: "How do we protect your data?", answer: "We implement advanced security measures to protect your data." },
    { question: "Can you access or modify your data?", answer: "You can access, modify, or request the deletion of your data anytime." }
  ];

  return (
    <Layout title={"Privacy Policy"}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
        padding: '20px',
        borderRadius: '10px',
        maxWidth: '800px',
        marginTop:'100px',
        margin: '20px auto',
        boxShadow: '10px 10px 12px black',
        fontFamily: 'Arial, sans-serif'
      }}>
        <h2 style={{ color: '#333', marginTop:'50px',marginBottom: '20px' }}>Privacy Policy - ZL Classic</h2>
        <img src="/images/contactus.jpeg" alt="FAQ" style={{ width: '60%',marginBottom: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.2)' }} />
        
        {policyPoints.map((item, index) => (
          <div
            key={index}
            onClick={() => toggleAccordion(index)}
            style={{
              backgroundColor: 'lightblue',
              padding: '15px',
              marginBottom: '10px',
              borderRadius: '10px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              cursor: 'pointer',
              transition: 'transform 0.2s',
              color: '#333',
              width: '100%',
              maxWidth: '600px',
              textAlign: 'middle'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <h3 style={{ fontWeight: 'bold', color: '#007BFF' }}>{item.question}</h3>
            {activeIndex === index && (
              <p style={{ marginTop: '10px', color: 'black' }}>{item.answer}</p>
            )}
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Policy;
