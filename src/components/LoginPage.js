import styled from "styled-components";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import axios from "axios";
import logo from "../assets/images/iconandlogo.svg";
import Loader from "react-loader-spinner";
import UserContext from "../contexts/UserContext";

export default function LoginPage() {
  const { user, setUser } = useContext(UserContext);
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const data = JSON.parse(localStorage.getItem("usertoken"));

  useEffect(() => {   
    if (user !== "") {
      localStorage.setItem("usertoken", JSON.stringify(user));
    }  
    if (!data) {
      history.push("/");    
    } else {  
      setUser({ ...data });
      history.push("/today");
    }  
  }, [user, data, setUser, history]);



  function login() {
    const body = { email, password };
    const request = axios.post(
      `${process.env.REACT_APP_API_BASE_URL}auth/login`,
      body
    );

    setIsDisabled(true);

    request.then((response) => {      
      setUser(response.data);
      history.push("/today");
    });

    request.catch(() => {
      alert("Falha no login, dados incorretos!");
      setIsDisabled(false);
    });
  }

  return (
    <Container>
      <img src={logo} alt="logo"></img>
      <InputWrapper>
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isDisabled}
        />
      </InputWrapper>
      <InputWrapper>
        <input
          type="password"
          placeholder="senha"
          value={password}
          onChange={(p) => setPassword(p.target.value)}
          disabled={isDisabled}
        />
      </InputWrapper>
      <Button isDisabled={isDisabled} onClick={login}>
        <span>
          {!isDisabled ? (
            "Entrar"
          ) : (
            <Loader type="ThreeDots" color="#FFF" height={45} width={50} />
          )}
        </span>
      </Button>
      <Link to="/register">
        <ButtonLogin>
          <span>Não tem uma conta? Cadastre-se!</span>
        </ButtonLogin>
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
    font-family: "Lexend Deca";

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
  opacity: ${(props) => (props.isDisabled ? 0.5 : 1)};

  span {
    color: #ffffff;
    font-size: 20px;
  }
`;

const ButtonLogin = styled.div`
  span {
    display: block;
    color: #52b6ff;
    font-size: 14px;
    padding-top: 25px;
    text-decoration-line: underline;
  }
`;
