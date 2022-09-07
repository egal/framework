import * as React from 'react';

type Props = {
  children: string;
};
type State = {
  bool: boolean;
};

export default class StringViewWidget extends React.Component<Props, State> {
  render() {
    return <>{this.props.children}</>;
  }
}
