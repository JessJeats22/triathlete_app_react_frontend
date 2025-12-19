import './NavBar.css'
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router';



// Context
import { UserContext } from '../../contexts/UserContext';

const NavBar = () => {
    const { user, signOut } = useContext(UserContext);

    const navigate = useNavigate()

    const handleSignOut = () => {
        signOut();
        navigate('/');
    };


    localStorage.getItem('travelToken')

    return (
        <header className="navbar">
            <div className="navbar__inner">
                <div className="navbar__brand">
                    <Link to="/">🗺️ TriTrails</Link>
                </div>

                <nav className="navbar__links">
                    {user ? (
                        <>
                            <Link to="/trails">Explore Trails</Link>
                            <Link to="/trails/new">Build Custom Route</Link>
                            <Link to="/me">Your Profile</Link>

                            <button onClick={handleSignOut} className="navbar__signout">
                                Sign out <span className="navbar__username">({user.username})</span>
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/sign-in">Sign in</Link>
                            <Link to="/sign-up">Create an account</Link>
                        </>
                    )}
                </nav>
            </div>
        </header>
    )
}


export default NavBar;
