import classes from "./Holiday.module.css";
import HeaderBar from "../../resuable-comp/HeaderBar";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const routes = [
  {
    pathname: "/holiday/list",
    pageName: "Holiday List",
  },
  {
    pathname: "/holiday/create",
    pageName: "Create Holiday",
  },
  {
    pathname: "/holiday/edit",
    pageName: "Edit Holiday",
  },
  {
    pathname: "/holiday/view",
    pageName: "View Holiday",
  },
];

const Holiday = ({ component: Component }) => {

  const {pathname} = useLocation()

  const [activeRoute, setActiveRoute] = useState(routes[0])

  useEffect(() => {
     setActiveRoute(routes.find(route => route.pathname === pathname))
  }, [pathname]);

  return (
    <div>
      <HeaderBar categoryName="Holiday" pageName={activeRoute.pageName} />
      <Component />
    </div>
  );
};

export default Holiday;
