import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './Profile.module.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [isRegister, setIsRegister] = useState(false); 
  const [message, setMessage] = useState(null); 
  const [messageType, setMessageType] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('http://localhost:3000/api/profile', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        setUser(response.data);
        navigate('/logged');
      })
      .catch(() => {
        setLoading(false);
        localStorage.removeItem('token'); 
      });
    } else {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError('');
      }, 3000);
      return () => clearTimeout(timer); 
    }
  }, [error]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      setUser({ name: email.split('@')[0] }); 
      setEmail('');
      setPassword('');
      setError('');
      navigate('/logged'); 
    } catch (error) {
      console.error('Error logging in:', error);
      setError('Invalid credentials, please try again.');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/auth/register', { name, email, password });
      localStorage.setItem('token', response.data.token);
      setUser({ name });
      setName('');
      setEmail('');
      setPassword('');
      setError('');
      setMessage('Registration successful! Redirecting to your profile...'); // Set success message
      setMessageType('success');
      setTimeout(() => {
        navigate('/logged'); 
        setMessageType('');
      }, 800);
    } catch (error) {
      console.error('Error registering:', error);
      setError('Registration failed, please try again.');
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.container}>
      {message && (
        <div className={`${styles.messageBox} ${styles[messageType]}`}>
          {message}
        </div>
      )}
      {!user && (
        <div className={styles.formContainer}>
          <h1>{isRegister ? 'Register' : 'Login'}</h1>
          <form onSubmit={isRegister ? handleRegister : handleLogin} className={styles.form}>
            {isRegister && (
              <div className={styles.formGroup}>
                <label htmlFor="name">Name:</label>
                <input 
                  type="text" 
                  id="name" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  required 
                />
              </div>
            )}
            <div className={styles.formGroup}>
              <label htmlFor="email">Email:</label>
              <input 
                type="email" 
                id="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="password">Password:</label>
              <input 
                type="password" 
                id="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
            </div>
            {error && <p className={styles.error}>{error}</p>}
            <button type="submit" className={styles.submitButton}>{isRegister ? 'Register' : 'Login'}</button>
          </form>
          <p className={styles.toggleText}>
            {isRegister ? 'Already have an account? ' : 'Need an account? '}
            <span onClick={() => setIsRegister(!isRegister)} className={styles.toggleLink}>
              {isRegister ? 'Login' : 'Register'}
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default Profile;
