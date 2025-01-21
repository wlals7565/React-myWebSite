import { client, baseClient } from ".";

export const login = async (
  callbackfn,
  credentials,
  afterLoginSuccessfn,
  afterLoginFailfn
) => {
  try {
    const { data } = await client.post("/auth/login", credentials, {
      withCredentials: true,
    });
    callbackfn({ email: data.email, username: data.name, id: data.uuid });
    afterLoginSuccessfn();
  } catch (error) {
    if (error.response) {
      // 클라이언트에서 잘못된 요청을 보낸 경우 (아이디 또는 비밀번호가 누락되었을 때)
      if (error.response.status === 400) {
        afterLoginFailfn("아이디 또는 비밀번호를 올바르게 입력해 주세요.");
      }
      // 인증 실패 (아이디 또는 비밀번호가 잘못된 경우)
      else if (error.response.status === 401) {
        afterLoginFailfn("아이디 또는 비밀번호를 올바르게 입력해 주세요.");
      }
      // 그 외의 오류
      else {
        afterLoginFailfn(
          "로그인 도중에 문제가 생겼습니다. 나중에 다시 시도해주세요."
        );
      }
    }
    // 네트워크 오류
    else {
      afterLoginFailfn(
        "인터넷 연결이 원할하지 않습니다. 나중에 다시 시도해주세요."
      );
    }
  }
};

export const register = async (form, afterRegisterfn) => {
  try {
    await client.post("/auth/signup", form, { withCredentials: true });
    alert("성공적으로 회원가입이 되었습니다.");
    afterRegisterfn();
  } catch (error) {
    if (error.response) {
      // 클라이언트에서 잘못된 요청을 보낸 경우 (입력 값이 부족하거나 잘못된 경우)
      if (error.response.status === 400) {
        alert("Please check your input fields and try again.");
      }
      // 이미 존재하는 계정 (중복된 이메일 또는 사용자명)
      else if (error.response.status === 409) {
        alert("This email or username is already registered.");
      }
      // 그 외의 서버 측 오류
      else {
        alert("An issue occurred during registration. Please try again.");
      }
    }
    // 네트워크 오류
    else {
      alert("Unable to connect to the server.");
    }
  }
};
// #TODO
// 에러를 출력하는게 옳은 일인가?
// 정확히는 처음 접속했을 때 로그인이 안되어있는게 정상이고
// 쿠키가 없는게 정상인데
// 에러로 처리하는게 맞는걸까?
export const checkAuthStatus = async (callbackfn) => {
  try {
    const { data } = await baseClient.get("/auth/checkAuthStatus", {
      withCredentials: true,
    });
    if (!data) {
      return;
    }
    callbackfn({ email: data.email, username: data.username, id: data.uuid });
  } catch (error) {
    console.error(error);
  }
};

export const logout = async (afterLogoutFn) => {
  try {
    await client.get("/auth/logout", { withCredentials: true });
    afterLogoutFn();
    alert("You have been logged out successfully.");
  } catch (error) {
    if (error.response) {
      // 클라이언트가 잘못된 요청을 보낸 경우
      if (error.response.status === 400) {
        alert("Logout request is invalid. Please try again.");
      }
      // 인증되지 않은 상태에서 로그아웃 시도
      else if (error.response.status === 401) {
        alert("You are not logged in.");
      }
      // 서버 측 오류
      else {
        alert("An issue occurred during logout. Please try again.");
      }
    }
    // 네트워크 오류
    else {
      alert("Unable to connect to the server.");
    }
  }
};
