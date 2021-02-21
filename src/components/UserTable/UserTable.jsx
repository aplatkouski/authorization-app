import PropTypes from 'prop-types';
import * as React from 'react';
import { useRef } from 'react';
import { Button, ButtonGroup, ButtonToolbar } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from 'States/user';

const UserTable = ({ users }) => {
  const dispatch = useDispatch();
  const currentUserId = useSelector((state) => state.user.uid);
  const columns = [
    {
      dataField: 'id',
      text: 'ID',
    },
    {
      dataField: 'username',
      text: 'Username',
    },
    {
      dataField: 'email',
      text: 'Email',
    },
    {
      dataField: 'registrationDate',
      text: 'Registration Date',
    },
    {
      dataField: 'lastLoginDate',
      text: 'Last Login Date',
    },
    {
      dataField: 'isActive',
      text: 'Status',
    },
  ];

  const node = useRef(null);

  const handleStatusChange = (isActive) => {
    node.current.selectionContext.selected.forEach((uid) => {
      dispatch(
        userActions.changeUserStatus(
          currentUserId,
          users.find((user) => user.uid === uid),
          isActive
        )
      );
    });
  };

  const handleDelete = () => {
    node.current.selectionContext.selected.forEach((uid) => {
      dispatch(userActions.deleteUser(currentUserId, uid));
    });
  };

  const renderCaptionElement = () => {
    return (
      <ButtonToolbar aria-label="Toolbar with button groups">
        <ButtonGroup className="mb-2" size="lg">
          <Button onClick={() => handleStatusChange(false)} variant="outline-warning">
            Block
          </Button>
          <Button onClick={() => handleStatusChange(true)} variant="outline-success">
            Unblock
          </Button>
          <Button onClick={handleDelete} variant="outline-danger">
            Delete
          </Button>
        </ButtonGroup>
      </ButtonToolbar>
    );
  };

  return (
    <BootstrapTable
      ref={node}
      caption={renderCaptionElement()}
      columns={columns}
      data={users}
      hover
      keyField="uid"
      noDataIndication="Table is Empty"
      pagination={paginationFactory()}
      selectRow={{ mode: 'checkbox', clickToSelect: true }}
      striped
    />
  );
};

UserTable.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      uid: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      registrationDate: PropTypes.string.isRequired,
      lastLoginDate: PropTypes.string.isRequired,
      isActive: PropTypes.bool.isRequired,
    }).isRequired
  ).isRequired,
};

export default UserTable;
