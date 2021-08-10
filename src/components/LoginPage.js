import { useHistory, Link } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import logo from "../assets/images/iconandlogo.svg";
import Loader from "react-loader-spinner";
import UserContext from "../contexts/UserContext";
import { Container, InputWrapper, Button, ButtonLogin } from "./styles/LoginPageStyles"

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
    // eslint-disable-next-line
  }, []);

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

