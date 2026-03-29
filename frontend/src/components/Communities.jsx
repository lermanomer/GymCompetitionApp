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

  if (loading) return <div>Loading communities...</div>;

  const availableCommunities = communities.filter(comm => 
    !comm.members.includes(user._id)
  );

  return (
    <div style={{padding: '20px', fontFamily: 'Arial'}}>
      <h2>Communities</h2>

      {/* MY COMMUNITIES */}
      <div style={{marginBottom: '40px'}}>
        <h3>My Communities ({userCommunities.length})</h3>
        {userCommunities.length === 0 ? (
          <p>You haven't joined any communities yet. Join one below!</p>
        ) : (
          <div>
            {userCommunities.map((comm) => (
              <div key={comm._id} style={{border: '1px solid #ddd', padding: '15px', marginBottom: '10px', borderRadius: '5px', backgroundColor: '#f9f9f9'}}>
                <h4>{comm.name}</h4>
                <p>{comm.description}</p>
                <p><strong>Members:</strong> {comm.members.length}</p>
                <button 
                  onClick={() => onSelectCommunity(comm)}
                  style={{padding: '8px 15px', cursor: 'pointer', backgroundColor: 'lightgreen', marginRight: '10px'}}
                >
                  View Community
                </button>
                <button 
                  onClick={() => handleJoinCommunity(comm._id)}
                  style={{padding: '8px 15px', cursor: 'pointer', backgroundColor: 'lightcoral'}}
                >
                  Leave Community
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* AVAILABLE COMMUNITIES */}
      <div>
        <h3>Available Communities ({availableCommunities.length})</h3>
        {availableCommunities.length === 0 ? (
          <p>You've joined all communities!</p>
        ) : (
          <div>
            {availableCommunities.map((comm) => (
              <div key={comm._id} style={{border: '1px solid #ccc', padding: '15px', marginBottom: '10px', borderRadius: '5px', backgroundColor: '#f0f0f0'}}>
                <h4>{comm.name}</h4>
                <p>{comm.description}</p>
                <p><strong>Members:</strong> {comm.members.length}</p>
                <button 
                  onClick={() => handleJoinCommunity(comm._id)}
                  style={{padding: '8px 15px', cursor: 'pointer', backgroundColor: 'lightblue'}}
                >
                  Join Community
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {message && (
        <div style={{marginTop: '20px', padding: '10px', backgroundColor: '#f0f0f0', borderRadius: '5px'}}>
          {message}
        </div>
      )}
    </div>
  );
}

export default Communities;