import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addLike, removeLike } from '../../actions/postActions';

class LikeButton extends Component {
    constructor(props) {
        super(props);

        const { like } = this.props;

        this.state = {
            likeGreen: like,
            plusLike: 0,
        };
    }

    onLikeClick(post, id) {
        const { like } = this.props;

        this.setState({ likeGreen: !this.state.likeGreen });
        like ? this.setState({ plusLike: 0 }) : this.setState({ plusLike: 1 });
        this.props.addLike(id);
    }
    onUnlikeClick(post, id) {
        const { like } = this.props;

        this.setState({ likeGreen: !this.state.likeGreen });
        like ? this.setState({ plusLike: -1 }) : this.setState({ plusLike: 0 });
        this.props.removeLike(id);
    }

    findUserLike() {
        if (this.state.likeGreen) {
            return true;
        }
        if (!this.state.likeGreen) {
            return false;
        }
    }

    render() {
        const { post } = this.props;

        return (
            <button
                onClick={() =>
                    this.findUserLike(post.likes)
                        ? this.onUnlikeClick(post, post._id)
                        : this.onLikeClick(post, post._id)
                }
                type="button"
                className="btn btn-light mr-1"
            >
                <i
                    className={classnames('fas fa-thumbs-up', {
                        'text-info': this.state.likeGreen,
                    })}
                />
                <span className="badge badge-light">{post.likes.length + this.state.plusLike}</span>
            </button>
        );
    }
}
const mapStateToProps = state => ({
    auth: state.auth,
});
LikeButton.propTypes = {
    addLike: PropTypes.func.isRequired,
    removeLike: PropTypes.func.isRequired,
};

export default connect(
    mapStateToProps,
    { addLike, removeLike }
)(LikeButton);
