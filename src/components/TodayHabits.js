import styled from "styled-components";
import Header from "./Header";
import Menu from "./Menu";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import UserContext from "../contexts/UserContext";
import check from "../assets/images/check.svg";
import dayjs from "dayjs";
import "dayjs/locale/pt";
import calendar from "dayjs/plugin/calendar";


export default function TodayHabits({ totalPercentage, setTotalPercentage }) {
  dayjs.extend(calendar);
  const { user } = useContext(UserContext);  
  const [listOfHabits, setListOfHabits] = useState([]);    

  function calculatePercentage() {
    const percentage2 = listOfHabits.reduce((acc, item) => item.done ? acc+1 : acc, 0);
    return ((percentage2/listOfHabits.length).toFixed(2)*100)        
  }

  if (user !== "") {
    user.percentage = calculatePercentage()    
  }

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    const request = axios.get(
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today",
      config
    );
    request.then((response) => {
      setListOfHabits(response.data);      
    });

    request.catch((error) => {
      alert("Ocorreu um erro ao carregar sua lista de hábitos de hoje. Tente novamente!");
    });
  }, []);

  function attStatusHabit(done, habitId) {
    

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    
    const request = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habitId}/${done ? "uncheck" : "check"}`, {}, config);
    request.then(() => attListOfHabits(config));
    request.catch(() => alert("Ocorreu um erro ao marcar seu hábito como realizado/não realizado. Tente novamente!"));      
  }

  function attListOfHabits(config) {
    const promise = axios.get(
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today",
      config
    );
    promise.then((response) => {
      setListOfHabits(response.data);      
    });

    promise.catch((error) => {
      alert("Ocorreu um erro ao atualizar a sua lista de hábitos! Tente novamente!")
    }); 
    calculatePercentage()
  }

  return (
    <Container>
      <Header />
      <Day>{dayjs().locale("pt").format("dddd").replace("-feira", "")}, {dayjs().calendar(dayjs("2019-09-21"),{sameElse: "DD/MM"})}</Day>
      {listOfHabits.length !== 0 ? 
      <DaySubtitle className={user.percentage !== 0 ? "exibirVerde" : ""}>
        {user.percentage !== 0 ? `${user.percentage}% dos hábitos concluídos` : "Nenhum hábito concluído ainda"}</DaySubtitle> : <DaySubtitle>Nenhum hábito concluído ainda</DaySubtitle>}
      {listOfHabits.map((i) => (
        <Habit key={i.id}>
          <span>{i.name}</span>
        <Button onClick={() =>           
          attStatusHabit(i.done, i.id)} done={i.done}><img src={check} alt="check"></img></Button>
          <CardInfo>
            <Frequency done={i.done}>Sequência atual: {i.currentSequence === 1 ? `${i.currentSequence} dia`: `${i.currentSequence} dias`}</Frequency>
            <Record done={i.done}>Seu recorde: {i.highestSequence === i.currentSequence ? `${i.highestSequence}` : ""} {i.highestSequence === 1 ? "dia" : "dias"} </Record>
          </CardInfo>
        </Habit>
      )).reverse()}
      <Menu totalPercentage={user.percentage}/>
    </Container>
  );
}

const Container = styled.div`
  background: #e5e5e5;
  position: absolute;
  top: 0;
  left: 0;
  min-height: 100vh;
  width: 100vw;
  padding-bottom: 130px;
`;

const Day = styled.div`
  position: absolute;
  color: #126ba5;
  font-size: 23px;
  margin-top: 100px;
  margin-left: 17px;
`;

const DaySubtitle = styled.div`  
  color: #bababa;
  font-size: 18px;
  margin-top: 130px;
  margin-left: 17px;

  &.exibirVerde {
    color: #8FC549;
  }
`;

const Habit = styled.div`
  max-width: 340px;
  height: 94px;
  background: #fff;
  border-radius: 5px;
  margin-top: 10px;
  margin-left: 17px;
  padding: 15px;
  position: relative;

  span {
    color: #666666;
    font-size: 20px;
  }

  @media(max-width: 320px) {
    margin-right: 10px;
    margin-left: 10px;
  }

`;

const CardInfo = styled.div`
    margin-top: 10px;
`;

const Frequency = styled.div`
    margin-bottom: 5px;
    color: ${props => props.done ? "#8FC549" : "#666666"};
`;

const Record = styled.div`
    color: ${props => props.done ? "#8FC549" : "#666666"};
`;

const Button = styled.div`    
    position: absolute;
    top: 0;
    right: 0;
    width: 70px;
    height: 70px;
    margin: 10px;
    background: ${props => props.done ? "#8FC549" : "#EBEBEB"};
    border: 1px solid #E7E7E7;    
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 35px;
      height: 28px;        
    }
`;