import './App.css'
import { Routes, Route } from 'react-router'

import NavBar from './components/NavBar/NavBar';
import SignUp from './components/SignUp/SignUp';
import SignIn from './components/SignIn/SignIn'
import TrailsIndex from './components/TrailsIndex/TrailsIndex';
import TrailsCreate from './components/TrailsCreate/TrailsCreate';
import TrailsUpdate from './components/TrailsUpdate/TrailsUpdate'; 
import TrailsShow from './components/TrailsShow/TrailsShow'; 
import HomePage from './components/HomePage/HomePage'
import GpxTest from './pages/GpxTest'
import Profile from './components/Profile/Profile'





const App = () => {
  
  return (
    <>
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sign-up" element ={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/trails" element ={<TrailsIndex />} />
          <Route path="/trails/new" element={<TrailsCreate />} />
          <Route path="/trails/:trailId/edit" element={<TrailsUpdate />} />
          <Route path="/trails/:trailId" element={<TrailsShow />} />
          <Route path="/gpx-test" element={<GpxTest />} />
          <Route path="/me" element={<Profile />} />


        </Routes>
      </main>
    </>
  );
};

export default App