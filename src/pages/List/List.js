import React, { useState, useEffect } from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { userState, movieState, reviewState } from '../../state';
import { Box, Typography } from '@mui/material';
import styled from '@emotion/styled';
import MyViewLayout from '../../layout/Layout';
// import Aside from '../../components/Aside';
import MovieCard from './MovieCard';
import FavoriteMovie from './FavoriteMovie';
import MyViewModal from '../../components/MyViewModal/MyViewModal';
import MyStep from './MyStep';
import ReviewBox from '../../components/MyViewModal/ReviewBox';
import SearchBox from '../../components/MyViewModal/SearchBox';
import { BASE_URL } from '../../Modules/API';

function List() {
  function ListLayout() {
    const token = localStorage.getItem('access_token');
    const [userInfo] = useRecoilState(userState);
    const [movie, setMovie] = useRecoilState(movieState);
    const [review, setReview] = useRecoilState(reviewState);
    const resetMovie = useResetRecoilState(movieState);
    const resetReview = useResetRecoilState(reviewState);
    const [reviewList, setReviewList] = useState([]);
    const [open, setOpen] = useState(false);

    const closeModal = (_, reason) => {
      if (reason === 'backdropClick') return;
      resetMovie();
      resetReview();
      setOpen(false);
    };

    const showReview = item => {
      setMovie({ id: item.movie.id, title: item.movie.title });
      setReview({ ...review, review_id: item.review_id });
      setOpen(true);
    };

    useEffect(() => {
      fetch(`${BASE_URL}reviews/list`, {
        headers: {
          Authorization: token,
        },
      })
        .then(res => res.json())
        .then(data => {
          setReviewList(data.result);
        });
    }, []);

    const mockMovies = [
      {
        id: 1,
        title: '닥터 스트레인지',
        img: 'https://file2.nocutnews.co.kr/newsroom/image/2022/04/08/202204081311322351_0.jpg',
      },
      {
        id: 2,
        title: '블랙 위도우',
        img: 'https://file2.nocutnews.co.kr/newsroom/image/2022/04/08/202204081311322351_0.jpg',
      },
      {
        id: 3,
        title: '아이언맨',
        img: 'https://file2.nocutnews.co.kr/newsroom/image/2022/04/08/202204081311322351_0.jpg',
      },
    ];

    return (
      <>
        <Section>
          <SectionTitle variant="h3">
            {userInfo.nickname}님의 인생 영화
          </SectionTitle>
          <FavoriteMovie bestMovies={mockMovies} />
        </Section>
        <Section>
          <SectionTitle variant="h3">
            {userInfo.nickname}님이 저장한 영화 목록
          </SectionTitle>
          <CardContainer>
            {reviewList.length > 0 &&
              reviewList.slice(0, 7).map(review => (
                <MovieCard
                  key={review.review_id}
                  data={review}
                  showReview={() => {
                    showReview(review);
                  }}
                />
              ))}
            <MovieCard setOpen={setOpen} />
          </CardContainer>
        </Section>
        <MyViewModal
          open={open}
          closeModal={closeModal}
          breadcrumbs={<MyStep />}
          content={movie.id ? <ReviewBox /> : <SearchBox />}
        />
      </>
    );
  }

  return (
    <MyViewLayout
      // leftMenu={<Aside />}
      center={<ListLayout />}
    />
  );
}

const Section = styled(Box)`
  margin: 80px 0;
`;

const CardContainer = styled(Box)`
  display: grid;
  grid-template-columns: repeat(4, 270px);
  gap: 24px;
`;

const SectionTitle = styled(Typography)`
  margin: 15px 0;
  color: ${({ theme }) => theme.palette.common.white};
  font-size: 24px;
  font-weight: bold;
`;

export default List;
