import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { addComment } from '../../actions/postActions';
import { getCurrentProfile } from '../../actions/profileActions';

class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        this.props.getCurrentProfile();
    }

    componentWillReceiveProps(newProps) {
        if(newProps.errors) {
            this.setState({ errors: newProps.errors})
        }
    }

    onSubmit(e) {
        e.preventDefault();

        const { user } = this.props.auth;
        const { postId } = this.props;
        const { profile } = this.props;

        const handle = profile.profile.handle;

        const newComment = {
            text: this.state.text,
            name: user.name,
            avatar: user.avatar,
            handle: handle

        };

        console.log("newPost",newComment);
        this.props.addComment(postId, newComment);
        this.setState({ text: ''});
    }

    onChange(e) {
        this.setState({[e.target.name]:e.target.value});
    }

    render() {

        const { errors } = this.state;
        return (
            <div className="post-form mb-3 mt-3">
                <div className="card card-info">
                    <div className="card-body">
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <TextAreaFieldGroup placeholder="comment ..." name="text" value={this.state.text} onChange={this.onChange} error={errors.text}/>
                            </div>
                            <div className="text-right">
                                <button type="submit" className="btn btn-dark">post</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

CommentForm.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    addComment: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired,
    errors: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired

};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
    profile: state.profile

});

export default connect(mapStateToProps, {getCurrentProfile, addComment})(CommentForm);
