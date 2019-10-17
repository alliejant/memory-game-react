import React, { Component } from "react";
import axios from "axios";
import { serverAddress } from "./static/variables";
import "./App.css";

class Mock extends Component {
  state = {
    response: "",
    post: "",
    responseToPost: "",
    error: null
  };

  componentDidMount() {
    this.callApi();
  }

  callApi = async () => {
    try {
      const response = await axios.get(`${serverAddress}`);
      if (response.data && response.data.express) {
        this.setState({ response: response.data.express });
      } else {
        throw new Error("No valid response");
      }
    } catch (err) {
      console.log(err);
    }
  };

  handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${serverAddress}`,
        { post: this.state.post },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      this.setState({ responseToPost: response.data, error: null });
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        this.setState({ error: err.response.data.message });
      } else {
        this.setState({ error: "There was an error. Please try again" });
      }
    }
  };

  render() {
    return (
      <div>
        <p>{this.state.response}</p>
        {this.state.error}
        <form onSubmit={this.handleSubmit}>
          <p>
            <strong>Post to Server:</strong>
          </p>
          <input
            type="text"
            value={this.state.post}
            onChange={e => this.setState({ post: e.target.value })}
          />
          <button type="submit">Submit</button>
        </form>
        <p>{this.state.responseToPost}</p>
      </div>
    );
  }
}

export default Mock;
