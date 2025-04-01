import styled from "styled-components";
import { useNavigate, useParams } from "react-router";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../contexts/user/UserContext";
import { getUserInfo } from "../../api/user";
import LoadingCircle from "../../components_v2/presentaions/common/LoadingCircle";

// 프로필 소개 박스
// 프로필 소개 수정 버튼

const ProfileBox = styled.div`
  display: flex;
  border-radius: 10px;
  border: 1px solid #c6c6c6;
  margin-top: 2rem;
  margin-bottom: 2rem;
  padding: 3rem;
`;

const ImageBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 4rem;
  padding-right: 2rem;
  border-right: 1px solid #f0f0f0;
`;

const Image = styled.img`
  width: 10rem;
  height: 10rem;
  border-radius: 50%;
  border: none;
  margin-bottom: 2rem;
`;

const Button = styled.button`
  color: black;
  padding: 0.5rem;
  background-color: #ffffff;
  font-weight: bold;
  border: 1px solid;
  border-radius: 10px;
  margin-bottom: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }

  &:active {
    background-color: #e4e4e4;
  }
`;

const UserInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-right: 2rem;
`;

const UserNameBox = styled.div`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const UserNameEditInput = styled.input`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const IntroBox = styled.div`
  color: #555555;
  flex: 1;
`;

const IntroEditTextarea = styled.textarea`
  color: #555555;
  flex: 1;
  resize: none;
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: end;
  margin-top: 2rem;
`;

const ProfilePages = () => {
  const { username } = useParams();
  const { user } = useContext(UserContext);
  const [userProfile, setUserProfile] = useState(undefined);
  const [editMode, setEditMode] = useState(false);

  const navigate = useNavigate();
  const ProfileImageURL = import.meta.env.VITE_API_URL + "/static/images";

  const handleClickEdit = () => {
    setEditMode((prev) => !prev);
  };

  const handleClickSave = () => {
    setEditMode((prev) => !prev);
  };

  useEffect(() => {
    getUserInfo(username)
      .then(({ data }) => setUserProfile(data))
      .catch(() => {
        alert("해당 이름을 사용하는 유저가 존재하지 않습니다.");
        navigate(-1);
      });
  }, []);

  return (
    <>
      {userProfile ? (
        <ProfileBox>
          <ImageBox>
            <Image src={`${ProfileImageURL}/${userProfile.image}.png`} />
            {username === user.username ? (
              <>
                <Button>이미지 업로드</Button>
                <Button>기본 이미지</Button>
              </>
            ) : (
              <></>
            )}
          </ImageBox>
          <UserInfoBox>
            {editMode ? (
              <>
              <UserNameBox>{userProfile.name}</UserNameBox>
              <IntroEditTextarea value={userProfile.profile.aboutMe} />
              </>
            ) : (
              <>
                <UserNameBox>{userProfile.name}</UserNameBox>
                <IntroBox>{userProfile.profile.aboutMe}</IntroBox>
              </>
            )}
            {username === user.username ? (
              <ButtonBox>
                {editMode ? (
                  <Button onClick={handleClickSave}>저장</Button>
                ) : (
                  <Button onClick={handleClickEdit}>수정</Button>
                )}
              </ButtonBox>
            ) : (
              <></>
            )}
          </UserInfoBox>
        </ProfileBox>
      ) : (
        <LoadingCircle />
      )}
    </>
  );
};

export default ProfilePages;
