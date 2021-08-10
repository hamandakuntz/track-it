import styled from "styled-components";

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
    color: #8fc549;
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

  @media (max-width: 320px) {
    margin-right: 10px;
    margin-left: 10px;
  }
`;

const CardInfo = styled.div`
  margin-top: 10px;
`;

const Frequency = styled.div`
  margin-bottom: 5px;
  color: ${(props) => (props.done ? "#8FC549" : "#666666")};
`;

const Record = styled.div`
  color: ${(props) => (props.done ? "#8FC549" : "#666666")};
`;

const Button = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 70px;
  height: 70px;
  margin: 10px;
  background: ${(props) => (props.done ? "#8FC549" : "#EBEBEB")};
  border: 1px solid #e7e7e7;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 35px;
    height: 28px;
  }
`;

export { Container, Day, DaySubtitle, Habit, CardInfo, Frequency, Record, Button };