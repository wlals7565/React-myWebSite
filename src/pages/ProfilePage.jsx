import { Container } from "../components/StyledComponents";
import styled from "styled-components";
import { serverApiPath } from "../api";
import BlueButton from "../components/BlueButton";
import { useParams } from "react-router";
import { useContext, useEffect } from "react";
import UserContext from "../contexts/UserContext";
import { useState } from "react";
import { getUserProfile } from "../api/profile";
import LoadingCircle from "../components/presentations/LoadingCircle";

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
  white-space: pre-line;
  color: #fff;
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
  const { user } = useContext(UserContext);
  const { username } = useParams();
  const [userProfile, setUserProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getUserProfile(username, setUserProfile)
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setError(true);
      });
  }, [user, username]);
  return (
    <Container>
      {error ? (
        <div>Error</div>
      ) : loading ? (
        <LoadingCircle />
      ) : !userProfile ? (
        <div>Not Found User</div>
      ) : (
        <FlexBox>
          <img
            src={userProfile.profile.picturePath !== "unknown"? `${serverApiPath}/avatars/${userProfile.profile.picturePath}` :`${serverApiPath}/avatars/unknown.png`}
            style={{
              width: "20rem", // 실제 표시될 크기
              height: "20rem",
              objectFit: "cover", // 비율 유지하면서 자르기
              objectPosition: "center", // 중앙 정렬
              borderRadius: "10px",
            }}
          />
          <div
            style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}
          >
            <NameBox>
              {username === user.username ? (
                <>
                  <div>{userProfile.name}</div>
                  <BlueButton type="button">Edit profile</BlueButton>
                </>
              ) : (
                <>
                  <div>{userProfile.name}</div>
                  <div style={{ visibility: "hidden" }}>blank</div>
                </>
              )}
            </NameBox>
            <AboutMeBodyArea>{userProfile.profile.aboutMe}</AboutMeBodyArea>
          </div>
        </FlexBox>
      )}
    </Container>
  );
};

export default ProfilePage;
