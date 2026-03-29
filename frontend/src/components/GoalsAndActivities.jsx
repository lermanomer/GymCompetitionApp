import { useState, useEffect } from 'react';


const API_URL = import.meta.env.VITE_API_URL;


function GoalsAndActivities({ user, communityId, communityName }) {
 const [goals, setGoals] = useState([]);
 const [loading, setLoading] = useState(true);
 const [message, setMessage] = useState('');
 const [inputValue, setInputValue] = useState('');
 const [selectedGoalId, setSelectedGoalId] = useState(null);
 const [goalStats, setGoalStats] = useState({});
 const [targetGoals, setTargetGoals] = useState({});
 const [tempInputs, setTempInputs] = useState({}); // Temp input before locking


 useEffect(() => {
   fetchGoalsAndStats();
 }, [communityId]);


 const fetchGoalsAndStats = async () => {
   try {
     let goalsResponse = await fetch(`${API_URL}/goals/community/${communityId}`);
     let goalsData = await goalsResponse.json();
     setGoals(goalsData);


     let statsObj = {};
     for (let goal of goalsData) {
       let statsResponse = await fetch(`${API_URL}/users/${user._id}/stats/goal/${goal._id}`);
       let statsData = await statsResponse.json();
       statsObj[goal._id] = statsData;
     }
     setGoalStats(statsObj);


     let targetsResponse = await fetch(`${API_URL}/user-goal-targets/user/${user._id}/community/${communityId}`);
     let targetsData = await targetsResponse.json();
    
     let targetsObj = {};
     for (let target of targetsData) {
       targetsObj[target.goalId] = target.targetPoints;
     }
     setTargetGoals(targetsObj);
    
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
     let calculatedPoints;


     if (goalType === 'yes_no') {
       value = true;
       calculatedPoints = points;
     } else {
       value = parseInt(inputValue);
       if (isNaN(value)) {
         setMessage("Please enter a valid number");
         return;
       }
       calculatedPoints = value * points;
     }


     let response = await fetch(`${API_URL}/activities`, {
       method: "POST",
       body: JSON.stringify({
         userId: user._id,
         communityId: communityId,
         goalId: goalId,
         value: value,
         points: calculatedPoints
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
       fetchGoalsAndStats();
     } else {
       setMessage("Error logging activity");
     }
   }
   catch (error) {
     console.log("Error logging activity:", error);
     setMessage("Error logging activity");
   }
 };


 const handleSetTarget = async (goalId, targetValue) => {
   try {
     let numValue = parseInt(targetValue) || 0;
    
     let response = await fetch(`${API_URL}/user-goal-targets`, {
       method: "POST",
       body: JSON.stringify({
         userId: user._id,
         goalId: goalId,
         targetPoints: numValue
       }),
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
       }
     });


     if (response.ok) {
       setTargetGoals({...targetGoals, [goalId]: numValue});
       setTempInputs({...tempInputs, [goalId]: ''});
       setMessage("Goal locked! 🔒");
       setTimeout(() => setMessage(''), 2000);
     } else {
       setMessage("Error saving goal");
     }
   }
   catch (error) {
     console.log("Error saving goal:", error);
     setMessage("Error saving goal");
   }
 };


 const handleResetTarget = async (goalId) => {
   try {
     let response = await fetch(`${API_URL}/user-goal-targets`, {
       method: "POST",
       body: JSON.stringify({
         userId: user._id,
         goalId: goalId,
         targetPoints: 0
       }),
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
       }
     });


     if (response.ok) {
       setTargetGoals({...targetGoals, [goalId]: 0});
       setTempInputs({...tempInputs, [goalId]: ''});
       setMessage("Goal reset! 🔓");
       setTimeout(() => setMessage(''), 2000);
     }
   }
   catch (error) {
     console.log("Error resetting goal:", error);
   }
 };


 if (loading) return <div>Loading...</div>;


 return (
   <div style={{padding: '20px'}}>
     <h2>{communityName} - Goals</h2>


     <div style={{marginBottom: '40px'}}>
       {goals.length === 0 ? (
         <p>No goals yet</p>
       ) : (
         <div>
           {goals.map((goal) => {
             let stats = goalStats[goal._id] || { totalPoints: 0, timesLogged: 0 };
             let target = targetGoals[goal._id] || 0;
             let progress = target > 0 ? (stats.totalPoints / target) * 100 : 0;
             let isLocked = target > 0;
             let isComplete = progress >= 100;


             return (
               <div key={goal._id} style={{
                 border: isLocked ? '2px solid #333' : '1px solid #ddd',
                 padding: '15px',
                 marginBottom: '15px',
                 borderRadius: '5px',
                 backgroundColor: isLocked ? '#f0f0f0' : '#f9f9f9',
                 opacity: isLocked ? 1 : 1
               }}>
                 <h4>{goal.name}</h4>
                 <p>{goal.description}</p>
                 <p><strong>Points per unit:</strong> {goal.points}</p>
                 <p><strong>Type:</strong> {goal.type === 'yes_no' ? 'Yes/No' : 'Numeric'}</p>


                 {/* POINTS DISPLAY */}
                 <p style={{backgroundColor: '#e8f4f8', padding: '10px', borderRadius: '5px', marginBottom: '10px'}}>
                   <strong>Your Points: {stats.totalPoints} pts</strong> (Logged {stats.timesLogged} times)
                 </p>


                 {/* PROGRESS BAR */}
                 {isLocked ? (
                   <div style={{marginBottom: '15px'}}>
                     <div style={{display: 'flex', gap: '10px', marginBottom: '10px', alignItems: 'center'}}>
                       <div style={{flex: 1}}>
                         <strong style={{color: isComplete ? '#4CAF50' : '#333'}}>
                           Target: {target} points {isComplete ? '✅ COMPLETE!' : ''}
                         </strong>
                       </div>
                       <span>{Math.round(progress)}%</span>
                     </div>
                     <div style={{backgroundColor: '#ddd', borderRadius: '10px', height: '20px', overflow: 'hidden'}}>
                       <div style={{
                         backgroundColor: isComplete ? '#4CAF50' : '#2196F3',
                         height: '100%',
                         width: `${Math.min(progress, 100)}%`,
                         transition: 'width 0.3s'
                       }}></div>
                     </div>
                     <p style={{fontSize: '12px', marginTop: '5px', color: '#666'}}>
                       {stats.totalPoints} / {target} points
                     </p>
                    
                     {isComplete && (
                       <button
                         onClick={() => handleResetTarget(goal._id)}
                         style={{padding: '8px 15px', marginTop: '10px', cursor: 'pointer', backgroundColor: '#FF9800', color: 'white'}}
                       >
                         🔓 Reset Goal
                       </button>
                     )}
                   </div>
                 ) : (
                   <div style={{marginBottom: '15px'}}>
                     <div style={{display: 'flex', gap: '10px'}}>
                       <input
                         type="number"
                         placeholder="Enter target points"
                         value={tempInputs[goal._id] || ''}
                         onChange={(e) => setTempInputs({...tempInputs, [goal._id]: e.target.value})}
                         onKeyPress={(e) => {
                           if (e.key === 'Enter') {
                             handleSetTarget(goal._id, tempInputs[goal._id]);
                           }
                         }}
                         style={{padding: '8px', flex: 1}}
                       />
                       <button
                         onClick={() => handleSetTarget(goal._id, tempInputs[goal._id])}
                         style={{padding: '8px 15px', cursor: 'pointer', backgroundColor: '#2196F3', color: 'white'}}
                       >
                         🔒 Lock Goal
                       </button>
                     </div>
                   </div>
                 )}


                 {/* LOG ACTIVITY */}
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
                       style={{padding: '8px 15px', cursor: 'pointer', backgroundColor: 'lightgreen'}}
                     >
                       Log
                     </button>
                   </div>
                 )}
               </div>
             );
           })}
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

