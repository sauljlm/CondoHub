import { useContext } from "react";
import { loginContext } from "../appContext.js";
import { useNavigate } from "react-router-dom";

class NavigationManager {
  navigate = useNavigate();
  userContext = useContext(loginContext);

  manageUsersAccess() {
    let userContext = this.userContext;
    let navigate = this.navigate;
    //User is logged in and is not in the app, redirect to app
    if (userContext !== null && !window.location.pathname.includes("app")) {
      navigate("/app");
      localStorage.setItem("email", userContext.email);
      userContext.displayName ? localStorage.setItem("userName", userContext.displayName.toString()) : null;
      localStorage.setItem("uid", userContext.uid);
    }
    //User is logged in is not an admin page, redirect to App
    if (userContext !== null && userContext?.aditionalData?.roles?.indexOf("admin") === -1) {
      if (window.location.pathname.includes("adminReservation") || window.location.pathname.includes("manageNews")) {
        navigate("/app/");
      }
    }
    //User is not logged in and is in the app, redirect to login
    if (userContext === null && window.location.pathname.includes("app")) {
      navigate("/");
      return;
    }
  }
}

export default NavigationManager;
