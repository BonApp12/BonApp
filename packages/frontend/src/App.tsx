import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Outlet } from 'react-router';
import {CookiesProvider} from "react-cookie";
import SlidingProvider from "./context/sliding";
function App() {
  return (
    <div className="App container mx-auto">
        <CookiesProvider>
            <SlidingProvider>
                <Outlet />
            </SlidingProvider>
        </CookiesProvider>
    </div>
  );
}

export default App;
