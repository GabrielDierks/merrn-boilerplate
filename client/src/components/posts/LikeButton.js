import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addLike, removeLike } from '../../actions/postActions';

class LikeButton extends Component {


    //TODO like doesnt likeGreen doesnt load on start
    constructor(props) {
        super(props);

        const { like } = this.props;

        this.state = {
            likeGreen: like
        };
    }

    onLikeClick(id) {
        this.props.addLike(id);
        this.setState({ likeGreen: this.state.likeGreen });
        console.log(this.state.likeGreen);

    }
    onUnlikeClick(id) {
        this.props.removeLike(id);
        this.setState({ likeGreen: !this.state.likeGreen });
        console.log(this.state.likeGreen);


    }

    findUserLike(likes) {
        const { auth } = this.props;

        // if (likes.filter(like => like.user === auth.user.id).length > 0) {
        //     return true;
        // }

        if (this.state.likeGreen ){
            return true;
        }
        if (!this.state.likeGreen ){
            return false;
        }
    }

    render() {
        const { post } = this.props;

        return (
            <button
                onClick={() =>
                    this.findUserLike(post.likes)
                        ? this.onUnlikeClick(post._id)
                        : this.onLikeClick(post._id)
                }
                type="button"
                className="btn btn-light mr-1"
            >
                <i
                    className={classnames('fas fa-thumbs-up', {
                        'text-info': this.state.likeGreen
                    })}
                />
                <span className="badge badge-light">{post.likes.length}</span>
            </button>
        );
    }
}
const mapStateToProps = state => ({
    auth: state.auth
});
LikeButton.propTypes = {
    addLike: PropTypes.func.isRequired,
    removeLike: PropTypes.func.isRequired,
};

export default connect(mapStateToProps,{ addLike, removeLike })(LikeButton);
