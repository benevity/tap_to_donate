import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Layout } from '../styles/wrapper-components';
import AdminPortal from '../modules/adminPortal/adminPortal';
import DonorPage from '../modules/donorPage/donorPage';
import Login from '../modules/login/login';
import Home from "../modules/home/home";
export default function Links() {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route exact path="/login" element={<Login/>} />
                    <Route exact path="/admin" element={<AdminPortal/>} />
                    <Route exact path="/:sn" element={<DonorPage/>}/>
                    <Route exact path="/" element={<Home/>}/>
                </Routes>
            </Layout>
        </Router>
    )
}
