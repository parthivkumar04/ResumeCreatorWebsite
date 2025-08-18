import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./Header.module.css";
import resumeImage from "../../assets/resume.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

function Header() {
  const [profileImage, setProfileImage] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return; 

        const response = await axios.get('http://localhost:3000/api/auth/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data && response.data.email) {
          fetchImage(response.data.email);
          setIsAdmin(response.data.rank === 'admin'); 
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, [navigate]);

  const fetchImage = async (email) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/images/${email}`);
      console.log('Image path:', response.data.imagePath); 
      setProfileImage(`http://localhost:3000/${response.data.imagePath}`);
    } catch (error) {
      console.error('Error fetching image:', error);
      setProfileImage(null);
    }
  };

  const goToFeedback = () => navigate("/feedback");
  const goToUserFeedback = () => navigate("/feedbacksuser"); 
  const goToHome = () => navigate("/");
  const handleTemplateClick = () => navigate("/redirect1");
  const goToProfile = () => {
    const token = localStorage.getItem('token');
    navigate(token ? "/logged" : "/profile"); 
  };

  return (
    <div className={styles.container}>
      <div className={styles.navbar}>
        <img src={resumeImage} alt="Resume Logo" className={styles.logo} />
        <p className={styles.navText}>Resume Creator</p>
        <button className={styles.up} onClick={goToHome}>Home</button>
        <button className={styles.up} onClick={handleTemplateClick}>Templates</button>
        <button className={styles.up} onClick={goToFeedback}>Feedback</button>
        {isAdmin && (
          <button className={styles.up} onClick={goToUserFeedback}>User Feedbacks</button>
        )}
      </div>
      <div className={styles.profileIcon} onClick={goToProfile}>
        {profileImage ? (
          <img src={profileImage} alt="Profile" className={styles.profileImage} />
        ) : (
          <FontAwesomeIcon icon={faUserCircle} size="2x" className={styles.userIcon} />
        )}
      </div>
    </div>
  );
}

export default Header;
