import * as React from 'react';
import { Resource } from '@egalteam/framework';
import { DateInput, TextInput } from 'grommet';

export const EmployeesWithFiltersResource = () => (
  <Resource
    key={'employees'}
    model={{ service: 'auth', name: 'Employee' }}
    //
  >
    <Resource.Filters>
      <Resource.Filters.Primary
        initFormValue={{
          'AND:address:co': '',
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
    </Resource.Filters>
    <Resource.DataTable />
  </Resource>
);
