import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { deleteEducation } from '../../actions/profileActions';

class Education extends Component {
    onDeleteClick(id) {
        this.props.deleteEducation(id);
    }

    render() {
        const education = this.props.education.map(edu => (
            <tr key={edu.id}>
                <td>{edu.school}</td>
                <td>{edu.degree}</td>
                <td>{edu.fieldofstudy}</td>
                <td>
                    <Moment format="DD.MM.YYYY">{edu.from}</Moment> -{' '}
                    {edu.to === null ? 'Current' : <Moment format="DD.MM.YYYY">{edu.to}</Moment>}
                </td>
                <td>
                    <button
                        onClick={this.onDeleteClick.bind(this, edu._id)}
                        className="btn btn-danger"
                    >
                        Delete
                    </button>
                </td>
            </tr>
        ));
        return (
            <div>
                <h4 className="mb-4">Education Credentials</h4>
                <div style={{ overflowX: 'scroll' }}>
                <table className="table">
                    <thead>
                        <tr>
                            <th>School</th>
                            <th>Degree</th>
                            <th>Field of study</th>
                            <th>Years</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>{education}</tbody>
                </table>
                </div>
            </div>
        );
    }
}

Education.propTypes = {
    deleteEducation: PropTypes.func.isRequired,
};

export default connect(
    null,
    { deleteEducation }
)(Education);
