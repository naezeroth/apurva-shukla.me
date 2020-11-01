import React from "react"
import axios from "axios"
import Button from "../components/button"
import PropTypes from 'prop-types'; // ES6

class CommentSubmit extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "",
      msg: "",
      email: "",
      loading: false,
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange = e => {
    /*
      Because we named the inputs to match their
      corresponding values in state, it's
      super easy to update the state
    */
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit = e => {
    e.preventDefault()

    this.setState({ loading: true })
    const { name, email, msg } = this.state

    const formdata = new FormData()
    formdata.set("fields[name]", name)
    formdata.set("fields[email]", email)
    formdata.set("fields[message]", msg)
    formdata.set("fields[slug]", this.props.slug.slice(1, -1)) //necessary for staticman to write files (otherwise "/slug/" will throw GITHUB_WRITING_FILE error)
    formdata.set(
      "options[redirect]",
      "https://apurva-shukla.me/blog" + this.props.slug
    )

    const json = {}
    formdata.forEach((value, prop) => (json[prop] = value))
    const formBody = Object.keys(json)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(json[key]))
      .join("&")

    axios
      .post(
        "https://staticman-aus.herokuapp.com/v2/entry/naezeroth/personal-website/master/comments",
        formBody,
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      )
      .then(result => {
        this.setState({ loading: false, name: "", email: "", msg: "" })
        alert("Your comment has been successfully submitted for moderation")
      })
      .catch(result => {
        this.setState({ loading: false, name: "", email: "", msg: "" })
        alert("Something went wrong with submitting your comment")
      })
  }

  render () {
    return(
      <form>
          <label>
            <input
              name="name"
              placeholder="Name"
              type="text"
              onChange={this.onChange}
              value={this.state.name}
              style={{
                height: "50px",
                border: "1px solid #ccc",
                margin: "10px 0px 10px 0px",
                fontWeight: "700",
                borderRadius: "6px",
                padding: "10px",
              }}
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
                height: "50px",
                border: "1px solid #ccc",
                fontWeight: "700",
                borderRadius: "6px",
                padding: "10px",
                margin: "10px 0px 10px 0px",
              }}
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
                border: "1px solid #ccc",
                fontWeight: "700",
                borderRadius: "6px",
                padding: "10px",
                margin: "10px 0px 10px 0px",
                width: "75%",
                height: "200px",
              }}
            >
              {this.state.msg}
            </textarea>
          </label>
          <br></br>
          <span
            type="submit"
            style={{
              display: "flex",
              WebkitAppearance: "none",
              MozAppearance: "none",
              appearance: "none",
            }}
          >
            <div onClick={this.onSubmit}>
              <Button marginRight="25px">Submit</Button>
            </div>
            {this.state.loading && <LoadingSpinner />}
          </span>
        </form>
    )
  }
}

CommentSubmit.propTypes = {
  slug: PropTypes.string.isRequired,
}

export default CommentSubmit

const LoadingSpinner = () => (
  <div>
    <i className="fa fa-spinner fa-spin" style={{ fontSize: "42px" }} />
  </div>
)