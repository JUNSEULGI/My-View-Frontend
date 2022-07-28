import React from 'react';
import styled from '@emotion/styled';
import { useRecoilState } from 'recoil';
import { buttonState } from '../../state';
import { CardContainer } from './CardContainer';
import { Box, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MovieRating from './MovieRating';
import { Logo } from './ContentLogo';
import { ReviewIcon, FabContainer } from './MyIconButton';
import { useDelete } from '../../util/useDelete';

function MyReview({ openModal, review }) {
  const [button, setButton] = useRecoilState(buttonState);

  const handleDelete = () => setButton({ ...button, isDeleting: true });
  useDelete(review.review_id);

  if (!review.review_id) return null;
  return (
    <MyReviewContainer>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Logo>My View!</Logo>
        <MovieRating rating={review.rating} />
      </Box>
      <MyBox>
        <MyReviewTitle variant="h1">{review.title}</MyReviewTitle>
      </MyBox>
      <MyReviewContent variant="body1">{review.content}</MyReviewContent>
      <FabContainer>
        <EditButton onClick={openModal}>
          <EditIcon />
        </EditButton>
        <DeleteButton onClick={handleDelete}>
          <DeleteIcon />
        </DeleteButton>
      </FabContainer>
    </MyReviewContainer>
  );
}

const MyReviewContainer = styled(CardContainer)`
  display: block;
  border: 2px solid ${({ theme }) => theme.palette.test.second};
  box-shadow: 5px 7px 20px -4px #ff9201;
  position: relative;
  margin-bottom: 2em;
  overflow: unset;

  ::after {
    content: ' ';
    position: absolute;
    bottom: -2em;
    right: 30px;
    border-width: 1em;
    border-style: solid;
    border-color: #ff9201 transparent transparent transparent;
  }
`;

const MyBox = styled.div``;

const MyReviewTitle = styled(Typography)`
  margin-bottom: 8px;
`;

const MyReviewContent = styled(Typography)`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: wrap;
`;

const DeleteButton = styled(ReviewIcon)`
  :hover {
    background-color: red;
  }
`;
const EditButton = styled(ReviewIcon)`
  :hover {
    color: white;
    background-color: #ff9201;
  }
`;

export default MyReview;
