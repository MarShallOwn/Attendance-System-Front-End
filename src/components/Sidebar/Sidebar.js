import classes from "./Sidebar.module.css";
import logo from "../../images/logo.svg";

import tabs from "./tabs";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const Sidebar = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");

  const navigate = useNavigate()

  const handleActiveTab = (title, route) => {
    setActiveTab(title)
    navigate(route)

  }

  return (
    <div className={classes.sidebar}>
      <div>
        <img src={logo} className={classes.logo} />
      </div>

      {tabs.map((tab) => (
        <div
          key={tab.title}
          onClick={() => handleActiveTab(tab.title, tab.route)}
          className={activeTab === tab.title ? classes.activeTab : classes.tab}
        >
          <img src={tab.icon} />
          <p className={classes.title}>{tab.title}</p>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
