import './TrailPOIs.css'
import { useEffect, useState, useContext } from 'react'
import { poisForTrail } from '../../services/pois'
import LoadingIcon from '../LoadingIcon/LoadingIcon'

const TrailPOIs = ({ trailId }) => {
  const [pois, setPois] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorData, setErrorData] = useState({})

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
      <h2>📍 Points of Interest</h2>

      {pois.length === 0 ? (
        <p className="empty-message">
          No points of interest added yet.
        </p>
      ) : (
        <ul className="poi-list">
          {pois.map(poi => (
            <li key={poi.id} className="poi-card">
              <h3>{poi.name}</h3>

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
    </section>
  )
}

export default TrailPOIs
