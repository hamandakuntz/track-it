import styled from "styled-components";
import logo from "../assets/images/logo.png";
import { useContext } from "react";
import UserContext from "../contexts/UserContext";

export default function Header(){

    const { user } = useContext(UserContext);

    return (        
        <Container>
            <Image><img src={logo} alt="logo"></img></Image>
            <UserPicture><img src={user.image} alt="userimage"></img></UserPicture>
        </Container>
    )
}

const Container = styled.div`
  background: #126BA5;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
  width: 100vw;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content:space-between;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 6;

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
    border-radius: 100px;    
    background: white;
    margin-right: 20px;  
    overflow: hidden; 
    display: flex;
    justify-content: center;
    align-items: center;

    img:last-of-type {       
        height: 50px;
        border-radius: 100px;
        padding: 0px;
    }
`; 