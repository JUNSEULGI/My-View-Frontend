import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import MyViewModal from '../../../components/MyViewModal/MyViewModal';
import MyStep from './MyStep';

function AddReview({ open, setOpen }) {
  const token = localStorage.getItem('token');

  const [movies, setMovies] = useState({ titles: [], ranks: [] });
  const [selected, setSelected] = useState({});
  const [movieDetail, setMovieDetail] = useState({});

  useEffect(() => {
    fetch('http://172.30.1.39:8000/movies/simple')
      .then(res => res.json())
      .then(result => {
        if (result.message === 'SUCCESS') {
          console.log(result);
          setMovies({ titles: result.titles, ranks: result.rank });
        }
      });
  }, []);

  console.log(movies);

  useEffect(() => {
    if (selected.title) {
      fetch(`http://172.30.1.56:8000/movies/detail/${selected.id}`)
        .then(res => res.json())
        .then(data => {
          console.log(data);
          setMovieDetail(data.movie_info);
        });
    }
  }, [selected]);

  // const uploadReview = () => {
  //   fetch('리뷰 업로드 api', {
  //     method: 'POST',
  //     headers: {
  //       Authorization: token,
  //     },
  //     body: JSON.stringify({
  //       rating: 4.0,
  //       content: '리뷰 내용오오오옹',
  //       date: 'Wed Jun 01 2022 14:51:08 GMT+0900 (한국 표준시)',
  //       place: 'CGV 성신여대점',
  //       movie_id: 1,
  //     }),
  //   });
  // };

  const closeModal = (_, reason) => {
    if (reason === 'backdropClick') return;
    setSelected({});
    setMovieDetail({});
    setOpen(false);
  };

  // const movies = [
  //   { title: '닥터스트레인지', rank: 1, id: 1 },
  //   { title: '어벤저스', rank: 2, id: 2 },
  //   { title: '블랙위도우', rank: 3, id: 3 },
  //   { title: '캡틴아메리카', rank: 4, id: 4 },
  //   { title: '토르', rank: 5, id: 5 },
  //   { title: '스파이더맨', rank: 6, id: 6 },
  //   { title: '아이언맨', rank: 7, id: 7 },
  // ];

  return (
    <MyViewModal
      open={open}
      closeModal={closeModal}
      titles={movies.titles}
      nowRunning={movies.ranks}
      selected={selected}
      setSelected={setSelected}
      breadcrumbs={<MyStep />}
      movieDetail={movieDetail}
    />
  );
}

// const StepBox = styled(Box)`
//   display: flex;
//   margin-bottom: 14px;
// `;

export default AddReview;