import './TrailsShow.css'
import { useParams, useNavigate } from 'react-router'
import { useEffect, useState, useContext } from 'react'
import { trailsShow } from '../../services/trails'
import { UserContext } from '../../contexts/UserContext'
import LoadingIcon from '../LoadingIcon/LoadingIcon'

const TrailsShow = () => {
  const { trailId } = useParams()
  const navigate = useNavigate()
  const { user } = useContext(UserContext)

  const [trail, setTrail] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [errorData, setErrorData] = useState({})

  useEffect(() => {
    const getTrail = async () => {
      try {
        const { data } = await trailsShow(trailId)
        setTrail(data)
      } catch (error) {
        setErrorData(error.response?.data || {})
      } finally {
        setIsLoading(false)
      }
    }

    getTrail()
  }, [trailId])

  if (isLoading) {
    return <LoadingIcon />
  }

  if (errorData.message) {
    return <p className="error">{errorData.message}</p>
  }

  if (!trail) {
    return <p>Nothing to display.</p>
  }

  return (
    <div className="trail-show-container">
      <h1>hello</h1>
    </div>
  )
}

export default TrailsShow
