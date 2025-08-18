import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './feedback.module.css';

const Feedback = () => {
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/feedback', { email, feedback });
      console.log(response.data);
      setShowSuccess(true);

      setEmail('');
      setFeedback('');

      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('Error submitting feedback, please try again.');
    }
  };

  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => {
        setShowSuccess(false);
      }, 5000); 

      return () => clearTimeout(timer);
    }
  }, [showSuccess]);

  return (
    <div className={styles.container}>
      <h1 style={{color:'#0b4a7a'}}>Feedback Form</h1>
      <p>Welcome to our feedback page!</p>
      <p>Feel free to share any thoughts you have to help us improve.<br></br>&nbsp;</p>

      {showSuccess && (
        <div className={`${styles.successMessage} ${showSuccess ? styles.show : ''}`}>
          Feedback submitted successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="email">Your Email:</label>
          <input 
            type="email" 
            id="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="feedback">Feedback:</label>
          <textarea 
            id="feedback" 
            value={feedback} 
            onChange={(e) => setFeedback(e.target.value)} 
            rows="10" 
            cols="50" 
            maxLength="500" 
            required 
          ></textarea>
        </div>
        <button type="submit" className={styles.submitButton}>Submit</button>
      </form>
    </div>
  );
};

export default Feedback;
