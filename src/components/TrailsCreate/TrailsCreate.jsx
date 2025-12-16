import './TrailsCreate.css'
import { useEffect, useState, useContext } from 'react'
import { trailsIndex, trailsCreate } from '../../services/trails'
import { useNavigate, Navigate } from 'react-router'
import { UserContext } from '../../contexts/UserContext.jsx'

const TrailsCreate = () => {
    const { user } = useContext(UserContext)

    const [trails, setTrails] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [errorData, setErrorData] = useState({})
    const [formData, setFormData] = useState({
        name: '',
        trail_type: '',
        country: '',
        city_town: '',
        description: '',
        images: '',
    })

    const navigate = useNavigate()

    useEffect(() => {
        const getData = async () => {
            try {
                const { data } = await trailsIndex()
                setTrails(data)
            } catch (error) {
                console.log(error)
                setErrorData(error.response?.data || {})
            } finally {
                setIsLoading(false)
            }
        }

        getData()
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await createTrails(formData)
            navigate(`/trail/${data.id}`)
        } catch (error) {
            console.log(error)
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
                    <input
                        type="text"
                        name="country"
                        id="country"
                        placeholder="Country"
                        value={formData.country}
                        onChange={handleChange}
                        required
                    />
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

                <div className="form-control">
                    <label htmlFor="images">Image URL</label>
                    <input
                        type="text"
                        name="images"
                        id="images"
                        placeholder="https://example.com/image.jpg"
                        value={formData.images}
                        onChange={handleChange}
                    />
                </div>





                <button type="submit">Create Trail</button>
            </form>
        </>
    )
}

export default TrailsCreate
