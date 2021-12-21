import classes from "./LeaveRequest.module.css";
import HeaderBar from "../../resuable-comp/HeaderBar";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const routes = [
  {
    pathname: "/leave-request/list",
    pageName: "Leave Request List",
    showAdd: false,
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
      <HeaderBar CategoryName="Leave Request" mainRoute="leave-request" pageName={activeRoute.pageName} onePage={true} />
      <Component />
    </div>
  );
};

export default LeaveRequest;
