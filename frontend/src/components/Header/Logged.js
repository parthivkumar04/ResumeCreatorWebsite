import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './Logged.module.css';

const Logged = () => {
  const [user, setUser] = useState(null);
  const [imagePath, setImagePath] = useState(null); 
  const [message, setMessage] = useState(null); 
  const [messageType, setMessageType] = useState(''); 
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login'); 
        }

        const response = await axios.get('http://localhost:3000/api/auth/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(response.data);
        if (response.data && response.data.email) {
          fetchImage(response.data.email); 
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        navigate('/login'); 
      }
    };

    fetchProfile();
  }, [navigate]);

  const fetchImage = async (email) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/images/${email}`);
      console.log('Image path:', response.data.imagePath); 
      setImagePath(response.data.imagePath);
    } catch (error) {
      console.error('Error fetching image:', error);
      setImagePath(null);
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);
    formData.append('email', user.email);

    try {
      await axios.post('http://localhost:3000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage('Image uploaded successfully!');
      setMessageType('success');

      fetchImage(user.email);
      setTimeout(() => {
        setMessage(null);
        setMessageType('');
      }, 3000);
    } catch (error) {
      console.error('Error uploading image:', error);
      setMessage('Failed to upload image');
      setMessageType('error');
      setTimeout(() => {
        setMessage(null);
        setMessageType('');
      }, 3000);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/profile');
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.container}>
      {message && (
        <div className={`${styles.messageBox} ${styles[messageType]}`}>
          {message}
        </div>
      )}
      <div className={styles.profileBox}>
        <div className={styles.profilePic}>
          {imagePath ? (
            <img src={`http://localhost:3000/${imagePath}`} alt="Profile" className={styles.profileImage} />
          ) : (
            <div className={styles.placeholder}></div>
          )}
        </div>
        <div className={styles.profileDetails}>
          <h1>{user.name}</h1>
          <p>{user.email}</p>
        </div>
        <div className={styles.uploadSection}>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            style={{ display: 'none' }} 
          />
          <button onClick={handleButtonClick} className={styles.uploadButton}>Update Profile Picture</button>
          <button onClick={handleLogout} className={styles.logoutButton}>Logout</button> {/* Add logout button */}
        </div>
      </div>
    </div>
  );
};

export default Logged;
