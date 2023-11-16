import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { UserService } from "../../services/UserService";
import ReactPaginate from "react-paginate";
import ModalAdmin from "../ModalAddNew";
import ModalEdit from "../ModalEdit";
import ModalConfirm from "../ModalConfirm";
import "./TableUser.scss";

import _, { debounce } from "lodash";
import { CSVLink } from "react-csv";
import Papa from "papaparse";
import { toast } from "react-toastify";

const TableUser = () => {
  const [listUser, setListUser] = useState([]);
  const [totalUser, setTotalUser] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  // ModalAdmin
  const [isSHowModalAdmin, setIsShowModalAdmin] = useState(false);
  // Edit Table
  const [isShowEdit, setIsShowEdit] = useState(false);
  const [dataUserEdit, setDataUSerEdit] = useState({});
  // delete user
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [dataUserDelete, setDataUserDelete] = useState({});
  // Sort User
  const [sortBy, setSortBy] = useState("asc");
  const [sortField, setSortField] = useState("id");
  // export
  const [dataExport, setDataExport] = useState([]);
  // Handle Close
  const handleClose = () => {
    setIsShowModalAdmin(false);
    setIsShowEdit(false);
    setIsShowModalDelete(false);
  };
  // Update Table
  const handleUpdateTable = (user) => {
    setListUser([user, ...listUser]);
  };
  const handleEditUserFromModal = (user) => {
    let cloneListUser = _.cloneDeep(listUser);
    let index = listUser.findIndex((item) => item.id === user.id);
    cloneListUser[index].first_name = user.first_name;
    setListUser(cloneListUser);
  };
  
  // handle delete user
  const handleDeleteUser = (user) => {
    setIsShowModalDelete(user);
    setDataUserDelete(user);
  };
  useEffect(() => {
    // call API
    getUser(1);
  }, []);

  const getUser = async (page) => {
    let res = await UserService(page);
    if (res && res.data) {
      setTotalUser(res.total);
      setListUser(res.data);
      setTotalPages(res.total_pages);
    }
  };
  // Handle
  const handlePageClick = (e) => {
    getUser(+e.selected + 1);
  };

  // Handle Edit User
  const handleEditUser = (user) => {
    setDataUSerEdit(user);
    setIsShowEdit(true);
  };
  // Delete user
  const handleDeleteUserFormModal = (user) => {
    let cloneListUser = _.cloneDeep(listUser);
    cloneListUser = cloneListUser.filter((item) => item.id !== user.id);
    setListUser(cloneListUser);
  };
  // handleSort
  const handleSort = (sortBy, sortField) => {
    setSortBy(sortBy);
    setSortField(sortField);

    let cloneListUser = _.cloneDeep(listUser);
    cloneListUser = _.orderBy(cloneListUser, [sortField], [sortBy]);
    setListUser(cloneListUser);
  };
  // handleSearch
  const handleSearch = debounce((e) => {
    let term = e.target.value;

    if (term) {
      let cloneListUser = _.cloneDeep(listUser);
      cloneListUser = cloneListUser.filter((item) => item.email.includes(term));
      setListUser(cloneListUser);
    } else {
      getUser(1);
    }
  }, 200);
  // handle Export
  const setUserExport = (e, done) => {
    let result = [];
    if (listUser && listUser.length > 0) {
      result.push(["id", "Email", "First name", "Last name"]);
      listUser.map((item, index) => {
        let arr = [];
        arr[0] = item.id;
        arr[1] = item.email;
        arr[2] = item.first_name;
        arr[3] = item.last_name;
        result.push(arr);
      });

      setDataExport(result);
      done();
    }
  };
  // handle Import
  const handleImportCsv = (e) => {
    if (e.target && e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type !== "text/csv") {
        toast.error("Only accept csv file...");
        return;
      }
      Papa.parse(file, {
        // header: true,
        complete: function (results) {
          let rawCSV = results.data;

          if (rawCSV.length > 0) {
            if (rawCSV[0] && rawCSV[0].length === 3) {
              if (
                rawCSV[0][0] !== "email" ||
                rawCSV[0][1] !== "first_name" ||
                rawCSV[0][2] !== "last_name"
              ) {
                toast.error("Wrong format header CSV file");
              } else {
                let result = [];
                rawCSV.map((item, index ) => {
                  if( index > 0 && item.length === 3) {
                    let obj = {};
                    obj.email = item[0]
                    obj.first_name = item[1]
                    obj.last_name = item[2]
                    result.push(obj)
                  }
                })
                setListUser(result);
              }
            } else {
              toast.error("Wrong format CSV file");
            }
          } else {
            toast.error("Not found data on CSV file");
          }
        },
      });
    }
  };

  return (
    <div>
      <div className="my-3 d-md-flex justify-content-between">
        <h3>List User: </h3>
        <div>
          <label htmlFor="import" className="btn btn-warning me-2 ">
            <i className="fa-solid fa-file-import me-1"></i>Import
          </label>
          <input
            id="import"
            type="file"
            hidden
            onChange={(e) => handleImportCsv(e)}
          />
          <CSVLink
            filename={"user.csv"}
            className="btn btn-primary me-2"
            data={dataExport}
            asyncOnClick={true}
            onClick={setUserExport}
          >
            <i className="fa-solid fa-download me-1"></i> Export
          </CSVLink>
          <button
            className="btn btn-success"
            onClick={() => {
              setIsShowModalAdmin(true);
            }}
          >
            <i className="fa-solid fa-circle-plus me-1"></i> Add new
          </button>
        </div>
      </div>
      <div className="col-12 col-sm-4 my-3">
        <input
          className="form-control"
          placeholder="Search here user email..."
          // value={keyWord}
          onChange={(e) => handleSearch(e)}
        />
      </div>
      <div className="table-size">
        <Table striped bordered hover className="table-size">
          <thead>
            <tr>
              <th>
                <div className="sort-body">
                  <span>ID </span>
                  <span>
                    <i
                      onClick={() => handleSort("desc", "id")}
                      className="fa-solid fa-arrow-down-long"
                    ></i>
                    <i
                      onClick={() => handleSort("asc", "id")}
                      className="fa-solid fa-arrow-up-long"
                    ></i>
                  </span>
                </div>
              </th>
              <th>Email</th>
              <th>
                <div className="sort-body">
                  <span>First Name</span>
                  <span>
                    <i
                      onClick={() => handleSort("desc", "first_name")}
                      className="fa-solid fa-arrow-down-long"
                    ></i>
                    <i
                      onClick={() => handleSort("asc", "first_name")}
                      className="fa-solid fa-arrow-up-long"
                    ></i>
                  </span>
                </div>
              </th>
              <th>Last Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {listUser &&
              listUser.length > 0 &&
              listUser.map((item, index) => {
                return (
                  <tr key={`user-${index}`}>
                    <td>{item.id}</td>
                    <td>{item.email}</td>
                    <td>{item.first_name} </td>
                    <td>{item.last_name}</td>
                    <td>
                      <button
                        className="btn btn-warning mx-3"
                        onClick={() => handleEditUser(item)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDeleteUser(item)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </div>
      <div className="d-flex align-items-center justify-content-center">
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={totalPages}
          previousLabel="< previous"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
        />
      </div>

      <ModalAdmin
        show={isSHowModalAdmin}
        handleClose={handleClose}
        handleUpdateTable={handleUpdateTable}
      />
      <ModalEdit
        show={isShowEdit}
        handleClose={handleClose}
        dataUserEdit={dataUserEdit}
        handleEditUserFromModal={handleEditUserFromModal}
      />
      <ModalConfirm
        show={isShowModalDelete}
        handleClose={handleClose}
        dataUserDelete={dataUserDelete}
        handleDeleteUserFormModal={handleDeleteUserFormModal}
      />
    </div>
  );
};

export default TableUser;
