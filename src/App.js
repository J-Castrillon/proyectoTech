import './App.css';
import Header from './Components/Header';
import Features from './Components/Features';
import { useState } from 'react';
import Footer from './Components/Footer';

function App() {

  const [search, setSearch] = new useState("");

  return (
    <div className="App display-center">
      <Header setSearch={setSearch} />
      <Features search={search} />
      <Footer />
    </div>
  );
}

export default App;
