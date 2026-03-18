import { useState } from 'react';
const API_URL = import.meta.env.VITE_API_URL;
function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showRegister, setShowRegister] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    const loginData = {
      username,
      password
    };

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        body: JSON.stringify(loginData),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      });

      const result = await response.json();

      if (response.ok) {
        setMessage('Login successful!');
        onLoginSuccess(result.user);
      } else {
        setMessage(result.error || 'Login failed');
      }
    } catch (error) {
      console.log('Error logging in:', error);
      setMessage('Error connecting to server');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const registerData = {
      username,
      password
    };

    try {
      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        body: JSON.stringify(registerData),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      });

      const result = await response.json();

      if (response.ok) {
        setMessage('Account created! Now logging in...');
        onLoginSuccess(result.user);
      } else {
        setMessage(result.error || 'Registration failed');
      }
    } catch (error) {
      console.log('Error registering:', error);
      setMessage('Error connecting to server');
    }
  };

  const pageStyle = {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f7fb',
    padding: '20px',
    fontFamily: 'Arial, sans-serif'
  };

  const cardStyle = {
    width: '100%',
    maxWidth: '420px',
    backgroundColor: '#ffffff',
    padding: '40px 32px',
    borderRadius: '16px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
    textAlign: 'center'
  };

  const titleStyle = {
    margin: '0 0 10px 0',
    fontSize: '32px',
    color: '#223247'
  };

  const subtitleStyle = {
    marginBottom: '30px',
    fontSize: '24px',
    color: '#223247'
  };

  const inputStyle = {
    width: '100%',
    padding: '14px 16px',
    fontSize: '16px',
    border: '1px solid #d0d7e2',
    borderRadius: '10px',
    outline: 'none',
    boxSizing: 'border-box'
  };

  const buttonStyle = {
    width: '100%',
    padding: '14px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    backgroundColor: '#8fd0e8',
    color: '#1f2d3d',
    border: 'none',
    borderRadius: '10px',
    marginTop: '10px'
  };

  const toggleButtonStyle = {
    background: 'none',
    border: 'none',
    color: '#2563eb',
    cursor: 'pointer',
    fontSize: '16px',
    padding: 0,
    marginLeft: '6px'
  };

  const messageStyle = {
    marginTop: '20px',
    padding: '12px',
    backgroundColor: '#f1f5f9',
    borderRadius: '10px',
    color: '#334155',
    fontSize: '15px'
  };

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <h1 style={titleStyle}>Community Competition App</h1>

        {showRegister ? (
          <>
            <h2 style={subtitleStyle}>Create Account</h2>

            <form onSubmit={handleRegister}>
              <div style={{ marginBottom: '16px' }}>
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  style={inputStyle}
                  required
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={inputStyle}
                  required
                />
              </div>

              <button type="submit" style={buttonStyle}>
                Register
              </button>
            </form>

            <p style={{ marginTop: '20px', fontSize: '16px', color: '#475569' }}>
              Already have an account?
              <button
                onClick={() => setShowRegister(false)}
                style={toggleButtonStyle}
                type="button"
              >
                Login
              </button>
            </p>
          </>
        ) : (
          <>
            <h2 style={subtitleStyle}>Login</h2>

            <form onSubmit={handleLogin}>
              <div style={{ marginBottom: '16px' }}>
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  style={inputStyle}
                  required
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={inputStyle}
                  required
                />
              </div>

              <button type="submit" style={buttonStyle}>
                Login
              </button>
            </form>

            <p style={{ marginTop: '20px', fontSize: '16px', color: '#475569' }}>
              Don&apos;t have an account?
              <button
                onClick={() => setShowRegister(true)}
                style={toggleButtonStyle}
                type="button"
              >
                Register
              </button>
            </p>
          </>
        )}

        {message && <div style={messageStyle}>{message}</div>}
      </div>
    </div>
  );
}

export default Login;