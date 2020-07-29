import React, { Component } from "react";

class Classes extends Component {
  state = {
    classes: [],
  };

  componentDidMount() {
    fetch("/classes", {
      headers: { Authorization: `Bearer ${this.props.auth.getAccessToken()}` },
    })
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error("Error Network response");
      })
      .then((response) => this.setState({ classes: response.classes }))
      .catch((error) => this.setState({ message: error.message }));

    fetch("/admin", {
      headers: { Authorization: `Bearer ${this.props.auth.getAccessToken()}` },
    })
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error("Error Network response");
      })
      .then((response) => this.setState(console.log(response)))
      .catch((error) => this.setState({ message: error.message }));
  }

  render() {
    return (
      <ul>
        {this.state.classes.map((cl) => {
          return <li key={cl.id}>{cl.title}</li>;
        })}
      </ul>
    );
  }
}

export default Classes;
