import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { development } from '../../actions/profileActions';

class Development extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
   
     stackoverflow:'',
      bitbucketid:'',
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

    const newDev = {
     stackoverflow: this.state.stackoverflow,
      bitbucketid: this.state.bitbucketid,
     
    };

    this.props.development(newDev, this.props.history);
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
      <div className="add-development">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
           
              <form onSubmit={this.onSubmit}>
               
                <TextFieldGroup
                  placeholder="stackoverflow"
                  name="stackoverflow"
                  value={this.state.stackoverflow}
                  onChange={this.onChange}
                  error={errors.stackoverflow}
                />
                <TextFieldGroup
                  placeholder="bitbucketid"
                  name="bitbucketid"
                  value={this.state.bitbucketid}
                  onChange={this.onChange}
                  error={errors.bitbucketid}
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

development.propTypes = {
  dev: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { development })(
  withRouter(Development)
);
