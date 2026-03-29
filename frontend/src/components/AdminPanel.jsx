import { useState, useEffect } from 'react';

const API_URL = 'http://localhost:8080';

function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [communities, setCommunities] = useState([]);
  const [goals, setGoals] = useState([]);
  const [activeTab, setActiveTab] = useState('users');
  const [message, setMessage] = useState('');

  // New community form
  const [newCommunityName, setNewCommunityName] = useState('');
  const [newCommunityDesc, setNewCommunityDesc] = useState('');

  // New goal form
  const [newGoalName, setNewGoalName] = useState('');
  const [newGoalDesc, setNewGoalDesc] = useState('');
  const [newGoalType, setNewGoalType] = useState('yes_no');
  const [newGoalPoints, setNewGoalPoints] = useState('');
  const [newGoalCommunityId, setNewGoalCommunityId] = useState('');

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    let [usersRes, commRes, goalsRes] = await Promise.all([
      fetch(`${API_URL}/users`),
      fetch(`${API_URL}/communities`),
      fetch(`${API_URL}/goals`)
    ]);
    setUsers(await usersRes.json());
    setCommunities(await commRes.json());
    setGoals(await goalsRes.json());
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;
    await fetch(`${API_URL}/users/${id}`, { method: 'DELETE' });
    setMessage("User deleted");
    fetchAll();
  };

  const toggleAdmin = async (user) => {
    await fetch(`${API_URL}/users/${user._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isAdmin: !user.isAdmin })
    });
    setMessage(`${user.username} admin status updated`);
    fetchAll();
  };

  const deleteCommunity = async (id) => {
    if (!window.confirm("Delete this community?")) return;
    await fetch(`${API_URL}/communities/${id}`, { method: 'DELETE' });
    setMessage("Community deleted");
    fetchAll();
  };

  const createCommunity = async () => {
    if (!newCommunityName) return;
    await fetch(`${API_URL}/communities`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newCommunityName, description: newCommunityDesc, members: [] })
    });
    setNewCommunityName('');
    setNewCommunityDesc('');
    setMessage("Community created!");
    fetchAll();
  };

  const deleteGoal = async (id) => {
    if (!window.confirm("Delete this goal?")) return;
    await fetch(`${API_URL}/goals/${id}`, { method: 'DELETE' });
    setMessage("Goal deleted");
    fetchAll();
  };

  const createGoal = async () => {
    if (!newGoalName || !newGoalCommunityId || !newGoalPoints) return;
    await fetch(`${API_URL}/goals`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        communityId: newGoalCommunityId,
        name: newGoalName,
        description: newGoalDesc,
        type: newGoalType,
        points: parseFloat(newGoalPoints)
      })
    });
    setNewGoalName('');
    setNewGoalDesc('');
    setNewGoalPoints('');
    setNewGoalCommunityId('');
    setMessage("Goal created!");
    fetchAll();
  };

  const tabStyle = (tab) => ({
    padding: '10px 20px', cursor: 'pointer', marginRight: '10px',
    backgroundColor: activeTab === tab ? '#1A1A2E' : '#ddd',
    color: activeTab === tab ? 'white' : 'black',
    border: 'none', borderRadius: '5px'
  });

  return (
    <div style={{padding: '20px'}}>
      <h2 style={{color: '#1A1A2E'}}>⚙️ Admin Panel</h2>

      {message && (
        <div style={{padding: '10px', backgroundColor: '#d4edda', borderRadius: '5px', marginBottom: '15px'}}>
          {message}
        </div>
      )}

      {/* Tabs */}
      <div style={{marginBottom: '20px'}}>
        <button style={tabStyle('users')} onClick={() => setActiveTab('users')}>
          Users ({users.length})
        </button>
        <button style={tabStyle('communities')} onClick={() => setActiveTab('communities')}>
          Communities ({communities.length})
        </button>
        <button style={tabStyle('goals')} onClick={() => setActiveTab('goals')}>
          Goals ({goals.length})
        </button>
      </div>

      {/* USERS TAB */}
      {activeTab === 'users' && (
        <div>
          <h3>All Users</h3>
          {users.map(u => (
            <div key={u._id} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              border: '1px solid #ddd', padding: '12px', marginBottom: '8px', borderRadius: '5px'
            }}>
              <div>
                <strong>{u.username}</strong>
                <span style={{
                  marginLeft: '10px', padding: '2px 8px', borderRadius: '10px',
                  backgroundColor: u.isAdmin ? '#1A1A2E' : '#eee',
                  color: u.isAdmin ? 'white' : 'black', fontSize: '12px'
                }}>
                  {u.isAdmin ? 'Admin' : 'User'}
                </span>
              </div>
              <div>
                <button onClick={() => toggleAdmin(u)} style={{
                  marginRight: '10px', padding: '6px 12px', cursor: 'pointer',
                  backgroundColor: 'lightblue', border: 'none', borderRadius: '4px'
                }}>
                  Toggle Admin
                </button>
                <button onClick={() => deleteUser(u._id)} style={{
                  padding: '6px 12px', cursor: 'pointer',
                  backgroundColor: 'salmon', border: 'none', borderRadius: '4px'
                }}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* COMMUNITIES TAB */}
      {activeTab === 'communities' && (
        <div>
          <h3>All Communities</h3>

          {/* Create Community Form */}
          <div style={{border: '1px solid #ddd', padding: '15px', borderRadius: '5px', marginBottom: '20px', backgroundColor: '#f9f9f9'}}>
            <h4>Create New Community</h4>
            <input
              placeholder="Community name"
              value={newCommunityName}
              onChange={e => setNewCommunityName(e.target.value)}
              style={{padding: '8px', marginRight: '10px', width: '200px'}}
            />
            <input
              placeholder="Description"
              value={newCommunityDesc}
              onChange={e => setNewCommunityDesc(e.target.value)}
              style={{padding: '8px', marginRight: '10px', width: '300px'}}
            />
            <button onClick={createCommunity} style={{
              padding: '8px 16px', backgroundColor: '#1A1A2E',
              color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer'
            }}>
              Create
            </button>
          </div>

          {communities.map(c => (
            <div key={c._id} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              border: '1px solid #ddd', padding: '12px', marginBottom: '8px', borderRadius: '5px'
            }}>
              <div>
                <strong>{c.name}</strong>
                <p style={{margin: '4px 0 0', fontSize: '13px', color: '#666'}}>{c.description}</p>
                <p style={{margin: '2px 0 0', fontSize: '12px', color: '#999'}}>
                  Members: {c.members ? c.members.length : 0}
                </p>
              </div>
              <button onClick={() => deleteCommunity(c._id)} style={{
                padding: '6px 12px', cursor: 'pointer',
                backgroundColor: 'salmon', border: 'none', borderRadius: '4px'
              }}>
                Delete
              </button>
            </div>
          ))}
        </div>
      )}

      {/* GOALS TAB */}
      {activeTab === 'goals' && (
        <div>
          <h3>All Goals</h3>

          {/* Create Goal Form */}
          <div style={{border: '1px solid #ddd', padding: '15px', borderRadius: '5px', marginBottom: '20px', backgroundColor: '#f9f9f9'}}>
            <h4>Create New Goal</h4>
            <div style={{display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '10px'}}>
              <input
                placeholder="Goal name"
                value={newGoalName}
                onChange={e => setNewGoalName(e.target.value)}
                style={{padding: '8px', width: '180px'}}
              />
              <input
                placeholder="Description"
                value={newGoalDesc}
                onChange={e => setNewGoalDesc(e.target.value)}
                style={{padding: '8px', width: '220px'}}
              />
              <select
                value={newGoalCommunityId}
                onChange={e => setNewGoalCommunityId(e.target.value)}
                style={{padding: '8px'}}
              >
                <option value="">Select community</option>
                {communities.map(c => (
                  <option key={c._id} value={c._id}>{c.name}</option>
                ))}
              </select>
              <select
                value={newGoalType}
                onChange={e => setNewGoalType(e.target.value)}
                style={{padding: '8px'}}
              >
                <option value="yes_no">Yes/No</option>
                <option value="numeric">Numeric</option>
              </select>
              <input
                placeholder="Points"
                type="number"
                value={newGoalPoints}
                onChange={e => setNewGoalPoints(e.target.value)}
                style={{padding: '8px', width: '80px'}}
              />
            </div>
            <button onClick={createGoal} style={{
              padding: '8px 16px', backgroundColor: '#1A1A2E',
              color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer'
            }}>
              Create Goal
            </button>
          </div>

          {goals.map(g => (
            <div key={g._id} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              border: '1px solid #ddd', padding: '12px', marginBottom: '8px', borderRadius: '5px'
            }}>
              <div>
                <strong>{g.name}</strong>
                <span style={{marginLeft: '10px', fontSize: '12px', color: '#666'}}>
                  {communities.find(c => c._id === g.communityId)?.name || 'Unknown community'}
                </span>
                <p style={{margin: '4px 0 0', fontSize: '13px', color: '#666'}}>{g.description}</p>
                <p style={{margin: '2px 0 0', fontSize: '12px'}}>
                  Type: {g.type} • Points: {g.points}
                </p>
              </div>
              <button onClick={() => deleteGoal(g._id)} style={{
                padding: '6px 12px', cursor: 'pointer',
                backgroundColor: 'salmon', border: 'none', borderRadius: '4px'
              }}>
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminPanel;
