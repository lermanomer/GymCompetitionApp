import { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL;

function GoalsAndActivities({ user, communityId, communityName }) {
  const [goals, setGoals] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [selectedGoalId, setSelectedGoalId] = useState(null);

  useEffect(() => {
    fetchGoalsAndActivities();
  }, [communityId]);

  const fetchGoalsAndActivities = async () => {
    try {
      let goalsResponse = await fetch(`${API_URL}/goals/community/${communityId}`);
      let goalsData = await goalsResponse.json();
      setGoals(goalsData);

      let activitiesResponse = await fetch(`${API_URL}/activities/user/${user._id}/community/${communityId}`);
      let activitiesData = await activitiesResponse.json();
      setActivities(activitiesData);
      
      setLoading(false);
    }
    catch (error) {
      console.log("Error fetching data:", error);
      setMessage("Error loading goals");
      setLoading(false);
    }
  };

  const handleLogActivity = async (goalId, goalType, points) => {
    try {
      let value;

      if (goalType === 'yes_no') {
        value = true;
      } else {
        value = parseInt(inputValue);
        if (isNaN(value)) {
          setMessage("Please enter a valid number");
          return;
        }
      }

      let response = await fetch(`${API_URL}/activities`, {
        method: "POST",
        body: JSON.stringify({
          userId: user._id,
          communityId: communityId,
          goalId: goalId,
          value: value,
          points: points
        }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        setMessage("Activity logged!");
        setInputValue('');
        setSelectedGoalId(null);
        fetchGoalsAndActivities();
      } else {
        setMessage("Error logging activity");
      }
    }
    catch (error) {
      console.log("Error logging activity:", error);
      setMessage("Error logging activity");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{padding: '20px'}}>
      <h2>{communityName} - Goals & Activities</h2>

      <div style={{marginBottom: '40px'}}>
        <h3>Goals ({goals.length})</h3>
        {goals.length === 0 ? (
          <p>No goals yet</p>
        ) : (
          <div>
            {goals.map((goal) => (
              <div key={goal._id} style={{border: '1px solid #ddd', padding: '15px', marginBottom: '10px', borderRadius: '5px', backgroundColor: '#f9f9f9'}}>
                <h4>{goal.name}</h4>
                <p>{goal.description}</p>
                <p><strong>Points:</strong> {goal.points}</p>
                <p><strong>Type:</strong> {goal.type === 'yes_no' ? 'Yes/No' : 'Numeric'}</p>

                {goal.type === 'yes_no' ? (
                  <button
                    onClick={() => handleLogActivity(goal._id, goal.type, goal.points)}
                    style={{padding: '8px 15px', cursor: 'pointer', backgroundColor: 'lightgreen'}}
                  >
                    Log Now
                  </button>
                ) : (
                  <div style={{marginTop: '10px'}}>
                    <input
                      type="number"
                      placeholder="Enter value"
                      value={selectedGoalId === goal._id ? inputValue : ''}
                      onChange={(e) => {
                        setSelectedGoalId(goal._id);
                        setInputValue(e.target.value);
                      }}
                      style={{padding: '8px', marginRight: '10px'}}
                    />
                    <button
                      onClick={() => handleLogActivity(goal._id, goal.type, goal.points)}
                      style={{padding: '8px 15px', cursor: 'pointer', backgroundColor: 'lightblue'}}
                    >
                      Log
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <h3>Your Activities ({activities.length})</h3>
        {activities.length === 0 ? (
          <p>No activities logged yet</p>
        ) : (
          <div>
            {activities.map((activity) => (
              <div key={activity._id} style={{border: '1px solid #ccc', padding: '10px', marginBottom: '8px', backgroundColor: '#f0f0f0', borderRadius: '5px'}}>
                <p><strong>Goal:</strong> {activity.goalId}</p>
                <p><strong>Value:</strong> {activity.value}</p>
                <p><strong>Points:</strong> {activity.points}</p>
                <p><strong>Date:</strong> {new Date(activity.date).toLocaleDateString()}</p>
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

export default GoalsAndActivities;