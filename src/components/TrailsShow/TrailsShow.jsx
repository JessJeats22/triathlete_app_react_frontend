import './TrailsShow.css'
import { useParams, useNavigate, Link } from 'react-router'
import { useEffect, useState, useContext } from 'react'
import { trailsShow } from '../../services/trails'
import { UserContext } from '../../contexts/UserContext'
import LoadingIcon from '../LoadingIcon/LoadingIcon'
import TrailsDelete from '../TrailsDelete/TrailsDelete'
import TrailPOIs from '../TrailPOIs/TrailPOIs'
import TrailMap from '../TrailMap/TrailMap'
import { createPoiForTrail } from '../../services/pois'





const TrailsShow = () => {

    const { trailId } = useParams()
    const navigate = useNavigate()
    const { user } = useContext(UserContext)

    const [trail, setTrail] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [errorData, setErrorData] = useState({})
    const [newPoiLocation, setNewPoiLocation] = useState(null)


    const [poiFormData, setPoiFormData] = useState({
        name: '',
        description: '',
    })


    const handlePoiChange = (e) => {
        const { name, value } = e.target

        console.log('Typing:', {
            field: name,
            value: value,
        })
        setPoiFormData(prev => ({
            ...prev,
            [name]: value,
        }))
    }

    const handlePoiSubmit = async (e) => {
        e.preventDefault()

        try {
            await createPoiForTrail(trailId, {
                name: poiFormData.name,
                category_type: poiFormData.category_type,
                city_town: poiFormData.city_town,
                description: poiFormData.description,
                latitude: newPoiLocation.lat,
                longitude: newPoiLocation.lng,
            })

            // Reset form state
            setPoiFormData({ name: '', description: '' })
            setNewPoiLocation(null)

            // Refresh trail data so POI appears on map
            const { data } = await trailsShow(trailId)
            console.log('NEW POI LOCATION IN SHOW:', newPoiLocation)
            setTrail(data)

        } catch (err) {
            console.error('Failed to create POI:')
            console.error('STATUS:', err.response?.status)
            console.error('DATA:', err.response?.data)
            console.error('Failed to create POI:', err.response?.data || err)
        }
    }



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
            <h1 className="trail-title">{trail.name}</h1>

           
            <div className="trail-main-layout">

        
                <section className="trail-box trail-details-box">
                   

                    <div className="trail-details-header">
                        <ul className="trail-meta">
                            <li>
                                <span className="label">Created by</span>
                                <span className="value">{trail.created_by.username}</span>
                            </li>
                            <li>
                                <span className="label">Trail Type</span>
                                <span className="value">{trail.trail_type}</span>
                            </li>
                            <li>
                                <span className="label">Country</span>
                                <span className="value">{trail.country}</span>
                            </li>
                            <li>
                                <span className="label">City / Town</span>
                                <span className="value">{trail.city_town}</span>
                            </li>
                        </ul>

                        {trail.images?.length > 0 && (
                            <img
                                src={trail.images[0]}
                                alt={trail.name}
                                className="trail-image"
                            />
                        )}
                    </div>

                    {trail.description && (
                        <div className="trail-description">
                            <p>{trail.description}</p>
                        </div>
                    )}

                    <div className="trail-actions">
                        {user && user.id === trail.created_by.id && (
                            <>
                                <Link to={`/trails/${trailId}/edit`} className="btn btn-primary">
                                    Edit Trail
                                </Link>
                                <TrailsDelete trailId={trailId} />
                            </>
                        )}
                        <Link to="/trails" className="btn btn-secondary">
                            Back to Trails
                        </Link>
                    </div>
                </section>

              
                <aside className="trail-box trail-poi-box">
                  

                    <TrailPOIs trailId={trailId} />

                    {newPoiLocation && (
                        <section className="poi-form">
                            <h3>Add a Point of Interest</h3>

                            <p>
                                Location: {newPoiLocation.lat.toFixed(5)},{" "}
                                {newPoiLocation.lng.toFixed(5)}
                            </p>

                            <form onSubmit={handlePoiSubmit}>
                                <div className="form-control">
                                    <label>Name</label>
                                    <input
                                        name="name"
                                        value={poiFormData.name}
                                        onChange={handlePoiChange}
                                    />
                                </div>

                                <div className="form-control">
                                    <label>Description</label>
                                    <textarea
                                        name="description"
                                        rows="3"
                                        value={poiFormData.description}
                                        onChange={handlePoiChange}
                                    />
                                </div>

                                <button type="submit">Save POI</button>
                            </form>
                        </section>
                    )}
                </aside>

            </div>

        
            <section className="trail-box trail-map-box">
                <h2 className="box-title">Map</h2>

                <TrailMap
                    latitude={trail.latitude}
                    longitude={trail.longitude}
                    gpxUrl={trail.gpx_url}
                    pois={trail.points_of_interest}
                    onMapClick={user ? setNewPoiLocation : null}
                />
            </section>
        </div>
    )
}

export default TrailsShow
