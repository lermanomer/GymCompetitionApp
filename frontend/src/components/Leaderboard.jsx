import { useEffect, useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL;

function Leaderboard({ user }) {
  const [communities, setCommunities] = useState([]);
  const [selectedCommunity, setSelectedCommunity] = useState('');
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchCommunities();
  }, []);

  useEffect(() => {
    if (selectedCommunity) {
      fetchLeaderboard(selectedCommunity);
    }
  }, [selectedCommunity]);

  const fetchCommunities = async () => {
    try {
      const response = await fetch(`${API_URL}/communities`);
      const data = await response.json();

      const joinedCommunities = data.filter((comm) =>
        comm.members.includes(user._id)
      );

      setCommunities(joinedCommunities);

      if (joinedCommunities.length > 0) {
        setSelectedCommunity(joinedCommunities[0]._id);
      } else {
        setLoading(false);
        setMessage('Join a community to view its leaderboard.');
      }
    } catch (error) {
      console.log('Error fetching communities:', error);
      setMessage('Error loading communities');
      setLoading(false);
    }
  };

  const fetchLeaderboard = async (communityId) => {
    try {
      setLoading(true);

      const response = await fetch(
        `${API_URL}/leaderboard/community/${communityId}`
      );
      const data = await response.json();

      setLeaderboardData(data);
      setLoading(false);
    } catch (error) {
      console.log('Error fetching leaderboard:', error);
      setMessage('Error loading leaderboard');
      setLoading(false);
    }
  };

  const getMedal = (index) => {
    if (index === 0) return '🥇';
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';
    return `#${index + 1}`;
  };

  const getCardStyle = (index, username) => {
    let bg = '#fafafa';

    if (index === 0) bg = '#fff8d6';
    else if (index === 1) bg = '#f3f3f3';
    else if (index === 2) bg = '#fde9d9';

    if (username === user.username) {
      bg = '#dff6ff';
    }

    return {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '16px 20px',
      marginBottom: '12px',
      border: '1px solid #d9d9d9',
      borderRadius: '10px',
      backgroundColor: bg,
      boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
    };
  };

  const selectedCommunityName =
    communities.find((comm) => comm._id === selectedCommunity)?.name || '';

  if (loading) {
    return <div style={{ padding: '20px' }}>Loading leaderboard...</div>;
  }

  return (
    <div
      style={{
        padding: '24px',
        border: '1px solid #ddd',
        borderRadius: '10px',
        backgroundColor: 'white',
      }}
    >
      <h2 style={{ marginBottom: '8px' }}>🏆 Leaderboard</h2>
      <p style={{ marginBottom: '20px', color: '#555' }}>
        See who is leading your joined communities.
      </p>

      {communities.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <label
            style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: 'bold',
            }}
          >
            Community
          </label>
          <select
            value={selectedCommunity}
            onChange={(e) => setSelectedCommunity(e.target.value)}
            style={{
              padding: '10px',
              minWidth: '220px',
              borderRadius: '6px',
              border: '1px solid #ccc',
            }}
          >
            {communities.map((comm) => (
              <option key={comm._id} value={comm._id}>
                {comm.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {leaderboardData.length > 0 ? (
        <>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '15px',
              marginBottom: '25px',
            }}
          >
            <div
              style={{
                padding: '16px',
                border: '1px solid #ddd',
                borderRadius: '10px',
                backgroundColor: '#f8fbff',
              }}
            >
              <h4 style={{ margin: '0 0 8px 0' }}>Community</h4>
              <p style={{ margin: 0, fontSize: '18px', fontWeight: 'bold' }}>
                {selectedCommunityName}
              </p>
            </div>

            <div
              style={{
                padding: '16px',
                border: '1px solid #ddd',
                borderRadius: '10px',
                backgroundColor: '#f8fff8',
              }}
            >
              <h4 style={{ margin: '0 0 8px 0' }}>Top Score</h4>
              <p style={{ margin: 0, fontSize: '20px', fontWeight: 'bold' }}>
                {leaderboardData[0].totalPoints} pts
              </p>
            </div>

            <div
              style={{
                padding: '16px',
                border: '1px solid #ddd',
                borderRadius: '10px',
                backgroundColor: '#fffaf5',
              }}
            >
              <h4 style={{ margin: '0 0 8px 0' }}>Leader</h4>
              <p style={{ margin: 0, fontSize: '20px', fontWeight: 'bold' }}>
                {leaderboardData[0].username}
              </p>
            </div>
          </div>

          {leaderboardData.map((member, index) => (
            <div
              key={member.userId}
              style={getCardStyle(index, member.username)}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div
                  style={{
                    fontSize: '24px',
                    fontWeight: 'bold',
                    width: '50px',
                    textAlign: 'center',
                  }}
                >
                  {getMedal(index)}
                </div>

                <div>
                  <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
                    {member.username}
                    {member.username === user.username ? ' (You)' : ''}
                  </div>
                  <div style={{ color: '#666', marginTop: '4px' }}>
                    {member.totalActivities} activities logged
                  </div>
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '20px', fontWeight: 'bold' }}>
                  {member.totalPoints} pts
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        <p>
          No activity has been logged for this community yet, so there is no
          leaderboard data yet.
        </p>
      )}

      {message && (
        <div
          style={{
            marginTop: '20px',
            padding: '10px',
            backgroundColor: '#f0f0f0',
            borderRadius: '5px',
          }}
        >
          {message}
        </div>
      )}
    </div>
  );
}

export default Leaderboard;