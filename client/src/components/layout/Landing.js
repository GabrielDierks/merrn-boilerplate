import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

class Landing extends Component {
    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/dashboard');
        }
    }

    render() {
        return (
            <div className="landing">
                <div className="landing-inner text-dark">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 text-center">
                                <h1 className="display-3 mb-4">Facegram</h1>
                                <p className="lead">
                                   Welcome to Facegram. A social network for cool people &#60;3
                                </p>
                                <hr />
                                <Link to="/register" className="btn btn-lg btn-info mr-2">
                                    Sign Up
                                </Link>
                                <Link to="/login" className="btn btn-lg btn-light">
                                    Login
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Landing.propTypes = {
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
});

export default connect(mapStateToProps)(Landing);
