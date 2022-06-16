import axios from 'axios';

export const instance = axios.create({
  baseURL: 'https://nid.naver.com/oauth2.0/',
});

export const BASE_URL = '172.30.1.20:8000/users/login/naver/callback';

//명국님 영화 상세
export const DETAIL_URL = 'http://172.30.1.56:8000/movies/detail/';

export const NAVER_ID = 'fAxuwH_vSTsRSIcvBdvp';
export const NAVER_CALLBACK_URL = 'http://localhost:3000/';
export const NAVER_STATE_STRING = '288539e2-9a6d-40ed-8a73-85b96ad91786';
