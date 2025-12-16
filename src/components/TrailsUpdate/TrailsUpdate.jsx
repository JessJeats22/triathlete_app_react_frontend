import './TrailsUpdate.css'
import { useState, useContext, useEffect } from 'react'
import { useNavigate, useParams, Navigate } from 'react-router'
import { trailsShow, trailsUpdate } from '../../services/trails'
import { UserContext } from '../../contexts/UserContext.jsx'
import countries from 'world-countries'
import ImageUploadField from '../ImageUploadField/ImageUploadField'


const TrailsUpdate = () => {

    const { user } = useContext(UserContext)
    const { trailId } = useParams()
    const navigate = useNavigate()

    const [errorData, setErrorData] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    const [formData, setFormData] = useState({
        name: '',
        trail_type: '',
        country: '',
        city_town: '',
        description: '',
        images: [],
    })

    const countryOptions = countries
        .map(c => c.name.common)
        .sort((a, b) => a.localeCompare(b))

    useEffect(() => {
        const getTrail = async () => {
            try {
                const { data } = await trailsShow(trailId)
                setFormData({
                    name: data.name,
                    trail_type: data.trail_type,
                    country: data.country,
                    city_town: data.city_town,
                    description: data.description || '',
                    images: data.images || [],
                })
            } catch (error) {
                console.log(error)
                setErrorData({ message: 'Could not load trail data' })
            } finally {
                setIsLoading(false)
            }
        }

        getTrail()
    }, [trailId])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const setTrailImage = (imageURL) => {
        setFormData(prev => ({
            ...prev,
            images: [...prev.images, imageURL],
        }))
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await trailsUpdate(trailId, formData)
            navigate(`/trail/${data.id}`)
        } catch (error) {
            console.log('STATUS:', error.response?.status)
            console.log('DATA:', error.response?.data)
            setErrorData(error.response?.data || {})
        }
    }

    if (!user) {
        return <Navigate to="/sign-in" />
    }

    if (isLoading) {
        return <p>Loading trail...</p>
    }

    return (
        <>
            <h1>Edit Trail</h1>

            <form onSubmit={handleSubmit}>
                <div className="form-control">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
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
                    <label htmlFor="city_town">City / Town</label>
                    <input
                        type="text"
                        name="city_town"
                        id="city_town"
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
                        value={formData.description}
                        onChange={handleChange}
                        rows="4"
                    />
                </div>

                <ImageUploadField
                    labelText="Upload Trail image"
                    setImage={setTrailImage}
                    imageURL={formData.images[0]}
                />

                <button type="submit">Update Trail</button>
            </form>

        </>

    )
}

export default TrailsUpdate