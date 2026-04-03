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
    <div style={{ marginTop: 18 }}>
      <h3 className="h2">Personal info</h3>

      <div style={{ marginTop: 12 }}>
        <label><strong>Age</strong></label>
        <div className="spacer" />
        <input
          type="number"
          name="age"
          value={profileForm.age}
          onChange={handleChange}
          placeholder="Enter your age"
          className="input"
        />
      </div>

      <div style={{ marginTop: 12 }}>
        <label><strong>Height</strong></label>
        <div className="spacer" />
        <input
          type="text"
          name="height"
          value={profileForm.height}
          onChange={handleChange}
          placeholder={`Example: 5'10"`}
          className="input"
        />
      </div>

      <div style={{ marginTop: 12 }}>
        <label><strong>Weight</strong></label>
        <div className="spacer" />
        <input
          type="text"
          name="weight"
          value={profileForm.weight}
          onChange={handleChange}
          placeholder="Enter your weight"
          className="input"
        />
      </div>

      <div style={{ marginTop: 12 }}>
        <label><strong>Activity level</strong></label>
        <div className="spacer" />
        <select
          name="activityLevel"
          value={profileForm.activityLevel}
          onChange={handleChange}
          className="input"
        >
          <option value="">Select activity level</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
      </div>

      <h3 className="h2" style={{ marginTop: 18 }}>Goal</h3>

      <div style={{ marginTop: 12 }}>
        <label><strong>Goal weight</strong></label>
        <div className="spacer" />
        <input
          type="text"
          name="goalWeight"
          value={profileForm.goalWeight}
          onChange={handleChange}
          placeholder="Enter your goal weight"
          className="input"
        />
      </div>

      <div style={{ marginTop: 12 }}>
        <label><strong>Goal description</strong></label>
        <div className="spacer" />
        <textarea
          name="goalText"
          value={profileForm.goalText}
          onChange={handleChange}
          placeholder="Write your goal here for the admin to see"
          rows="5"
          className="input"
          style={{ resize: 'vertical', minHeight: 120 }}
        />
      </div>

      <button onClick={handleSave} className="btn btnPrimary">
        Save Profile Details
      </button>
    </div>
  );
}

export default ProfileDetails;