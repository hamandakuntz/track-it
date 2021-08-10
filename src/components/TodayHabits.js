import Header from "./Header";
import Menu from "./Menu";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import UserContext from "../contexts/UserContext";
import check from "../assets/images/check.svg";
import dayjs from "dayjs";
import "dayjs/locale/pt";
import calendar from "dayjs/plugin/calendar";
import { Container, Day, DaySubtitle, Habit, CardInfo, Frequency, Record, Button } from "./styles/TodayHabitsStyles"

export default function TodayHabits({ totalPercentage, setTotalPercentage }) {
  dayjs.extend(calendar);
  const { user } = useContext(UserContext);
  const [listOfHabits, setListOfHabits] = useState([]);

  function calculatePercentage() {
    const percentage2 = listOfHabits.reduce(
      (acc, item) => (item.done ? acc + 1 : acc),
      0
    );
    return (percentage2 / listOfHabits.length).toFixed(2) * 100;
  }

  if (user !== "") {
    user.percentage = calculatePercentage();
  }

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    const request = axios.get(
      `${process.env.REACT_APP_API_BASE_URL}habits/today`,
      config
    );
    request.then((response) => {
      setListOfHabits(response.data);
    });

    request.catch((error) => {
      alert(
        "Ocorreu um erro ao carregar sua lista de hábitos de hoje. Tente novamente!"
      );
    });
  }, [user]);

  function attStatusHabit(done, habitId) {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    const request = axios.post(
      `${process.env.REACT_APP_API_BASE_URL}habits/${habitId}/${
        done ? "uncheck" : "check"
      }`,
      {},
      config
    );
    request.then(() => attListOfHabits(config));
    request.catch(() =>
      alert(
        "Ocorreu um erro ao marcar seu hábito como realizado/não realizado. Tente novamente!"
      )
    );
  }

  function attListOfHabits(config) {
    const promise = axios.get(
      `${process.env.REACT_APP_API_BASE_URL}habits/today`,
      config
    );
    promise.then((response) => {
      setListOfHabits(response.data);
    });

    promise.catch((error) => {
      alert(
        "Ocorreu um erro ao atualizar a sua lista de hábitos! Tente novamente!"
      );
    });
    calculatePercentage();
  }

  return (
    <Container>
      <Header />
      <Day>
        {dayjs().locale("pt").format("dddd").replace("-feira", "")},{" "}
        {dayjs().calendar(dayjs("2019-09-21"), { sameElse: "DD/MM" })}
      </Day>
      {listOfHabits.length !== 0 ? (
        <DaySubtitle className={user.percentage !== 0 ? "exibirVerde" : ""}>
          {user.percentage !== 0
            ? `${user.percentage}% dos hábitos concluídos`
            : "Nenhum hábito concluído ainda"}
        </DaySubtitle>
      ) : (
        <DaySubtitle>Nenhum hábito concluído ainda</DaySubtitle>
      )}
      {listOfHabits
        .map((i) => (
          <Habit key={i.id}>
            <span>{i.name}</span>
            <Button onClick={() => attStatusHabit(i.done, i.id)} done={i.done}>
              <img src={check} alt="check"></img>
            </Button>
            <CardInfo>
              <Frequency done={i.done}>
                Sequência atual:{" "}
                {i.currentSequence === 1
                  ? `${i.currentSequence} dia`
                  : `${i.currentSequence} dias`}
              </Frequency>
              <Record done={i.done}>
                Seu recorde:{" "}
                {i.highestSequence === i.currentSequence
                  ? `${i.highestSequence}`
                  : ""}{" "}
                {i.highestSequence === 1 ? "dia" : "dias"}{" "}
              </Record>
            </CardInfo>
          </Habit>
        ))
        .reverse()}
      <Menu totalPercentage={user.percentage} />
    </Container>
  );
}

