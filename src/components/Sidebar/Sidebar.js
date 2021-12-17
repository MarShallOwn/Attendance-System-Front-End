import classes from "./Sidebar.module.css";
import logo from "../../images/logo.svg";

import tabs from "./tabs";
import { useState } from "react";
import { Tab } from "@mui/material";
import { traverseTwoPhase } from "react-dom/cjs/react-dom-test-utils.production.min";

const Sidebar = () => {

    const [activeTab, setActiveTab] = useState("Dashboard")

  return (
    <div className={classes.sidebar}>
      <div>
        <img src={logo} className={classes.logo} />
      </div>

      {tabs.map((tab) => (
        <div key={tab.title} onClick={() => setActiveTab(tab.title)}  className={(activeTab === tab.title) ? classes.activeTab : classes.tab}>
          <img src={tab.icon} />
          <p className={classes.title}>{tab.title}</p>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
