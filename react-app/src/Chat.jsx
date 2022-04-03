import React, { useState } from "react";
import "./Chat.css";
import io from "socket.io-client";
const socket = io("http://localhost:9000");
const AvatarColor = (Math.random() * 999999).toFixed(0);
socket.on("send message to client", (data) => {
  const message = document.getElementById("message");
  const item = document.createElement("li");
  const text = document.createElement("p");
  const Avatar = document.createElement("div");
  Avatar.style.backgroundColor = `#${AvatarColor}`;
  text.textContent = data.data.msg;
  if (data.socketID === socket.id) {
    item.appendChild(text);
    item.appendChild(Avatar);
    item.classList.add("left-msg");
  } else {
    item.appendChild(Avatar);
    item.appendChild(text);
    Avatar.style.backgroundColor = `#${data.data.AvatarColor}`;
  }
  message.appendChild(item);
});
export default function Chat() {
  const [inputValue, setinputValue] = useState("");
  const handleInputValue = (value) => {
    setinputValue(value.target.value);
  };
  const sendDataToServer = (e) => {
    socket.emit("send to server", {
      msg: inputValue,
      AvatarColor: AvatarColor,
    });
    setinputValue("");
    e.preventDefault();
  };

  return (
    <div className="chatbox">
      <ul id="message"></ul>
      <form id="form" onSubmit={sendDataToServer}>
        <input
          type="text"
          name=""
          value={inputValue}
          onChange={handleInputValue}
        />
        <input type="submit" value="sebmit" />
      </form>
    </div>
  );
}
