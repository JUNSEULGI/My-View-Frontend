import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import List from './pages/List/List';
import Login from './pages/Login/Login';
import Movie from './pages/Movie/Movie';
import People from './pages/People/People';
import Mypage from './pages/Mypage/Mypage';
import Components from './components/Components';
import Callback from './pages/Login/Callback';
import NotFound from './pages/Error/NotFound';
import Search from './pages/Search/Search';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/list" element={<List />} />
        <Route path="/" element={<Login />} />
        <Route path="/movie/:id" element={<Movie />} />
        <Route path="/people/:id" element={<People />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/search" element={<Search />} />
        <Route path="/components" element={<Components />} />
        <Route path="/login-callback/:id" element={<Callback />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
