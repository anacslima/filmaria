import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from '../components/Header';
import Favoritos from '../pages/Favoritos';
import Filme from '../pages/Filme';
import Home from '../pages/Home';

export default function AppRoutes() {
    return(
        <BrowserRouter>
        <Header />
        <Routes>
            <Route path='/'          element={<Home />} />
            <Route path='/filme/:id' element={<Filme />} />
            <Route path='/favoritos' element={<Favoritos />}/>
        </Routes>
        </BrowserRouter>
    )
}