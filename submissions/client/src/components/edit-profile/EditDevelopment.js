import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import { development, getCurrentProfile } from '../../actions/profileActions';
import isEmpty from '../../validation/is-empty';

class Development extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaydev: false,
   
      stackoverflow:'',
      bitbucketid:'',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;

      profile.dev = !isEmpty(profile.dev) ? profile.dev : {};
      
      profile.stackoverflow = !isEmpty(profile.dev.stackoverflow)
        ? profile.dev.stackoverflow
        : '';
      profile.bitbucketid = !isEmpty(profile.dev.bitbucketid)
        ? profile.dev.bitbucketid
        : '';
  
      // Set component fields state
      this.setState({
       
        stackoverflow: profile.stackoverflow,
        bitbucketid: profile.hackerrank
      });
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

  render() {
    const { errors, displaydev } = this.state;

    let devInput;

    if (displaydev) {
      devInput = (
        <div>
             
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
              

        </div>
      );
    }

  

    return (
      <div className="edit-development">
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
               
               <div className="mb-3">
                  <button
                    type="button"
                    onClick={() => {
                      this.setState(prevState => ({
                        displaydev: !prevState.displaydev
                      }));
                    }}
                    className="btn btn-light"
                  >
                  </button>
                </div>
                {devInput}
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

Development.propTypes = {
  development: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { development , getCurrentProfile })(
  withRouter(Development)
);
