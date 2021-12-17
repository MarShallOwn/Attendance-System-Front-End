import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import classes from "./SystemWrapper.module.css";

const SystemWrapper = ({ children }) => {
  return (
    <div className={classes.systemWrapper}>
      <div className={classes.sidebar}>
        <Sidebar />
      </div>
      <div className={classes.mainSystem}>
        <Navbar />
        <div className={classes.content}>{children}</div>
      </div>
    </div>
  );
};

export default SystemWrapper;
