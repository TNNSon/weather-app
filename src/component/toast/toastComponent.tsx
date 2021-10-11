import { isEmpty } from "lodash";
import { useEffect } from "react";
import { selectError } from "../../container/weatherForecastSlice";
import { useAppSelector } from "../../store/hook";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ToastComponent() {
  const error = useAppSelector(selectError);
  useEffect(() => {
    if (!isEmpty(error)) {
      switch (error.type) {
        case "error": {
          toast.error(error.message);
          break;
        }
        case "success": {
          toast.success(error.message);
          break;
        }
        default:
          toast(error.message);
          break;
      }
    }
  }, [error]);

  return (
    <>
      <ToastContainer />
    </>
  );
}
export default ToastComponent;
