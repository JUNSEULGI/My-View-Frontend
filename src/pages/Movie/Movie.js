import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import MyViewLayout from '../../layout/Layout';
import { CardContainer } from './CardContainer';
import MovieInfo from './MovieInfo';
import Actor from './Actor';
import Trailer from './Trailer';
import NoReview from './NoReview';
import MyReview from './MyReview';
import MovieGallery from './MovieGallery';
import { Container } from '@mui/material';
import { Box } from '@mui/system';

function Movie() {
  const [movieData, setMovieData] = useState({});

  useEffect(() => {
    fetch('http://172.30.1.11:8000/movies/1')
      .then(res => res.json())
      .then(res => {
        // console.log(res.data);
        setMovieData(res.data);
      });
  }, []);

  const { title, description, release_date, country, category, genre, actor } =
    movieData;

  console.log(movieData);

  function MovieContainer() {
    return (
      <>
        <MovieBackGround>
          <MovieInfo />
          <ContainerTitle>출연/제작</ContainerTitle>
          <ActorContainer>
            <Box sx={{ display: 'flex', overflow: 'scroll' }}>
              {actor?.map(actor => (
                <Actor actor={actor} />
              ))}
            </Box>
          </ActorContainer>
          <NoReview />
          <ContainerTitle>리뷰</ContainerTitle>
          <Box sx={{ display: 'flex', justifyContent: 'end' }}>
            <MyReview />
          </Box>
          <ContainerTitle>예고편</ContainerTitle>
          <TrailerContainer>
            <Trailer />
            <Trailer />
            <Trailer />
            <Trailer />
          </TrailerContainer>
          <ContainerTitle>갤러리</ContainerTitle>
          <MovieGallery />
        </MovieBackGround>
      </>
    );
  }

  return <MyViewLayout movie center={<MovieContainer />} />;
}

export default Movie;

const MovieBackGround = styled.div`
  padding: 80px;
`;

const ContainerTitle = styled.h4`
  margin: 20px 0 6px;
  color: ${({ theme }) => theme.palette.common.white};
`;

const ActorContainer = styled(CardContainer)`
  display: block;
`;

const TrailerContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  -ms-overflow-style: none; /* Explorer */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none; /* Chrome */
  }
`;
