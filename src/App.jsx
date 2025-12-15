import './App.css'
import { Routes, Route } from 'react-router'

import NavBar from './components/NavBar/NavBar';
import SignUp from './components/SignUp/SignUp';

const App = () => {
  
  return (
    <>
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={<NavBar />} />
          <Route path="/sign-up" element ={<SignUp />} />
        </Routes>
      </main>
    </>
  );
};

export default App