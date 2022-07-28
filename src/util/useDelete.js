import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { movieState, buttonState } from '../state';
import { BASE_URL } from '../Modules/API';

export const useDelete = review_id => {
  const { pathname } = useLocation();
  const token = localStorage.getItem('access_token');
  const [button, setButton] = useRecoilState(buttonState);
  const resetMovie = useResetRecoilState(movieState);

  return useEffect(() => {
    if (!button.isDeleting) return;
    if (window.confirm('정말 삭제시겠습니까?')) {
      fetch(`${BASE_URL}reviews/${review_id}`, {
        method: 'DELETE',
        headers: {
          Authorization: token,
        },
      })
        // .then(res => res.json())
        .then(result => {
          console.log(result);
          // if (result.message === 'SUCCESS') {
          setButton({ ...button, isDeleting: false });
          if (/\/movie\/*/.test(pathname)) resetMovie();
          alert('삭제되었습니다.'); //true
          window.location.replace(pathname);
          // }
        });
    } else {
      alert('취소합니다.'); //false
    }
  }, [button.isDeleting]);
};
