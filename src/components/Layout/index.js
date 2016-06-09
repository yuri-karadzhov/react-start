import React from 'react';

import Header from '../Header';
import Footer from '../Footer';

export default class Layout extends React.Component {
  state = {
    title: 'Hey'
  };
  changeTitle(title) {
    this.setState({title});
  }
  render() {
    return (
      <div>
        <Header/>
        {this.props.children}
        <Footer changeTitle={::this.changeTitle} title={this.state.title}/>
      </div>
    );
  }
}
