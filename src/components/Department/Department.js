import classes from "./Department.module.css";
import HeaderBar from "../../resuable-comp/HeaderBar";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const routes = [
  {
    pathname: "/department/list",
    pageName: "Department",
    showAdd: true
  }
];

const Department = ({ component: Component }) => {

  const {pathname} = useLocation()

  const [activeRoute, setActiveRoute] = useState(routes[0])

  useEffect(() => {
     setActiveRoute(routes.find(route => route.pathname === pathname))
  }, [pathname]);

  return (
    <div>
      <HeaderBar categoryName="Department" mainRoute="department" pageName={activeRoute.pageName} onePage={true} showAdd={activeRoute.showAdd} />
      <Component />
    </div>
  );
};

export default Department;
