import { Container } from "../components/StyledComponents";
import styled from "styled-components";
import { serverApiPath } from "../api";
import BlueButton from "../components/BlueButton";
import { useParams } from "react-router";
import { useContext, useEffect, useRef } from "react";
import UserContext from "../contexts/UserContext";
import { useState } from "react";
import { getUserProfile } from "../api/profile";
import LoadingCircle from "../components/presentations/LoadingCircle";
import { uploadAvatar } from "../api/profile";
import axios from "axios";

const FlexBox = styled.div`
  display: flex;
  width: 100%;
  gap: 2rem;
`;

const InvisibleFileInput = styled.input`
  display: none;
`

const AboutMeBodyArea = styled.div`
  padding: 20px;
  background-color: #444;
  border-radius: 5px;
  white-space: pre-line;
  color: #fff;
  height: 100%;
`;

const ProfileBox = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const NameBox = styled.div`
  display: flex;
  color: white;
  font-size: xx-large;
  margin-bottom: 1rem;
  padding-bottom: 0rem;
  justify-content: space-between;
`;

const ProfileImage = styled.img`
  width: 100%; // 실제 표시될 크기
  height: 100%;
  object-fit: cover; // 비율 유지하면서 자르기
  object-position: center; // 중앙 정렬
  border-radius: 10px;
`;

const ClickToChangeImageButton = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.5); /* 반투명 배경 */
  color: white;
  text-align: center;
  padding: 10px 0px;
  cursor: pointer;
  font-size: 16px;
  border-bottom-left-radius: 10px; /* 왼쪽 아래 모서리 둥글게 */
  border-bottom-right-radius: 10px; /* 오른쪽 아래 모서리 둥글게 */
`;

const RelativeDiv = styled.div`
  position: relative;
  width: 20rem;
  height: 20rem;
`

const ProfilePage = () => {
  const { user } = useContext(UserContext);
  const { username } = useParams();
  const [userProfile, setUserProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const fileInputRef = useRef(null);

  const changeImageUrl = (imageUrl) => {
    setUserProfile((prev) => ({
      ...prev, profile: {...prev.profile, picturePath: imageUrl}
    }))
  }

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      await uploadAvatar(username, formData, changeImageUrl);
      // 업로드 성공 시 UI 업데이트
    } catch (error) {
      console.error("업로드 실패:", error);
    }
  };

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

  const handleClickChangeImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleErrorOnImage = () => {
    setUserProfile((prev) => ({
      ...prev, profile: {...prev.profile, picturePath: 'unknown.png'}
    }))
  }

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
          <RelativeDiv>
            <ProfileImage
              src={
                userProfile.profile.picturePath !== "unknown"
                  ? `${serverApiPath}/avatars/${userProfile.profile.picturePath}`
                  : `${serverApiPath}/avatars/unknown.png`
              }
              onError={handleErrorOnImage}
            />
            <ClickToChangeImageButton onClick={handleClickChangeImage}>
              Click to change image
            </ClickToChangeImageButton>
          </RelativeDiv>
          <ProfileBox>
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
          </ProfileBox>
          <InvisibleFileInput type="file" ref={fileInputRef} accept="image/*" onChange={handleFileChange}/>
        </FlexBox>
      )}
    </Container>
  );
};

export default ProfilePage;
