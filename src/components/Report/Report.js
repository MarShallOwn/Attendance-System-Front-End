import classes from "./Report.module.css";
import HeaderBar from "../../resuable-comp/HeaderBar";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const routes = [
  {
    pathname: "/report/users-report",
    pageName: "Report",
    showAdd: false,
  },
  {
    pathname: "/report/user-report",
    pageName: "report",
    showAdd: false,
  }
];

const Report = ({ component: Component }) => {

  const {pathname} = useLocation()

  const [activeRoute, setActiveRoute] = useState(routes[0])
  const [activeUser, setActiveUser] = useState("")

  useEffect(() => {
     setActiveRoute(routes.find(route => route.pathname === pathname))
  }, [pathname]);

  return (
    <div>
      <HeaderBar mainRoute="report" pageName={activeRoute.pageName} onePage={true} />
      <Component setActiveUser={setActiveUser} />
    </div>
  );
};

export default Report;
