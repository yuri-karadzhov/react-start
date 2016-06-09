import React from 'react';
import {Link} from 'react-router';

export default class Header extends React.Component {
  render() {
    return (
      <header>
        Header
        <nav>
          <Link to="/">About</Link>
          <Link to="contacts">Contacts</Link>
        </nav>
      </header>
    );
  }
}
