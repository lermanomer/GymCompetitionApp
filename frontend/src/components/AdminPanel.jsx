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

  const tabClass = (tab) =>
    `tabBtn ${activeTab === tab ? 'tabBtnActive' : ''}`;

  return (
    <div>
      <h2 className="h2">⚙️ Admin Panel</h2>
      <p className="muted" style={{ marginTop: 6 }}>
        Manage users, communities, and goals.
      </p>

      {message && <div className="alert alertSuccess">{message}</div>}

      {/* Tabs */}
      <div className="tabs" style={{ marginTop: 12, marginBottom: 14 }}>
        <button className={tabClass('users')} onClick={() => setActiveTab('users')}>
          Users ({users.length})
        </button>
        <button className={tabClass('communities')} onClick={() => setActiveTab('communities')}>
          Communities ({communities.length})
        </button>
        <button className={tabClass('goals')} onClick={() => setActiveTab('goals')}>
          Goals ({goals.length})
        </button>
      </div>

      {/* USERS TAB */}
      {activeTab === 'users' && (
        <div>
          <h3 className="h2">All users</h3>
          {users.map(u => (
            <div key={u._id} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong>{u.username}</strong>
                <span className="chip" style={{ marginLeft: 10, padding: '4px 10px' }}>
                  {u.isAdmin ? 'Admin' : 'User'}
                </span>
              </div>
              <div>
                <button onClick={() => toggleAdmin(u)} className="btn" style={{ marginRight: 10 }}>
                  Toggle Admin
                </button>
                <button onClick={() => deleteUser(u._id)} className="btn btnDanger">
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
          <h3 className="h2">All communities</h3>

          {/* Create Community Form */}
          <div className="card" style={{ marginBottom: 14 }}>
            <h4 className="cardTitle">Create a community</h4>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 10 }}>
              <input
              placeholder="Community name"
              value={newCommunityName}
              onChange={e => setNewCommunityName(e.target.value)}
              className="input"
              style={{ maxWidth: 260 }}
            />
              <input
              placeholder="Description"
              value={newCommunityDesc}
              onChange={e => setNewCommunityDesc(e.target.value)}
              className="input"
              style={{ maxWidth: 420 }}
            />
              <button onClick={createCommunity} className="btn btnPrimary">
                Create
              </button>
            </div>
          </div>

          {communities.map(c => (
            <div key={c._id} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong>{c.name}</strong>
                <p className="cardDesc" style={{ marginTop: 6 }}>{c.description}</p>
                <p className="help" style={{ marginTop: 0 }}>
                  Members: {c.members ? c.members.length : 0}
                </p>
              </div>
              <button onClick={() => deleteCommunity(c._id)} className="btn btnDanger">
                Delete
              </button>
            </div>
          ))}
        </div>
      )}

      {/* GOALS TAB */}
      {activeTab === 'goals' && (
        <div>
          <h3 className="h2">All goals</h3>

          {/* Create Goal Form */}
          <div className="card" style={{ marginBottom: 14 }}>
            <h4 className="cardTitle">Create a goal</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 10 }}>
              <input
                placeholder="Goal name"
                value={newGoalName}
                onChange={e => setNewGoalName(e.target.value)}
                className="input"
                style={{ maxWidth: 240 }}
              />
              <input
                placeholder="Description"
                value={newGoalDesc}
                onChange={e => setNewGoalDesc(e.target.value)}
                className="input"
                style={{ maxWidth: 360 }}
              />
              <select
                value={newGoalCommunityId}
                onChange={e => setNewGoalCommunityId(e.target.value)}
                className="input"
                style={{ maxWidth: 260 }}
              >
                <option value="">Select community</option>
                {communities.map(c => (
                  <option key={c._id} value={c._id}>{c.name}</option>
                ))}
              </select>
              <select
                value={newGoalType}
                onChange={e => setNewGoalType(e.target.value)}
                className="input"
                style={{ maxWidth: 200 }}
              >
                <option value="yes_no">Yes/No</option>
                <option value="numeric">Numeric</option>
              </select>
              <input
                placeholder="Points"
                type="number"
                value={newGoalPoints}
                onChange={e => setNewGoalPoints(e.target.value)}
                className="input"
                style={{ maxWidth: 140 }}
              />
            </div>
            <button onClick={createGoal} className="btn btnPrimary">
              Create goal
            </button>
          </div>

          {goals.map(g => (
            <div key={g._id} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong>{g.name}</strong>
                <span className="help" style={{ marginLeft: 10 }}>
                  {communities.find(c => c._id === g.communityId)?.name || 'Unknown community'}
                </span>
                <p className="cardDesc" style={{ marginTop: 6 }}>{g.description}</p>
                <p className="help" style={{ marginTop: 0 }}>
                  Type: {g.type} • Points: {g.points}
                </p>
              </div>
              <button onClick={() => deleteGoal(g._id)} className="btn btnDanger">
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
