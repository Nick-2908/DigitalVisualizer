import React from "react";
import ReactDOM from "react-dom/client"; 
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import NotFound from "./landingPage/notFound";
import Navbar from "./landingPage/NavBar";
import HomePage from "./landingPage/home/HomePage";
import Footer from "./landingPage/Footer";
import LoginPage from "./landingPage/loginPage/loginPage";
import AboutPage from "./landingPage/about/aboutPage"
import LearnMorePage from "./landingPage/learn/learnMore";
import SignupPage from "./landingPage/loginPage/SignupPage";
import { AuthProvider } from "./context/AuthContext"; 
import  ProfilePage from './landingPage/profile/ProfilePage';
import DashboardPage from "./landingPage/dashboard/DashboardPage";
import ConnectAccounts from "./landingPage/connect/ConnectAccounts";
import 'bootstrap/dist/css/bootstrap.min.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <AuthProvider>
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      {/* The main content area should grow to push the footer down */}
      <div style={{ flex: '1 0 auto' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/learn-more" element={<LearnMorePage />} />

          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/connect-accounts" element={<ConnectAccounts />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/profile" element={<ProfilePage/>}/>
          </Routes>
        
      </div>
      <Footer />
    </div>
    </AuthProvider>
  </BrowserRouter>
);