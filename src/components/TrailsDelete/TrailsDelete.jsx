import { useState } from 'react'
import { useNavigate } from 'react-router'
import { trailsDelete } from '../../services/trails'

const TrailsDelete = ({ trailId }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [errorData, setErrorData] = useState({})


    const navigate = useNavigate()

    const handleDelete = async () => {
        const sure = window.confirm('Are you sure you want to delete this trail?')
        if (!sure) return

        try {
            setIsLoading(true)
            await trailsDelete(trailId)
            navigate('/trails')
        } catch (error) {
            console.log(error)
            const { status, data } = error.response || {}
            if (status === 500) {
                setErrorData({ message: 'Something went wrong. Please try again.' })
            } else {
                setErrorData(data || {})
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <button
                onClick={handleDelete}
                disabled={isLoading}
                className="btn btn-primary"
            >
                {isLoading ? 'Deleting...' : 'Delete Trail'}
            </button>

            {errorData.message && (
                <p className="error-message">{errorData.message}</p>
            )}
        </>
    )
}

export default TrailsDelete
