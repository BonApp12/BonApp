import React from 'react';
import logo from './logo.svg';
import './App.css';
import SearchBar from "./components/SearchBar/SearchBar";
import { Outlet } from 'react-router';

function App() {
  return (
    <div className="App container mx-auto">
      <Outlet />
    </div>
  );
}

export default App;
