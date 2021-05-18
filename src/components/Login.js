import styled from "styled-components";
import { Link } from "react-router-dom";
import logo from "../assets/images/iconandlogo.svg";

export default function Login() {
  return (
    <Container>
      <img src={logo}></img>
      <InputWrapper>
        <input type="email" placeholder="email" />
      </InputWrapper>
      <InputWrapper>
        <input type="password" placeholder="senha" />
      </InputWrapper>
      <Button>
        <span>Entrar</span>
      </Button>
      <Link to="/register">
        <Footer>
          <span>Não tem uma conta? Cadastre-se!</span>
        </Footer>
      </Link>
    </Container>
  );
}

const Container = styled.div`
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  img {
    margin-top: 70px;
    margin-bottom: 35px;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  input {
    width: 303px;
    height: 45px;
    background: #ffffff;
    border: 1px solid #d5d5d5;
    border-radius: 5px;
    margin-bottom: 8px;

    ::placeholder {
      font-family: "Lexend Deca";
      color: #dbdbdb;
      font-size: 20px;
      padding-left: 5px;
    }

    :focus {
      box-shadow: 0 0 0 0;
      outline: 0;
    }    
  }  
`;

const Button = styled.button`
  font-family: "Lexend Deca";
  background: #52b6ff;
  border-radius: 4.63636px;
  border: none;
  width: 303px;
  height: 45px;

  span {
    color: #ffffff;
    font-size: 20px;
  }
`;

const Footer = styled.div`
  span {
    display: block;
    color: #52b6ff;
    font-size: 14px;
    padding-top: 25px;
    text-decoration-line: underline;
  }
`;
