import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Menu, MenuItem, Container } from '@mui/material';
import { styled } from '@mui/system';
import { Link } from 'react-router-dom';
import { AiFillHome, AiOutlineMenu } from 'react-icons/ai'; 

interface HeaderProps {
  title: string;
}

const HeaderContainer = styled(AppBar)({
  backgroundColor: '#FFFFFF',
  color: '#000000',
  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
});

const Title = styled(Typography)({
  flexGrow: 1,
  fontSize: '1.5rem',
  fontWeight: 'bold',
});

const TraineeHeader: React.FC<HeaderProps> = ({ title }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <HeaderContainer position="static">
      <Container>
        <Toolbar>
          <Title>{title}</Title>
          <IconButton color="inherit" component={Link} to="/">
            <AiFillHome />
          </IconButton>
          <IconButton color="inherit" onClick={handleMenuOpen}>
            <AiOutlineMenu />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            keepMounted
          >
            <MenuItem component={Link} to="/course" onClick={handleMenuClose}>Courses</MenuItem>
            <MenuItem component={Link} to="/assessments" onClick={handleMenuClose}>Assessments</MenuItem>
            <MenuItem component={Link} to="/daily-report" onClick={handleMenuClose}>Daily Report</MenuItem>
            <MenuItem component={Link} to="/enquiries" onClick={handleMenuClose}>Enquiries</MenuItem>
          </Menu>
        </Toolbar>
      </Container>
    </HeaderContainer>
  );
};

export default TraineeHeader;
