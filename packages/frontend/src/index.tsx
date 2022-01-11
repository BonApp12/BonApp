import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductsList from './components/ProductsList/ProductsList';
import RestaurantManager from "./components/RestaurantManager/RestaurantManager";
import LoginForm from "./components/LoginForm/LoginForm";
import MessagePage from "./components/MessagePage/MessagePage";
ReactDOM.render(
    <div className="container mt-5">
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />}>
                <Route path="restaurant">
                    <Route path=":idRestaurant" element={<ProductsList />} />
                    <Route path=":idRestaurant/manage" element={<RestaurantManager />} />
                </Route>
                <Route path="login" element={<LoginForm />} />
                <Route path="/already-logged" element={<MessagePage errorMessage={"Vous êtes déjà connecté"} />} />
            </Route>
        </Routes>
    </BrowserRouter>
    </div>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
