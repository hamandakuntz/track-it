import styled from "styled-components";
import Header from "./Header";
import Menu from "./Menu";
import trash from "../assets/images/trash.svg";
import { useState, useContext } from "react";
import UserContext from "../contexts/UserContext";
import axios from "axios";

export default function Habits({ selected, setSelected, selectedWeekDays, setSelectedWeekDays}) {
    const { user } = useContext(UserContext);
    const [clicked, setClicked] = useState(false);      
    const [habitTitle, setHabitTitle] = useState("");     

    const body = {
        name: habitTitle,
        days: selectedWeekDays 
    }

    function addWeekDays(e, day){            
        e.stopPropagation();     
        const newSelectedWeekDays = [...selectedWeekDays, day]    
        setSelectedWeekDays(newSelectedWeekDays);              
    }

    function saveHabit(){     
         
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        };          
        
        const request = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", body, config);        
        request.then(console.log("sucesso!"))
        request.catch("falha na requisição!")
    }


    console.log(selectedWeekDays)
    console.log(user.token)

  return (
    <Container>
      <Header />
      <MyHabitsTitle>Meus hábitos</MyHabitsTitle>   
      <ButtonNewHabit onClick={() => setClicked(true)}><span>+</span></ButtonNewHabit>
      { clicked ? 
      <AddNewHabit>
        <input value={habitTitle} onChange={(e) => setHabitTitle(e.target.value)}placeholder="nome do hábito"></input>        
        <ButtonsWeekdayWrapper>
            <ButtonWeekday selected={selected} onClick={(e) => addWeekDays(e, 7)}><span>D</span></ButtonWeekday>
            <ButtonWeekday selected={selected} onClick={(e) => addWeekDays(e, 1)}><span>S</span></ButtonWeekday>
            <ButtonWeekday selected={selected} onClick={(e) => addWeekDays(e, 2)}><span>T</span></ButtonWeekday>
            <ButtonWeekday selected={selected} onClick={(e) => addWeekDays(e, 3)}><span>Q</span></ButtonWeekday>
            <ButtonWeekday selected={selected} onClick={(e) => addWeekDays(e, 4)}><span>Q</span></ButtonWeekday>
            <ButtonWeekday selected={selected} onClick={(e) => addWeekDays(e, 5)}><span>S</span></ButtonWeekday>
            <ButtonWeekday selected={selected} onClick={(e) => addWeekDays(e, 6)}><span>S</span></ButtonWeekday>
        </ButtonsWeekdayWrapper>        
        <ButtonsWrapper>
            <CancelButton><span>Cancelar</span></CancelButton>
            <SaveButton onClick={saveHabit}><span>Salvar</span></SaveButton>
        </ButtonsWrapper>
      </AddNewHabit>
    : <EmptyHabits>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</EmptyHabits>}
      
      {/* <RegisteredHabit>
          <span>Ler 1 capítulo de livro</span>
          <img src={trash} alt="deletebutton"></img>
          <ButtonsWeekdayWrapper2>
            <ButtonWeekday2><span>D</span></ButtonWeekday2>
            <ButtonWeekday2><span>S</span></ButtonWeekday2>
            <ButtonWeekday2><span>T</span></ButtonWeekday2>
            <ButtonWeekday2><span>Q</span></ButtonWeekday2>
            <ButtonWeekday2><span>Q</span></ButtonWeekday2>
            <ButtonWeekday2><span>S</span></ButtonWeekday2>
            <ButtonWeekday2><span>S</span></ButtonWeekday2>
        </ButtonsWeekdayWrapper2>
      </RegisteredHabit> */}
                
      <Menu />      
    </Container>     
  );
}

const Container = styled.div`
  background: #E5E5E5;      
`;

const MyHabitsTitle = styled.div`    
    color: #126BA5;
    font-size: 23px;
    margin-top: 100px;
    margin-left: 17px;
`;

const EmptyHabits = styled.div`    
    color: #666666;
    font-size: 18px;
    margin-top: 20px;
    margin-left: 17px;
`;

const ButtonNewHabit = styled.button`
    position: fixed;
    color: #666666;
    font-size: 18px;
    top: 95px;    
    left: calc(100% - 55px);
    z-index: 4;
    width: 40px;
    height: 35px;
    background-color:#52B6FF;
    border:none;
    border-radius: 4.63636px;

    span {
        color: #fff;
        font-size: 30px;
    }
`;

const AddNewHabit = styled.div`
    width: 340px;
    height: 180px;
    background: #FFF;
    border-radius:5px;
    margin-top: 147px;
    margin-left: 17px;

    input {
      width: 303px;
      height: 45px;
      margin: 18px;
      margin-bottom: 10px;
      border: 1px solid #D5D5D5;
      border-radius: 5px;

      ::placeholder {        
        font-family: "Lexend Deca";
        color: #dbdbdb;
        font-size: 20px;
        padding-left: 5px;             
      }
    }
`;

const ButtonWeekday = styled.button`
    width: 30px;
    height: 30px;    
    margin-left: 4px;    
    margin-right: 4px;
    background: ${props => props.selected ? "#CFCFCF" : "#FFFFFF"};
    border: 1px solid #D5D5D5;
    border-radius: 5px;

    span { 
        color: #dbdbdb;
        font-family: "Lexend Deca";
        font-size: 20px;
    }
`;

const ButtonsWeekdayWrapper = styled.div`
    margin-left: 13px;     
`;

const SaveButton = styled.div`
    margin-top: 30px;    
    background: #52B6FF;
    width: 85px;
    height: 35px;
    border-radius: 5px;    
    display: flex;
    align-items: center;
    justify-content: center;

    span {
        color: white;
        font-size: 16px;        
    }

`;

const CancelButton = styled.div`
    margin-left: 135px;
    margin-top: 30px;
    margin-right: 15px;
    width: 85px;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;

    span {
        color: #52B6FF;
    }
`;

const ButtonsWrapper= styled.div`
    display: flex;
`;

const RegisteredHabit = styled.div`
    width: 340px;
    height: 91px;
    background: #FFF;
    border-radius:5px;
    margin-top: 5px;    
    margin-left: 17px;
    padding: 15px;
    display: flex;
    flex-direction: column;   
    position: relative; 

    span { 
        color: #666666;
        font-family: "Lexend Deca";
        font-size: 20px;
    }

    img {
        right: 0;
        margin-right: 15px;        
        position: absolute;
    }
`;

const ButtonsWeekdayWrapper2 = styled.div`
    margin-top: 10px;    
`;

const ButtonWeekday2 = styled.button`
    width: 30px;
    height: 30px;       
    margin-right: 4px;
    background: #FFFFFF;
    border: 1px solid #D5D5D5;
    border-radius: 5px;

    span { 
        color: #dbdbdb;
        font-family: "Lexend Deca";
        font-size: 20px;
    }
`;
