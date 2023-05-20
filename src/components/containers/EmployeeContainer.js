import React, { Component } from "react";
import { connect } from "react-redux";
import { 
  fetchEmployeeThunk,
  fetchAllTasksThunk,
  editTaskThunk 
} from "../../store/thunks";

import { EmployeeView } from "../views";

import { useParams } from "react-router";

import { Link } from "react-router-dom";

const withRouter = (WrappedComponent) => (props) => {
  const params = useParams();
  // etc... other react-router-dom v6 hooks

  return (
    <WrappedComponent
      {...props}
      params={params}
      // etc...
    />
  );
};

class EmployeeContainer extends Component {
  componentDidMount() {
    //getting employee ID from url
    this.props.fetchEmployee(this.props.match.params.id);
    this.props.fetchTasks();
  }

  render() {
    return (
      <EmployeeView 
        employee={this.props.employee}
        editTask={this.props.editTask}
        allTasks={this.props.allTasks}
      />
    );
  }
}

// map state to props
const mapState = (state) => {
  return {
    employee: state.employee,
    allTasks: state.allTasks,

  };
};

// map dispatch to props
const mapDispatch = (dispatch) => {
  return {
    fetchEmployee: (id) => dispatch(fetchEmployeeThunk(id)),
    editTask: (task) => dispatch(editTaskThunk(task)),
    fetchTasks: () => dispatch(fetchAllTasksThunk()),

  };
};

export default withRouter(connect(mapState, mapDispatch)(EmployeeContainer));