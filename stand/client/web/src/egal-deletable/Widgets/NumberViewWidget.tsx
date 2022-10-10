import * as React from 'react';

type Props = {
  children: number;
};
type State = {
  bool: boolean;
};

export default class NumberViewWidget extends React.Component<Props, State> {
  render() {
    return <>{this.props.children}</>;
  }
}
