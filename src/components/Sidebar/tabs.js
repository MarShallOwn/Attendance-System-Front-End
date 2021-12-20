import home from "../../images/home.svg"
import user from "../../images/user.svg"
import department from "../../images/department.svg"
import holiday from "../../images/holiday.svg"
import request from "../../images/request.svg"
import schedule from "../../images/schedule.svg"
import report from "../../images/report.svg"
import settings from "../../images/settings.svg"
import logout from "../../images/logout.svg"

const createTab = (icon, title, route) => {
    return {
        icon,
        title,
        route
    }
}

const tabs = [
    createTab(home, "Dashboard", "/dashboard"),
    createTab(user, "User", "/user/list"),
    createTab(department, "Department", "/department/list"),
    createTab(holiday, "Holidays", "/holiday/list"),
    createTab(request, "Request", "/request"),
    createTab(schedule, "Schedule", "/schedule"),
    createTab(report, "Report", "/report"),
    createTab(settings, "Settings", "/settings"),
    createTab(logout, "Logout", "/logout"),
]


export default tabs