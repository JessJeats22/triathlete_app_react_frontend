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
            </form>

        </>

    )
}

export default TrailsUpdate