import './TrailPOIs.css'
import { useEffect, useState, useContext } from 'react'
import { poisForTrail, createPoiForTrail } from '../../services/pois'
import LoadingIcon from '../LoadingIcon/LoadingIcon'
import { UserContext } from '../../contexts/UserContext'
import { deletePoi } from '../../services/pois'



const TrailPOIs = ({ trailId, newPoiLocation, setNewPoiLocation }) => {
  const [pois, setPois] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorData, setErrorData] = useState({})
  const [isExpanded, setIsExpanded] = useState(false)


  const { user } = useContext(UserContext)

  const [poiFormData, setPoiFormData] = useState({
    name: '',
    description: '',
  })

  const handlePoiChange = (e) => {
    const { name, value } = e.target
    setPoiFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handlePoiSubmit = async (e) => {
    e.preventDefault()

    if (!newPoiLocation) return

    try {
      const { data } = await createPoiForTrail(trailId, {
        name: poiFormData.name,
        description: poiFormData.description,
        latitude: newPoiLocation.lat,
        longitude: newPoiLocation.lng,
      })

      // Optimistically update POI list
      setPois(prev => [...prev, data])

      setPoiFormData({ name: '', description: '' })
      setNewPoiLocation(null)
    } catch (err) {
      console.error('Failed to create POI', err)
    }
  }

  const handleDeletePoi = async (poiId) => {
    try {
      await deletePoi(poiId)

      // Optimistically remove from UI
      setPois(prev => prev.filter(poi => poi.id !== poiId))
    } catch (err) {
      console.error('Failed to delete POI', err)
    }
  }



  useEffect(() => {
    const getPOIs = async () => {
      try {
        const { data } = await poisForTrail(trailId)
        setPois(data)
      } catch (error) {
        console.log(error)
        setErrorData(error.response?.data || {})
      } finally {
        setIsLoading(false)
      }
    }

    if (trailId) getPOIs()
  }, [trailId])

  if (isLoading) return <LoadingIcon />

  if (errorData.message) {
    return <p className="error-message">{errorData.message}</p>
  }

  return (
    <section className="trail-pois">
      <button
        className="poi-toggle"
        onClick={() => setIsExpanded(prev => !prev)}
        aria-expanded={isExpanded}
      >
        📍 Points of Interest
        <span className="poi-toggle-icon">
          {isExpanded ? '▲' : '▼'}
        </span>
      </button>


      {pois.length === 0 ? (
        <p className="empty-message">
          No points of interest added yet.
        </p>
      ) : (
        <ul className="poi-list">
          {pois.map(poi => (
            <li key={poi.id} className="poi-card">
              <h3>{poi.name}</h3>

              {user && user.id === poi.created_by && (
                <button
                  className="poi-delete-btn"
                  onClick={() => handleDeletePoi(poi.id)}
                  title="Delete POI"
                  aria-label="Delete POI"
                >
                  🗑
                </button>
              )}


              {poi.category && (
                <p className="poi-category">
                  {poi.category_type}
                </p>
              )}

              {poi.description && (
                <p>{poi.description}</p>
              )}

              <p className="poi-owner">
                Added by {poi.created_by.username}
              </p>
            </li>
          ))}
        </ul>
      )}

      {user && newPoiLocation && (
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

    </section>
  )
}

export default TrailPOIs
