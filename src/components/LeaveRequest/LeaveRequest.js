import classes from "./LeaveRequest.module.css";
import HeaderBar from "../../resuable-comp/HeaderBar";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const routes = [
  {
    pathname: "/leave-request/list",
    pageName: "Leave Request List",
  }
];

const LeaveRequest = ({ component: Component }) => {

  const {pathname} = useLocation()

  const [activeRoute, setActiveRoute] = useState(routes[0])

  useEffect(() => {
     setActiveRoute(routes.find(route => route.pathname === pathname))
  }, [pathname]);

  return (
    <div>
      <HeaderBar categoryName="Leave Request" pageName={activeRoute.pageName} />
      <Component />
    </div>
  );
};

export default LeaveRequest;
