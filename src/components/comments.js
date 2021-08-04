import React from 'react';
import axios from 'axios';
import Button from './button';
import PropTypes from 'prop-types'; // ES6
import moment from 'moment';

class Comments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            msg: '',
            email: '',
            loading: false,
            replyTo: '',
            replyToName: '',
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onReply = this.onReply.bind(this);
    }

    onReply = (replying_to_uid, replying_to_name) => {
        this.setState({
            replyTo: replying_to_uid,
            replyToName: replying_to_name,
        });
    };

    onChange = e => {
        /*
      Because we named the inputs to match their
      corresponding values in state, it's
      super easy to update the state
    */
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();

        this.setState({ loading: true });
        const { name, email, msg, replyTo } = this.state;
        const formdata = new FormData();
        formdata.set('fields[name]', name);
        formdata.set('fields[email]', email);
        formdata.set('fields[message]', msg);
        formdata.set('fields[slug]', this.props.slug.slice(1, -1)); // necessary for staticman to write files (otherwise "/slug/" will throw GITHUB_WRITING_FILE error)
        if (replyTo !== '') {
            formdata.set('fields[replying_to_uid]', replyTo);
        }
        formdata.set(
            'options[redirect]',
            `https://apurva-shukla.me/blog${this.props.slug}`
        );

        const json = {};
        formdata.forEach((value, prop) => {
            return (json[prop] = value);
        });
        const formBody = Object.keys(json)
            .map(key => {
                return `${encodeURIComponent(key)}=${encodeURIComponent(
                    json[key]
                )}`;
            })
            .join('&');

        axios
            .post(
                'https://staticman.apurva-shukla.me/v2/entry/naezeroth/personal-website/master/comments',
                formBody,
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                }
            )
            .then(result => {
                this.setState({ loading: false, name: '', email: '', msg: '' });
                alert(
                    'Your comment has been successfully submitted for moderation'
                );
            })
            .catch(result => {
                this.setState({ loading: false, name: '', email: '', msg: '' });
                alert('Something went wrong with submitting your comment');
            });
    };

    render() {
        return (
            <div id="form">
                <div
                    style={{ margin: '0px 0px 10px 0px', fontSize: 'xx-large' }}
                >
                    Add a comment!
                </div>
                {this.state.replyToName && (
                    <div>
                        Replying to {this.state.replyToName}
                        <i
                            style={{ marginLeft: '5px' }}
                            className="fa fa-times-circle"
                            aria-hidden="true"
                            onClick={() => {
                                return this.onReply('', '');
                            }}
                        ></i>
                    </div>
                )}
                <form>
                    <label>
                        <input
                            name="name"
                            placeholder="Name"
                            type="text"
                            onChange={this.onChange}
                            value={this.state.name}
                            style={{
                                height: '50px',
                                border: '1px solid #ccc',
                                margin: '10px 0px 10px 0px',
                                fontWeight: '700',
                                borderRadius: '6px',
                                padding: '10px',
                            }}
                            required
                        />
                    </label>
                    <br></br>
                    <label>
                        <input
                            name="email"
                            placeholder="Email"
                            type="email"
                            value={this.state.email}
                            onChange={this.onChange}
                            style={{
                                height: '50px',
                                border: '1px solid #ccc',
                                fontWeight: '700',
                                borderRadius: '6px',
                                padding: '10px',
                                margin: '10px 0px 10px 0px',
                            }}
                            required
                        />
                    </label>
                    <br></br>
                    <label>
                        <textarea
                            name="msg"
                            placeholder="Message"
                            onChange={this.onChange}
                            value={this.state.msg}
                            style={{
                                border: '1px solid #ccc',
                                fontWeight: '700',
                                borderRadius: '6px',
                                padding: '10px',
                                margin: '10px 0px 10px 0px',
                                width: '75%',
                                height: '200px',
                            }}
                            required
                        >
                            {this.state.msg}
                        </textarea>
                    </label>
                    <br></br>
                    <span
                        type="submit"
                        style={{
                            display: 'flex',
                            WebkitAppearance: 'none',
                            MozAppearance: 'none',
                            appearance: 'none',
                        }}
                    >
                        <div onClick={this.onSubmit}>
                            <Button marginRight="25px">Submit</Button>
                        </div>
                        {this.state.loading && <LoadingSpinner />}
                    </span>
                </form>

                <div style={{ width: '100%' }}>
                    {this.props.comments && this.props.comments.length > 0 ? (
                        <NestedComments
                            comments={this.props.comments}
                            action={this.onReply}
                        />
                    ) : (
                        <p>No comments yet.</p>
                    )}
                </div>
            </div>
        );
    }
}

Comments.propTypes = {
    slug: PropTypes.string.isRequired,
    comments: PropTypes.array,
};

export default Comments;

const LoadingSpinner = () => {
    return (
        <div>
            <i className="fa fa-spinner fa-spin" style={{ fontSize: '42px' }} />
        </div>
    );
};

// Can either use props here and do props.comments or use {} to pluck comments out of props
const NestedComments = ({ comments, action }) => {
    const commentObj = {};
    for (const c of comments) {
        if (c.node.replying_to_uid !== null) {
            commentObj[c.node.replying_to_uid].push(c);
        } else if (commentObj[c.node._id] === undefined) {
            commentObj[c.node._id] = [c];
        } else {
            commentObj[c.node._id].push(c);
        }
    }

    const html = [];
    for (let thread of Object.values(commentObj)) {
        let idx = 0;
        for (let comment of thread) {
            if (idx === 0) {
                // Root comment
                html.push(
                    <div
                        key={comment.node._id}
                        style={{
                            display: 'flex',
                            border: '2px solid var(--commentBorder)',
                            width: '100%',
                            boxShadow: '3px 5px var(--commentShadow)',
                            padding: '10px 20px',
                            flexWrap: 'wrap',
                            margin: '10px 0px 20px 0px',
                        }}
                    >
                        <div
                            style={{
                                flexGrow: '1',
                                fontWeight: 'bold',
                                marginBottom: '10px',
                            }}
                        >
                            {comment.node.name}
                        </div>
                        <div>
                            {' '}
                            {moment(comment.node.date).format('Do MMM YYYY')}
                        </div>
                        <div style={{ width: '100%' }}></div>
                        <div style={{ flexGrow: '1' }}>
                            {comment.node.message}{' '}
                        </div>
                        <a style={{ boxShadow: 'none' }} href="#form">
                            <i
                                onClick={() => {
                                    return action(
                                        comment.node._id,
                                        comment.node.name
                                    );
                                }}
                                style={{ marginTop: '5px' }}
                                className="fa fa-reply"
                                aria-hidden="true"
                            ></i>
                        </a>
                    </div>
                );
            } else {
                html.push(
                    <div
                        key={comment.node._id}
                        style={{
                            display: 'flex',
                            border: '2px solid var(--commentBorder)',
                            width: '88%',
                            boxShadow: '3px 5px var(--commentShadow)',
                            padding: '10px 20px',
                            flexWrap: 'wrap',
                            margin: '10px 0px 20px 12%',
                        }}
                    >
                        <div
                            style={{
                                flexGrow: '1',
                                fontWeight: 'bold',
                                marginBottom: '10px',
                            }}
                        >
                            {comment.node.name}
                        </div>
                        <div>
                            {' '}
                            {moment(comment.node.date).format('Do MMM YYYY')}
                        </div>
                        <div style={{ width: '100%' }}></div>
                        <div>{comment.node.message} </div>
                    </div>
                );
            }
            idx++;
        }
    }
    // Should have commentObj with keys as unique comments and value as [originalComment, reply1, reply2..]
    return html;
};
