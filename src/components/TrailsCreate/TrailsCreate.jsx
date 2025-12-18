import './TrailsCreate.css'
import { useState, useContext } from 'react'
import { trailsCreate } from '../../services/trails'
import { useNavigate, Navigate } from 'react-router'
import { UserContext } from '../../contexts/UserContext.jsx'
import countries from 'world-countries'
import ImageUploadField from '../ImageUploadField/ImageUploadField'
import GpxUploadField from '../GpxUploadField/GpxUploadField'


const TrailsCreate = () => {
  const { user } = useContext(UserContext)



  const [errorData, setErrorData] = useState({})
  const [formData, setFormData] = useState({
    name: '',
    trail_type: '',
    country: '',
    city_town: '',
    description: '',
    images: [],
    gpx_url: '',
  })

  const navigate = useNavigate()

  const countryOptions = countries
    .map(c => c.name.common)
    .sort((a, b) => a.localeCompare(b))



  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  // IMAGE UPLOADER HANDLER
  const setTrailImage = (imageURL) => {
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, imageURL],
    }));
  };

  const setGpxUrl = (url) => {
    setFormData(prev => ({
      ...prev,
      gpx_url: url,
    }))
  }


  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await trailsCreate(formData)
      navigate(`/trails/${data.id}`)
    } catch (error) {
      console.log('STATUS:', error.response?.status)
      console.log('DATA:', error.response?.data)
      if (error.response?.status === 500) {
        return setErrorData({ message: 'Something went wrong. Please try again.' })
      }
      setErrorData(error.response?.data || {})
    }
  }

  if (!user) {
    return <Navigate to="/sign-in" />
  }

  const renderError = (field) => {
    if (!errorData[field]) return null
    return <p className="form-error">{errorData[field]}</p>
  }


  return (
    <div className="trail-create-container">
      <h1 className="trail-create-title">Create a New Trail</h1>

      <form onSubmit={handleSubmit} className="trail-create-card">


        <section className="form-section">


          <div className="form-control">
            <label>Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Trail name"
              required
            />
          </div>

          <div className="form-control">
            <label>Trail Type</label>
            <select
              name="trail_type"
              value={formData.trail_type}
              onChange={handleChange}
              required
            >
              <option value="">Select trail type</option>
              <option value="swim">Swim</option>
              <option value="bike">Bike</option>
              <option value="run">Run</option>
            </select>
          </div>
        </section>


        <section className="form-section">


          <div className="form-control">
            <label>Country</label>
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
            >
              <option value="">Select country</option>
              {countryOptions.map(country => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>

          <div className="form-control">
            <label>City / Town</label>
            <input
              name="city_town"
              value={formData.city_town}
              onChange={handleChange}
              placeholder="City or town"
              required
            />
          </div>
        </section>

        <section className="form-section">


          <GpxUploadField
            labelText="Upload GPX route"
            setGpxUrl={setGpxUrl}
            gpxUrl={formData.gpx_url}
          />
        </section>

        <section className="form-section">

          <div className="form-control">
            <textarea
              name="description"
              rows="4"
              placeholder="Describe the trail..."
              value={formData.description}
              onChange={handleChange}
            />
          </div>
        </section>


        <section className="form-section">

          <ImageUploadField
            labelText="Upload trail image"
            fieldName="image"
            setImage={setTrailImage}
            imageURL={formData.images}
          />
        </section>

        {errorData.message && (
          <p className="form-error">{errorData.message}</p>
        )}

        <button type="submit" className="primary-btn">
          Create Trail
        </button>
      </form>
    </div>
  )
}

export default TrailsCreate