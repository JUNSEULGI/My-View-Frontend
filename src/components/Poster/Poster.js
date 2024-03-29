import React from 'react';
import styled from '@emotion/styled';
import { Card, CardMedia } from '@mui/material';
import { Logo } from '../../components/Logo';

function Poster({ url }) {
  return url ? (
    <Image component="img" image={url} />
  ) : (
    <NoImage>
      <Logo style={{ fontSize: '30px' }}>My View</Logo>
    </NoImage>
  );
}

const Image = styled(CardMedia)`
  width: 100%;
  border-radius: 8px;

  @media screen and (max-width: 600px) {
    display: none;
  }
`;

const NoImage = styled(Card)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 390px;
  background-color: ${({ theme }) => theme.palette.background.disabled};
  border-radius: 8px;

  @media screen and (max-width: 600px) {
    display: none;
    /* background-color: aqua; */
  }
`;

export default Poster;
