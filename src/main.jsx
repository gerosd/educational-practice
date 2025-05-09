import React, {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Index from './pages/index/index.tsx'
import Certification from "./pages/certification/Certification.tsx";
import Header from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";
import PageNotFound from "./pages/pagesNotFound/PageNotFound.tsx";
import Tests from "./pages/tests/Tests.tsx";
import "./assets/styles/main.scss";
import TestPage from "./pages/tests/TestPage.tsx";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path="/" element={<Index/>}/>
                <Route path="/tests" element={<Tests/>}/>
                <Route path="/test/:testId" element={<TestPage/>}/>
                <Route path="certification" element={<Certification/>}/>
                <Route path="*" element={<PageNotFound/>}/>
            </Routes>
        </BrowserRouter>
        <Footer/>
    </StrictMode>,
)
