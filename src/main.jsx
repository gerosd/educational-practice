import React, {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Index from './index.tsx'
import Certification from "./pages/certification/Certification.jsx";
import Header from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";
import PageNotFound from "./pages/pagesNotFound/PageNotFound.tsx";
import Tests from "./pages/tests/Tests.jsx";
import "./assets/styles/main.scss";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path="/" element={<Index/>}/>
                <Route path="/tests" element={<Tests/>}/>
                <Route path="certification" element={<Certification/>}/>
                <Route path="*" element={<PageNotFound/>}/>
            </Routes>
        </BrowserRouter>
        <Footer/>
    </StrictMode>,
)
