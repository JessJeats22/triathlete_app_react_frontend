import './App.css'
import { Routes, Route } from 'react-router'

import NavBar from './components/NavBar/NavBar';
import SignUp from './components/SignUp/SignUp';
import SignIn from './components/SignIn/SignIn'
import TrailsIndex from './components/TrailsIndex/TrailsIndex';
import TrailsCreate from './components/TrailsCreate/TrailsCreate';

const App = () => {
  
  return (
    <>
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={""} />
          <Route path="/sign-up" element ={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/trails" element ={<TrailsIndex />} />
          <Route path="/trails/new" element={<TrailsCreate />} />
        </Routes>
      </main>
    </>
  );
};

export default App