import PropTypes from 'prop-types';
import * as React from 'react';
import { Button, ButtonGroup, ButtonToolbar } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

class UserTable extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
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

    this.handleBlockUsers = this.handleBlockUsers.bind(this);
    this.renderCaptionElement = this.renderCaptionElement.bind(this);
  }

  renderCaptionElement = () => {
    return (
      <ButtonToolbar aria-label="Toolbar with button groups">
        <ButtonGroup className="mb-2" size="lg">
          <Button onClick={this.handleBlockUsers} variant="outline-warning">
            Block
          </Button>
          <Button variant="outline-success">Unblock</Button>
          <Button variant="outline-danger">Delete</Button>
        </ButtonGroup>
      </ButtonToolbar>
    );
  };

  handleBlockUsers = () => {};

  render() {
    const { users } = this.props;
    return (
      <BootstrapTable
        ref={(n) => {
          this.node = n;
        }}
        caption={this.renderCaptionElement()}
        columns={this.columns}
        data={users}
        hover
        keyField="uid"
        noDataIndication="Table is Empty"
        pagination={paginationFactory()}
        selectRow={{ mode: 'checkbox', clickToSelect: true }}
        striped
      />
    );
  }
}

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
