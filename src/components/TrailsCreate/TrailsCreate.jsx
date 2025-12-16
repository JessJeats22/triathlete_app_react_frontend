import './TrailsCreate.css'
import { useState, useContext } from 'react'
import { trailsCreate } from '../../services/trails'
import { useNavigate, Navigate } from 'react-router'
import { UserContext } from '../../contexts/UserContext.jsx'
import countries from 'world-countries'
import ImageUploadField from '../ImageUploadField/ImageUploadField'

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

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await trailsCreate(formData)
            navigate(`/trail/${data.id}`)
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

    return (
        <>
            <h1>Add your own Trail!</h1>

            <form onSubmit={handleSubmit}>
                <div className="form-control">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-control">
                    <label htmlFor="trail_type">Trail Type</label>
                    <select
                        name="trail_type"
                        id="trail_type"
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

                <div className="form-control">
                    <label htmlFor="country">Country</label>
                    <select
                        name="country"
                        id="country"
                        value={formData.country}
                        onChange={handleChange}
                        required>
                        <option value="">Select country</option>
                        {countryOptions.map(country => (
                            <option key={country} value={country}>{country}</option>
                        ))}
                    </select>
                </div>

                <div className="form-control">
                    <label htmlFor="city_town">City / Town</label>
                    <input
                        type="text"
                        name="city_town"
                        id="city_town"
                        placeholder="City or town"
                        value={formData.city_town}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-control">
                    <label htmlFor="description">Description</label>
                    <textarea
                        name="description"
                        id="description"
                        placeholder="Describe the trail..."
                        value={formData.description}
                        onChange={handleChange}
                        rows="4"
                    />
                </div>

                <ImageUploadField
                    labelText="Upload Travel Post Image"
                    fieldName="image"
                    setImage={setTrailImage}
                    imageURL={formData.images}
                />


                <button type="submit">Create Trail</button>
            </form>
        </>
    )
}

export default TrailsCreate
