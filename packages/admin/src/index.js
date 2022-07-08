import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {RecoilRoot} from "recoil";
import Toast from "../src/components/Toast/Toast";
import 'react-toastify/dist/ReactToastify.css';
import Layout from "./components/Layout/Layout";
import Login from "./views/Login";
import Dashboard from "./views/Dashboard";
import AddRestaurant from "./views/AddRestaurant";


ReactDOM.render(
    <div className="h-full">
        <BrowserRouter>
            <RecoilRoot>
                <Routes>
                    <Route element={<Layout/>}>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/dashboard" element={<Dashboard/>}/>
                        <Route path="/add/restaurant" element={<AddRestaurant/>}/>
                    </Route>
                </Routes>
            </RecoilRoot>
        </BrowserRouter>
        <Toast/>
    </div>,
    document.getElementById('root')
);
