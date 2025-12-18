import './ProfileHeader.css'



const ProfileHeader = ({ user }) => {
  return (
    <header className="profile-header">
      <div className="profile-header-inner">
        <img
          src={user.profile_image || '/default-avatar.png'}
          alt={user.username}
          className="profile-avatar"
        />

        <div className="profile-user-meta">
          <h1 className="profile-username">{user.username}</h1>
          <p className="profile-email">{user.email}</p>
        </div>
      </div>
    </header>
  )
}

export default ProfileHeader

