const ProfileHeader = ({ user }) => {
  
  
  
  return (
    <header className="profile-header">
      <img
        src={user.profile_image || '/default-avatar.png'}
        alt={user.username}
        className="profile-avatar"
      />
      <h2>{user.username}</h2>
      <p>{user.email}</p>
    </header>
  )
}

export default ProfileHeader
