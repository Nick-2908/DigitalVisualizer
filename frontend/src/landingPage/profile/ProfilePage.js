import React, { useState, useEffect } from 'react'; // Import useState and useEffect
import { useAuth } from '../../context/AuthContext'; // Adjust path as needed
import { Navigate } from 'react-router-dom';

function ProfilePage() {
  const { user } = useAuth();
  
  // 1. Add state for the new profile fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [bio, setBio] = useState('');
  
  // 2. Add loading/success/error states for updates
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  // 4. Placeholder: In a real app, you would fetch this data
  //    when the component loads, probably using user.userId.
  //
  // *** FIX: Moved this hook before the conditional return ***
  useEffect(() => {
    // We also add a check *inside* the hook, so it only
    // runs its logic when the user exists.
    if (user) {
      // Since we don't have this data in AuthContext yet,
      // we'll just use placeholders to show how it works.
      setFirstName("Alex"); // Placeholder
      setLastName("Smith"); // Placeholder
      setBio("Software developer interested in React and Node.js."); // Placeholder
    }
  }, [user]); // Depend on the user object

  // 3. If the user is somehow not logged in... (existing code)
  //    This conditional return is now AFTER all hook calls, which is correct.
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  // 5. Handle profile update
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    // --- In a real app, you would make an API call here ---
    // const response = await fetch(`/api/profile/${user.userId}`, {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ firstName, lastName, bio })
    // });
    
    // Simulating an API call
    console.log("Simulating profile update with:", { firstName, lastName, bio });
    await new Promise(resolve => setTimeout(resolve, 1500)); // Fake 1.5s delay
    
    setLoading(false);
    
    //
    // **IMPORTANT**: To make this work for real, you must:
    // 1. Add `firstName`, `lastName`, `bio` to your `LoginSchema.js` on the backend.
    // 2. Create a new API endpoint (e.g., PUT /profile/:userId) in your backend `index.js`
    //    that finds the user and updates these new fields.
    //
    
    setSuccess("Profile updated successfully! (This is a simulation)");
  };

  // 6. Placeholder functions for other buttons
  const handleChangePassword = () => {
    console.log('Change password clicked');
    setError("Change password functionality is not yet implemented.");
    setSuccess(null);
  };

  const handleDeleteAccount = () => {
    console.log('Delete account clicked');
    setError("Delete account functionality is not yet implemented.");
    setSuccess(null);
  };

  return (
    // *** FIX 1: Corrected 'align-itemss-center' to 'align-items-center' ***
    <main className="container d-flex flex-grow-1 align-items-center py-5">
      <div style={{ width: '100%', maxWidth: '40rem', margin: '0 auto' }}>
        {/* We must use a <form> tag to handle the submit button */}
        <form className="hero-card p-4 p-sm-5" onSubmit={handleProfileUpdate}>
          <div className="text-center mb-4">
            <span className="material-symbols-outlined text-primary" style={{ fontSize: '48px' }}>
              account_circle
            </span>
            <h1 className="hero-h1 fs-2 mb-2">Your Profile</h1>
            <p className="hero-feature-text">Manage your account settings and information.</p>
          </div>
          
          {/* --- Alerts --- */}
          {error && <div className="alert alert-danger" role="alert">{error}</div>}
          {success && <div className="alert alert-success" role="alert">{success}</div>}

          {/* --- Profile Information Section --- */}
          <div className="mb-4">
            <h5 className="mb-3">Personal Information</h5>
            
            {/* Email (Read-only) */}
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="floatingEmail"
                placeholder="Email address"
                value={user.email} // Display user's email from context
                disabled // Make it read-only
              />
              <label htmlFor="floatingEmail">Email address (cannot be changed)</label>
            </div>
            
            {/* First Name */}
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="floatingFirstName"
                placeholder="First Name"
                value={firstName} 
                onChange={(e) => setFirstName(e.target.value)} 
              />
              <label htmlFor="floatingFirstName">First Name</label>
            </div>
            
            {/* Last Name */}
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="floatingLastName"
                placeholder="Last Name"
                value={lastName} 
                onChange={(e) => setLastName(e.target.value)} 
              />
              {/* *** FIX 2: Corrected '</Glabel>' to '</label>' *** */}
              <label htmlFor="floatingLastName">Last Name</label>
            </div>
            
            {/* Bio */}
            <div className="form-floating">
              <textarea
                className="form-control"
                placeholder="Write a little about yourself"
                id="floatingBio"
                style={{ height: '100px' }}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              ></textarea>
              <label htmlFor="floatingBio">About me</label>
            </div>
          </div>

          {/* Save Changes Button */}
          <button className="btn-custom-primary w-100 py-2 mb-4" type="submit" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                <span className="ms-2">Saving...</span>
              </>
            ) : (
              'Save Changes'
            )}
          </button>

          {/* --- Account Actions Section --- */}
          <div className="d-grid gap-3">
            <h5 className="mb-0">Account Actions</h5>
            {/* Set type="button" so these don't submit the form */}
            <button type="button" className="btn btn-outline-primary" onClick={handleChangePassword}>
              Change Password
            </button>
            <button type="button" className="btn btn-outline-danger" onClick={handleDeleteAccount}>
              Delete Account
            </button>
          </div>

        </form>
      </div>
    </main>
  );
}

export default ProfilePage;

