import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { addLike, removeLike, deletePost } from '../../actions/postActions';


class PostItem extends Component {


    onDeleteClick(id) {
        this.props.deletePost(id);
    }

    onLikeClick(id) {
        this.props.addLike(id);
    }
    onUnlikeClick(id) {
        this.props.removeLike(id);
    }

    findUserLike(likes) {
        const {auth} = this.props;

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
                                <img className="rounded-circle"
                                     src={post.avatar}
                                     alt={post.name}/>
                            </div>
                            <div className="col-6 mt-3">
                                <p className="text-left">{post.name}</p>
                            </div>
                    </div>
                    </Link>

                    <div className="col-md-10">
                        <p className="lead">{post.text}</p>
                        {showActions ? (<span>
                            <button onClick={this.onLikeClick.bind(this, post._id)} type="button" className="btn btn-light mr-1">
                            <i className={classnames('fas fa-thumbs-up', {'text-info': this.findUserLike(post.likes)})} />
                            <span className="badge badge-light">{post.likes.length}</span>
                        </button>
                        <button onClick={this.onUnlikeClick.bind(this, post._id)} type="button" className="btn btn-light mr-1">
                            <i className="fas fa-thumbs-down"></i>
                        </button>

                        <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
                            {comments}{ comments ===1  ? ' comment': ' comments'}
                        </Link>
                            {post.user === auth.user.id ? (
                                <button onClick={this.onDeleteClick.bind(this, post._id)} type="button" className="btn btn-danger mr-1">
                                    <i className="fas fa-times"/>
                                </button>
                            ) : null}
                        </span>) : null}
                    </div>
                </div>
            </div>
        );
    }
}

PostItem.defaultProps = {
    showActions: true
};

PostItem.propTypes = {
    addLike: PropTypes.func.isRequired,
    removeLike: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { addLike, removeLike, deletePost})(PostItem);