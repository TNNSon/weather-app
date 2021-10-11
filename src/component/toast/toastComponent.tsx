import { isEmpty } from "lodash";
import { useEffect, useState } from "react";
import { Toast } from "react-bootstrap";
import { selectError } from "../../container/weatherForecastSlice";
import { useAppSelector } from "../../store/hook";
type ToastInfo = {
  show: boolean;
  action: string;
  type: string;
  id: string;
};

function ToastComponent() {
  const error = useAppSelector(selectError);
  const [toastList, setToastList] = useState<ToastInfo[]>([]);
  useEffect(() => {
    if (!isEmpty(error)) {
      let toast = toastList.concat({
        ...error,
        show: true,
      });
      setToastList(toast);
    }
  }, [error]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (toastList.length && !isEmpty(error)) {
        deleteToast(toastList[0].id);
      }
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [error, toastList]);

  const deleteToast = (id: string) => {
    const toastListItem = toastList.findIndex((e) => e.id === id);
    toastList.splice(toastListItem, 1);
    setToastList([...toastList]);
  };

  return (
    <>
      {toastList.map((item) => (
        <Toast
          key={item.id}
          delay={3000}
          show={item.show}
          autohide
          animation
          data-testid="toast"
          role="alert"
        >
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Bootstrap</strong>
            <small>11 mins ago</small>
          </Toast.Header>
          <Toast.Body>Hello, world! This is a toast message.</Toast.Body>
        </Toast>
      ))}
    </>
  );
}

export default ToastComponent;
