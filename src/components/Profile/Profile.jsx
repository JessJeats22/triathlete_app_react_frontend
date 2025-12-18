import { useEffect, useState } from 'react'
import { getMyProfile } from '../../services/profile'
import LoadingIcon from '../../components/LoadingIcon/LoadingIcon'

const Profile = () => {
  const [profile, setProfile] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await getMyProfile()
        setProfile(data)
      } catch (err) {
        setError('Failed to load profile')
      } finally {
        setIsLoading(false)
      }
    }

    fetchProfile()
  }, [])

  if (isLoading) return <LoadingIcon />
  if (error) return <p>{error}</p>

  return (
    <div className="profile-page">
      <h1>{profile.username}</h1>
    </div>
  )
}

export default Profile
