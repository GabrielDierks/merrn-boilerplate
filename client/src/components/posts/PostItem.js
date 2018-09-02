import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { addLike, removeLike, deletePost } from '../../actions/postActions';
import { getProfiles } from '../../actions/profileActions';

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
    componentDidMount() {
        this.props.getProfiles();
    }


    render() {
        const { profile, post, auth, showActions } = this.props;


        // console.log("this.props", this.props);
        //         // let handle = [];
        //         // let handlecount;
        //         //
        //         // if (profile.profiles !== null && posts.length > 0) {
        //         //     // console.log("profile.profiles[1]", profile.profiles[1]);
        //         //     // console.log("posts.length", posts.length);
        //         //     for (let o = 0; o < posts.length; o++) {
        //         //         for (let i = 0; i < profile.profiles.length; i++) {
        //         //             if (posts[o].user === profile.profiles[i].user._id) {
        //         //                 handle.push(profile.profiles[i].handle);
        //         //
        //         //                 console.log('i', i);
        //         //                 console.log('o', o);
        //         //                 console.log("handle", handle);
        //         //
        //         //             }
        //         //         }
        //         //     }
        //         // }
        let handle;

        if (post.user === auth.user.id) {
            if (profile.profiles !== null) {
                    for (let i = 0; i < profile.profiles.length; i++) {
                        if (post.user === profile.profiles[i].user._id) {
                            handle = profile.profiles[i].handle;
                            console.log("handle", handle);
                        }

                    }

            }
        }

        else {
            handle = "gabrieldierks";
        }



        return (
            <div className="card card-body mb-3">
                <div className="row">
                    <Link to={`/profile/${handle}`}>

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
                            Comments
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
    getProfiles: PropTypes.func.isRequired,
    addLike: PropTypes.func.isRequired,
    removeLike: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile

});

export default connect(mapStateToProps, { getProfiles, addLike, removeLike, deletePost})(PostItem);