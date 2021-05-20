import styled from "styled-components";
import Header from "./Header";
import Menu from "./Menu";
import trash from "../assets/images/trash.svg";
import { useEffect, useState, useContext } from "react";
import UserContext from "../contexts/UserContext";
import axios from "axios";

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
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits",
      config
    );
    request.then((response) => {
      setSavedHabits(response.data);
      console.log(response.data);
    });

    request.catch((error) => {
      console.log(error);
    });
  }, [user.token]);

  function addWeekDays(e, day) {

    if (loading) {
        return
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
        alert("Selecione pelo menos um dia!")
        return
    }

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    const request = axios.post(
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits",
      body,
      config
    );

    setLoading(true);

    request.then((response) => {
      setSavedHabits([...savedHabits, response.data]);
      console.log(response.data);
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

    const answer = window.confirm("Tem certeza que você deseja excluir o hábito?");

    if (!answer) { 
        return 
    }

    const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
    };

    const request = axios.delete(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}`, config)
    request.then(() => {
        const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", config)
        promise.then((response) => {
            setSavedHabits(response.data)
            console.log("sucesso")
        })        
    }) 
    
    
    request.catch(() => console.log("erro"))    
    console.log(savedHabits);  
  }
  
  console.log(user.token);

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
          onChange={(e) =>   
            setHabitTitle(e.target.value)
          }
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
            <span>Salvar</span>
          </SaveButton>
        </ButtonsWrapper>
      </AddNewHabit>
      {savedHabits.length === 0 ? <EmptyHabits>
        Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para
        começar a trackear!
      </EmptyHabits> : ""}
        
      {savedHabits.length >= 1 ? savedHabits.map((i) => (
        <RegisteredHabit key={i.id}>
          <span>{i.name}</span>
          <img onClick={() => deleteHabit(i.id)} src={trash} alt="deletebutton"></img>
          <ButtonsWeekdayWrapper2>
            {weekDays.map((w, index) => (              
                <ButtonWeekday2 key={index} className={i.days.includes(index) ? "selected" : ""}>
                  <span>{w}</span>
                </ButtonWeekday2>              
            ))}
          </ButtonsWeekdayWrapper2>         
        </RegisteredHabit>
      )) : ""}
      <Menu />
    </Container>
  );
}

const Container = styled.div`
  background: #e5e5e5;
  min-height: 100vh;
  width: 100vw;  
  padding-bottom: 80px;
`;

const MyHabitsTitle = styled.div`
  color: #126ba5;
  font-size: 23px;
  padding-top: 100px;
  padding-left: 17px;
  padding-bottom: 20px;
`;

const EmptyHabits = styled.div`
  color: #666666;
  font-size: 18px;
  margin-top: 20px;
  margin-left: 17px;
`;

const ButtonNewHabit = styled.button`
  position: absolute;
  color: #666666;
  font-size: 18px;
  top: 95px;
  left: calc(100% - 55px);
  z-index: 4;
  width: 40px;
  height: 35px;
  background-color: #52b6ff;
  border: none;
  border-radius: 4.63636px;

  span {
    color: #fff;
    font-size: 30px;
  }
`;

const AddNewHabit = styled.div`
  width: 340px;
  height: 180px;
  background: #fff;
  border-radius: 5px;
  margin-top: 20px;
  margin-left: 17px;
  display: ${(props) => (props.show === true ? "flex" : "none")};
  flex-direction: column;

  input {
    width: 303px;
    height: 45px;
    margin: 18px;
    margin-bottom: 10px;
    border: 1px solid #d5d5d5;
    border-radius: 5px;
    font-family: "Lexend Deca";

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
  background: #fff;
  border: 1px solid #d5d5d5;
  border-radius: 5px;

  &.selected {
    background: #CFCFCF;
    
    span {
        color: white;
    }
  }

  span {
    color: #dbdbdb;
    font-family: "Lexend Deca";
    font-size: 20px;
  }
`;

const ButtonsWeekdayWrapper = styled.div`
  margin-left: 13px;  
`;

const SaveButton = styled.button`
  margin-top: 30px;
  background: #52b6ff;
  width: 85px;
  height: 35px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  font-family: "Lexend Deca";

  span {
    color: white;
    font-size: 16px;
  }
`;

const CancelButton = styled.button`
  margin-left: 135px;
  margin-top: 30px;
  margin-right: 15px;
  width: 85px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  font-family: "Lexend Deca";
  background: #fff;
  font-size: 16px;

  span {
    color: #52b6ff;
  }
`;

const ButtonsWrapper = styled.div`
  display: flex;
`;

const RegisteredHabit = styled.div`
  width: 340px;
  height: 91px;
  background: #fff;
  border-radius: 5px;
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
  background: #ffffff;
  border: 1px solid #d5d5d5;
  border-radius: 5px;

  &.selected {
    background: #CFCFCF;
    
    span {
        color: white;
    }
  }

  span {
    color: #dbdbdb;
    font-family: "Lexend Deca";
    font-size: 20px;
  }
`;
