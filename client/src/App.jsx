import React from 'react';
import './style.css';
import './bootstrap.min.css';
import Body from './components/Body';
import BackToTopButton from './components/BodyParts/backToTop/BackToTopButton';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import AboutPage from './components/Pages/AboutPage';
import ClassesPage from './components/Pages/ClassesPage';
import ContactPage from './components/Pages/ContactPage';
import RewiewsPage from './components/Pages/RewiewsPage';
import TrainersPage from './components/Pages/TrainersPage';
import Login from './components/Pages/Login/Login';
import { AuthProvider } from './context/AuthContext';
import Profile from './components/Pages/ProfilePage';
import UsersTable from './components/Pages/UsersTable';
function App() {
  return (
    <AuthProvider><BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Body />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/classes' element={<ClassesPage />} />
          <Route path='/trainers' element={<TrainersPage />} />
          <Route path='/reviews' element={<RewiewsPage />} />
          <Route path='/contact' element={<ContactPage />} />
          <Route path='/users' element={<UsersTable/>} />
          
          <Route path='/login' element={<Login />} />
          <Route path="/profile" element={<Profile/>} />
        </Route>
      </Routes>
      <BackToTopButton />
    </BrowserRouter></AuthProvider>

  );
}

export default App;