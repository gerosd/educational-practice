import React, {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Index from './pages/index/index'
import Certification from "./pages/certification/Certification";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PageNotFound from "./pages/pagesNotFound/PageNotFound";
import Tests from "./pages/tests/Tests";
import "./assets/styles/main.scss";
import {TestPage} from "./pages/tests/test/TestPage";
import Telegram from './components/Telegram';
import { AchievementDisplay } from './components/AchievementDisplay';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

const root = createRoot(rootElement);

root.render(
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
            <AchievementDisplay />
        </BrowserRouter>
        <Telegram />
        <Footer/>
    </StrictMode>,
)
