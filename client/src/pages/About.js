import React from "react";
import Layout from "./../components/Layout/Layout";

const About = () => {
  return (
    <Layout title={"About Me - ZL Classic"}>
      <div style={{ padding: "30px", backgroundColor: "#f4f4f9", borderRadius: "10px", maxWidth: "800px", margin: "50px auto", boxShadow: "0px 4px 10px rgba(0,0,0,0.1)" }}>
        <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#333" }}>About Me - The Developer of ZL Classic</h2>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-around", flexWrap: "wrap" }}>
          <img
            src="/images/about.jpeg"
            alt="About Me"
            style={{ width: "100%", maxWidth: "300px", borderRadius: "10px", marginBottom: "20px", boxShadow: "0 4px 8px rgba(0,0,0,0.2)" }}
          />
          <div style={{ maxWidth: "450px", textAlign: "justify", color: "#555", margin: "0 10px" }}>
            <p>
              Hey there! I "Ajitkumar Singh" the passionate solo developer behind ZL Classic, is dedicated in crafting meaningful solutions that make a difference. My journey in developing this e-commerce platform began with a vision to simplify online shopping while delivering a personalized and user-friendly experience.
            </p>
            <p>
              ZL Classic is a result of countless hours of coding, researching, and problem-solving. As the sole developer, I managed every aspect — from designing the user interface, integrating secure payment systems, and optimizing performance, to ensuring data privacy and smooth functionality.
            </p>
            <p>
              My goal is to make ZL Classic a platform that not only meets your needs but also creates value in every interaction. Thank you for being a part of this journey. Let's continue to create, connect, and innovate together!
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
