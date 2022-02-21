import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductsList from './components/ProductsList/ProductsList';
import LoginForm from "./components/LoginForm/LoginForm";
import MessagePage from "./components/MessagePage/MessagePage";
import Disconnect from "./components/Disconnect/Disconnect";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import { SocketContext, socket } from "./context/socket";
ReactDOM.render(
    <div className="container mt-5">
    <BrowserRouter>
        <SocketContext.Provider value={socket}>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route path="" element={<LoginForm />} />
                    <Route path="restaurant">
                        <Route path=":idRestaurant" element={<ProductsList />} />
                        <Route path=":idRestaurant/:idPlate" element={<ProductDetail />} />
                    </Route>
                    <Route path="login" element={<LoginForm />} />
                    <Route path="/already-logged" element={<MessagePage errorMessage={"Vous êtes déjà connecté"} />} />
                    <Route path="/is-connected" element={<LoginForm /> }/>
                    <Route path="/disconnect" element={<Disconnect  />} />
                </Route>
            </Routes>
        </SocketContext.Provider>
    </BrowserRouter>
    </div>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
