import styled from "styled-components";
import Header from "./Header";
import Menu from "./Menu";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useContext, useState, useEffect} from "react";
import UserContext from "../contexts/UserContext";
import axios from "axios";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";

export default function History() {  
  const { user } = useContext(UserContext);
  const [historyOfHabits, setHistoryOfHabits] = useState([]); 
  
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
      setHistoryOfHabits(historyOfHabits);      

    });

    request.catch((error) => {
      alert("Ocorreu um erro ao carregar o seu histórico de hábitos. Tente novamente.");
    });
    
  }, [user.token]);
  
  function tileClassName({ date, view }) {          
    if (view === 'month') {        
        for (let i = 0; i < historyOfHabits.length; i++) {
          if (historyOfHabits[i].day === 
            dayjs(date).format('DD/MM/YYYY')) {                 
            if (historyOfHabits[i].habits.find(d => d.done === false)) {
              return 'highlight';
            } else {
              return 'greenlight';
            }
          }        
        }
        
    } 
  }


  return (
    <Container>
      <Header user={user}/>
      <Title><span>Histórico</span></Title>
      <Calendar        
        calendarType="US"
        tileClassName={tileClassName}                       
        />
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
  padding-left: 5px;
  padding-bottom: 20px;
`;



