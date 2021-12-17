import home from "../../images/home.svg"
import user from "../../images/user.svg"
import department from "../../images/department.svg"
import holiday from "../../images/holiday.svg"
import request from "../../images/request.svg"
import schedule from "../../images/schedule.svg"
import report from "../../images/report.svg"
import settings from "../../images/settings.svg"
import logout from "../../images/logout.svg"

const tabs = [
    {
        icon: home,
        title: "Dashboard",
        route: "/dashboard",
    },
    {
        icon: user,
        title: "User",
        route: "/user",
    },
    {
        icon: department,
        title: "Department",
        route: "/department",
    },
    {
        icon: holiday,
        title: "Holidays",
        route: "/holidays",
    },
    {
        icon: request,
        title: "Request",
        route: "/request",
    },
    {
        icon: schedule,
        title: "Schedule",
        route: "/schedule",
    },
    {
        icon: report,
        title: "Report",
        route: "/report",
    },
    {
        icon: settings,
        title: "Settings",
        route: "/settings",
    },
    {
        icon: logout,
        title: "Logout",
        route: "/logout",
    },
]


export default tabs