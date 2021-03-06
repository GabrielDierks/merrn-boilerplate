import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { addLike, removeLike, deletePost } from '../../actions/postActions';
import CommentForm from './CommentForm';
import CommentFeed from './CommentFeed';
import LikeButton from './LikeButton';

class PostItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showComments: false,
        };
    }

    onDeleteClick(id) {
        this.props.deletePost(id);
    }

    findUserLike(likes) {
        const { auth } = this.props;

        if (likes.filter(like => like.user === auth.user.id).length > 0) {
            return true;
        } else {
            return false;
        }
    }

    render() {
        const { post, auth, showActions } = this.props;

        const comments = this.props.post.comments.length;


        return (
            <div className="card card-body mb-3">
                <div className="row">
                    <Link to={`/profile/${post.handle}`}>
                        <div className="d-flex p-2 justify-content-left align-items-left mb-3">
                            <div className="col-3">
                                <img className="rounded-circle" src={post.avatar} alt={post.name} />
                            </div>
                            <div className="col-6 mt-3">
                                <p className="text-left">{post.name}</p>
                            </div>
                        </div>
                    </Link>

                    <div className="col-md-10">
                        <p className="lead">{post.text}</p>
                        {showActions ? (
                            <span>
                                <LikeButton like={ this.findUserLike(post.likes)} post={post} auth={auth}/>

                                <button
                                    onClick={() =>
                                        this.setState({ showComments: !this.state.showComments })
                                    }
                                    type="button"
                                    className="btn btn-info mr-3"
                                >
                                    {comments}
                                    {comments === 1 ? ' comment' : ' comments'}
                                </button>

                                {post.user === auth.user.id ? (
                                    <button
                                        onClick={this.onDeleteClick.bind(this, post._id)}
                                        type="button"
                                        className="btn btn-danger mr-1"
                                    >
                                        <i className="fas fa-times" />
                                    </button>
                                ) : null}
                            </span>
                        ) : null}
                    </div>
                </div>
                {this.state.showComments ? (
                    <div>
                        <CommentForm postId={post._id} />
                        <CommentFeed postId={post._id} comments={post.comments} />
                    </div>
                ) : null}
            </div>
        );
    }
}

PostItem.defaultProps = {
    showActions: true,
};

PostItem.propTypes = {

    deletePost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { addLike, removeLike, deletePost }
)(PostItem);
