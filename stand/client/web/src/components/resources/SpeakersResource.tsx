import * as React from 'react';
import { Resource, Select } from '@egalteam/framework';
import { FormField, Tag, TextInput } from 'grommet';

export const SpeakersResource = () => (
  <Resource
    key={'speakers'}
    model={{ service: 'core', name: 'Speaker' }}
    actionGetItems={{
      initParams: {
        relations: ['country']
      }
    }}>
    <Resource.Actions>
      <Resource.Actions.Create>
        <FormField name="name" component={TextInput} label="Name" required />
        <FormField name="surname" component={TextInput} label="Surname" required />
        <FormField label={'Country'}>
          <Select
            name={'country_id'}
            model={{ name: 'Country', service: 'core' }}
            valueKey={{ key: 'id', reduce: true }}
            labelKey={'name'}
          />
        </FormField>
        <FormField label={'User'}>
          <Select
            name={'user_id'}
            model={{ name: 'User', service: 'auth' }}
            valueKey={{ key: 'id', reduce: true }}
            labelKey={'email'}
          />
        </FormField>
      </Resource.Actions.Create>
      <Resource.Actions.Update>
        <FormField name="name" component={TextInput} label="Name" required />
        <FormField name="surname" component={TextInput} label="Surname" required />
        <FormField label={'Country'}>
          <Select
            name={'country_id'}
            model={{ name: 'Country', service: 'core' }}
            valueKey={{ key: 'id', reduce: true }}
            labelKey={'name'}
          />
        </FormField>
        <FormField label={'User'}>
          <Select
            disabled
            name={'user_id'}
            model={{ name: 'User', service: 'auth' }}
            valueKey={{ key: 'id', reduce: true }}
            labelKey={'email'}
          />
        </FormField>
      </Resource.Actions.Update>
    </Resource.Actions>
    <Resource.DataTable
      columns={[
        { property: 'id', header: 'ID', pin: true },
        { property: 'name', header: 'Name' },
        { property: 'country_id', header: 'Country ID' },
        {
          property: 'country.name',
          header: 'Country name',
          render: (datum) => <Tag value={datum.country.name} />
        },
        { property: 'created_at', header: 'created_at' },
        { property: 'updated_at', header: 'updated_at' }
      ]}
    />
  </Resource>
);
