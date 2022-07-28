import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { userState } from '../../state';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import MyAvatar from './Logout';
import { BASE_URL } from '../../Modules/API';
import {
  Typography,
  AppBar,
  Toolbar,
  Box,
  Popper,
  Autocomplete,
  TextField,
  Paper,
} from '@mui/material';

function Nav() {
  const { pathname } = useLocation();
  const [userInfo, setUserInfo] = useRecoilState(userState);
  const [scroll, setScroll] = useState(0);
  const [titles, setTitles] = useState([]);
  const access_token = localStorage.getItem('access_token');

  const updateScroll = () => {
    setScroll(window.scrollY);
  };

  const moveMoviePage = id => {
    window.location.replace(`/movie/${id}`);
  };

  useEffect(() => {
    if (!access_token) return;
    fetch(`${BASE_URL}users/info`, {
      headers: {
        Authorization: access_token,
      },
    })
      .then(res => res.json())
      .then(res => {
        if (res.message === 'EXPIRED_TOKEN') {
          localStorage.removeItem('access_token');
          return;
        }
        setUserInfo(res.result);
      });
  }, [access_token]);

  // 검색창이 활성화되었을 때 요청하는 게 좋지 않을까?
  useEffect(() => {
    fetch(`${BASE_URL}movies/simple`)
      .then(res => res.json())
      .then(result => {
        if (result.message === 'SUCCESS') {
          setTitles(result.titles);
        }
      });
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', updateScroll);
  }, []);

  const isUser = localStorage.access_token ? '/list' : '/';

  const seeLoginButton =
    pathname === '/' ? '' : <GoLogin to="/">로그인</GoLogin>;

  return (
    <NavBar onScroll={updateScroll} scroll={scroll}>
      <MyToolbar sx={{ display: 'flex', alignContent: 'center' }}>
        <Link to={isUser}>
          <Logo onScroll={updateScroll} scroll={scroll} component="h1">
            My View!
          </Logo>
        </Link>
        <Box sx={{ display: 'flex', alignContent: 'baseline' }}>
          <NavSearch
            sx={{ marginTop: '-6px' }}
            PaperComponent={StyledPaper}
            PopperComponent={StyledPopper}
            freeSolo
            autoHighlight={true}
            autoComplete
            color="orange"
            id="free-solo-2-demo"
            onChange={(e, value) => {
              moveMoviePage(value.id);
            }}
            disableClearable
            getOptionLabel={option => option.title}
            options={titles}
            renderInput={params => (
              <TextField
                {...params}
                label="영화 제목을 검색하세요"
                InputProps={{
                  ...params.InputProps,
                  type: 'search',
                }}
              />
            )}
          />
          {localStorage.access_token ? (
            <MyAvatar userInfo={userInfo} />
          ) : (
            seeLoginButton
          )}
        </Box>
      </MyToolbar>
    </NavBar>
  );
}

const NavBar = styled(AppBar)`
  padding: 10px 40px;
  display: flex;
  background: white;
  &.MuiPaper-root {
    background: none;

    &.MuiAppBar-root {
      box-shadow: none;
      background-color: ${props =>
        props.scroll < 60 ? 'transparent' : 'black'};
      transition: all 0.3s;
    }
  }
`;

const MyToolbar = styled(Toolbar)`
  align-items: flex-start;
  display: flex;
  padding-top: 10px;
  justify-content: space-between;

  a {
    text-decoration: none;
  }
`;

const Logo = styled(Typography)`
  color: ${props => (props.scroll < 60 ? '#FF6E01' : 'white')};
  transition: all 0.3s;
  font-family: 'Galada', cursive;
  font-weight: bold;
  font-size: 32px;
`;

const GoLogin = styled(Link)`
  margin: 10px 0 0 10px;
  color: white;
`;

const NavSearch = styled(Autocomplete)`
  padding: 0;
  width: 200px;
  height: 10px;

  //눌렀을 때 lable색
  label.Mui-focused {
    color: orange;
    font-weight: bold;
  }

  //아무것도 안했을 때
  & .MuiOutlinedInput-root {
    color: white;
    font-weight: bold;

    & fieldset {
      border-color: translate;
      color: orange;
    }

    &:hover fieldset {
      border-color: orange;
    }
    &.Mui-focused fieldset {
      border-color: orange;
    }
  }
`;

const StyledPopper = styled(Popper)``;

const StyledPaper = styled(Paper)`
  color: white;
  :focus {
    background-color: yellow;
  }
`;

export default Nav;
