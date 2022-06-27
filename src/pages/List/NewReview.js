import React from 'react';
import { useRecoilState } from 'recoil';
import { movieState } from '../../state';
import MyViewModal from '../../components/MyViewModal/MyViewModal';
import MyStep from './MyStep';
import ReviewBox from '../../components/MyViewModal/ReviewBox';
import SearchBox from '../../components/MyViewModal/SearchBox';

function NewReview({ open, setOpen }) {
  const [movie, setMovie] = useRecoilState(movieState);

  const closeModal = (_, reason) => {
    if (reason === 'backdropClick') return;
    // setSelected({});
    // setMovieDetail({});
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
      breadcrumbs={<MyStep />}
      children={movie.id ? <ReviewBox /> : <SearchBox />}
    />
  );
}

// const StepBox = styled(Box)`
//   display: flex;
//   margin-bottom: 14px;
// `;

export default NewReview;