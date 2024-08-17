import { Container, Typography } from "@mui/material";
import { styled } from "@mui/system";

const FooterContainer = styled('div')({
  position: 'fixed',
  bottom: 0,
  left: 0,
  width: '100%',
  backgroundColor: '#8061C3', 
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
          © MentorMinds - ILPex<span style={{fontSize: '5px'}}>WEB</span> 2024 
        </Typography>
      </Container>
    </FooterContainer>
  );
};

export default Footer;
