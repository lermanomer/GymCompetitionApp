import { useState } from 'react';
import Communities from './Communities';
import CommunityDetail from './CommunityDetail';
import AdminPanel from './AdminPanel';

import Leaderboard from "./Leaderboard"; // new addition
import ProfileDetails from './ProfileDetails'; // new addition

function Dashboard({ user, onLogout }) {
  const [selectedCommunity, setSelectedCommunity] = useState(null);
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

      {selectedCommunity ? (
        <CommunityDetail
          user={user}
          community={selectedCommunity}
          onBack={() => setSelectedCommunity(null)}
        />
      ) : (
        <>
          <div style={{marginBottom: '20px'}}>
            <button
              onClick={() => setCurrentView('communities')}
              style={{marginRight: '10px', padding: '10px 20px', cursor: 'pointer', backgroundColor: currentView === 'communities' ? 'lightblue' : '#ddd'}}
            >
              Communities
            </button>
            <button
              onClick={() => setCurrentView('profile')}
              style={{marginRight: '10px', padding: '10px 20px', cursor: 'pointer', backgroundColor: currentView === 'profile' ? 'lightblue' : '#ddd'}}
            >
              Profile
            </button>
            
            <button
              onClick={() => setCurrentView('leaderboard')}
              style={{marginRight: '10px', padding: '10px 20px', cursor: 'pointer', backgroundColor: currentView === 'leaderboard' ? 'lightblue' : '#ddd'}}
            >
              Leaderboard
            </button>

            {user.isAdmin && (
              <button
                onClick={() => setCurrentView('admin')}
                style={{padding: '10px 20px', cursor: 'pointer', backgroundColor: currentView === 'admin' ? '#1A1A2E' : '#ddd', color: currentView === 'admin' ? 'white' : 'black'}}
              >
                ⚙️ Admin Panel
              </button>
            )}
          </div>

          {currentView === 'communities' && (
            <Communities user={user} onSelectCommunity={setSelectedCommunity} />
          )}

          {currentView === 'profile' && (
            <div style={{padding: '20px', border: '1px solid #ddd', borderRadius: '5px'}}>
              <h2>Profile</h2>
              <p><strong>Username:</strong> {user.username}</p>
              <p><strong>User ID:</strong> {user._id}</p>
              <p><strong>Admin:</strong> {user.isAdmin ? 'Yes' : 'No'}</p>
              
              <ProfileDetails user={user} /> 
            </div>
          )}
          {currentView === 'leaderboard' && ( //new addition - leaderboard
            <Leaderboard /> // new addition - leaderboard
          )} 

          {currentView === 'admin' && user.isAdmin && (
            <AdminPanel />
          )}
        </>
      )}
    </div>
  );
}

export default Dashboard;
