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


export default function TodayHabits() {
  dayjs.extend(calendar);
  const { user } = useContext(UserContext);  
  const [listOfHabits, setListOfHabits] = useState([]);  
  const [selected, setSelected] = useState(false); 
  
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
      console.log(response.data);
    });

    request.catch((error) => {
      console.log(error);
    });
  }, []);

  function attStatusHabit(habit, done, habitId) {
    console.log(habitId)

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    
    const request = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habitId}/${done ? "uncheck" : "check"}`, {}, config);
    request.then(() => attListOfHabits(config));
    request.catch(() => console.log("falhou"))
  }

  function attListOfHabits(config) {
    const promise = axios.get(
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today",
      config
    );
    promise.then((response) => {
      setListOfHabits(response.data);
      console.log(response.data);
    });

    promise.catch((error) => {
      console.log(error);
    }); 
  }

  console.log(listOfHabits);

  return (
    <Container>
      <Header />
      <Day>{dayjs().locale("pt").format("dddd").replace("-feira", "")}, {dayjs().calendar(dayjs("2019-09-21"),{sameElse: "DD/MM"})}</Day>
      <DaySubtitle>{listOfHabits.length}</DaySubtitle>
      {listOfHabits.map((i) => (
        <Habit key={i.id}>
          <span>{i.name}</span>
        <Button onClick={() => attStatusHabit(i, i.done, i.id)} done={i.done}><img src={check} alt="check"></img></Button>
          <CardInfo>
            <Frequency>Sequência atual: x dias</Frequency>
            <Record>Seu recorde: x dias</Record>
          </CardInfo>
        </Habit>
      )).reverse()}
      <Menu />
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
`;

const Habit = styled.div`
  width: 340px;
  height: 94px;
  background: #fff;
  border-radius: 5px;
  margin-top: 20px;
  margin-left: 17px;
  padding: 15px;
  position: relative;

  span {
    color: #666666;
    font-size: 20px;
  }
`;

const CardInfo = styled.div`
    margin-top: 10px;
`;

const Frequency = styled.div`
    margin-bottom: 5px;
    color: #666666;
`;

const Record = styled.div`
    color: #666666;
`;

const Button = styled.div`    
    position: absolute;
    top: 0;
    right: 0;
    width: 70px;
    height: 70px;
    margin: 10px;
    background: ${props => props.done ? 'green' : "#EBEBEB"};
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