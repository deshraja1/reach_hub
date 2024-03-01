import React from 'react';

const UserProfile = ({ profile }) => (
  <div>
    <h2>User Profile</h2>
    <p>
      <strong>Username:</strong> {profile.username}
    </p>
    <p>
      <strong>Country:</strong> {profile.country}
    </p>
    <p>
      <strong>Location:</strong> {profile.location}
    </p>
    <p>
      <strong>Bio:</strong> {profile.bio}
    </p>
  </div>
);

export default UserProfile;