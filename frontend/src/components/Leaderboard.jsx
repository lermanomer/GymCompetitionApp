function Leaderboard() {
    const leaderboardData = [
      { id: 1, name: "sdf", points: 120, goalsCompleted: 8, streak: 6, workouts: 12 },
      { id: 2, name: "Alex", points: 105, goalsCompleted: 7, streak: 5, workouts: 10 },
      { id: 3, name: "Jordan", points: 92, goalsCompleted: 6, streak: 4, workouts: 9 },
      { id: 4, name: "Chris", points: 80, goalsCompleted: 5, streak: 3, workouts: 7 },
      { id: 5, name: "Taylor", points: 72, goalsCompleted: 4, streak: 2, workouts: 6 },
    ];
  
    const getMedal = (index) => {
      if (index === 0) return "🥇";
      if (index === 1) return "🥈";
      if (index === 2) return "🥉";
      return `#${index + 1}`;
    };
  
    const getCardStyle = (index) => {
      let bg = "#fafafa";
  
      if (index === 0) bg = "#fff8d6";
      else if (index === 1) bg = "#f3f3f3";
      else if (index === 2) bg = "#fde9d9";
  
      return {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px 20px",
        marginBottom: "12px",
        border: "1px solid #d9d9d9",
        borderRadius: "10px",
        backgroundColor: bg,
        boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
      };
    };
  
    return (
      <div
        style={{
          padding: "24px",
          border: "1px solid #ddd",
          borderRadius: "10px",
          backgroundColor: "white",
        }}
      >
        <h2 style={{ marginBottom: "8px" }}>🏆 Leaderboard</h2>
        <p style={{ marginBottom: "25px", color: "#555" }}>
          See who is leading the competition.
        </p>
  
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "15px",
            marginBottom: "25px",
          }}
        >
          <div
            style={{
              padding: "16px",
              border: "1px solid #ddd",
              borderRadius: "10px",
              backgroundColor: "#f8fbff",
            }}
          >
            <h4 style={{ margin: "0 0 8px 0" }}>Top Score</h4>
            <p style={{ margin: 0, fontSize: "20px", fontWeight: "bold" }}>
              {leaderboardData[0].points} pts
            </p>
          </div>
  
          <div
            style={{
              padding: "16px",
              border: "1px solid #ddd",
              borderRadius: "10px",
              backgroundColor: "#f8fff8",
            }}
          >
            <h4 style={{ margin: "0 0 8px 0" }}>Most Goals</h4>
            <p style={{ margin: 0, fontSize: "20px", fontWeight: "bold" }}>
              {leaderboardData[0].goalsCompleted}
            </p>
          </div>
  
          <div
            style={{
              padding: "16px",
              border: "1px solid #ddd",
              borderRadius: "10px",
              backgroundColor: "#fffaf5",
            }}
          >
            <h4 style={{ margin: "0 0 8px 0" }}>Best Streak</h4>
            <p style={{ margin: 0, fontSize: "20px", fontWeight: "bold" }}>
              {leaderboardData[0].streak} days
            </p>
          </div>
        </div>
  
        {leaderboardData.map((member, index) => (
          <div key={member.id} style={getCardStyle(index)}>
            <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
              <div
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  width: "50px",
                  textAlign: "center",
                }}
              >
                {getMedal(index)}
              </div>
  
              <div>
                <div style={{ fontSize: "18px", fontWeight: "bold" }}>
                  {member.name}
                </div>
                <div style={{ color: "#666", marginTop: "4px" }}>
                  {member.goalsCompleted} goals completed • {member.streak} day streak
                </div>
              </div>
            </div>
  
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: "20px", fontWeight: "bold" }}>
                {member.points} pts
              </div>
              <div style={{ color: "#666", marginTop: "4px" }}>
                {member.workouts} workouts
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  
  export default Leaderboard;