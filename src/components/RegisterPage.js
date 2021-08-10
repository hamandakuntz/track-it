import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import logo from "../assets/images/iconandlogo.svg";
import Loader from "react-loader-spinner";
import { Container, InputWrapper, Button, ButtonRegister} from "./styles/RegisterPageStyles"

export default function RegisterPage() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

  function register() {
    const body = { email, name, image, password };

    const request = axios.post(
      `${process.env.REACT_APP_API_BASE_URL}auth/sign-up`,
      body
    );

    setIsDisabled(true);

    request.then((response) => {
      history.push("/");
    });

    request.catch(() => {
      alert("Falha no cadastro, preencha os campos novamente!");
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
      <InputWrapper>
        <input
          type="name"
          placeholder="nome"
          value={name}
          onChange={(n) => setName(n.target.value)}
          disabled={isDisabled}
        />
      </InputWrapper>
      <InputWrapper>
        <input
          type="picture"
          placeholder="foto"
          value={image}
          onChange={(i) => setImage(i.target.value)}
          disabled={isDisabled}
        />
      </InputWrapper>
      <Button isDisabled={isDisabled} onClick={register}>
        <span>
          {!isDisabled ? (
            "Cadastrar"
          ) : (
            <Loader type="ThreeDots" color="#FFF" height={45} width={50} />
          )}
        </span>
      </Button>
      <Link to="/">
        <ButtonRegister>
          <span>Já tem uma conta? Faça login!</span>
        </ButtonRegister>
      </Link>
    </Container>
  );
}

