import styled from "styled-components";

const Container = styled.div`
  background: #e5e5e5;
  min-height: 100vh;
  width: 100vw;
  padding-bottom: 80px;

  @media (max-width: 320px) {
    padding-bottom: 130px;
  }
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
  margin-top: 10px;
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
    background: #cfcfcf;

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
  opacity: ${(props) => (props.disabled ? "0.5" : "1")};
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
  opacity: ${(props) => (props.disabled ? "0.5" : "1")};

  span {
    color: #52b6ff;
  }
`;

const ButtonsWrapper = styled.div`
  display: flex;
`;

const RegisteredHabit = styled.div`
  max-width: 340px;
  background: #fff;
  border-radius: 5px;
  margin-top: 10px;
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

  @media (max-width: 320px) {
    margin-right: 10px;
    margin-left: 10px;
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
    background: #cfcfcf;

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

export { Container, MyHabitsTitle, EmptyHabits, ButtonNewHabit, ButtonWeekday, ButtonWeekday2, ButtonsWeekdayWrapper, ButtonsWeekdayWrapper2, AddNewHabit, SaveButton, CancelButton, ButtonsWrapper, RegisteredHabit }