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
    <div className="container">
      <div className="appShell">
        <header className="topbar">
          <div className="brand">
            <div className="brandMark" aria-hidden="true" />
            <div>
              <h1 className="brandTitle">Community Competition</h1>
              <p className="brandSub">Log activity • Set targets • Compete with friends</p>
            </div>
          </div>

          <div className="topbarRight">
            <div className="chip" title="Signed in user">
              <span className="avatar" aria-hidden="true" />
              <span>
                Welcome, <strong>{user.username}</strong>
              </span>
            </div>
            <button onClick={onLogout} className="btn btnDanger">
              Logout
            </button>
          </div>
        </header>

        {selectedCommunity ? (
          <div className="panel">
            <div className="panelBody">
              <CommunityDetail
                user={user}
                community={selectedCommunity}
                onBack={() => setSelectedCommunity(null)}
              />
            </div>
          </div>
        ) : (
          <>
            <div className="panel">
              <div className="panelHeader">
                <div className="tabs">
                  <button
                    onClick={() => setCurrentView('communities')}
                    className={`tabBtn ${currentView === 'communities' ? 'tabBtnActive' : ''}`}
                  >
                    Communities
                  </button>
                  <button
                    onClick={() => setCurrentView('profile')}
                    className={`tabBtn ${currentView === 'profile' ? 'tabBtnActive' : ''}`}
                  >
                    Profile
                  </button>
                  <button
                    onClick={() => setCurrentView('leaderboard')}
                    className={`tabBtn ${currentView === 'leaderboard' ? 'tabBtnActive' : ''}`}
                  >
                    Leaderboard
                  </button>
                  {user.isAdmin && (
                    <button
                      onClick={() => setCurrentView('admin')}
                      className={`tabBtn ${currentView === 'admin' ? 'tabBtnActive' : ''}`}
                    >
                      ⚙️ Admin Panel
                    </button>
                  )}
                </div>
              </div>

              <div className="panelBody">
                {currentView === 'communities' && (
                  <Communities user={user} onSelectCommunity={setSelectedCommunity} />
                )}

                {currentView === 'profile' && (
                  <div>
                    <h2 className="h2">Profile</h2>
                    <p className="muted" style={{ marginTop: 6 }}>
                      Manage your personal details and goals.
                    </p>

                    <div className="card" style={{ marginTop: 14 }}>
                      <div className="cardMeta">
                        <span><strong>Username:</strong> {user.username}</span>
                        <span><strong>User ID:</strong> {user._id}</span>
                        <span><strong>Admin:</strong> {user.isAdmin ? 'Yes' : 'No'}</span>
                      </div>
                      <ProfileDetails user={user} />
                    </div>
                  </div>
                )}

                {currentView === 'leaderboard' && <Leaderboard user={user} />}

                {currentView === 'admin' && user.isAdmin && <AdminPanel />}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
