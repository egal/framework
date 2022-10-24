import * as React from 'react';
import { Resource, Select } from '@egalteam/framework';
import { CheckBox, FormField, Tag, TextInput } from 'grommet';

export const CountriesResourceWithRenamedButtons = () => (
  <Resource key={'countries'} model={{ service: 'core', name: 'Country' }}>
    <Resource.Actions>
      <Resource.Actions.Create button={{ label: 'Создать' }}>
        <FormField name="id" component={TextInput} label="ID" disabled />
      </Resource.Actions.Create>
      <Resource.Actions.Show
        button={{ label: 'Посмотреть' }}
        form={{ buttons: { update: { label: 'Обновить' }, delete: { label: 'Удалить' } } }}>
        <FormField name="id" component={TextInput} label="ID" disabled />
      </Resource.Actions.Show>
      <Resource.Actions.Update button={{ label: 'Обновить' }}>
        <FormField name="id" component={TextInput} label="ID" disabled />
      </Resource.Actions.Update>
      <Resource.Actions.Delete button={{ label: 'Удалить' }} />
    </Resource.Actions>
    <Resource.DataTable
      columns={[
        { property: 'id', header: 'ID', pin: true },
        { property: 'name', header: 'Name' }
      ]}
    />
  </Resource>
);
