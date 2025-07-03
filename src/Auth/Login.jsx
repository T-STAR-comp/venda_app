import styles from './styles/login.module.css'
import { useState } from 'react';

const Login = ({ onSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    // TODO: Implement login logic
    try {
        const response = await fetch(import.meta.env.VITE_LOGINUSER_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
     
        if (!response.ok) {
            throw new Error('Failed to login');
        }
        const data = await response.json();
        console.log(data);
        if (data.status === 'ok') {
            sessionStorage.setItem('Login_token', data.token);
            sessionStorage.setItem('user', data.user);
            sessionStorage.setItem('user_email', data.email);
            window.location.href = '/';
        } else {
            setError(data.error);
        }
        setLoading(false);
    } catch (error) {
        setError(error.message);
    }
    setTimeout(() => {
      setLoading(false);
      // setError('Invalid credentials'); // Uncomment for demo error
    }, 1200);
  };

  return (
    <div className={styles.loginBg}>
      <div className={styles.loginGlassCard}>
        <div className={styles.loginHeader}>
          <span className={styles.logoVenda}>VENDA</span>
          <h2 className={styles.loginTitle}>Sign in to your account</h2>
        </div>
        <div className={styles.loginForm} >
          <label className={styles.loginLabel} htmlFor="email">Email</label>
          <input
            className={styles.loginInput}
            type="email"
            id="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="you@email.com"
            required
            autoFocus
          />
          <label className={styles.loginLabel} htmlFor="password">Password</label>
          <input
            className={styles.loginInput}
            type="password"
            id="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          {error && <div className={styles.loginError}>{error}</div>}
          <button className={styles.loginBtn} type="submit" disabled={loading} onClick={handleSubmit}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </div>
        <div className={styles.loginFooter}>
          <a href="#" className={styles.forgotLink}>Forgot password?</a>
          <span className={styles.signupPrompt}>
            Don't have an account?{' '}
            {onSignup ? (
              <a href="#" className={styles.signupLink} onClick={e => { e.preventDefault(); onSignup(); }}>Sign up</a>
            ) : (
              <a href="#" className={styles.signupLink}>Sign up</a>
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;