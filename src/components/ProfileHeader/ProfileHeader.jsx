import './ProfileHeader.css'



const ProfileHeader = ({ user }) => {
  return (
    <header className="profile-header">
      <div className="profile-header-inner">

        <div className="profile-avatar profile-avatar--emoji">
          🏃‍♀️
        </div>
        

        <div className="profile-user-meta">
          <h1 className="profile-username">{user.username}</h1>
          <p className="profile-email">{user.email}</p>
        </div>
      </div>
    </header>
  )
}

export default ProfileHeader

