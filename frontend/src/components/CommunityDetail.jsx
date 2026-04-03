import GoalsAndActivities from './GoalsAndActivities';


function CommunityDetail({ user, community, onBack }) {
 return (
   <div>
     <button onClick={onBack} className="btn btnGhost" style={{ marginBottom: 12 }}>
       ← Back to communities
     </button>

     <div className="card">
       <h2 className="h2">{community.name}</h2>
       <p className="muted" style={{ marginTop: 6 }}>{community.description}</p>
       <div className="cardMeta" style={{ marginTop: 10 }}>
         <span><strong>Members:</strong> {community.members.length}</span>
       </div>
     </div>

     <div style={{ marginTop: 14 }}>
       <GoalsAndActivities
         user={user}
         communityId={community._id}
         communityName={community.name}
       />
     </div>
   </div>
 );
}


export default CommunityDetail;

