import { useEffect, useState } from 'react'
import { getMyProfile } from '../../services/auth'
import LoadingIcon from '../../components/LoadingIcon/LoadingIcon'
import ProfileHeader from '../../components/ProfileHeader/ProfileHeader'
import './Profile.css'



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
        <>
    <ProfileHeader user={profile} />

    <div className="profile-page">

        <section className="profile-section">
            <h2>My Trails</h2>

            {profile.created_trails.length ? (
                <div className="trails-grid">
                    {profile.created_trails.map(trail => (
                        <div key={trail.id} className="trail-card">
                            <h3>{trail.name}</h3>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="empty-state">You haven’t created any trails yet.</p>
            )}
        </section>

        <section className="profile-section">
            <h2>Favourited Trails</h2>

            {profile.favourited_trails.length ? (
                <div className="trails-grid">
                    {profile.favourited_trails.map(trail => (
                        <div key={trail.id} className="trail-card">
                            <h3>{trail.name}</h3>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="empty-state">No favourites yet.</p>
            )}
        </section>

    </div>
</>

    )

}

export default Profile
