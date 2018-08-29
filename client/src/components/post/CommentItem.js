import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


import {deleteComment} from '../../actions/postActions'

class CommentItem extends Component {

    onDeleteClick(postId, commentId) {
        this.props.deleteComment(postId, commentId);
    }

    render() {
        const {comment, postId, auth } = this.props;

        return (
            <div className="card card-body mb-3">
                <div className="row">

                    <Link to={`/profile/${comment.handle}`}>

                    <div className="col-md-2 d-flex p-2 justify-content-left align-items-left mb-3">
                        <div className="col-3">
                            <img className="rounded-circle"
                                 src={comment.avatar}
                                 alt={comment.name}/>
                        </div>
                        <div className="col-5 mt-3">
                            <p className="text-left">{comment.name}</p>
                        </div>
                    </div>

                    </Link>
                    <div className="col-md-10">
                        <p className="lead">{comment.text}</p>

                        {comment.user === auth.user.id ? (
                            <button onClick={this.onDeleteClick.bind(this, postId, comment._id)} type="button" className="btn btn-danger mr-1">
                                <i className="fas fa-times"/>
                            </button>
                        ) : null}
                    </div>
                </div>
            </div>
        );
    }
}

CommentItem.propTypes = {
    deleteComment:PropTypes.func.isRequired,
    comment: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(mapStateToProps, {deleteComment})(CommentItem);
