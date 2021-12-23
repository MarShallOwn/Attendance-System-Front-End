import { MenuItem, Select, TextField, TableCell } from "@mui/material";
import deleteIcon from "../../images/delete.svg";
import editIcon from "../../images/edit.svg";
const ViewDepartment = (props) => {
  const { department, handleActiveEdit, handleModalDelete, usersList } = props;

  const user = usersList.find(user => user.id === department.departmentHeadID)

  return (
    <>
      <TableCell align="left">{department.departmentName}</TableCell>
      <TableCell align="left">{user && `${user.firstname} ${user.lastname}`}</TableCell>
      <TableCell align="left">{department.departmentDesc}</TableCell>
      <TableCell align="center">
        <div className="action-style">
          <img id={department.id} onClick={handleActiveEdit} src={editIcon} />
          <img
            id={department.id}
            onClick={handleModalDelete}
            src={deleteIcon}
          />
        </div>
      </TableCell>
    </>
  );
};

export default ViewDepartment;
