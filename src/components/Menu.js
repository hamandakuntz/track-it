import styled from "styled-components";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Link } from "react-router-dom";

export default function Menu({totalPercentage}) {
  
  return (
    <Container>
      <Link to="/habits">
        <ButtonHabits>Hábitos</ButtonHabits>
      </Link>
      <Link to="/today">
        <ProgressbarWrapper>
          <CircularProgressbar
            value={totalPercentage}
            text="Hoje"
            background
            backgroundPadding={6}
            styles={buildStyles({
              backgroundColor: "#52B6FF",
              textColor: "#fff",
              pathColor: "#fff",
              trailColor: "transparent",
            })}
          />
        </ProgressbarWrapper>
      </Link>
      <Link to="/history">
        <ButtonHistory>Histórico</ButtonHistory>
      </Link>
    </Container>
  );
}

const Container = styled.div`
  background: #ffffff;
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  bottom: 0;
  left: 0;
`;

const ButtonHabits = styled.div`
  color: #52b6ff;
  font-size: 18px;
  margin-top: 22px;
  margin-bottom: 26px;
  margin-left: 36px;
`;

const ButtonHistory = styled.div`
  color: #52b6ff;
  font-size: 18px;
  margin-top: 22px;
  margin-bottom: 26px;
  margin-right: 36px;
`;

const ProgressbarWrapper = styled.div`
  width: 91px;
  height: 91px;
  margin-bottom: 50px;
`;
