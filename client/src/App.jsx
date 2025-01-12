// src/App.jsx
import React from 'react';
import Header from './components/Home/Header.jsx';
import Hero from './components/Home/Hero.jsx';
import Features from './components/Home/Features.jsx';
import Footer from './components/Home/Footer.jsx';
import About from './components/Home/About.jsx';
import FAQ from './components/Home/Faq.jsx';

function App() {
  return (
    <div className="App">
      <Header />
      <Hero />
      <About/>
      <Features />
      <FAQ/>
      <Footer />
    </div>
  );
}

export default App;
