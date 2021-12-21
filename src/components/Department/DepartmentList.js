import classes from "./Department.module.css";
import React, { useEffect, useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  styled,
  TableContainer,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
  TablePagination,
  Modal,
} from "@mui/material";
import {
  SmallPrimaryButton,
  InputWithIcon,
  MediumSecondaryButton,
  MediumDeleteButton,
} from "../../styles/globalStyle";
import searchIcon from "../../images/search.svg";
import deleteIcon from "../../images/delete.svg";
import editIcon from "../../images/edit.svg";
import viewIcon from "../../images/view.svg";
import customAxios from "../../customAxios";
import { connect } from "react-redux";
import { flashActions } from "../../actions/flashMessageAction";
import { flashTypesConstants } from "../../constants";
import useTable from "../../resuable-comp/useTable";
import { Link } from "react-router-dom";
import { deleteEntity } from "../../services/appServices";

const CustomSelect = styled(Select)`
  height: 45px;
  width: 153px;
  border-radius: 10px;
`;

const DepartmentList = (props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [listUpdated, setListUpdated] = useState(true);
  const [modalEntity, setModalEntity] = useState({ id: "", name: "" });
  const [departmentsList, setDepartmentsList] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { slice, range } = useTable(departmentsList, page, rowsPerPage);

  useEffect(() => {
    if (slice.length < 1 && page !== 0) {
      setPage(page - 1);
    }
  }, []);

  useEffect(() => {
    customAxios
      .get("/department/list")
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data.data);
          setDepartmentsList(res.data.data);
        }
      })
      .catch((err) => {
        if (err.response.status == 403) {
          props.flashMessageHandler(
            "open",
            flashTypesConstants.ERROR,
            "You don't have Authorization to show that"
          );
        } else {
          props.flashMessageHandler(
            "open",
            flashTypesConstants.ERROR,
            "Something went wrong"
          );
        }
      });
  }, []);

  const handleChangePage = (event, newPage) => {
    console.log(newPage);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // handle the open of the modal to confirm before deleting the item
  const handleModalDelete = (e) => {
    const departmentId = e.currentTarget.id;

    const { id, departmentName } = departmentsList.find(
      (department) => department.id === departmentId
    );

    setModalEntity({ id, name: departmentName });

    setModalOpen(true);
  };

  // handle the close of the modal
  const handleModalCancel = () => {
    setModalOpen(false);
    setModalEntity({ id: "", name: "" });
  };

  // handle the delete of the item and close of the modal
  const handleModalConfirmDelete = () => {
    deleteEntity(`/department/delete/${modalEntity.id}`)
      .then((res) => {
        setModalOpen(false);
        if (res.status === 204) {
          props.flashMessageHandler(
            "open",
            flashTypesConstants.SUCCESS,
            "Department Deleted"
          );
          setListUpdated(!listUpdated);
        } else {
          props.flashMessageHandler(
            "open",
            flashTypesConstants.ERROR,
            "Something Went Wrong"
          );
        }
      })
      .catch((err) => {
        setModalOpen(false);
        if (err.response.status == 403) {
          props.flashMessageHandler(
            "open",
            flashTypesConstants.ERROR,
            "You don't have Authorization to show that"
          );
        } else {
          props.flashMessageHandler(
            "open",
            flashTypesConstants.ERROR,
            "Something went wrong"
          );
        }
      });

    setModalOpen(false);
  };

  return (
    <div className="list-div">
      <Modal open={modalOpen}>
        <div className="modal-style">
          <div className="modal-container">
            <h1 className="modal-title">Delete {modalEntity.name}</h1>
            <p className="modal-body">
              Warning: Are you sure you want to delete this department ? if you
              delete this department , data will be deleted
            </p>
            <div className="modal-buttons">
              <MediumSecondaryButton onClick={handleModalCancel}>
                Cancel
              </MediumSecondaryButton>
              <MediumDeleteButton onClick={handleModalConfirmDelete}>
                Delete
              </MediumDeleteButton>
            </div>
          </div>
        </div>
      </Modal>
      <div className="filter"></div>
      <div className="table-div">
        <div className="top-table">
          <div className="left-top-table">
            <FormControl>
              <InputLabel style={{ marginTop: "-0.2rem" }}>
                Bulk Actions
              </InputLabel>
              <CustomSelect value={""}>
                <MenuItem value={"delete"}>Delete</MenuItem>
              </CustomSelect>
            </FormControl>

            <SmallPrimaryButton className="apply-list-button">
              Apply
            </SmallPrimaryButton>
          </div>
          <div className="right-top-table">
            <InputWithIcon
              icon={searchIcon}
              width="494px"
              placeholder="Search for department"
            />
          </div>
        </div>
        <div className="list-table">
          <TableContainer>
            <Table className="table-style" aria-label="simple table">
              <TableHead className="table-head-style">
                <TableRow>
                  <TableCell>Department</TableCell>
                  <TableCell align="left">Department Head</TableCell>
                  <TableCell align="left">Department Description</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {slice.map((department, index) => (
                  <TableRow className="tr-style" key={index}>
                    <TableCell align="left">{department.departmentName}</TableCell>
                    <TableCell align="left">{department.departmentHeadName}</TableCell>
                    <TableCell align="left">{department.departmentDesc}</TableCell>
                    <TableCell align="center">
                      <div className="action-style">
                        <Link to="/user/view" state={{ departmentId: department.id }}>
                          <img src={viewIcon} />
                        </Link>
                        <Link to="/user/edit" state={{ departmentId: department.id }}>
                          <img src={editIcon} />
                        </Link>
                        <img
                          id={department.id}
                          onClick={handleModalDelete}
                          src={deleteIcon}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableHead className="table-head-style">
                <TableRow>
                <TableCell>Department</TableCell>
                  <TableCell align="left">Department Head</TableCell>
                  <TableCell align="left">Department Description</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
            </Table>
          </TableContainer>
        </div>
      </div>
      <TablePagination
        component="div"
        style={{ marginRight: "1rem", marginTop: "2rem" }}
        rowsPerPageOptions={[2, 4, 5, 10, 15, 20, 25, 30]}
        count={departmentsList.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    flashMessageHandler: (handlerType, flashType, flashMessage) => {
      dispatch(flashActions.flashMessage(handlerType, flashType, flashMessage));
    },
  };
};

export default connect(null, mapDispatchToProps)(DepartmentList);
