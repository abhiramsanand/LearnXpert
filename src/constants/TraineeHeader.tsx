import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Menu, MenuItem, Container, Box } from '@mui/material';
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
  width: '100%',
  height: 'fixed', 
  position: 'fixed',
  top: 0,
  zIndex: 1100,
});

const Title = styled(Typography)({
  flexGrow: 1,
  fontSize: '1.5rem',
  fontWeight: 'bold',
});

const StyledIconButton = styled(IconButton)({
  color: '#8518FF',
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
    <>
      <HeaderContainer position="fixed">
        <Container maxWidth="lg">
          <Toolbar>
            <Title>{title}</Title>
            <StyledIconButton component={Link} to="/">
              <AiFillHome />
            </StyledIconButton>
            <StyledIconButton onClick={handleMenuOpen}>
              <AiOutlineMenu />
            </StyledIconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              keepMounted
            >
              <MenuItem component={Link} to="/courses" onClick={handleMenuClose}>Courses</MenuItem>
              <MenuItem component={Link} to="/assessments" onClick={handleMenuClose}>Assessments</MenuItem>
              <MenuItem component={Link} to="/Dailyreport" onClick={handleMenuClose}>Daily Report</MenuItem>
              <MenuItem component={Link} to="/Enquiry" onClick={handleMenuClose}>Enquiries</MenuItem>
            </Menu>
          </Toolbar>
        </Container>
      </HeaderContainer>
      <Box
        sx={{
          mt: '64px',  
        }}
      >

      </Box>
    </>
  );
};

export default TraineeHeader;
