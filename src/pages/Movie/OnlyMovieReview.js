import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useLocation, useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { movieState, buttonState, userState } from '../../state';
import styled from '@emotion/styled';
import { Box, Typography, TextField, Rating } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Poster from '../../components/Poster/Poster';
import { AgeBadge } from '../../pages/Movie';
import { BASE_URL } from '../../Modules/API';

function OnlyMovieReview() {
  const token = localStorage.getItem('access_token');
  const [movie, setMovie] = useRecoilState(movieState);
  const [button, setButton] = useRecoilState(buttonState);
  const [userInfo] = useRecoilState(userState);
  const { pathname } = useLocation();

  const [reviewId, setReviewId] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [watched_date, setWatched_date] = useState(new Date());
  const [mapx, setMapx] = useState(0);
  const [mapy, setMapy] = useState(0);
  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  const [withUser, setWithUser] = useState('');
  const [rating, setRating] = useState(0);
  const params = useParams();

  // 이미 작성한 리뷰의 내용 가져오기
  useEffect(() => {
    fetch(`${BASE_URL}reviews/movie/${movie.id}`, {
      headers: {
        Authorization: token,
      },
    })
      .then(res => res.json())
      .then(data => {
        if (data.message === 'REVIEW_DOSE_NOT_EXISTS') return;
        // 리뷰 있으면 review에 저장하기
        const {
          content,
          title,
          review_id,
          watched_date,
          place,
          with_user,
          rating,
        } = data.result;

        setReviewId(review_id);
        setTitle(title);
        setContent(content);
        setWatched_date(watched_date);
        setName(place.name);
        setWithUser(with_user);
        setRating(Number(rating));
      });
  }, []);

  // 저장하기 버튼을 누르면 이때까지 반영된 리뷰 정보를 폼데이터로 담아 전송
  useEffect(() => {
    if (!button.isSaving) return;

    //여기 폼 데이터 넣어
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append(
      'watched_date',
      moment(watched_date).format('YYYY-MM-DD hh:mm:ss')
    );
    formData.append('place', mapx);
    formData.append('place', mapy);
    formData.append('place', name);
    formData.append('place', link);
    formData.append('with_user', withUser);
    formData.append('rating', rating);
    formData.append('movie_id', movie.id);

    if (reviewId) {
      // 리뷰 아이디가 있으므로 이미 작성된 리뷰를 수정하는 중
      formData.append('review_id', reviewId);

      fetch(`${BASE_URL}reviews`, {
        method: 'PUT',
        headers: {
          Authorization: token,
        },
        body: formData,
      })
        .then(res => res.json())
        .then(result => {
          console.log(result);
          if (result.message === 'SUCCESS') {
            setButton({ ...button, isSaving: false });
            setMovie({ ...movie, id: params.id });
            window.location.replace(pathname);
          }
        });
    } else {
      // 리뷰 아이디가 없으므로 새로운 리뷰 저장하는 중
      fetch(`${BASE_URL}reviews`, {
        method: 'POST',
        headers: {
          Authorization: token,
        },
        body: formData,
      })
        .then(res => res.json())
        .then(result => {
          if (result.message === 'SUCCESS') {
            setButton({ ...button, isSaving: false });
            setMovie({ ...movie, id: params.id });
            window.location.replace(pathname);
          }
        });
    }
  }, [button.isSaving]);

  return (
    <Column>
      <Poster url={movie.thumbnail_image_url} />
      <ReviewContainer>
        <RowBox>
          <Box>
            <MovieTitle variant="h3">{movie.title}</MovieTitle>
            <Box sx={{ flexDirection: 'row' }}>
              <BoldText variant="subtitle2">
                {movie.en_title} <br />
                2022 · {movie.country} ·{' '}
                {movie.genre?.map((genreItems, index) => (
                  <span key={index} style={{ marginRight: '10px' }}>
                    {genreItems}
                  </span>
                ))}{' '}
                / {movie.running_time}분
              </BoldText>
              <AgeBadge age={movie.age} />
            </Box>
          </Box>
          <Rating
            value={rating}
            onChange={(e, newValue) => {
              setRating(newValue);
            }}
            precision={0.5}
            size="large"
          />
        </RowBox>
        <RowLabel variant="h4">{userInfo?.nickname}님의 솔직후기</RowLabel>
        <ReviewField
          label="리뷰를 남겨보세요."
          multiline
          minRows={3}
          maxRows={20}
          value={content}
          onChange={e => {
            e.preventDefault();
            setContent(e.target.value);
          }}
        />
        <RowLabel variant="h4">관람정보</RowLabel>
        <GridBox>
          <Box>
            <WatchInfoLabel variant="subtitle1">when</WatchInfoLabel>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <WatchDate
                label="언제 보셨나요?"
                inputFormat="yyyy.MM.dd HH:mm"
                mask="____.__.__ __:__"
                disableFuture={true}
                renderInput={params => <WhiteTextField {...params} />}
                value={watched_date}
                onChange={e => {
                  console.log(typeof watched_date);
                  setWatched_date(e);
                  console.dir(watched_date);
                }}
              />
            </LocalizationProvider>
          </Box>
          <Box>
            <WatchInfoLabel variant="subtitle1">where</WatchInfoLabel>
            <WatchInfoField
              label="어디서 보셨나요?"
              value={name}
              onChange={e => {
                setName(e.target.value);
              }}
            />
          </Box>
          <Box>
            <WatchInfoLabel variant="subtitle1">with</WatchInfoLabel>
            <WatchInfoField
              label="누구랑 보셨나요?"
              value={withUser}
              onChange={e => {
                e.preventDefault();
                setWithUser(e.target.value);
              }}
            />
          </Box>
        </GridBox>
      </ReviewContainer>
    </Column>
  );
}

export default OnlyMovieReview;

const Column = styled(Box)`
  display: grid;
  grid-template-columns: 273px 1fr;
  // 컨테이너가 늘어나면서 높이를 100%로 고정할 수 없게 됨.
  // height: 100%;
`;

const ReviewContainer = styled(Box)`
  margin-left: 28px;
`;

const RowBox = styled(Box)`
  display: flex;
  justify-content: space-between;
`;

const BoldText = styled(Typography)`
  color: ${({ theme }) => theme.palette.common.white};
  font-weight: bold;
`;

const MovieTitle = styled(BoldText)`
  margin-bottom: 6px;
  font-size: 24px;
`;

const RowLabel = styled(BoldText)`
  margin: 15px 0;
  font-size: 20px;
`;

const ReviewField = styled(TextField)`
  width: 100%;

  & .MuiInputBase-input {
    color: ${({ theme }) => theme.palette.common.white};
  }
`;

const GridBox = styled(Box)`
  display: grid;
  grid-template-columns: 3fr 3fr 2fr;
  column-gap: 12px;
`;

const WatchInfoLabel = styled(BoldText)`
  margin-bottom: 15px;
`;

const WatchDate = styled(DateTimePicker)``;

const WhiteTextField = styled(TextField)`
  & .MuiOutlinedInput-root {
    color: ${({ theme }) => theme.palette.common.white};
  }
`;

const WatchInfoField = styled(ReviewField)``;
