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
import { TRAIL_TYPE_DISPLAY } from '../../utils/trailTypeDisplay'
import { deleteTrailImage } from '../../services/trails'
import TrailWeather from '../TrailWeather/TrailWeather'
import { favouriteTrail, unfavouriteTrail } from '../../services/trails'




const TrailsShow = () => {

    const { trailId } = useParams()
    const navigate = useNavigate()
    const { user } = useContext(UserContext)
    

     if (!user) {
        return (
            <div className="trail-details-container">
                <p className="auth-message">
                    Please{' '}
                    <Link to="/sign-in" className="auth-link">
                        sign in
                    </Link>{' '}
                    or{' '}
                    <Link to="/sign-up" className="auth-link">
                        create an account
                    </Link>{' '}
                    to view this trail.
                </p>
            </div>
        )
    }


    const [trail, setTrail] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [errorData, setErrorData] = useState({})
    const [newPoiLocation, setNewPoiLocation] = useState(null)
    const images = trail?.images || []
    const [currentImageIndex, setCurrentImageIndex] = useState(0)

const handleNextImage = () => {
  setCurrentImageIndex(prev =>
    (prev + 1) % images.length
  )
}

const handlePrevImage = () => {
  setCurrentImageIndex(prev =>
    (prev - 1 + images.length) % images.length
  )
}


    const handleDeleteImage = async (imageUrl) => {
        try {
            await deleteTrailImage(trailId, imageUrl)

            // Update UI without refetching
            setTrail(prev => ({
                ...prev,
                images: prev.images.filter(img => img !== imageUrl),
            }))
        } catch (error) {
            console.error("Failed to delete image", error)
        }
    }

    const handleToggleFavourite = async () => {
        if (!user) return

        const wasFavourited = trail.is_favourited

        // Optimistic update
        setTrail(prev => ({
            ...prev,
            is_favourited: !wasFavourited,
        }))

        try {
            if (wasFavourited) {
                await unfavouriteTrail(trailId)
            } else {
                await favouriteTrail(trailId)
            }
        } catch (err) {
            // Roll back on error
            setTrail(prev => ({
                ...prev,
                is_favourited: wasFavourited,
            }))
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


                        <div className="trail-info-column">
                            <ul className="trail-meta">
                                <li>
                                    <span className="label">Created by</span>
                                    <span className="value">{trail.created_by.username}</span>
                                </li>
                                <li>
                                    <span className="label">Trail Type</span>
                                    <span className="value">
                                        {TRAIL_TYPE_DISPLAY[trail.trail_type]?.emoji}{' '}
                                        {TRAIL_TYPE_DISPLAY[trail.trail_type]?.label}
                                    </span>
                                </li>
                                <li>
                                    <span className="label">Country</span>
                                    <span className="value">{trail.country}</span>
                                </li>
                                <li>
                                    <span className="label">City / Town</span>
                                    <span className="value">{trail.city_town}</span>
                                </li>


                                {user && (
                                    <li className="trail-favourite-row">
                                        <span className="label">
                                            {trail.is_favourited ? 'Unfavourite' : 'Favourite'}
                                        </span>
                                        <button
                                            className={`favourite-btn ${trail.is_favourited ? 'active' : ''}`}
                                            onClick={handleToggleFavourite}
                                            aria-label="Toggle favourite"
                                            title={trail.is_favourited ? 'Remove from favourites' : 'Add to favourites'}
                                        >
                                            {trail.is_favourited ? '❤️' : '🤍'}
                                        </button>
                                    </li>

                                )}



                            </ul>


                            <ul className="trail-metrics-list">
                                {trail.distance_km !== null && (
                                    <li>
                                        <span className="metric-icon">📏</span>
                                        <span className="metric-label">Distance</span>
                                        <span className="metric-value">{trail.distance_km} km</span>
                                    </li>
                                )}
                                {trail.elevation_gain !== null && (
                                    <li>
                                        <span className="metric-icon">⬆️</span>
                                        <span className="metric-label">Elevation gain</span>
                                        <span className="metric-value">{trail.elevation_gain} m</span>
                                    </li>
                                )}
                            </ul>
                        </div>

                    
                        {images.length > 0 && (
  <div className="trail-image-carousel">

    <button
      className="carousel-btn carousel-btn--left"
      onClick={handlePrevImage}
      aria-label="Previous image"
    >
      ◀
    </button>

    <div className="carousel-image-wrapper">
      <img
        src={images[currentImageIndex]}
        alt="Trail"
        className="carousel-image"
      />

      {user?.id === trail.created_by.id && (
        <button
          className="delete-image-btn"
          onClick={() => handleDeleteImage(images[currentImageIndex])}
        >
          🗑
        </button>
      )}
    </div>

    <button
      className="carousel-btn carousel-btn--right"
      onClick={handleNextImage}
      aria-label="Next image"
    >
      ▶
    </button>

  </div>
)}

                    </div>

                    {/* DESCRIPTION — FULL WIDTH */}
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

                <aside className="trail-sidebar">

                    <section className="trail-box trail-poi-box">
                        <TrailPOIs
                            trailId={trailId}
                            trailOwnerId={trail.created_by.id}
                            newPoiLocation={newPoiLocation}
                            setNewPoiLocation={setNewPoiLocation}
                        />

                    </section>

                    {trail.latitude && trail.longitude && (
                        <section className="trail-box trail-weather-box">
                            <TrailWeather trailId={trailId} />
                        </section>
                    )}

                </aside>


            </div>

            {/* MAP */}
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
