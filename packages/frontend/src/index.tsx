import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import ProductsList from './views/ProductsList/ProductsList';
import LoginForm from "./views/LoginForm/LoginForm";
import Profile from "./views/Profile/Profile";
import OrdersAccount from "./views/Profile/OrdersAccount";
import {SettingsAccount} from "./views/Profile/SettingsAccount";
import Disconnect from "./components/Disconnect/Disconnect";
import ProductDetail from "./views/ProductDetail/ProductDetail";
import {socket, SocketContext} from "./context/socket";
import {RecoilRoot} from "recoil";
import Toast from "../src/components/Toast/Toast";
import 'react-toastify/dist/ReactToastify.css';
import RegisterForm from './components/Register/RegisterForm';
import ForgetPwd from "./views/ForgetPwd/ForgetPwd";
import ChangePwd from "./views/ForgetPwd/ChangePwd";
import ReadQRCode from "./views/QRCode/ReadQRCode";


ReactDOM.render(
    <div className="container mt-5">
        <BrowserRouter>
            <SocketContext.Provider value={socket}>
                <RecoilRoot>
                    <Routes>
                        <Route path="/" element={<App/>}>
                            <Route path="" element={<LoginForm/>}/>
                            <Route path="restaurant">
                                <Route path=":idRestaurant/:idTable" element={<ProductsList/>}/>
                                <Route path=":idRestaurant/:idPlate" element={<ProductDetail/>}/>
                            </Route>
                            <Route path="login" element={<LoginForm/>}/>
                            <Route path="scan" element={<ReadQRCode/>}/>
                            <Route path="register" element={<RegisterForm/>}/>
                            <Route path="profile">
                                <Route path="" element={<Profile/>}/>
                                <Route path="settings" element={<SettingsAccount/>}/>
                                <Route path="orders" element={<OrdersAccount/>}/>
                            </Route>
                            <Route path={"/forgot-password"} element={<ForgetPwd/>}/>
                            <Route path={"/update-password"} element={<ChangePwd/>}/>
                            <Route path="/is-connected" element={<LoginForm/>}/>
                            <Route path="/disconnect" element={<Disconnect/>}/>
                        </Route>
                    </Routes>
                </RecoilRoot>
            </SocketContext.Provider>
        </BrowserRouter>
        <Toast/>
    </div>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
