import { useState } from 'react';
import Login from './components/login';
import Dashboard from './components/Dashboard';

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleLogin = (user) => {
    setLoggedInUser(user);
  };

  const handleLogout = () => {
    setLoggedInUser(null);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#f4f7fb',
      }}
    >
      {loggedInUser ? (
        <Dashboard user={loggedInUser} onLogout={handleLogout} />
      ) : (
        <Login onLoginSuccess={handleLogin} />
      )}
    </div>
  );
}

export default App;