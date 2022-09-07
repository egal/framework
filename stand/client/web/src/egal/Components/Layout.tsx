// @flow
import * as React from 'react';
import { ReactElement } from 'react';

type Props = {
  children: ReactElement;
  menu: ReactElement;
};

export default class Layout extends React.Component<Props> {
  render() {
    return (
      <div style={{ display: 'flex' }}>
        {this.props.menu}
        <div style={{ margin: '20px' }}>{this.props.children}</div>
      </div>
    );
  }
}
