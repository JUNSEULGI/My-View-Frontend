import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useResetRecoilState } from 'recoil';
import { userState } from '../../state';
import {
  IconButton,
  MenuItem,
  Menu,
  Tooltip,
  Typography,
  Avatar,
  Box,
} from '@mui/material';

function MyAvatar({ userInfo }) {
  const navigate = useNavigate();
  const resetUser = useResetRecoilState(userState);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const logout = () => {
    localStorage.removeItem('access_token');
    resetUser();
    alert('로그아웃되었습니다.');
    navigate('/');
  };

  const goMypage = () => {
    navigate('/mypage');
  };

  const settings = [
    {
      id: 1,
      name: 'Logout',
      function: logout,
    },
    { id: 2, name: 'My Page', function: goMypage },
  ];

  const handleOpenUserMenu = event => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  if (!userInfo?.Profile_image) return null;
  return (
    <Box sx={{ flexGrow: 0, marginLeft: '40px' }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt={userInfo.nickname} src={userInfo.Profile_image} />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {settings.map(setting => (
          <MenuItem key={setting.id} onClick={handleCloseUserMenu}>
            <Typography
              sx={{ color: 'white' }}
              textAlign="center"
              onClick={() => setting.function()}
            >
              {setting.name}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}

export default MyAvatar;
