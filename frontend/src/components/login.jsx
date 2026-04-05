import { useState } from 'react';
const API_URL = import.meta.env.VITE_API_URL;
function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showRegister, setShowRegister] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

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

  return (
    <div className="authPage">
      <div className="authCard">
        <h1 className="authTitle">Community Competition</h1>
        <p className="authSubtitle">Track goals, log workouts, climb the leaderboard.</p>

        {showRegister ? (
          <>
            <h2 className="h2">Create account</h2>
            <div className="spacer" />

            <form onSubmit={handleRegister} className="authForm">
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="input"
                  required
                />
                <div style={{ position: "relative", width: "100%" }}>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input"
                    style={{ width: "100%", paddingRight: "40px" }}
                    required
                  />

                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: "absolute",
                      right: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      cursor: "pointer"
                    }}
                  >
                    👁️‍🗨️
                  </span>
                </div>

              <button type="submit" className="btn btnPrimary" style={{ width: '100%' }}>
                Create account
              </button>
            </form>

            <p className="authFooter">
              Already have an account?
              <button
                onClick={() => setShowRegister(false)}
                className="linkBtn"
                type="button"
              >
                Login
              </button>
            </p>
          </>
        ) : (
          <>
            <h2 className="h2">Login</h2>
            <div className="spacer" />

            <form onSubmit={handleLogin} className="authForm">
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="input"
                  required
                />
        
                <div style={{ position: "relative", width: "100%" }}>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input"
                    style={{ width: "100%", paddingRight: "40px" }}
                    required
                  />

                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: "absolute",
                      right: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      cursor: "pointer"
                    }}
                  >
                    👁️‍🗨️
                  </span>
                </div>

              <button type="submit" className="btn btnPrimary" style={{ width: '100%' }}>
                Sign in
              </button>
            </form>

            <p className="authFooter">
              Don&apos;t have an account?
              <button
                onClick={() => setShowRegister(true)}
                className="linkBtn"
                type="button"
              >
                Register
              </button>
            </p>
          </>
        )}

        {message && (
          <div className={`alert ${message.toLowerCase().includes('error') ? 'alertDanger' : 'alertSuccess'}`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;