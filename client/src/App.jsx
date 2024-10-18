// src/App.jsx
import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Footer from './components/Footer';
import About from './components/About';

function App() {
  return (
    <div className="App">
      <Header />
      <Hero />
      <About/>
      <Features />
      <Footer />
    </div>
  );
}

export default App;
