import React from 'react';
import styled from '@emotion/styled';
import Chip from '@mui/material/Chip';

function AgeBadge({ age }) {
  const ageToString = age === 0 ? 'ALL' : age + '세';

  let ageColor = '';

  if (ageToString === 'ALL') {
    ageColor = '#07964B';
  } else if (ageToString === '12세') {
    ageColor = '#EABD01';
  } else if (ageToString === '15세') {
    ageColor = '#DC7317';
  } else {
    ageColor = '#D61D29';
  }
  return <MovieBadge label={ageToString} agecolor={ageColor} />;
}

export default AgeBadge;

const MovieBadge = styled(Chip)`
  color: white;
  font-weight: bold;
  width: 4em;
  height: 1.57em;
  background-color: ${props => props.agecolor};
`;
