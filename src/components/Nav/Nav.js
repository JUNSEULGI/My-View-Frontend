import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { userState } from '../../state';
import { Link, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import MyAvatar from './Logout';
import { API } from '../../Modules/API';
import { throttle, debounce } from 'lodash';
import { fetcher } from '../../Modules/fetcher';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
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
  const { navigate } = useNavigate();
  const [userInfo, setUserInfo] = useRecoilState(userState);
  const resetUser = useResetRecoilState(userState);
  const [movieList, setMovieList] = useState([]);
  const [scroll, setScroll] = useState(true);
  const access_token = localStorage.getItem('access_token');
  const IS_USER = localStorage.access_token ? '/list' : '/';
  const DEFAULT_Y = 60;

  const updateScroll = useMemo(
    () =>
      throttle(() => {
        if (window.pageYOffset > DEFAULT_Y) setScroll(false);
        else setScroll(true);
      }, 500),
    [scroll]
  );

  const moveSearchPage = keyword => {
    if (keyword) window.location.replace(`/search?q=${keyword}`);
  };

  const searchKeyword = keyword => {
    if (keyword === '') return;
    fetcher(`${API.search_movie}?q=${keyword}`).then(
      ({ data }) => data.message === 'SUCCESS' && setMovieList(data.result)
    );
  };

  const debouncedSearch = useCallback(
    debounce(keyword => searchKeyword(keyword), 1000),
    []
  );

  useEffect(() => {
    if (!access_token) return;
    fetcher(API.users_info)
      .then(res => setUserInfo(res.data.result))
      .catch(e => {
        localStorage.removeItem('access_token');
        resetUser();
        navigate('/');
      });
  }, [access_token]);

  useEffect(() => {
    window.addEventListener('scroll', updateScroll);
  }, [scroll]);

  return (
    <NavBar onScroll={updateScroll} scroll={scroll.toString()}>
      <MyToolbar sx={{ display: 'flex', alignContent: 'center' }}>
        <Link to={IS_USER}>
          <Logo
            onScroll={updateScroll}
            scroll={scroll.toString()}
            component="h1"
          >
            My View!
          </Logo>
        </Link>
        <Box sx={{ display: 'flex', alignContent: 'baseline' }}>
          <NavSearch
            sx={{ marginTop: '-6px' }}
            PaperComponent={StyledPaper}
            PopperComponent={StyledPopper}
            freeSolo={true}
            autoHighlight={true}
            autoComplete
            color="orange"
            id="free-solo-2-demo"
            onChange={(e, value) => moveSearchPage(value.title ?? value)}
            disableClearable
            getOptionLabel={option => option.title ?? option}
            options={movieList}
            renderInput={params => (
              <TextField
                onChange={e => debouncedSearch(e.target.value)}
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
            pathname !== '/' && (
              <GoLogin to="/">
                <AccountCircleIcon fontSize="large" />
              </GoLogin>
            )
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
      background-color: ${({ scroll }) =>
        scroll === 'true' ? 'transparent' : 'black'};
      transition: all 0.3s;
    }
  }

  @media ${p => p.theme.deviceSize.mobile} {
    padding: 8px 20px;
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

  @media ${p => p.theme.deviceSize.mobile} {
    font-size: 16px;
    height: 40px;
    padding: 10px 0 0 0;
  }
`;

const Logo = styled(Typography)`
  /* display: ${({ img }) => (img ? '' : 'none')}; */
  color: ${({ scroll }) => (scroll === 'true' ? '#FF6E01' : 'white')};
  /* ${nav => ('true' ? '#FF6E01' : 'white')}; */
  transition: all 0.3s;
  font-family: 'Galada', cursive;
  font-weight: bold;
  font-size: 2rem;

  @media ${p => p.theme.deviceSize.mobile} {
    font-size: 1.5rem;
  }
`;

const GoLogin = styled(Link)`
  margin-left: 10px;
  color: white;
  font-size: 1.25rem;
  @media ${p => p.theme.deviceSize.mobile} {
    margin-left: 4px;
  }
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
    overflow-x: hidden;

    @media ${p => p.theme.deviceSize.mobile} {
      height: 40px;
      padding: 0;
      width: 165px;
    }

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
  @media ${p => p.theme.deviceSize.mobile} {
    width: 100%;
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
