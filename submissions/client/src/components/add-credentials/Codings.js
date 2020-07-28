import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { coding } from '../../actions/profileActions';

class Codings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
     codechef : '',
     hackerearth:'',
      hackerrank:'',
      errors: {},
      disabled: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCheck = this.onCheck.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  

  onSubmit(e) {
    e.preventDefault();

    const codeData = {
      codechef: this.state.codechef,
      hackerearth: this.state.hackerearth,
      hackerrank: this.state.hackerrank,
     
    };

    this.props.coding(codeData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onCheck(e) {
    this.setState({
      disabled: !this.state.disabled,
      current: !this.state.current
    });
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="add-coding">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
           
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="Codechef"
                  name="codechef"
                  value={this.state.codechef}
                  onChange={this.onChange}
                  error={errors.codechef}
                />
                <TextFieldGroup
                  placeholder="* Hackerearth"
                  name="hackerearth"
                  value={this.state.hackerearth}
                  onChange={this.onChange}
                  error={errors.hackerearth}
                />
                <TextFieldGroup
                  placeholder="HackerRank"
                  name="hackerrank"
                  value={this.state.hackerrank}
                  onChange={this.onChange}
                  error={errors.hackerrank}
                />
               
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />



              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

coding.propTypes = {
  coding: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { coding })(
  withRouter(Codings)
);
