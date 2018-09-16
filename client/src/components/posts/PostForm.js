import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { addPost } from '../../actions/postActions';
import { getCurrentProfile } from '../../actions/profileActions';

class PostForm extends Component {
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
        const { profile } = this.props;
        const handle = profile.profile.handle;

        const newPost = {
            text: this.state.text,
            name: user.name,
            avatar: user.avatar,
            handle: handle
        };

        this.props.addPost(newPost);
        this.setState({ text: ''});
    }

    onChange(e) {
        this.setState({[e.target.name]:e.target.value});
    }

    render() {



        const { errors } = this.state;
        return (
            <div className="post-form mb-3">
                <div className="card card-info">
                    <div className="card-body">
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <TextAreaFieldGroup placeholder="Whats on your Mind?" name="text" value={this.state.text} onChange={this.onChange} error={errors.text}/>
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

PostForm.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    addPost: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
    profile: state.profile

});

export default connect(mapStateToProps, { getCurrentProfile, addPost})(PostForm);
