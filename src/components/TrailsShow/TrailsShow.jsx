import './TrailsShow.css'
import { useParams, useNavigate, Link } from 'react-router'
import { useEffect, useState, useContext } from 'react'
import { trailsShow } from '../../services/trails'
import { UserContext } from '../../contexts/UserContext'
import LoadingIcon from '../LoadingIcon/LoadingIcon'
import TrailsDelete from '../TrailsDelete/TrailsDelete'
import TrailPOIs from '../TrailPOIs/TrailPOIs'
import TrailMap from '../TrailMap/TrailMap'



const TrailsShow = () => {

    const { trailId } = useParams()
    const navigate = useNavigate()
    const { user } = useContext(UserContext)

    const [trail, setTrail] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [errorData, setErrorData] = useState({})

    useEffect(() => {
        const getTrail = async () => {
            try {
                const { data } = await trailsShow(trailId)
                setTrail(data)
            } catch (error) {
                setErrorData(error.response?.data || {})
            } finally {
                setIsLoading(false)
            }
        }

        getTrail()
    }, [trailId])

    if (isLoading) {
        return <LoadingIcon />
    }

    if (errorData.message) {
        return <p className="error">{errorData.message}</p>
    }

    if (!trail) {
        return <p>Nothing to display.</p>
    }

    return (
        <div className="trail-details-container">
            <h1 className="trail-title">
                {trail?.name || 'Trail Details'}
            </h1>

            {errorData.message ? (
                <p className="error-message">{errorData.message}</p>
            ) : isLoading ? (
                <LoadingIcon />
            ) : !trail ? (
                <p>Nothing to display.</p>
            ) : (
                <section className="trail-details-card">
                    <ul>
                        <li>
                            <span className="label">Created by:</span>
                            <span className="value">{trail.created_by.username}</span>
                        </li>

                        <li>
                            <span className="label">Trail Type:</span>
                            <span className="value">{trail.trail_type}</span>
                        </li>

                        <li>
                            <span className="label">Country:</span>
                            <span className="value">{trail.country}</span>
                        </li>

                        <li>
                            <span className="label">City / Town:</span>
                            <span className="value">{trail.city_town}</span>
                        </li>

                        {trail.description && (
                            <li>
                                <span className="label">Description:</span>
                                <span className="value">{trail.description}</span>
                            </li>
                        )}

                        {trail.images?.length > 0 && (
                            <li className="image-item">
                                <span className="label"></span>
                                <img
                                    src={trail.images[0]}
                                    alt={trail.name}
                                    className="trail-image"
                                />
                            </li>
                        )}
                    </ul>

                    <div className="trail-actions">
                        {user && trail?.created_by && user.id === trail.created_by.id && (
                            <>
                                <Link
                                    to={`/trails/${trailId}/edit`}
                                    className="btn btn-primary"
                                >
                                    Edit Trail
                                </Link>

                                <TrailsDelete trailId={trailId} />
                            </>
                        )}

                        <Link to="/trails" className="btn btn-secondary">
                            Back to All Trails
                        </Link>
                    </div>

                    <div>
                        <TrailPOIs trailId={trailId} />
                    </div>

                    <div>
                        <TrailMap
                            latitude={trail.latitude}
                            longitude={trail.longitude}
                            gpxUrl={trail.gpx_url}
                            pois={trail.points_of_interest}

                        />

                    </div>
                </section>


            )
            }
        </div >
    )
}

export default TrailsShow
