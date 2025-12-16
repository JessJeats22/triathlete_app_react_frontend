import './HomePage.css'
import { Link } from 'react-router'
import { useContext } from 'react'
import { UserContext } from '../../contexts/UserContext'

const HomePage = () => {
  const { user } = useContext(UserContext)

  return (
    <div className="home-container">
      <section className="hero">
        <h1 className="hero-title">
          🌍 TriAtlas
        </h1>

        <p className="hero-tagline">
          Train anywhere. Explore everywhere. 🏊‍♀️🚴‍♂️🏃‍♀️
        </p>
      </section>

      <section className="home-content">
        <p>
          <strong>TriAtlas</strong> is a community-built platform for
          <strong> triathletes who travel</strong> — whether you’re on holiday,
          visiting friends for the weekend, or working remotely in a new city.
        </p>

        <p>
          Discover and share <strong>swim, bike, and run trails</strong> from
          around the world. Keep up your fitness, explore new places, and get
          inspired by routes other athletes love 💚
        </p>

        <p>
          Each trail can include helpful <strong>points of interest</strong> like:
        </p>

        <ul className="home-list">
          <li>👀 Scenic viewpoints</li>
          <li>🚻 Toilet / water stops</li>
          <li>🚲 Bike shops & repair points</li>
          <li>☕ Coffee stops (because… obviously)</li>
        </ul>

        <p>
          Got a favourite route? Add it to TriAtlas and help fellow athletes
          train smarter wherever they are ✨
        </p>

        <div className="home-actions">
          {!user ? (
            <>
              <Link to="/sign-up" className="btn btn-primary">
                Sign Up 🚀
              </Link>
              <Link to="/sign-in" className="btn btn-secondary">
                Sign In 🔐
              </Link>
            </>
          ) : (
            <>
              <Link to="/trails" className="btn btn-primary">
                Explore Trails 🗺️
              </Link>
              <Link to="/trails/new" className="btn btn-secondary">
                Create a Trail ➕
              </Link>
            </>
          )}
        </div>
      </section>
    </div>
  )
}

export default HomePage
