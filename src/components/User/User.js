import classes from "./User.module.css";
import HeaderBar from "../../resuable-comp/HeaderBar";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const routes = [
  {
    pathname: "/user/list",
    pageName: "User List",
  },
  {
    pathname: "/user/create",
    pageName: "Create User",
  },
  {
    pathname: "/user/edit",
    pageName: "Edit User",
  },
  {
    pathname: "/user/view",
    pageName: "View User",
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
      <HeaderBar categoryName="User" pageName={activeRoute.pageName} />
      <Component />
    </div>
  );
};

export default User;
