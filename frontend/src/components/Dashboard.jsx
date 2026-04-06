import { useState } from 'react';
import Communities from './Communities';
import CommunityDetail from './CommunityDetail';
import AdminPanel from './AdminPanel';

import Leaderboard from "./Leaderboard"; // new addition


function Dashboard({ user, onLogout }) {
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const [currentView, setCurrentView] = useState('communities');

  return (
    <div className="container">
      <div className="appShell">
        <header className="topbar">
          
          <div className="brand" style={{ display: "flex", alignItems: "center" }}>
            {/*LOGO*/}
            <span style={{ fontSize: "28px", marginRight: "10px" }}>🏆</span>

            {/*TITLE + SUBTEXT*/}
            <div>
              <h1 style={{
                fontFamily: "Bebas Neue, sans-serif",
                fontSize: "32px",
                letterSpacing: "4px",
                margin: 0,
                background: "linear-gradient(to right, #00c6ff, #0072ff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }}>
                COMPETITOR
              </h1>

              <p className="brandSub">
                Log activity • Set targets • Compete with friends
              </p>
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
                      View your personal details.
                    </p>

                    <div className="card" style={{ marginTop: 14 }}>
                      <div className="cardMeta">
                        <span><strong>Username:</strong> {user.username}</span>
                        <span><strong>User ID:</strong> {user._id}</span>
                        <span><strong>Admin:</strong> {user.isAdmin ? 'Yes' : 'No'}</span>
                      </div>  
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
