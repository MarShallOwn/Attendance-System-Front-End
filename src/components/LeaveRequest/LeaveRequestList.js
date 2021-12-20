import classes from "./LeaveRequest.module.css";
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
  MediumDeleteButton,
  MediumSecondaryButton,
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

const LeaveRequestList = (props) => {
  // state that handles modal close and open
  const [modalOpen, setModalOpen] = useState(false);
  const [listUpdated, setListUpdated] = useState(true);
  const [modalEntity, setModalEntity] = useState({ id: "", name: "" });
  const [leaveRequestsList, setleaveRequestsList] = useState([
    {
      id: "dmawoidmoid93mf9q8",
      employerName: "dajkad",
      status: "pending",
      startDate: "admsad",
      endDate: "djkndjaksd",
      typeOfLeave: "sick",
      description: "akdaskdmasmda",
    },
  ]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { slice, range } = useTable(leaveRequestsList, page, rowsPerPage);

  useEffect(() => {
    if (slice.length < 1 && page !== 0) {
      setPage(page - 1);
    }
  }, []);

  useEffect(() => {
    customAxios
      .get("/leave-requests/list/")
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data.data);
          setleaveRequestsList(res.data.data);
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
  }, [listUpdated]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // handle status update
  const handleStatusChange = (e, leaveRequestID) => {

    const value = e.target.value

    console.log(value)
    console.log(leaveRequestID)

    customAxios
      .get(`/admin/leave-requests/update-status/${leaveRequestID}/${value}`)
      .then((res) => {
        if (res.status === 204) {
          setListUpdated(!listUpdated)
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

  }

  return (
    <div className="list-div">
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
              placeholder="Search for by date range"
            />
          </div>
        </div>
        <div className="list-table">
          <TableContainer>
            <Table className="table-style" aria-label="simple table">
              <TableHead className="table-head-style">
                <TableRow>
                  <TableCell>User</TableCell>
                  <TableCell align="left">Status</TableCell>
                  <TableCell align="left">Start Date</TableCell>
                  <TableCell align="left">End Date</TableCell>
                  <TableCell align="left">Type of leave</TableCell>
                  <TableCell align="left">Description</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {slice.map((leaveRequest, index) => (
                  <TableRow className="tr-style" key={index}>
                    <TableCell>{leaveRequest.employerName}</TableCell>
                    <TableCell align="left">
                        <Select
                        className={classes[`${leaveRequest.status}Status`]}
                          size="small"
                          value={leaveRequest.status}
                          onChange={(e) => handleStatusChange(e, leaveRequest.id)}
                        >
                          <MenuItem value={"granted"}>Granted</MenuItem>
                          <MenuItem value={"rejected"}>Rejected</MenuItem>
                          <MenuItem value={"pending"}>Pending</MenuItem>
                        </Select>
                    </TableCell>
                    <TableCell align="left">{leaveRequest.startDate}</TableCell>
                    <TableCell align="left">{leaveRequest.endDate}</TableCell>
                    <TableCell align="left">
                      {leaveRequest.typeOfLeave}
                    </TableCell>
                    <TableCell align="left">
                      {leaveRequest.description}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableHead className="table-head-style">
                <TableRow>
                  <TableCell>User</TableCell>
                  <TableCell align="left">Status</TableCell>
                  <TableCell align="left">Start Date</TableCell>
                  <TableCell align="left">End Date</TableCell>
                  <TableCell align="left">Type of leave</TableCell>
                  <TableCell align="left">Description</TableCell>
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
        count={leaveRequestsList.length}
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

export default connect(null, mapDispatchToProps)(LeaveRequestList);
