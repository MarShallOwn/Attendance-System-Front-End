import classes from "./User.module.css";
import HeaderBar from "../../resuable-comp/HeaderBar";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const routes = [
  {
    pathname: "/user/list",
    pageName: "User List",
    showAdd: true,
  },
  {
    pathname: "/user/create",
    pageName: "Create User",
    showAdd: false,
  },
  {
    pathname: "/user/edit",
    pageName: "Edit User",
    showAdd: false,
  },
  {
    pathname: "/user/view",
    pageName: "View User",
    showAdd: false,
  },
];

const User = ({ component: Component }) => {

  const {pathname} = useLocation()

  const [activeRoute, setActiveRoute] = useState(routes[0])

  useEffect(() => {
     setActiveRoute(routes.find(route => route.pathname === pathname))
  }, [pathname]);

  return (
    <div>
      <HeaderBar categoryName="User" mainRoute="user" pageName={activeRoute.pageName} showAdd={activeRoute.showAdd} />
      <Component />
    </div>
  );
};

export default User;
