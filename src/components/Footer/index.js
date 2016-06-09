import React from 'react';

export default class Footer extends React.Component {
  handleChange(e) {
    this.props.changeTitle(e.target.value);
  }
  render() {
    return (
      <div>
        <header>{this.props.title}</header>
        <input type="text" value={this.props.title} onChange={::this.handleChange}/>
      </div>
    );
  }
}
