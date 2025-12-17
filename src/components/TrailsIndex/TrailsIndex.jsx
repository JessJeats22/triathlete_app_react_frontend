import './TrailsIndex.css'
import { useEffect, useState } from 'react'
import { trailsIndex } from '../../services/trails'
import { Link } from 'react-router'
import LoadingIcon from '../LoadingIcon/LoadingIcon'

const TrailsIndex = () => {

    const [trails, setTrails] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [errorData, setErrorData] = useState({})

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

            <h1 className="page-title">All Trails</h1>

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
                            <div className="trail-card-content">
                                <h2>{trail.name}</h2>
                                <p className={`trail-type ${trail.trail_type}`}>
                                    {trail.trail_type}
                                </p>
                                <p>{trail.country}...</p>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    )
}

export default TrailsIndex