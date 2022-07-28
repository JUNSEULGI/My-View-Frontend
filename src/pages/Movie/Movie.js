import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import { useRecoilState } from 'recoil';
import { movieState } from '../../state';
import MyViewLayout from '../../layout/Layout';
import { BASE_URL } from '../../Modules/API';
import {
  CardContainer,
  MovieInfo,
  Actor,
  Trailer,
  NoReview,
  MyReview,
  MovieGallery,
} from '../Movie';
import MyViewModal from '../../components/MyViewModal/MyViewModal';
import { Typography } from '@mui/material';
import OnlyMovieReview from './OnlyMovieReview';

function Movie() {
  const params = useParams();
  const access_token = localStorage.getItem('access_token');
  const [movie, setMovie] = useRecoilState(movieState);
  const [review, setReview] = useState();
  const [open, setOpen] = useState(false);
  console.log(review);
  const openModal = () => setOpen(true);

  const closeModal = (_, reason) => {
    if (reason === 'backdropClick') return;
    setOpen(false);
  };

  useEffect(() => {
    fetch(`${BASE_URL}reviews/movie/${params.id}`, {
      headers: {
        Authorization: access_token,
      },
    })
      .then(res => res.json())
      .then(res => {
        if (res.message === 'REVIEW_DOSE_NOT_EXISTS') return;
        setReview(res.result);
      });
  }, [params.id]);

  const moviea = {
    movie_info: {
      id: 1,
      title: '범죄도시2',
      en_title: 'The Roundup',
      description:
        '“느낌 오지? 이 놈 잡아야 하는 거”\n\n가리봉동 소탕작전 후 4년 뒤, 금천서 강력반은 베트남으로 도주한 용의자를 인도받아 오라는 미션을 받는다. 괴물형사 ‘마석도’(마동석)와 ‘전일만’(최귀화) 반장은 현지 용의자에게서 수상함을 느끼고, 그의 뒤에 무자비한 악행을 벌이는 ‘강해상’(손석구)이 있음을 알게 된다. ‘마석도’와 금천서 강력반은 한국과 베트남을 오가며 역대급 범죄를 저지르는 ‘강해상’을 본격적으로 쫓기 시작하는데...\n\n나쁜 놈들 잡는 데 국경 없다!\n통쾌하고 화끈한 범죄 소탕 작전이 다시 펼쳐진다!',
      running_time: 106,
      age: 15,
      ratings: '5.0',
      release_date: '2022-05-30',
      country: '한국',
      category: 'movie',
      genre: ['코미디', '액션'],
      platform_name: '넷플릭스',
      platform_logo_image:
        'https://myviewjjky.s3.ap-northeast-2.amazonaws.com/image/platform/Netfilx.png',
      actor: [
        {
          id: 1,
          name: '마동석',
          country: '한국',
          image:
            'https://myviewjjky.s3.ap-northeast-2.amazonaws.com/image/actor/%E1%84%86%E1%85%A1%E1%84%83%E1%85%A9%E1%86%BC%E1%84%89%E1%85%A5%E1%86%A8.jpeg',
          role: '주연',
          role_name: '마석도',
        },
        {
          id: 2,
          name: '최귀화',
          country: '한국',
          image:
            'https://myviewjjky.s3.ap-northeast-2.amazonaws.com/image/actor/%E1%84%87%E1%85%A1%E1%86%A8%E1%84%8C%E1%85%B5%E1%84%92%E1%85%AA%E1%86%AB.jpeg',
          role: '주연',
          role_name: '강해상',
        },
        {
          id: 3,
          name: '박지환',
          country: '한국',
          image:
            'https://myviewjjky.s3.ap-northeast-2.amazonaws.com/image/actor/%E1%84%89%E1%85%A9%E1%86%AB%E1%84%89%E1%85%A5%E1%86%A8%E1%84%80%E1%85%AE.jpeg',
          role: '주연',
          role_name: '전일만',
        },
        {
          id: 4,
          name: '손석구',
          country: '한국',
          image:
            'https://myviewjjky.s3.ap-northeast-2.amazonaws.com/image/actor/%E1%84%8E%E1%85%AC%E1%84%80%E1%85%B1%E1%84%92%E1%85%AA.jpeg',
          role: '조연',
          role_name: '장이수',
        },
        {
          id: 5,
          name: '허동원',
          country: '한국',
          image:
            'https://myviewjjky.s3.ap-northeast-2.amazonaws.com/image/actor/%E1%84%92%E1%85%A5%E1%84%83%E1%85%A9%E1%86%BC%E1%84%8B%E1%85%AF%E1%86%AB.jpeg',
          role: '조연',
          role_name: '오동균',
        },
      ],
      thumbnail_image_url:
        'https://myviewjjky.s3.ap-northeast-2.amazonaws.com/image/thumbnail/%E1%84%87%E1%85%A5%E1%86%B7%E1%84%8C%E1%85%AC%E1%84%83%E1%85%A9%E1%84%89%E1%85%B52_thumbnail.jpeg',
      image_url: [
        'https://myviewjjky.s3.ap-northeast-2.amazonaws.com/image/gallery/2t-e9p_pooN0OuqB5EjNmA.jpeg',
        'https://myviewjjky.s3.ap-northeast-2.amazonaws.com/image/gallery/ajkHDQJ4jmU6T5QGUgK3Hw.jpeg',
        'https://myviewjjky.s3.ap-northeast-2.amazonaws.com/image/gallery/UwEF-X2__wDZg2WHiFQ7Tg.jpeg',
        'https://myviewjjky.s3.ap-northeast-2.amazonaws.com/image/gallery/XvOdKXuyw4ES5L83Y1qvtw.jpeg',
        'https://myviewjjky.s3.ap-northeast-2.amazonaws.com/image/gallery/yymKC7-5asM_KEH8oxIdyg.jpeg',
      ],
      video_url: [
        'https://myviewjjky.s3.ap-northeast-2.amazonaws.com/video/movie/%EB%B2%94%EC%A3%84%EB%8F%84%EC%8B%9C2.MOV',
        'https://myviewjjky.s3.ap-northeast-2.amazonaws.com/video/movie/%EB%B2%94%EC%A3%84%EB%8F%84%EC%8B%9C2.MOV',
        'https://myviewjjky.s3.ap-northeast-2.amazonaws.com/video/movie/%EB%B2%94%EC%A3%84%EB%8F%84%EC%8B%9C2.MOV',
        'https://myviewjjky.s3.ap-northeast-2.amazonaws.com/video/movie/%EB%B2%94%EC%A3%84%EB%8F%84%EC%8B%9C2.MOV',
        'https://myviewjjky.s3.ap-northeast-2.amazonaws.com/video/movie/%EB%B2%94%EC%A3%84%EB%8F%84%EC%8B%9C2.MOV',
      ],
    },
  };

  useEffect(() => {
    fetch(`${BASE_URL}movies/detail/${params.id}`, {
      headers: {
        Authorization: access_token,
      },
    })
      .then(res => res.json())
      .then(res => {
        setMovie(res.movie_info);
      });
  }, []);

  const { title, actor, video_url, image_url } = movie;

  function MovieContainer() {
    return (
      <MovieBackGround>
        {movie.id && <MovieInfo />}
        {actor?.length > 0 ? (
          <>
            <ContainerTitle>출연/제작</ContainerTitle>
            <ActorContainer>
              {actor?.map((actor, index) => (
                <Actor key={index} actor={actor} />
              ))}
            </ActorContainer>
          </>
        ) : (
          ''
        )}
        <ContainerTitle>리뷰</ContainerTitle>
        {review?.review_id ? (
          <MyReview openModal={openModal} review={review} />
        ) : (
          <NoReview title={title} openModal={openModal} />
        )}
        <MyViewModal
          open={open}
          closeModal={closeModal}
          content={<OnlyMovieReview />}
        />

        <ContainerTitle>예고편</ContainerTitle>
        <TrailerContainer>
          {video_url.map((video, index) => (
            <Trailer key={index} video={video} />
          ))}
        </TrailerContainer>
        <ContainerTitle>갤러리</ContainerTitle>
        <MovieGallery movie_image={image_url} />
      </MovieBackGround>
    );
  }

  //이거 추가해
  if (!image_url) return null;
  return (
    movie && (
      <MyViewLayout
        movie
        background={image_url[0]}
        center={<MovieContainer />}
      />
    )
  );
}

export default Movie;

const MovieBackGround = styled.div`
  padding: 80px;
`;

const ContainerTitle = styled(Typography)`
  font-weight: bold;
  font-size: 1rem;
  margin: 20px 0 6px;
  color: ${({ theme }) => theme.palette.common.white};
`;

const ActorContainer = styled(CardContainer)`
  padding-top: 40px;
  display: flex;
  overflow-x: scroll;
  -ms-overflow-style: none; /* Explorer */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none; /* Chrome */
  }
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
