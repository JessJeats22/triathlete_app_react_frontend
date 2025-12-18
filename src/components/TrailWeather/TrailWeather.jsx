import { useEffect, useState } from 'react'
import { getTrailWeather } from '../../services/weather'
import './TrailWeather.css'

const TrailWeather = ({ trailId }) => {
  const [weather, setWeather] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const { data } = await getTrailWeather(trailId)
        setWeather(data)
      } catch (err) {
        setError('Weather unavailable')
      } finally {
        setIsLoading(false)
      }
    }

    fetchWeather()
  }, [trailId])

  if (isLoading) return <p>Loading weather…</p>
  if (error) return <p>{error}</p>
  if (!weather) return null

  return (
    <div className="trail-weather-card">
      <h3 className="weather-title">Weather</h3>

      <ul className="weather-current">
        <li>
          <span className="label">Temperature</span>
          <span className="value">{Math.round(weather.temp)}°C</span>
        </li>
        <li>
          <span className="label">Feels like</span>
          <span className="value">{Math.round(weather.feels_like)}°C</span>
        </li>
        <li>
          <span className="label">Wind</span>
          <span className="value">{weather.wind} m/s</span>
        </li>
      </ul>
    </div>
  )
}

export default TrailWeather
