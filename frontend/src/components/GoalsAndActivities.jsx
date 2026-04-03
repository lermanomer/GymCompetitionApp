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


//for completed goals progress bar
 const totalGoals = goals.length;

const completedGoals = goals.filter((goal) => {
  const stats = goalStats[goal._id] || { totalPoints: 0, timesLogged: 0 };
  const target = targetGoals[goal._id] || 0;

  return target > 0 && stats.totalPoints >= target;
}).length;

const overallProgressPercent =
  totalGoals > 0 ? Math.round((completedGoals / totalGoals) * 100) : 0;


 return (
   <div>
     <h2 className="h2">{communityName} goals</h2>
     <p className="muted" style={{ marginTop: 6 }}>
       Lock in targets, then log your activities to score points.
     </p>

    {/*goal progress bar*/}
     <div className="progressWrap" style={{ marginTop: 16, marginBottom: 18 }}>
       <div className="progressTop">
         <strong>
           Progress: {completedGoals} / {totalGoals} goals completed
         </strong>
         <span className="muted">{overallProgressPercent}%</span>
       </div>
       <div className="bar">
         <div className="barFill" style={{ width: `${overallProgressPercent}%` }} />
       </div>
     </div>


     <div style={{ marginBottom: 10 }}>
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
               <div key={goal._id} className="card" style={{ borderWidth: isLocked ? 2 : 1, borderColor: isLocked ? 'rgba(15,23,42,0.35)' : 'var(--border)' }}>
                 <h4 className="cardTitle">{goal.name}</h4>
                 <p className="cardDesc">{goal.description}</p>
                 <div className="cardMeta">
                   <span><strong>Points:</strong> {goal.points} / unit</span>
                   <span><strong>Type:</strong> {goal.type === 'yes_no' ? 'Yes/No' : 'Numeric'}</span>
                 </div>


                 {/* POINTS DISPLAY */}
                 <div className="alert" style={{ marginTop: 8 }}>
                   <strong>Your Points:</strong> {stats.totalPoints} pts · Logged {stats.timesLogged} times
                 </div>


                 {/* PROGRESS BAR */}
                 {isLocked ? (
                   <div style={{ marginTop: 12 }}>
                     <div className="progressTop">
                       <strong style={{ color: isComplete ? 'var(--success)' : 'var(--text)' }}>
                         Target: {target} points {isComplete ? '✅ COMPLETE!' : ''}
                       </strong>
                       <span className="muted">{Math.round(progress)}%</span>
                     </div>
                     <div className="bar" style={{ height: 10 }}>
                       <div
                         className="barFill"
                         style={{ width: `${Math.min(progress, 100)}%` }}
                       />
                     </div>
                     <div className="help">
                       {stats.totalPoints} / {target} points
                     </div>

                     {isComplete && (
                       <button
                         onClick={() => handleResetTarget(goal._id)}
                         className="btn"
                         style={{ marginTop: 10, borderColor: 'rgba(245,158,11,0.35)', background: 'rgba(245,158,11,0.10)', color: '#92400e' }}
                       >
                         🔓 Reset goal
                       </button>
                     )}
                   </div>
                 ) : (
                   <div style={{ marginTop: 12 }}>
                     <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
                       <input
                         type="number"
                         placeholder="Target points"
                         value={tempInputs[goal._id] || ''}
                         onChange={(e) => setTempInputs({ ...tempInputs, [goal._id]: e.target.value })}
                         onKeyDown={(e) => {
                           if (e.key === 'Enter') {
                             handleSetTarget(goal._id, tempInputs[goal._id]);
                           }
                         }}
                         className="input"
                         style={{ flex: 1, minWidth: 220 }}
                       />
                       <button
                         onClick={() => handleSetTarget(goal._id, tempInputs[goal._id])}
                         className="btn btnPrimary"
                       >
                         🔒 Lock target
                       </button>
                     </div>
                   </div>
                 )}


                 {/* LOG ACTIVITY */}
                 {goal.type === 'yes_no' ? (
                   <button
                     onClick={() => handleLogActivity(goal._id, goal.type, goal.points)}
                     className="btn btnSuccess"
                     style={{ marginTop: 12 }}
                   >
                     Log now
                   </button>
                 ) : (
                   <div style={{ marginTop: 12, display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
                     <input
                       type="number"
                       placeholder="Value"
                       value={selectedGoalId === goal._id ? inputValue : ''}
                       onChange={(e) => {
                         setSelectedGoalId(goal._id);
                         setInputValue(e.target.value);
                       }}
                       className="input"
                       style={{ maxWidth: 220 }}
                     />
                     <button
                       onClick={() => handleLogActivity(goal._id, goal.type, goal.points)}
                       className="btn btnSuccess"
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
       <div className={`alert ${message.toLowerCase().includes('error') ? 'alertDanger' : 'alertSuccess'}`}
       >
         {message}
       </div>
     )}
   </div>
 );
}


export default GoalsAndActivities;

