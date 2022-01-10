import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Outlet } from 'react-router';
import {CookiesProvider} from "react-cookie";

function App() {
  return (
    <div className="App container mx-auto">
        <CookiesProvider>
          <Outlet />
        </CookiesProvider>
    </div>
  );
}

export default App;
