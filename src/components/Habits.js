import Header from "./Header";
import Menu from "./Menu";
import trash from "../assets/images/trash.svg";
import { useEffect, useState, useContext } from "react";
import UserContext from "../contexts/UserContext";
import axios from "axios";
import Loader from "react-loader-spinner";
import { Container, MyHabitsTitle, EmptyHabits, ButtonNewHabit, ButtonWeekday, ButtonWeekday2, ButtonsWeekdayWrapper, ButtonsWeekdayWrapper2, AddNewHabit, SaveButton, CancelButton, ButtonsWrapper, RegisteredHabit } from "./styles/HabitsStyles" 

export default function Habits({ selectedWeekDays, setSelectedWeekDays }) {
  const { user } = useContext(UserContext);
  const [clicked, setClicked] = useState(false);
  const [habitTitle, setHabitTitle] = useState("");
  const [savedHabits, setSavedHabits] = useState([]);
  const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];
  const [loading, setLoading] = useState(false);

  const body = {
    name: habitTitle,
    days: selectedWeekDays,
  };

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    const request = axios.get(
      `${process.env.REACT_APP_API_BASE_URL}habits`,
      config
    );

    request.then((response) => {
      setSavedHabits(response.data);
    });

    request.catch((error) => {
      alert("Ocorreu um erro ao atualizar os seus hábitos. Tente novamente.");
    });
  }, [user.token]);

  function addWeekDays(e, day) {
    if (loading) {
      return;
    }

    e.stopPropagation();
    if (selectedWeekDays.includes(day)) {
      const newSelectedWeekDays = selectedWeekDays.filter(
        (item) => item !== day
      );
      setSelectedWeekDays([...newSelectedWeekDays]);
    } else {
      const newSelectedWeekDays2 = [...selectedWeekDays, day];
      setSelectedWeekDays(newSelectedWeekDays2);
    }
  }

  function saveHabit() {
    if (selectedWeekDays.length < 1) {
      alert("Selecione pelo menos um dia!");
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    const request = axios.post(
      `${process.env.REACT_APP_API_BASE_URL}habits`,
      body,
      config
    );

    setLoading(true);

    request.then((response) => {
      setSavedHabits([...savedHabits, response.data]);
      setLoading(false);
      setHabitTitle("");
      setClicked(false);
    });

    request.catch(() => {
      setLoading(false);
      alert("Preencha os todos campos antes de salvar!");
    });
  }

  function deleteHabit(id) {
    const answer = window.confirm(
      "Tem certeza que você deseja excluir o hábito?"
    );

    if (!answer) {
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    const request = axios.delete(
      `${process.env.REACT_APP_API_BASE_URL}habits/${id}`,
      config
    );
    request.then(() => {
      const promise = axios.get(
        `${process.env.REACT_APP_API_BASE_URL}habits`,
        config
      );
      promise.then((response) => {
        setSavedHabits(response.data);
      });
    });

    request.catch(() =>
      alert("Ocorreu um erro ao deletar o hábito. Tente novamente")
    );
  }

  return (
    <Container>
      <Header />
      <MyHabitsTitle>Meus hábitos</MyHabitsTitle>
      <ButtonNewHabit onClick={() => setClicked(true)}>
        <span>+</span>
      </ButtonNewHabit>
      <AddNewHabit show={clicked}>
        <input
          value={habitTitle}
          disabled={loading}
          onChange={(e) => setHabitTitle(e.target.value)}
          placeholder="nome do hábito"
        ></input>
        <ButtonsWeekdayWrapper clicked={clicked}>
          <ButtonWeekday
            className={selectedWeekDays.includes(0) ? "selected" : ""}
            onClick={(e) => addWeekDays(e, 0)}
          >
            <span>D</span>
          </ButtonWeekday>
          <ButtonWeekday
            className={selectedWeekDays.includes(1) ? "selected" : ""}
            onClick={(e) => addWeekDays(e, 1)}
          >
            <span>S</span>
          </ButtonWeekday>
          <ButtonWeekday
            className={selectedWeekDays.includes(2) ? "selected" : ""}
            onClick={(e) => addWeekDays(e, 2)}
          >
            <span>T</span>
          </ButtonWeekday>
          <ButtonWeekday
            className={selectedWeekDays.includes(3) ? "selected" : ""}
            onClick={(e) => addWeekDays(e, 3)}
          >
            <span>Q</span>
          </ButtonWeekday>
          <ButtonWeekday
            className={selectedWeekDays.includes(4) ? "selected" : ""}
            onClick={(e) => addWeekDays(e, 4)}
          >
            <span>Q</span>
          </ButtonWeekday>
          <ButtonWeekday
            className={selectedWeekDays.includes(5) ? "selected" : ""}
            onClick={(e) => addWeekDays(e, 5)}
          >
            <span>S</span>
          </ButtonWeekday>
          <ButtonWeekday
            className={selectedWeekDays.includes(6) ? "selected" : ""}
            onClick={(e) => addWeekDays(e, 6)}
          >
            <span>S</span>
          </ButtonWeekday>
        </ButtonsWeekdayWrapper>
        <ButtonsWrapper>
          <CancelButton disabled={loading} onClick={() => setClicked(false)}>
            <span>Cancelar</span>
          </CancelButton>
          <SaveButton disabled={loading} onClick={saveHabit}>
            <span>
              {!loading ? (
                "Salvar"
              ) : (
                <Loader type="ThreeDots" color="#FFF" height={50} width={45} />
              )}
            </span>
          </SaveButton>
        </ButtonsWrapper>
      </AddNewHabit>
      {savedHabits.length === 0 ? (
        <EmptyHabits>
          Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para
          começar a trackear!
        </EmptyHabits>
      ) : (
        ""
      )}

      {savedHabits.length >= 1
        ? savedHabits.map((i) => (
            <RegisteredHabit key={i.id}>
              <span>{i.name}</span>
              <img
                onClick={() => deleteHabit(i.id)}
                src={trash}
                alt="deletebutton"
              ></img>
              <ButtonsWeekdayWrapper2>
                {weekDays.map((w, index) => (
                  <ButtonWeekday2
                    key={index}
                    className={i.days.includes(index) ? "selected" : ""}
                  >
                    <span>{w}</span>
                  </ButtonWeekday2>
                ))}
              </ButtonsWeekdayWrapper2>
            </RegisteredHabit>
          ))
        : ""}
      <Menu totalPercentage={user.percentage} />
    </Container>
  );
}

