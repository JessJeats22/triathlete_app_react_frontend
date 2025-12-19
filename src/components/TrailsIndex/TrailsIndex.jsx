import './TrailsIndex.css'
import { useEffect, useState, useContext } from 'react'
import { trailsIndex } from '../../services/trails'
import { Link } from 'react-router'
import LoadingIcon from '../LoadingIcon/LoadingIcon'
import { TRAIL_TYPE_DISPLAY } from '../../utils/trailTypeDisplay'
import { UserContext } from '../../contexts/UserContext'

const TrailsIndex = () => {

    const [trails, setTrails] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [errorData, setErrorData] = useState({})
    const { user } = useContext(UserContext)


    const [filters, setFilters] = useState({
        country: '',
        trail_type: '',
    })

    const handleFilterChange = (e) => {
        const { name, value } = e.target
        setFilters(prev => ({
            ...prev,
            [name]: value,
        }))
    }

    const filteredTrails = trails.filter(trail => {
        const matchesCountry =
            !filters.country || trail.country === filters.country

        const matchesType =
            !filters.trail_type || trail.trail_type === filters.trail_type

        return matchesCountry && matchesType
    })

   if (!user) {
  return (
    <div className="trails-index-page">
      <p className="auth-message">
        Please{' '}
        <Link to="/sign-in" className="auth-link">
          sign in
        </Link>{' '}
        or{' '}
        <Link to="/sign-up" className="auth-link">
          create an account
        </Link>{' '}
        to access the trails.
      </p>
    </div>
  )
}




    useEffect(() => {
        const fetchTrails = async () => {
            try {
                const { data } = await trailsIndex()
                setTrails(data)
            } catch (error) {
                console.log(error)
                setErrorData(error.response.data)
            } finally {
                setIsLoading(false)
            }
        }

        fetchTrails()
    }, [])


    return (
        <div className="trails-index-page">

        

            <div className="trails-filters">
                <select
                    name="country"
                    value={filters.country}
                    onChange={handleFilterChange}
                >
                    <option value="">All countries</option>

                    {[...new Set(trails.map(t => t.country))]
                        .sort()
                        .map(country => (
                            <option key={country} value={country}>
                                {country}
                            </option>
                        ))}
                </select>

                <select
                    name="trail_type"
                    value={filters.trail_type}
                    onChange={handleFilterChange}
                >
                    <option value="">All trail types</option>
                    <option value="swim">Swim</option>
                    <option value="bike">Bike</option>
                    <option value="run">Run</option>
                </select>
            </div>


            {errorData.message && (
                <p className="error-message">{errorData.message}</p>
            )}

            {isLoading ? (
                <LoadingIcon />
            ) : (
                <div className="trails-grid">
                    {filteredTrails.map(trail => (
                        <Link
                            to={`/trails/${trail.id}`}
                            key={trail.id}
                            className="trail-card"
                        >
                            {trail.images?.length > 0 && (
                                <div className="trail-card-image">
                                    <img
                                        src={trail.images[0]}
                                        alt={trail.name}
                                        loading="lazy"
                                    />
                                </div>
                            )}
                            <h2 className="trail-title">{trail.name}</h2>

                            <p className="trail-location">
                                {trail.city_town}, {trail.country}
                            </p>

                            <div className="trail-meta">
                                <span className="value">
                                    {TRAIL_TYPE_DISPLAY[trail.trail_type]?.emoji}{' '}
                                    {TRAIL_TYPE_DISPLAY[trail.trail_type]?.label}
                                </span>


                                {trail.distance_km && (
                                    <span className="trail-distance">
                                        {trail.distance_km} km
                                    </span>
                                )}
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    )
}

export default TrailsIndex