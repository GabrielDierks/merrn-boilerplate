import React from 'react';
import { Link } from 'react-router-dom';

const ProfileActions = () => {
    return (
        <div className="btn-group mb-4" role="group">
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
            <Link to="/edit-profile" className="btn btn-light">
                <i className="fas fa-user-circle text-info mr-1" /> Edit Profile
            </Link>
                </li>
                <li className="nav-item">
            <Link to="/add-experience" className="btn btn-light">
                <i className="fab fa-black-tie text-info mr-1" />
                Add Experience
            </Link>
                </li>
                <li className="nav-item">
            <Link to="/add-education" className="btn btn-light">
                <i className="fas fa-graduation-cap text-info mr-1" />
                Add Education
            </Link>
                </li>
            </ul>
        </div>
    );
};

export default ProfileActions;
