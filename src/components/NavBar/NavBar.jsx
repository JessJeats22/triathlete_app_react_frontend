import './Navbar.css'
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
                            <Link to="/trails">All Trails</Link>
                            <Link to="/trails/new">Add Trail</Link>
                            <Link to="/me">Profile</Link>
                            <button onClick={handleSignOut}>Sign out</button>
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
