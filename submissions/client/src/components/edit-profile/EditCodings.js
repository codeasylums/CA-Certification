import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import { coding, getCurrentProfile } from '../../actions/profileActions';
import isEmpty from '../../validation/is-empty';

class Codings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayCode: false,
      codechef:'',
      hackerearth:'',
      hackerrank:'',
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

      profile.coding = !isEmpty(profile.coding) ? profile.coding : {};
      profile.codechef = !isEmpty(profile.coding.codechef)
        ? profile.coding.codechef
        : '';
      profile.hackerearth = !isEmpty(profile.coding.hackerearth)
        ? profile.coding.hackerearth
        : '';
      profile.hackerrank = !isEmpty(profile.coding.hackerrank)
        ? profile.coding.hackerrank
        : '';
  
      // Set component fields state
      this.setState({
        codechef: profile.codechef,
        hackerearth: profile.hackerearth,
        hackerrank: profile.hackerrank
      });
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

  render() {
    const { errors, displayCode } = this.state;

    let codeInputs;

    if (displayCode) {
      codeInputs = (
        <div>
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
               
              

        </div>
      );
    }

  

    return (
      <div className="edit-codes">
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
               
               <div className="mb-3">
                  <button
                    type="button"
                    onClick={() => {
                      this.setState(prevState => ({
                        displayCode: !prevState.displayCode
                      }));
                    }}
                    className="btn btn-light"
                  >
                   
                  </button>
               
                </div>
                {codeInputs}
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

Codings.propTypes = {
  codings: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { coding , getCurrentProfile })(
  withRouter(Codings)
);
