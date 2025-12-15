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

    const [errorData, setErrorData] = useState({})



    const handleChange = (e) => {
        const input = e.target
        setFormData({ ...formData, [input.name]: input.value })
        setErrorData({ ...errorData, [input.name]: '' })
    }


  const navigate = useNavigate()

    const handleSubmit = async (e) => {
    e.preventDefault()
    try {
  
      const response = await signInService(formData)


      const token = response.data.token


      if (token) setToken(token)

      
      setUser(getUserFromToken())


      navigate('/')


        } catch (error) {
            console.log(error)
            if (error.response.status === 500) {
                setErrorData({ message: 'Something went wrong. Please try again.' })
            } else {
                setErrorData(error.response.data)
            }
        }
    }

    return (
        <>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>

                <div className="form-control">
                    <label hidden htmlFor="username">Username</label>
                    <input type="text" name="username" id="username" placeholder="Username" required onChange={handleChange} />
                    {errorData.username && <p className='error-message'>{errorData.username}</p>}
                </div>

                <div className="form-control">
                    <label hidden htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" placeholder="Password" required onChange={handleChange} />
                    {errorData.password && <p className='error-message'>{errorData.password}</p>}
                </div>

                <button type="submit">Sign in</button>

                {errorData.message && <p className='error-message'>{errorData.message}</p>}

            </form>

        </>
    )
}

export default SignIn