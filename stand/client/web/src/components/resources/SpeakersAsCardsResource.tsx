import * as React from 'react';
import { Resource, useResourceCardContext } from '@egalteam/framework';
import { Box, Card as GCard, CardBody, CardFooter, CardHeader, ResponsiveContext, TextInput } from 'grommet';
import { useContext } from 'react';

type Item = {
  id: string;
  avatar: string;
  video: string;
  name: string;
  country_id: string;
  surname: string;
  country: {
    id: string;
    name: string;
  };
};

export function Card() {
  const { item, changeSelecting } = useResourceCardContext<Item>();

  return (
    <GCard height="medium" background="light-1" onClick={changeSelecting}>
      <CardHeader pad="medium">ID: {item.id}</CardHeader>
      <CardHeader pad="medium">Name: {item.name}</CardHeader>
      <CardBody pad="medium">Country name: {item.country.name}</CardBody>
      <CardFooter pad={{ horizontal: 'small' }} background="light-2">
        <Box margin={'small'}>
          <Resource.Cards.Selector />
        </Box>
      </CardFooter>
    </GCard>
  );
}

export const SpeakersAsCardsResource = () => {
  const size = useContext(ResponsiveContext);

  return (
    <Resource
      key={'SpeakersAsCardsResource'}
      model={{ service: 'core', name: 'Speaker' }}
      actionGetItems={{
        initParams: {
          relations: ['country'],
        },
      }}>
      <Resource.Filters>
        <Resource.Filters.Primary
          initFormValue={{
            'AND:name:co': '',
          }}>
          <Resource.Filters.FormField
            combiner="AND"
            fieldName="name"
            operator="co"
            component={TextInput}
            label="Name co"
          />
        </Resource.Filters.Primary>
      </Resource.Filters>
      <Resource.Actions />
      <Resource.Cards<Item> columns={size !== 'medium' ? 'medium' : '100%'} gap="small" component={Card} />
      <Resource.Pagination defaultPerPage={25} />
    </Resource>
  );
};
