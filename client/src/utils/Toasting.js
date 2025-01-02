
import { toast } from "react-toastify";


const showToastMessage = (ev) => {
    toast.success(ev, {
      position: "top-right",
    });
  };

  const showToastMessage2 = (ev) => {
    toast.error(ev, {
      position: "top-right",
    });
  };

  export {showToastMessage,showToastMessage2};