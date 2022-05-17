import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import List from './pages/List/List';
import Login from './pages/Login/Login';
import Movie from './pages/Movie/Movie';
// import Mypage from './pages/Mypage/Mypage';
import Nav from './components/Nav/Nav';
import Components from './components/Nav/Components';

function Router() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/list" element={<List />} />
        <Route path="/" element={<Login />} />
        <Route path="/movie/:id" element={<Movie />} />
        {/* <Route path="/mypage" element={<Mypage />} /> */}
        <Route path="/components" element={<Components />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
