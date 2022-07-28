import React from 'react';
import styled from '@emotion/styled';
import { useRecoilState } from 'recoil';
import { buttonState, movieState } from '../../state';
import { Box, Button, ButtonGroup, Modal } from '@mui/material';

function MyViewModal({ open, closeModal, breadcrumbs, content }) {
  const [movie, setMovie] = useRecoilState(movieState);
  const [button, setButton] = useRecoilState(buttonState);
  console.log(movie.review_id);
  return (
    <MyModal
      open={open}
      onClose={closeModal}
      disableScrollLock={true}
      disableEscapeKeyDown={true}
    >
      <Container>
        <Step breadcrumbs={breadcrumbs}>{breadcrumbs}</Step>
        <Buttons variant="text">
          {movie?.review_id && (
            <ModalButton
              onClick={() => setButton({ ...button, isDeleting: true })}
            >
              Delete
            </ModalButton>
          )}
          {movie.id && (
            <ModalButton
              onClick={() => setButton({ ...button, isSaving: true })}
            >
              Save
            </ModalButton>
          )}
          <ModalButton onClick={closeModal}>Close</ModalButton>
        </Buttons>
        {content}
      </Container>
    </MyModal>
  );
}

const MyModal = styled(Modal)`
  width: 100%;
  margin: 100px auto;
  // 위아래 코드 모두 margin-bottom 먹지 않음.
  // margin-bottom: 300px;
`;

const Container = styled(Box)`
  position: absolute;
  // breadcrumbs나 버튼을 위해 relative로 했었음.
  // position: relative;
  // 세로 중앙 정렬 위해 top 했으나 바닥에서 띄우는 거 먼저 해결해야 함.
  // top: 50%;
  left: 50%;
  transform: translate(-50%, 0);
  width: 987px;
  padding: 70px 60px;
  margin-bottom: 100px;
  background-color: ${({ theme }) => theme.palette.background.card};
  border-radius: 8px;
`;

const Step = styled(Box)`
  ${({ breadcrumbs }) => !breadcrumbs && 'display:none;'}
  position: absolute;
  top: 35px;
  left: 60px;
`;

const Buttons = styled(ButtonGroup)`
  position: absolute;
  top: 30px;
  right: 60px;

  & .MuiButtonGroup-grouped:not(:last-of-type) {
    border-right: 0px;
  }
`;

const ModalButton = styled(Button)`
  text-transform: none;
  color: #fc6c2e;
`;

// Poster 컴포넌트 사용하지 않았을 때
// const Poster = styled.div`
//   width: 242px;
//   height: 346px;
//   background-color: ${({ theme }) => theme.palette.background.disabled};
//   border-radius: 8px;
// `;

export default MyViewModal;
