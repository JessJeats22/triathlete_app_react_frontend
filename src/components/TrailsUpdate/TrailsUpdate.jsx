import './TrailsUpdate.css'
import { useState } from 'react'


const TrailsUpdate = () => {

    const [formData, setFormData] = useState({
        name: '',
        trail_type: '',
        country: '',
        city_town: '',
        description: '',
        images: [],
    })



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