import { useState } from 'react';
import './SignUp.css'
import { signUpService } from '../../services/auth'
import { useNavigate } from 'react-router'



const SignUp = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "", 
        password: "",
        confirm_password: ""
    })

    const [errorData, setErrorData] = useState({})


    const navigate = useNavigate()

 
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
        setErrorData({ ...errorData, [e.target.name]: '' })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await signUpService(formData);
            navigate('/sign-in')
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
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>

                <div className="form-control">
                    <label hidden htmlFor="username">Username</label>
                    <input type="text" name="username" id="username" placeholder='Username' onChange={handleChange} />
                    {errorData.username && <p className='error-message'>{errorData.username}</p>}
                </div>


                <div className="form-control">
                    <label hidden htmlFor="email">Email</label>
                    <input type="text" name="email" id="email" placeholder='email' onChange={handleChange} />
                    {errorData.email && <p className='error-message'>{errorData.email}</p>}
                </div>

                <div className="form-control">
                    <label hidden htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" placeholder='password' onChange={handleChange} />
                    {errorData.password && <p className='error-message'>{errorData.password}</p>}
                </div>


                <div className="form-control">
                    <label hidden htmlFor="confirm_password">Re-type your password</label>
                    <input type="password" name="confirm_password" id="confirm_password" placeholder='Confirm Password' onChange={handleChange} />
                    {errorData.confirmPassword && <p className='error-message'>{errorData.confirm_password}</p>}
                </div>

                <button type="submit">Create account</button>

                {errorData.message && <p className='error-message'>{errorData.message}</p>}

            </form>

        </>
    )
}



export default SignUp