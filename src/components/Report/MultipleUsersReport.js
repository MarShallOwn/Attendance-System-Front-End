import classes from "./Report.module.css";
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
} from "@mui/material";
import { SmallPrimaryButton, InputWithIcon, SearchInput } from "../../styles/globalStyle";
import searchIcon from "../../images/search.svg";
import customAxios from "../../customAxios";
import { connect } from "react-redux";
import { flashActions } from "../../actions/flashMessageAction";
import { flashTypesConstants } from "../../constants";
import useTable from "../../resuable-comp/useTable";

const CustomSelect = styled(Select)`
  height: 45px;
  width: 153px;
  border-radius: 10px;
`;

const MultipleUsersReport = (props) => {
  const { setActiveUser } = props
  const [listUpdated, setListUpdated] = useState(true);
  const [reportsList, setReportsList] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { slice, range } = useTable(reportsList, page, rowsPerPage);

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
          setReportsList(res.data.data);
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

  return (
    <div className="list-div">
      <div className="filter"></div>
      <div className="table-div">
        <div className={classes.topTable}>
          <div className={classes.leftTopTable}>
            <FormControl>
              <InputLabel className={classes.selectStyle}>
                User
              </InputLabel>
              <CustomSelect value={""}>
                <MenuItem value={"delete"}>Delete</MenuItem>
              </CustomSelect>
            </FormControl>

            <FormControl className={classes.selectStatus}>
              <InputLabel className={classes.selectStyle}>
                Status
              </InputLabel>
              <CustomSelect value={""}>
                <MenuItem value={"delete"}>Delete</MenuItem>
              </CustomSelect>
            </FormControl>
          </div>
          <div className="right-top-table">
            <SearchInput
              style={{width: "339px", paddingLeft: "20px"}}
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
                  <TableCell align="left">Check in</TableCell>
                  <TableCell align="left">Check out</TableCell>
                  <TableCell align="left">Worked</TableCell>
                  <TableCell align="left">Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {slice.map((report, index) => (
                  <TableRow className="tr-style" key={index}>
                    <TableCell>{report.username}</TableCell>
                    <TableCell align="left">{report.checkin}</TableCell>
                    <TableCell align="left">{report.checkout}</TableCell>
                    <TableCell align="left">{report.worked}</TableCell>
                    <TableCell align="left" className={classes[`${report.status}Color`]}>{report.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableHead className="table-head-style">
                <TableRow>
                  <TableCell>User</TableCell>
                  <TableCell align="left">Check in</TableCell>
                  <TableCell align="left">Check out</TableCell>
                  <TableCell align="left">Worked</TableCell>
                  <TableCell align="left">Status</TableCell>
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
        count={reportsList.length}
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

export default connect(null, mapDispatchToProps)(MultipleUsersReport);
