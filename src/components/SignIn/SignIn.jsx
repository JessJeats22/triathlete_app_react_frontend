import './SignIn.css'
import { useState, useContext } from 'react'
import { signInService } from '../../services/auth'
import { getUserFromToken, setToken } from '../../utils/token'
import { useNavigate } from 'react-router'

// Context
import { UserContext } from '../../contexts/UserContext'

const SignIn = () => {

    const { setUser } = useContext(UserContext)
    // State
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    })

    const [error, setError] = useState('')



    const handleChange = (e) => {
        const input = e.target
        setFormData({ ...formData, [input.name]: input.value })
        setError('')

    }


    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {

            const response = await signInService(formData)


            const token = response.data.access

            if (token) {
                setToken(token)
                setUser(getUserFromToken())
            }

            navigate('/')


        } catch (error) {
            console.log(error)

            const message =
                error.response?.data?.detail ||
                'Invalid username or password.'

            setError(message)

        }
    }

    return (
        <>
            <h1>Sign In</h1>

            <form onSubmit={handleSubmit}>

                <div className="form-control">
                    <label hidden htmlFor="username">Username</label>
                    <input type="text" name="username" id="username" placeholder="Username" required onChange={handleChange} />

                </div>

                <div className="form-control">
                    <label hidden htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" placeholder="Password" required onChange={handleChange} />

                </div>

                {error && <p className="error-message">{error}</p>}

                <button type="submit">Sign in</button>

           

            </form>

        </>
    )
}

export default SignIn