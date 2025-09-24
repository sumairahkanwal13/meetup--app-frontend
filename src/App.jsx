import { useState } from 'react'
import useFetch from './useFetch'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import EventCards from './components/EventCard'
import EventList from './components/EventList'
import './App.css'
import EventDetails from "./components/EventsDetailed";
import Header from './components/Header'
import Footer from "./components/Footer"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {
  return (
    <Router>
      <Header />
      <main className="container my-5">
        <Routes>
          <Route path="/" element={<EventList />} />
          <Route path="/events/:id" element={<EventDetails />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;