import React from 'react';
import './App.css';
import { Outlet } from 'react-router';
import {CookiesProvider} from "react-cookie";
import SlidingProvider from "./context/sliding";
import usePositionX from "./hooks/usePositionX";
function App() {
  const positionX = usePositionX();

  return (
      <>
          {positionX < 640 ? (
              <div className="App container mx-auto sm:hidden">
                  <CookiesProvider>
                      <SlidingProvider>
                          <Outlet />
                      </SlidingProvider>
                  </CookiesProvider>
              </div>
          ) : (
              <div className="hidden sm:flex flex-col items-center h-screen w-screen px-5">
                  <p className="h-full flex items-center text-2xl text-center">Vous n'êtes pas sur une version mobile. Utilisez votre smartphone 😇</p>
              </div>
          )}
      </>
  );
}

export default App;
