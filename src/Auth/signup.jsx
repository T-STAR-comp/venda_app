import styles from './styles/signup.module.css'
import { useState } from 'react';
import Loader from '../components/loader';

const Signup = ({ onBack }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [loaderMessage, setLoaderMessage] = useState("Loading.......")
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
        const response = await fetch(import.meta.env.VITE_SIGNUPUSER_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                fullname: name, 
                email: email, 
                phonenumber: phone, 
                password: confirmPassword
                })
        });
        if (!response.ok) {
            throw new Error('Failed to signup');
        }
        const data = await response.json();
        //console.log(data);
        if (data.status === 'ok') {
            setLoaderMessage(data.message);
            setShowLoader(true)
            setTimeout(() => {
                window.location.href = '/';                
            }, 2000);
        } else {
            setError(data.error);
        }
        setLoading(false);
    } catch (error) {
        setError(error.message);
    }
    setTimeout(() => {
      setLoading(false);
      // setError('Signup failed'); // Uncomment for demo error
    }, 1200);
  };

  return (
    <div className={styles.signupBg}>
        {showLoader && <Loader message={loaderMessage} onClose={() => setShowLoader(false)} />}
      <div className={styles.signupGlassCard} style={{maxHeight: '90vh', overflowY: 'auto', position: 'relative'}}>
        <div className={styles.signupHeader}>
          {/* Back to Home */}
          <button
            className={styles.backHomeBtn}
            onClick={onBack}
            style={{position: 'absolute', left: 12, top: 12, background: 'none', border: 'none', cursor: 'pointer', color: '#D7263D', fontWeight: 600, fontSize: '1.1rem', display: 'flex', alignItems: 'center'}}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginRight: 4}}><path d="M14 17l-5-5 5-5" stroke="#D7263D" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Home
          </button>
          <span className={styles.logoVenda}>VENDA</span>
          <h2 className={styles.signupTitle}>Create your account</h2>
        </div>
        <div className={styles.signupForm} >
          <label className={styles.signupLabel} htmlFor="name">Full Name</label>
          <input
            className={styles.signupInput}
            type="text"
            id="name"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Your name"
            required
            autoFocus
          />
          <label className={styles.signupLabel} htmlFor="email">Email</label>
          <input
            className={styles.signupInput}
            type="email"
            id="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="you@email.com"
            required
          />
          <label className={styles.signupLabel} htmlFor="phone">Phone</label>
          <input
            className={styles.signupInput}
            type="tel"
            id="phone"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            placeholder="e.g. +265991234567"
            required
          />
          <label className={styles.signupLabel} htmlFor="password">Password</label>
          <input
            className={styles.signupInput}
            type="password"
            id="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <label className={styles.signupLabel} htmlFor="confirmPassword">Confirm Password</label>
          <input
            className={styles.signupInput}
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            required
          />
          {error && <div className={styles.signupError}>{error}</div>}
          <button className={styles.signupBtn} onClick={handleSubmit} disabled={loading}>
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>
        </div>
        <div className={styles.signupFooter}>
          <span className={styles.loginPrompt}>
            Already have an account?{' '}
            <a href="#" className={styles.loginLink}>Log in</a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Signup;
