import styled from "styled-components";
import Header from "./Header";
import Menu from "./Menu";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useContext, useState, useEffect} from "react";
import UserContext from "../contexts/UserContext";
import axios from "axios";

export default function History() {
  const { user } = useContext(UserContext);
  const [historyOfHabits, setHistoryOfHabits] = useState([]);

  function calculatePercentage() {
    const percentage2 = historyOfHabits.reduce((acc, item) => item.done ? acc+1 : acc, 0);
    return ((percentage2/historyOfHabits.length).toFixed(2)*100)        
  }
  console.log(user.percentage)

  console.log(calculatePercentage())

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    const request = axios.get(
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/history/daily",
      config
    );
    request.then((response) => {
      setHistoryOfHabits(response.data);
      console.log(response.data);
    });

    request.catch((error) => {
      console.log(error);
    });
    
  }, [user.token]);

  return (
    <Container>
      <Header user={user}/>
      <Title><span>Histórico</span></Title>
      <Calendar />
      <Menu totalPercentage={user.percentage}/>
      </Container>
  );
}

const Container = styled.div`
  background: #e5e5e5;
  min-height: 100vh;
  width: 100vw;  
  padding-bottom: 80px;
  padding-left: 10px;
`;

const Title = styled.div`
  color: #126ba5;
  font-size: 23px;
  padding-top: 100px;
  padding-left: 17px;
  padding-bottom: 20px;
`;



