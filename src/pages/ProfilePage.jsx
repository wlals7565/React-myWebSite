import { Container } from "../components/StyledComponents";
import styled from "styled-components";
import { serverApiPath } from "../api";
import BlueButton from "../components/BlueButton";

const FlexBox = styled.div`
  display: flex;
  width: 100%;
  gap: 2rem;
`;

const AboutMeBodyArea = styled.div`
  padding: 20px;
  background-color: #444;
  border-radius: 5px;
  height: 100%;
`;

const NameBox = styled.div`
  display: flex;
  color: white;
  font-size: xx-large;
  margin-bottom: 1rem;
  padding-bottom: 0rem;
  justify-content: space-between;
`;

const ProfilePage = () => {
  return (
    <Container>
      <FlexBox>
        <img
          src={`${serverApiPath}/avatars/unknown.png`}
          style={{
            width: "20rem", // 실제 표시될 크기
            height: "20rem",
            objectFit: "cover", // 비율 유지하면서 자르기
            objectPosition: "center", // 중앙 정렬
            borderRadius: "10px",
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", flexGrow: 1}}>
          <NameBox>
            <div>이정훈</div>
            <BlueButton type="button">Edit profile</BlueButton>
          </NameBox>
          <AboutMeBodyArea>123456789</AboutMeBodyArea>
        </div>
      </FlexBox>
    </Container>
  );
};

export default ProfilePage;
