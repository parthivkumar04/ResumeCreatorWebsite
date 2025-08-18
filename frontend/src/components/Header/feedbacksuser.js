import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './FeedbackUsers.module.css';

const FeedbackUsers = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      console.log('Fetching feedbacks from the server...');
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found');
          return;
        }
        console.log('Token:', token); 
        const response = await axios.get('http://localhost:3000/api/feedback', {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log('Feedbacks fetched:', response.data);
        setFeedbacks(response.data);
      } catch (error) {
        console.error('Error fetching feedbacks:', error);
        if (error.response) {
          console.error('Error details:', error.response.data);
        }
      }
    };

    fetchFeedbacks();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>User Feedbacks</h1>
      <div className={styles.feedbackList}>
        {feedbacks.length > 0 ? (
          feedbacks.map(feedback => (
            <div key={feedback._id} className={styles.feedbackItem}>
              <p className={styles.email}><span3 className={styles.t1}>From : </span3>{feedback.email}</p>
              <p className={styles.message}><span3 className={styles.t1}>Feedback : </span3>{feedback.feedback}</p>
            </div>
          ))
        ) : (
          <p className={styles.noFeedback}>No feedbacks available</p>
        )}
      </div>
    </div>
  );
};

export default FeedbackUsers;
