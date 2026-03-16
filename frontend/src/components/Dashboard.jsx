import { useState, useEffect } from 'react';

function Dashboard({ user, onLogout }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [startingWeight, setStartingWeight] = useState('');
  const [maxBench, setMaxBench] = useState('');

  // Fetch all users when component loads
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        let response = await fetch('http://192.168.1.90:8080/users');
        let json = await response.json();
        setUsers(json);
        setLoading(false);
      }
      catch (error) {
        console.log("Error fetching users:", error);
        setLoading(false);
      }
    };
    
    fetchUsers();
  }, []);

  // Handle form submission to create new user
  const handleAddUser = async (e) => {
    e.preventDefault();
    
    let newUser = {
      username: username,
      startingWeight: parseInt(startingWeight),
      maxBench: parseInt(maxBench),
      isAdmin: false
    };

    try {
      let response = await fetch('http://192.168.1.90:8080/users', {
        method: "POST",
        body: JSON.stringify(newUser),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      
      let result = await response.json();
      
      // Clear form
      setUsername('');
      setStartingWeight('');
      setMaxBench('');
      
      // Refresh user list
      let getUsersResponse = await fetch('http://192.168.1.90:8080/users');
      let usersData = await getUsersResponse.json();
      setUsers(usersData);
    }
    catch (error) {
      console.log("Error adding user:", error);
    }
  };

  return (
    <div style={{padding: '20px', fontFamily: 'Arial'}}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
        <h1>Gym Competition App</h1>
        <button onClick={onLogout} style={{padding: '10px 20px', cursor: 'pointer', backgroundColor: 'salmon'}}>
          Logout
        </button>
      </div>

      <p>Logged in as: <strong>{user.username}</strong></p>
      
      <div style={{marginBottom: '30px', border: '1px solid #ccc', padding: '20px'}}>
        <h2>Add New User</h2>
        <form onSubmit={handleAddUser}>
          <input 
            type="text" 
            placeholder="Username" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{marginRight: '10px', padding: '8px'}}
          />
          
          <input 
            type="number" 
            placeholder="Starting Weight" 
            value={startingWeight}
            onChange={(e) => setStartingWeight(e.target.value)}
            style={{marginRight: '10px', padding: '8px'}}
          />
          
          <input 
            type="number" 
            placeholder="Max Bench" 
            value={maxBench}
            onChange={(e) => setMaxBench(e.target.value)}
            style={{marginRight: '10px', padding: '8px'}}
          />
          
          <button type="submit" style={{padding: '8px 20px', cursor: 'pointer'}}>
            Add User
          </button>
        </form>
      </div>

      <div>
        <h2>Users List</h2>
        {loading ? (
          <p>Loading users...</p>
        ) : users.length === 0 ? (
          <p>No users yet. Add one above!</p>
        ) : (
          <div>
            {users.map((user) => (
              <div key={user._id} style={{border: '1px solid #ddd', padding: '10px', marginBottom: '10px'}}>
                <p><strong>Username:</strong> {user.username}</p>
                <p><strong>Starting Weight:</strong> {user.startingWeight} lbs</p>
                <p><strong>Max Bench:</strong> {user.maxBench} lbs</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;