import { useState } from 'react';
import Communities from './Communities';

const API_URL = import.meta.env.VITE_API_URL;

function Dashboard({ user, onLogout }) {
  const [currentView, setCurrentView] = useState('communities');

  return (
    <div style={{padding: '20px', fontFamily: 'Arial'}}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '2px solid #ccc', paddingBottom: '15px'}}>
        <h1>Community Competition App</h1>
        <div>
          <p style={{marginRight: '20px', display: 'inline'}}>Welcome, <strong>{user.username}</strong>!</p>
          <button onClick={onLogout} style={{padding: '10px 20px', cursor: 'pointer', backgroundColor: 'salmon'}}>
            Logout
          </button>
        </div>
      </div>

      <div style={{marginBottom: '20px'}}>
        <button 
          onClick={() => setCurrentView('communities')}
          style={{marginRight: '10px', padding: '10px 20px', cursor: 'pointer', backgroundColor: currentView === 'communities' ? 'lightblue' : '#ddd'}}
        >
          Communities
        </button>
        <button 
          onClick={() => setCurrentView('profile')}
          style={{padding: '10px 20px', cursor: 'pointer', backgroundColor: currentView === 'profile' ? 'lightblue' : '#ddd'}}
        >
          Profile
        </button>
      </div>

      {currentView === 'communities' && <Communities user={user} />}

      {currentView === 'profile' && (
        <div style={{padding: '20px', border: '1px solid #ddd', borderRadius: '5px'}}>
          <h2>Profile</h2>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>User ID:</strong> {user._id}</p>
          <p><strong>Admin:</strong> {user.isAdmin ? 'Yes' : 'No'}</p>
        </div>
      )}
    </div>
  );
}

export default Dashboard;