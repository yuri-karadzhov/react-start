import React from 'react';

export default class Layout extends React.Component {
  state = {
    title: 'Hey'
  };
  changeTitle(title) {
    this.setState({title});
  }
  render() {
    return (
      <h1>About</h1>
    );
  }
}
