import classes from "./User.module.css";
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
  Modal
} from "@mui/material";
import { SmallPrimaryButton, InputWithIcon, MediumDeleteButton, MediumSecondaryButton } from "../../styles/globalStyle";
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

const UsersList = (props) => {
  // state that handles modal close and open
  const [modalOpen, setModalOpen] = useState(false);
  const [listUpdated, setListUpdated] = useState(true);
  const [modalEntity, setModalEntity] = useState({ id: "", name: "" });
  const [usersList, setUsersList] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { slice, range } = useTable(usersList, page, rowsPerPage);

  useEffect(() => {
    if (slice.length < 1 && page !== 0) {
      setPage(page - 1);
    }
  }, []);

  useEffect(() => {
    customAxios
      .get("/auth/employer/list/")
      .then((res) => {
        console.log(res.status)
        console.log(res.data)
        if (res.status === 200) {
          console.log(res.data.data);
          setUsersList(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err.response.status)
          props.flashMessageHandler(
            "open",
            flashTypesConstants.ERROR,
            "Something went wrong"
          );
      });
  }, [listUpdated]);

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

    const userId = e.currentTarget.id

    const { id, firstname, lastname } = usersList.find(
      (user) => user.id === userId
    );

    setModalEntity({ id, name: `${firstname} ${lastname}` });

    setModalOpen(true);
  };

  // handle the close of the modal
  const handleModalCancel = () => {
    setModalOpen(false);
    setModalEntity({id: "", name: ""})
  };

  // handle the delete of the item and close of the modal
  const handleModalConfirmDelete = () => {
    deleteEntity(`/auth/employer/delete/${modalEntity.id}`)
      .then((res) => {
        setModalOpen(false);
        if (res.status === 204) {
          props.flashMessageHandler(
            "open",
            flashTypesConstants.SUCCESS,
            "User Deleted"
          );
          setListUpdated(!listUpdated)
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
          props.flashMessageHandler(
            "open",
            flashTypesConstants.ERROR,
            "Something went wrong"
          );
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
              Warning: Are you sure you want to delete this user ? if you delete
              this user , data will be deleted
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
              placeholder="Search for user"
            />
          </div>
        </div>
        <div className="list-table">
          <TableContainer>
            <Table className="table-style" aria-label="simple table">
              <TableHead className="table-head-style">
                <TableRow>
                  <TableCell>User</TableCell>
                  <TableCell align="left">Phone</TableCell>
                  <TableCell align="left">Department</TableCell>
                  <TableCell align="left">Status</TableCell>
                  <TableCell align="left">Join Date</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {slice.map((user, index) => (
                  <TableRow className="tr-style" key={index}>
                    <TableCell>
                      {`${user.firstname} ${user.lastname}`}
                    </TableCell>
                    <TableCell align="left">{user.phoneNumber}</TableCell>
                    <TableCell align="left">N/A</TableCell>
                    <TableCell className={classes.statusCell} align="left">
                      Active <div className={classes.activeDot}></div>
                    </TableCell>
                    <TableCell align="left">N/A</TableCell>
                    <TableCell align="center">
                      <div className="action-style">
                        <Link to="/user/view" state={{ userId: user.id }}>
                          <img src={viewIcon} />
                        </Link>
                        <Link to="/user/edit" state={{ userId: user.id }}>
                          <img src={editIcon} />
                        </Link>
                        <img
                        id={user.id}
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
                  <TableCell>User</TableCell>
                  <TableCell align="left">Phone</TableCell>
                  <TableCell align="left">Department</TableCell>
                  <TableCell align="left">Status</TableCell>
                  <TableCell align="left">Join Date</TableCell>
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
        count={usersList.length}
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

export default connect(null, mapDispatchToProps)(UsersList);
