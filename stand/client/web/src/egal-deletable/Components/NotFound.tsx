// @flow
import * as React from 'react';

export default class NotFound extends React.Component {
  render() {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh'
        }}>
        <h1>Not found!</h1>
      </div>
    );
  }
}
