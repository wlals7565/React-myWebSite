import styled from "styled-components";
import { useNavigate, useParams } from "react-router";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../contexts/user/UserContext";
import { getUserInfo } from "../../api/user";
import LoadingCircle from "../../components_v2/presentaions/common/LoadingCircle";
import { patchProfileAboutMe } from "../../api/profile";
import { changeImageToDefault } from "../../api/user";

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
  object-fit: cover;
  object-position: center;
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

const IntroBox = styled.div`
  color: #555555;
  flex: 1;
  white-space: pre-wrap;
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
  const [editedAboutMe, setEditedAboutMe] = useState("");
  const [isSaving, setSaving] = useState(false);

  const navigate = useNavigate();
  const ProfileImageURL = import.meta.env.VITE_API_URL + "/static/images";

  // 자기소개 수정 버튼 클릭
  const handleClickEdit = () => {
    setEditMode((prev) => !prev);
    setEditedAboutMe(userProfile.profile.aboutMe);
  };

  // 자기소개 수정 시
  const handleAboutMeChange = (e) => {
    setEditedAboutMe(e.target.value);
  };

  // 자기소개 저장 버튼 클릭
  const handleClickSave = async () => {
    if (editedAboutMe === userProfile.profile.aboutMe) {
      // 변경사항이 없으면 그냥 수정 모드 종료
      setEditMode(false);
      return;
    }

    try {
      setSaving(true);
      // 서버에 수정된 aboutMe 저장 요청
      await patchProfileAboutMe(editedAboutMe, username);

      // 성공적으로 저장되면 userProfile 상태 업데이트
      setUserProfile({
        ...userProfile,
        profile: {
          ...userProfile.profile,
          aboutMe: editedAboutMe,
        },
      });

      // 수정 모드 종료
      setEditMode(false);
    } catch (error) {
      console.error("프로필 저장 중 오류 발생:", error);
      alert("프로필 저장에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setSaving(false);
    }
  };

  // 해당 유저 정보 가져오기
  useEffect(() => {
    getUserInfo(username)
      .then(({ data }) => setUserProfile(data))
      .catch(() => {
        alert("해당 이름을 사용하는 유저가 존재하지 않습니다.");
        navigate(-1);
      });
  }, []);

  // 기본 이미지 클릭시
  const clickDefaultImage = async () => {
    try {
      await changeImageToDefault();
      setUserProfile((prev) => ({
        ...prev,
        image: "default"
      }))
    } catch (error) {
      alert("서버 오류로 인해 기본 이미지로 변경하지 못 하였습니다.");
    }
  };

  return (
    <>
      {userProfile ? (
        <ProfileBox>
          <ImageBox>
            <Image src={`${ProfileImageURL}/${userProfile.name}/${userProfile.image}.png`} />
            {username === user.username ? (
              <>
                <Button>이미지 업로드</Button>
                <Button onClick={clickDefaultImage}>기본 이미지로 변경</Button>
              </>
            ) : (
              <></>
            )}
          </ImageBox>
          <UserInfoBox>
            {editMode ? (
              <>
                <UserNameBox>{userProfile.name}</UserNameBox>
                <IntroEditTextarea
                  onChange={handleAboutMeChange}
                  value={editedAboutMe}
                />
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
                  <Button onClick={handleClickSave} disabled={isSaving}>
                    {isSaving ? "저장 중..." : "저장"}
                  </Button>
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
