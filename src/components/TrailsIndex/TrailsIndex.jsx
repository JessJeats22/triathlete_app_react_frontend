import './TrailsIndex.css'
import { useEffect, useState } from 'react'
import { trailsIndex } from '../../services/trails'
import { Link } from 'react-router'
import LoadingIcon from '../LoadingIcon/LoadingIcon'

const TrailsIndex = () => {

    const [trails, setTrails] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [errorData, setErrorData] = useState({})

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

            {errorData.message && (
                <p className="error-message">{errorData.message}</p>
            )}

            {isLoading ? (
                <LoadingIcon />
            ) : (
                <div className="trails-grid">
                    {trails.map(trail => (
                        <Link
                            to={`/trails/${trail.id}`}
                            key={trail.id}
                            className="trail-card"
                        >
                            <div className="trail-card-content">
                                <h2>{trail.name}</h2>
                                <p>{trail.trail_type}...</p>
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