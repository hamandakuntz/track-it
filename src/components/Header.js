import styled from "styled-components";
import logo from "../assets/images/logo.png";

export default function Header(){
    return (        
        <Container>
            <Image><img src={logo} alt="logo"></img></Image>
            <UserPicture />
        </Container>
    )
}

const Container = styled.div`
  background: #126BA5;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content:space-between;
  position: fixed;
  top: 0;
  left: 0;

  img {    
    padding: 10px;    
  }  
`;

const Image = styled.div`
    width: 97px;
    height: 49px;
`;

const UserPicture = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 98.5px;
    background: white;
    margin-right: 20px;
`;