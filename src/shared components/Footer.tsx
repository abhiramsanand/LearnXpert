import { Container, Typography } from "@mui/material";
import { styled } from "@mui/system";

const FooterContainer = styled('div')({
  position: 'fixed',
  bottom: 0,
  left: 0,
  width: '100%',
  backgroundColor: '#8518FF', 
  color: '#FFFFFF', 
  padding: '16px',
  textAlign: 'center',
  zIndex: '2000'
});

const Footer = () => {
  return (
    <FooterContainer>
      <Container>
        <Typography variant="body2">
          © 2024 Copyright
        </Typography>
      </Container>
    </FooterContainer>
  );
};

export default Footer;
