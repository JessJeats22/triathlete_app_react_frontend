import './LoadingIcon.css'
import wolrdspinnerGIF from '../../assets/worldspinner.gif'

const LoadingIcon = () => {
  return (
    <div className="loading-icon">
      <img src={wolrdspinnerGIF} alt="Spinning icon" />
    </div>
  )
}

export default LoadingIcon