import styled from "styled-components";
import Header from "./Header";
import Menu from "./Menu";

export default function Habits() {
  return (
    <Container>
      <Header />
      <MyHabitsTitle>Meus hábitos</MyHabitsTitle>   
      <ButtonNewHabit><span>+</span></ButtonNewHabit>
      <AddNewHabit>
        <input placeholder="nome do hábito"></input>
        <ButtonsWeekdayWrapper>
            <ButtonWeekday><span>D</span></ButtonWeekday>
            <ButtonWeekday><span>S</span></ButtonWeekday>
            <ButtonWeekday><span>T</span></ButtonWeekday>
            <ButtonWeekday><span>Q</span></ButtonWeekday>
            <ButtonWeekday><span>Q</span></ButtonWeekday>
            <ButtonWeekday><span>S</span></ButtonWeekday>
            <ButtonWeekday><span>S</span></ButtonWeekday>
        </ButtonsWeekdayWrapper>
        <ButtonsWrapper>
            <CancelButton><span>Cancelar</span></CancelButton>
            <SaveButton><span>Salvar</span></SaveButton>
        </ButtonsWrapper>
      </AddNewHabit>
      <EmptyHabits>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</EmptyHabits>    
      <Menu />      
    </Container>     
  );
}

const Container = styled.div`
  background: #E5E5E5;
  position: absolute;
  top: 0;
  left: 0;  
  height: 100%;
  width: 100%;   
`;

const MyHabitsTitle = styled.div`
    position: absolute;
    color: #126BA5;
    font-size: 23px;
    margin-top: 100px;
    margin-left: 17px;
`;

const EmptyHabits = styled.div`
    position: absolute;
    color: #666666;
    font-size: 18px;
    margin-top: 30px;
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
    background: #FFFFFF;
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
