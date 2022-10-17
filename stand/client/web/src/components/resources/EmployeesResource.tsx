import * as React from 'react';
import { Resource } from '@egalteam/framework';
import { DateInput, FormField, TextInput } from 'grommet';

export const EmployeesResource = () => (
  <Resource
    key={'employees'}
    model={{ service: 'auth', name: 'Employee' }}
    //
  >
    <Resource.Filters>
      <Resource.Filters.Primary
        initFormValue={{
          'AND:address:co': ''
          //
        }}>
        <Resource.Filters.FormField
          combiner="AND"
          fieldName="address"
          operator="co"
          component={TextInput}
          label="Address"
        />

        <Resource.Filters.FormField
          groupCombiner="AND"
          group="phone"
          combiner="OR"
          fieldName="phone"
          operator="gt"
          component={TextInput}
          label="Phone gt"
        />
        <Resource.Filters.FormField
          groupCombiner="AND"
          group="phone"
          combiner="AND"
          fieldName="phone"
          operator="lt"
          component={TextInput}
          label="Phone lt"
        />

        <Resource.Filters.FormField
          groupCombiner="AND"
          group="updated_at"
          combiner="AND"
          fieldName="updated_at"
          operator="gt"
          component={DateInput}
          label="Updated at gt"
        />
        <Resource.Filters.FormField
          groupCombiner="AND"
          group="updated_at"
          combiner="OR"
          fieldName="updated_at"
          operator="lt"
          component={DateInput}
          label="Updated at lt"
        />
      </Resource.Filters.Primary>
      <Resource.Filters.Secondary>
        <FormField name="phone" component={TextInput} label={'Phone'} />
      </Resource.Filters.Secondary>
    </Resource.Filters>
    <Resource.Actions>
      <Resource.Actions.Create>
        <FormField name="address" component={TextInput} label="Address" required />
        <FormField name="phone" component={TextInput} label="Phone" />
        <FormField name="adult" component={TextInput} label="Adult" required />
        <FormField name="weight" component={TextInput} label="Weight" required />
      </Resource.Actions.Create>
      <Resource.Actions.Show>
        <FormField name="id" component={TextInput} label="ID" disabled />
        <FormField name="address" component={TextInput} label="Address" disabled />
        <FormField name="phone" component={TextInput} label="Phone" disabled />
        <FormField name="adult" component={TextInput} label="Adult" disabled />
        <FormField name="weight" component={TextInput} label="Weight" disabled />
        <FormField name="created_at" component={TextInput} label="Created at" disabled />
        <FormField name="updated_at" component={TextInput} label="Updated at" disabled />
      </Resource.Actions.Show>
      <Resource.Actions.Update>
        <FormField name="id" component={TextInput} label="ID" disabled />
        <FormField name="address" component={TextInput} label="Address" required />
        <FormField name="phone" component={TextInput} label="Phone" />
        <FormField name="adult" component={TextInput} label="Adult" required />
        <FormField name="weight" component={TextInput} label="Weight" required />
      </Resource.Actions.Update>
      <Resource.Actions.Delete />
    </Resource.Actions>
    <Resource.DataTable
      columns={[
        { property: 'address', header: 'Address' },
        { property: 'phone', header: 'Phone' },
        { property: 'updated_at', header: 'Updated at' }
      ]}
    />
    <Resource.Pagination />
  </Resource>
);
