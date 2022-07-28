import React from 'react';
import styled from '@emotion/styled';
import { Box, Card, Typography } from '@mui/material';

const FavoriteMovie = ({ topMovies }) => {
  return (
    <Container>
      {topMovies?.map(item => (
        <BestMovie key={item.review_id}>
          <BackgroundPoster img={item.movie.poster}>
            <Title variant="h3">{item.movie.title}</Title>
          </BackgroundPoster>
        </BestMovie>
      ))}
    </Container>
  );
};

const Container = styled(Box)`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 250px 250px;
  gap: 18px 24px;

  & div:first-of-type {
    grid-column: 1 / 3;
    grid-row: 1 / 3;
    // 자기의 첫번째 div만 선택하는 게 아니라, 자식 요소들에도 첫번째 자식 div 죄다 선택되는 문제
  }
`;

const BestMovie = styled(Card)`
  padding: 20px;
  border-radius: 8px;
`;

const BackgroundPoster = styled.div`
  display: flex;
  align-items: flex-end;
  width: 100%;
  height: 100%;
  background-image: url(${props => props.img});
  background-size: cover;
  background-position: center;
  border-radius: 8px;
`;

const Title = styled(Typography)`
  color: white;
  font-weight: bold;
  font-size: 24px;
`;

export default FavoriteMovie;
