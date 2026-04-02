import { useState } from 'react';

function ProfileDetails({ user }) {
  const [profileForm, setProfileForm] = useState({
    age: user?.age || '',
    height: user?.height || '',
    weight: user?.weight || '',
    activityLevel: user?.activityLevel || '',
    goalWeight: user?.goalWeight || '',
    goalText: user?.goalText || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    console.log('Saved profile details:', profileForm);
    alert('Profile details saved locally for now.');
  };

  return (
    <div style={{ marginTop: '30px', paddingTop: '20px', borderTop: '1px solid #ccc' }}>
      <h3>Personal Info</h3>

      <div style={{ marginBottom: '15px' }}>
        <label><strong>Age:</strong></label><br />
        <input
          type="number"
          name="age"
          value={profileForm.age}
          onChange={handleChange}
          placeholder="Enter your age"
          style={inputStyle}
        />
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label><strong>Height:</strong></label><br />
        <input
          type="text"
          name="height"
          value={profileForm.height}
          onChange={handleChange}
          placeholder={`Example: 5'10"`}
          style={inputStyle}
        />
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label><strong>Weight:</strong></label><br />
        <input
          type="text"
          name="weight"
          value={profileForm.weight}
          onChange={handleChange}
          placeholder="Enter your weight"
          style={inputStyle}
        />
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label><strong>Activity Level:</strong></label><br />
        <select
          name="activityLevel"
          value={profileForm.activityLevel}
          onChange={handleChange}
          style={inputStyle}
        >
          <option value="">Select activity level</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
      </div>

      <h3 style={{ marginTop: '25px' }}>Goal</h3>

      <div style={{ marginBottom: '15px' }}>
        <label><strong>Goal Weight:</strong></label><br />
        <input
          type="text"
          name="goalWeight"
          value={profileForm.goalWeight}
          onChange={handleChange}
          placeholder="Enter your goal weight"
          style={inputStyle}
        />
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label><strong>Goal Description:</strong></label><br />
        <textarea
          name="goalText"
          value={profileForm.goalText}
          onChange={handleChange}
          placeholder="Write your goal here for the admin to see"
          rows="5"
          style={{ ...inputStyle, resize: 'vertical', minHeight: '120px' }}
        />
      </div>

      <button onClick={handleSave} style={buttonStyle}>
        Save Profile Details
      </button>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  maxWidth: '450px',
  padding: '10px',
  marginTop: '6px',
  border: '1px solid #bbb',
  borderRadius: '6px',
  boxSizing: 'border-box'
};

const buttonStyle = {
  padding: '10px 16px',
  backgroundColor: '#4CAF50',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  fontWeight: 'bold'
};

export default ProfileDetails;