function Leaderboard() {
    const leaderboardData = [
      { id: 1, name: "sdf", points: 120 },
      { id: 2, name: "Alex", points: 95 },
      { id: 3, name: "Jordan", points: 80 },
    ];
  
    return (
      <div style={{ marginTop: "20px" }}>
        <h2>Leaderboard</h2>
  
        <div style={{ border: "1px solid #ccc", padding: "20px", background: "#fff" }}>
          {leaderboardData.map((user, index) => (
            <div
              key={user.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "10px",
                borderBottom: "1px solid #ddd",
              }}
            >
              <span>
                <strong>#{index + 1}</strong> {user.name}
              </span>
              <span>{user.points} pts</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  export default Leaderboard;