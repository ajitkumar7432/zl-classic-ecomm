import React, { useState } from "react";
import Layout from "../components/Layout/Layout";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);

    setTimeout(() => {
      setSuccess(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 3000);
  };

  return (
    <Layout title="Contact Us">
      <div style={styles.container}>
        <div style={styles.leftSection}>
          <img
            src="images/contactus.jpeg" // Replace with a suitable image URL or path
            alt="Contact Us"
            style={styles.image}
          />
          <h1 style={styles.heading}>Contact Us</h1>
          <p>We're here to assist you! Feel free to reach out anytime.</p>
          <p><BiMailSend /> Email: <strong>singhajit29416@gmail.com</strong></p>
          <p><BiPhoneCall /> Phone: <strong>+91-9324611628</strong></p>
          <p><BiSupport /> Toll-Free: <strong>1800-123-4567</strong></p>
        </div>

        <div style={styles.rightSection}>
          <h2 style={styles.formHeading}>Send Us a Message</h2>
          <form onSubmit={handleSubmit} style={styles.form}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              style={styles.input}
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              style={styles.input}
            />
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              required
              style={styles.input}
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
              style={styles.textarea}
            />
            <button type="submit" style={styles.button}>Send Message</button>
          </form>
          {success && <p style={styles.successMessage}>Message Sent Successfully!</p>}
        </div>
      </div>
    </Layout>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    padding: "40px",
    backgroundColor: "#f4f4f9",
    minHeight: "90vh",
  },
  leftSection: {
    flex: "0 0 45%",
    margin: "20px",
    textAlign: "left",
    padding: "20px",
    backgroundColor: "#1e3a8a",
    color: "white",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "auto",
    borderRadius: "10px",
    marginBottom: "20px",
    objectFit: "cover",
  },
  rightSection: {
    flex: "0 0 45%",
    margin: "20px",
    padding: "20px",
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
  },
  heading: {
    fontSize: "28px",
    marginBottom: "15px",
    textAlign: "center",
  },
  formHeading: {
    fontSize: "24px",
    marginBottom: "15px",
    color: "#1e3a8a",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    padding: "10px",
    margin: "10px 0",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  textarea: {
    padding: "10px",
    margin: "10px 0",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
    height: "100px",
    resize: "none",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#1e3a8a",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
    fontWeight: "bold",
    alignSelf: "center",
  },
  successMessage: {
    marginTop: "10px",
    color: "green",
    fontWeight: "bold",
    textAlign: "center",
  },
};

export default Contact;
