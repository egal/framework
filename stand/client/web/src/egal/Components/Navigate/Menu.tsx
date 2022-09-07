import React, { ReactElement } from 'react';
import styled from 'styled-components';

export interface MenuProps {
  children: ReactElement[];
  logotype?: string;
}

export default class Menu extends React.Component<MenuProps> {
  render() {
    const Container = styled.div`
      padding: 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100vh;
      width: 256px;
      background: #ffffff;
      border-right: 1px solid #e2e8f0;
    `;

    const Body = styled.ul`
      margin-top: 40px;
    `;

    return (
      <Container>
        <div>
          {this.props.logotype ? <img src={this.props.logotype} alt="logotype" /> : null}
          <Body>{this.props.children}</Body>
        </div>
        <div>
          <button>X Exit</button>
        </div>
      </Container>
    );
  }
}
