import { Container, Typography } from "@mui/material";
import { styled } from "@mui/system";

const FooterContainer = styled('div')({
  position: 'fixed',
  bottom: 0,
  width: '100%',
  backgroundColor: '#8518FF', 
  color: '#FFFFFF', 
  padding: '16px',
  textAlign: 'center',
  boxShadow: '0 -2px 5px rgba(0, 0, 0, 0.1)',
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
