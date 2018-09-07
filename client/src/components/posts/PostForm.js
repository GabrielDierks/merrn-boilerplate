import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { addPost } from '../../actions/postActions';
import { getProfiles } from '../../actions/profileActions';

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
        this.props.getProfiles();


    }

    componentWillReceiveProps(newProps) {
        if(newProps.errors) {
            this.setState({ errors: newProps.errors})
        }
    }



    onSubmit(e) {
        e.preventDefault();

        const { user } = this.props.auth;
        const { auth, profile } = this.props;

        let handle;


        if (profile.profiles !== null) {
            for (let i = 0; i < profile.profiles.length; i++) {
                if (auth.user.id === profile.profiles[i].user._id) {
                    handle = profile.profiles[i].handle;
                    console.log("handle", handle);
                }

            }
        }
        const newPost = {
            text: this.state.text,
            name: user.name,
            avatar: user.avatar,
            handle: handle
        };

        console.log("newPost",newPost)
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
    getProfiles: PropTypes.func.isRequired,
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

export default connect(mapStateToProps, {getProfiles, addPost})(PostForm);
