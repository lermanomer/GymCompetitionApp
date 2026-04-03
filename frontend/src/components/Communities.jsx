import { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL;

function Communities({ user, onSelectCommunity }) {
  const [communities, setCommunities] = useState([]);
  const [userCommunities, setUserCommunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchCommunities();
  }, []);

  const fetchCommunities = async () => {
    try {
      let response = await fetch(`${API_URL}/communities`);
      let data = await response.json();
      setCommunities(data);
      
      let userComms = data.filter(comm =>
        comm.members.includes(user._id)
      );
      setUserCommunities(userComms);
      setLoading(false);
    }
    catch (error) {
      console.log("Error fetching communities:", error);
      setMessage("Error loading communities");
      setLoading(false);
    }
  };

  const handleJoinCommunity = async (communityId) => {
    try {
      let response = await fetch(`${API_URL}/communities/${communityId}/join`, {
        method: "POST",
        body: JSON.stringify({ userId: user._id }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        setMessage("Joined community!");
        fetchCommunities();
      } else {
        setMessage("Error joining community");
      }
    }
    catch (error) {
      console.log("Error joining:", error);
      setMessage("Error joining community");
    }
  };

  const handleLeaveCommunity = async (communityId) => {
    try {
      let response = await fetch(`${API_URL}/communities/${communityId}/leave`, {
        method: "POST",
        body: JSON.stringify({ userId: user._id }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        setMessage("Left community!");
        fetchCommunities();
      } else {
        setMessage("Error leaving community");
      }
    }
    catch (error) {
      console.log("Error leaving:", error);
      setMessage("Error leaving community");
    }
  };

  if (loading) return <div>Loading communities...</div>;

  const availableCommunities = communities.filter(comm =>
    !comm.members.includes(user._id)
  );

  return (
    <div>
      <h2 className="h2">Communities</h2>
      <p className="muted" style={{ marginTop: 6 }}>
        Join a community to participate in challenges and track your progress.
      </p>

      {/* MY COMMUNITIES */}
      <div style={{ marginTop: 16 }}>
        <h3 className="h2">My Communities ({userCommunities.length})</h3>
        {userCommunities.length === 0 ? (
          <p className="muted">You haven't joined any communities yet. Join one below!</p>
        ) : (
          <div className="grid grid2" style={{ marginTop: 12 }}>
            {userCommunities.map((comm) => (
              <div key={comm._id} className="card">
                <h4 className="cardTitle">{comm.name}</h4>
                <p className="cardDesc">{comm.description}</p>
                <div className="cardMeta">
                  <span><strong>Members:</strong> {comm.members.length}</span>
                </div>

                <div className="cardActions">
                  <button
                    onClick={() => onSelectCommunity(comm)}
                    className="btn btnSuccess"
                  >
                    View community
                  </button>
                  <button
                    onClick={() => handleLeaveCommunity(comm._id)}
                    className="btn btnDanger"
                  >
                    Leave
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* AVAILABLE COMMUNITIES */}
      <div style={{ marginTop: 22 }}>
        <h3 className="h2">Available Communities ({availableCommunities.length})</h3>
        {availableCommunities.length === 0 ? (
          <p className="muted">You've joined all communities!</p>
        ) : (
          <div className="grid grid2" style={{ marginTop: 12 }}>
            {availableCommunities.map((comm) => (
              <div key={comm._id} className="card">
                <h4 className="cardTitle">{comm.name}</h4>
                <p className="cardDesc">{comm.description}</p>
                <div className="cardMeta">
                  <span><strong>Members:</strong> {comm.members.length}</span>
                </div>
                <div className="cardActions">
                  <button
                    onClick={() => handleJoinCommunity(comm._id)}
                    className="btn btnPrimary"
                  >
                    Join community
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {message && <div className="alert">{message}</div>}
    </div>
  );
}

export default Communities;