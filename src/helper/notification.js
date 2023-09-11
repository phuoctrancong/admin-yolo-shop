import { notification } from "antd";

export const openNotification = (title, message, type) => {
  notification[type]({
    message: (
      <div style={{ color: type === "error" ? "green" : "blue" }}>{title}</div>
    ),
    description: (
      <div style={{ color: type === "error" ? "green" : "blue" }}>
        {message}
      </div>
    ),
    style: { backgroundColor: type === "error" ? "red" : "white" },
    duration: 0,
  });
};
