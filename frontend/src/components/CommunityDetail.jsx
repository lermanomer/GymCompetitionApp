import { useState } from 'react';
import GoalsAndActivities from './GoalsAndActivities';


function CommunityDetail({ user, community, onBack }) {
 return (
   <div style={{padding: '20px', fontFamily: 'Arial'}}>
     <div style={{marginBottom: '20px'}}>
       <button
         onClick={onBack}
         style={{padding: '10px 20px', cursor: 'pointer', backgroundColor: 'lightblue'}}
       >
         ← Back to Communities
       </button>
     </div>


     <h2>{community.name}</h2>
     <p>{community.description}</p>
     <p><strong>Members:</strong> {community.members.length}</p>


     <GoalsAndActivities user={user} communityId={community._id} communityName={community.name} />
   </div>
 );
}


export default CommunityDetail;

