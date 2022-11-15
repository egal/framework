import * as React from 'react';
import { useResourceContext } from '../Resource';
import { Box, Spinner } from 'grommet';
import { Grid, GridProps } from 'grommet/components/Grid';
import { Selector } from './Selector';
import { Card } from './Card';

type Props<ItemType> = GridProps & {
  component: any;
};

export function Cards<ItemType>({ component, ...props }: Props<ItemType>) {
  const {
    resource: {
      metadata: { result: metadata },
      getItems: { result },
    },
  } = useResourceContext();

  if (result === undefined || metadata === undefined) return <Spinner />;

  return (
    <Box overflow="auto" fill justify={'start'}>
      <Box>
        <Grid {...props}>
          {result.items.map((item) => (
            <Card<ItemType> key={item[metadata.primary_key.name]} item={item}>
              {React.createElement(component)}
            </Card>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

Cards.Selector = Selector;
