import React, {useEffect, useState} from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardHeader,
  MDBCardBody,
  MDBIcon,
  MDBTextArea,
} from "mdb-react-ui-kit";
import styles from "./ChatAll.module.css"
import {IoIosSend} from "react-icons/io";
import {ChatAPI} from "../../api/chatRoom";
import { io } from "socket.io-client";


function ChatAll() {
  const socket = io("http://localhost:3000");
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const sendMessage = async () => {
    // Gửi tin nhắn qua REST API
    await ChatAPI.sendMessage({
      text: newMessage,
      users: [],
      sender: "userId",
    });

    socket.emit("chatMessage", {
      text: newMessage,
      users: [],
      sender: "userId",
    });

    setMessages((prevMessages) => [
      ...prevMessages,
      { text: newMessage, sender: "userId" },
    ]);
    setNewMessage("");
  };

  useEffect(() => {
    socket.on("chatMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("chatMessage");
    };
  }, []);
  return (
    <MDBContainer className="py-5">
      <MDBRow className="d-flex justify-content-center">
        <MDBCol md="8" lg="6" xl="4">
          <MDBCard id="chat1" style={{borderRadius: "15px"}}>
            <MDBCardHeader
              className="d-flex justify-content-between align-items-center p-3 bg-info text-white border-bottom-0"
              style={{
                borderTopLeftRadius: "15px",
                borderTopRightRadius: "15px",
              }}
            >
              <MDBIcon fas icon="angle-left" />
              <p className="mb-0 fw-bold">Live chat</p>
              <MDBIcon fas icon="times" />
            </MDBCardHeader>
            <MDBCardBody>
              <div className="d-flex flex-row justify-content-start mb-4">
                <div>tên</div>
                <div
                  className="p-3 ms-3"
                  style={{
                    borderRadius: "15px",
                    backgroundColor: "rgba(57, 192, 237,.2)",
                  }}
                >
                  <p className="small mb-0">
                    Hello and thank you for visiting MDBootstrap. Please click
                    the video below.
                  </p>
                </div>
              </div>
              <div className="d-flex flex-row justify-content-end mb-4">
                <div
                  className="p-3 me-3 border"
                  style={{borderRadius: "15px", backgroundColor: "#fbfbfb"}}
                >
                  <p className="small mb-0">
                    Thank you, I really like your product.
                  </p>
                </div>
                <div>tên</div>
              </div>
              <MDBTextArea
                className="form-outline"
                label="Type your message"
                id="textAreaExample"
                rows={4}
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button className={styles.btn} onClick={sendMessage}>
                <IoIosSend />
              </button>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default ChatAll;