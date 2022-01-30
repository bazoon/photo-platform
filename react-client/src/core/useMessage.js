import React, {useState} from "react";
import { Message } from "primereact/message";

const useMessage = ({timeout = 5000}) => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [positive, setPositive] = useState();

  const renderMessage = () => {
    return visible && <Message severity={positive ? "success" : "error"} text={message}></Message>;
  };

  const show = (message, success) => {
    setVisible(true);
    setMessage(message);
    setPositive(success);

    if (timeout) {
      setTimeout(() => setVisible(false), timeout);
    }
  };

  const hide = () => {
    setVisible(false);
  };

  return {renderMessage, showMessage: m => show(m, true), showErrorMessage: m => show(m, false), hide};
};

export default useMessage;
