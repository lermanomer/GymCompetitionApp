import { useState, useEffect } from 'react';
import GoalsAndActivities from './GoalsAndActivities';

const API_URL = import.meta.env.VITE_API_URL;

function Communities({ user }) {
  const [communities, setCommunities] = useState([]);
  const [userCommunities, setUserCommunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [expandedCommunityId, setExpandedCommunityId] = useState(null);

  // Fetch all communities and user's communities on load
  useEffect(() => {
    fetchCommunities();
  }, []);

  const fetchCommunities = async () => {
    try {
      let response = await fetch(`${API_URL}/communities`);
      let data = await response.json();
      setCommunities(data);
      
      // Filter user's communities
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
        fetchCommunities(); // Refresh list
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

  // Communities user is NOT in
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
              <div key={comm._id} id={`community-${comm._id}`}>
                <div style={{border: '1px solid #ddd', padding: '15px', marginBottom: '10px', borderRadius: '5px', backgroundColor: '#f9f9f9'}}>
                  <h4>{comm.name}</h4>
                  <p>{comm.description}</p>
                  <p><strong>Members:</strong> {comm.members.length}</p>
         <button 
  onClick={() => {
    setExpandedCommunityId(expandedCommunityId === comm._id ? null : comm._id);
    if (expandedCommunityId !== comm._id) {
      setTimeout(() => {
        document.getElementById(`community-${comm._id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }}
  style={{padding: '8px 15px', cursor: 'pointer', backgroundColor: 'lightgreen'}}
>
  {expandedCommunityId === comm._id ? 'Hide Goals' : 'View Goals'}
</button>
                </div>

               {expandedCommunityId === comm._id && (
  <div style={{padding: '20px', backgroundColor: '#f0f0f0', borderRadius: '5px', marginBottom: '20px', marginLeft: '10px', borderLeft: '4px solid #333', scrollMarginTop: '100px'}}>
    <GoalsAndActivities user={user} communityId={comm._id} communityName={comm.name} />
    <button 
      onClick={() => setExpandedCommunityId(null)}
      style={{padding: '8px 15px', marginTop: '15px', cursor: 'pointer', backgroundColor: 'salmon', width: '100%'}}
    >
      Hide Goals
    </button>
  </div>
)}
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