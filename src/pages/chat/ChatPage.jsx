import { useState, useEffect, useRef, useContext, useMemo } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import UserContext from "../../contexts/user/UserContext";
import { checkAuthStatus } from "../../api/auth";
import { useNavigate } from "react-router";
import { io } from "socket.io-client";

const OnlineCount = styled.span`
  font-size: 0.9rem;
  color: #28a745;
  font-weight: normal;
`;

const ChatContainer = styled.div`
  background-color: #ffffff;
  border: 1px solid #555;
  border-radius: 20px;
  height: 80vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  margin: 2rem 0;
`;

const ChatHeader = styled.div`
  padding: 15px;
  border-bottom: 1px solid #e0e0e0;
  font-size: 1.2rem;
  font-weight: bold;
  background-color: #f8f8f8;
`;

const MessagesContainer = styled.div`
  flex: 1;
  padding: 15px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

const MessageBox = styled.div`
  align-items: flex-start; /* 상단 정렬 명시 */
  display: flex;
  margin-bottom: 15px;
  flex-direction: ${(props) => (props.$isMine ? "row-reverse" : "row")};
`;

const MessageContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 70%;
  ${(props) => (props.$isMine ? "margin-right: 10px;" : "margin-left: 10px;")}
`;

const UserAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${(props) => props.color || "#3ca4ff"};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  margin: ${(props) => (props.$isMine ? "0 0 0 10px" : "0 10px 0 0")};
`;

const MessageContent = styled.div`
  padding: 10px 15px;
  border-radius: 18px;
  background-color: ${(props) => (props.$isMine ? "#246BEB" : "#F0F0F0")};
  color: ${(props) => (props.$isMine ? "#ffffff" : "#000000")};
  word-break: break-word;
`;

const MessageInfo = styled.div`
  font-size: 0.7rem;
  color: #aaa;
  margin-top: 5px;
  text-align: ${(props) => (props.$isMine ? "right" : "left")};
`;

const UserName = styled.span`
  font-weight: bold;
  color: #555;
`;

const InputContainer = styled.div`
  display: flex;
  padding: 15px;
  border-top: 1px solid #e0e0e0;
  background-color: #f8f8f8;
`;

const MessageInput = styled.input`
  flex: 1;
  padding: 12px 15px;
  border: 1px solid #ccc;
  border-radius: 20px;
  font-size: 1rem;
  outline: none;

  &:focus {
    border-color: #246beb;
  }
`;

const SendButton = styled.button`
  background-color: #246beb;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 0 20px;
  margin-left: 10px;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #1a5bc2;
  }

  &:active {
    background-color: #124a9e;
  }
`;

const generateInitials = (name) => {
  if (!name) return "?";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
};

const ChatPage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  //
  const messagesEndRef = useRef(null);

  // 메시지 스크롤 기능
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Socket.IO 연결 설정
  useEffect(() => {
    let isLogin = false;

    const checkLogin = async () => {
      isLogin = await checkAuthStatus();

      if (!isLogin) {
        alert("로그인 이후에 이용해주시기 바랍니다.");
        navigate(-1);
      }
    };

    checkLogin();

    if(!user.username) {
      return;
    }

    // 소켓 연결
    const newSocket = io(import.meta.env.VITE_API_URL, {
      extraHeaders: {
        "ngrok-skip-browser-warning": "true",
      },
    });
    setSocket(newSocket);

    // 소켓 이벤트 리스너 설정
    // 메세지가 들어올 시
    newSocket.on("message", (message) => {
      console.log(message)
      setMessages((prev) => [...prev, message]);
    });

    // 시스템 메세지
    newSocket.on("systemMessage", (message) => {
      console.log("systemMessage")
      setMessages((messages)=> [...messages, message])
    });

    // 이전 채팅기록 가져오기
    newSocket.on("chatHistory", (history) => {
      setMessages(history);
    });

    // 새로운 유저 방문시
    newSocket.on("userJoined", (user) => {
      console.log("userJoined")
      setOnlineUsers((prev) => [...prev, user]);
    });

    // 유저 채팅방 나갈시
    newSocket.on("userLeft", ({ userId }) => {
      setOnlineUsers((prev) => prev.filter((user) => user.id !== userId));
    });

    newSocket.emit("join", { email: user.email, username: user.username, uuid: user.id });

    // 컴포넌트 언마운트 시 연결 해제
    return () => {
      newSocket.disconnect();
    };
  }, [user, navigate]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 메시지 전송
  const handleSendMessage = () => {
    if (newMessage.trim() === "" || !socket) return;

    socket.emit("sendMessage", { text: newMessage });
    setNewMessage("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <ChatContainer>
      <ChatHeader>
        전체 채팅
        <OnlineCount>접속자 {onlineUsers.length}명</OnlineCount>
      </ChatHeader>

      <MessagesContainer>
        {messages.map((message) => {
          const isMine = message.author.uuid === user.id;

          return (
            <MessageBox key={message.id} $isMine={isMine}>
              <UserAvatar color={message.author.color} $isMine={isMine}>
                {generateInitials(message.author.username)}
              </UserAvatar>

              <MessageContentWrapper $isMine={isMine}>
                <MessageContent $isMine={isMine}>{message.text}</MessageContent>

                <MessageInfo $isMine={isMine}>
                  <UserName>{message.author.username}</UserName> •{" "}
                  {dayjs(message.createdAt).format("HH:mm")}
                </MessageInfo>
              </MessageContentWrapper>
            </MessageBox>
          );
        })}

        <div ref={messagesEndRef} />
      </MessagesContainer>

      <InputContainer>
        <MessageInput
          type="text"
          placeholder="메시지를 입력하세요..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <SendButton onClick={handleSendMessage}>전송</SendButton>
      </InputContainer>
    </ChatContainer>
  );
};

export default ChatPage;
