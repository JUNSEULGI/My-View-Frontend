import React from 'react';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { NAVER_CALLBACK_URL, NAVER_ID } from '../../Modules/API';
import { Link } from '@mui/material';
import naver from '../../assets/images/naverLogin.png';
import { MK_URL } from '../../Modules/API';

function NaverLogin() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const access_code = search?.split('=')[1]?.split('&')[0];
  console.log('네이버 인증 코드', access_code);

  //백으로 인증 코드 주는 함수
  useEffect(() => {
    if (!search) return;
    fetch(`${MK_URL}users/login/naver/callback?code=${access_code}`, {
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => {
        if (!data) {
          alert('정보가 바르지 않습니다');
          return;
        }
        console.log(data);
        localStorage.setItem('access_token', data.token_info.access_token);
        localStorage.access_token
          ? navigate('/list')
          : alert('정보가 바르지 않습니다');
      });
  }, []);

  return (
    <Link
      href={`https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_ID}&redirect_uri=${NAVER_CALLBACK_URL}&state=state`}
    >
      <img alt="네이버 로그인 버튼" src={naver} />
    </Link>
  );
}

export default NaverLogin;