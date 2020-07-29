import React, { Component } from "react";

class About extends Component {
  state = {
    message: "",
  };

  componentDidMount() {
    fetch("/about")
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error("Error Network response");
      })
      .then((response) => this.setState({ message: response.message }))
      .catch((error) => this.setState({ message: error.message }));
  }

  render() {
    return <p>{this.state.message}</p>;
  }
}

export default About;
