import type { ReactNode } from 'react';
import type { ColumnConfig as GrommetColumnConfig } from 'grommet/components/DataTable';
import * as React from 'react';

// TODO: Implementation of primary and secondary filters.
// eslint-disable-next-line @typescript-eslint/ban-types
export type FilterConfig = {};

export interface FieldConfig {
  name: string;
  header: string;
  renderType?: 'boolean' | 'checkbox' | 'toggle';
  renderDataTable?: (datum: any) => React.ReactNode;
  formInputEnabled?: boolean;
  renderFormInput?: () => React.ReactNode; // TODO: Нормальные параметры.
  dataTableColumnAdditionalProps?: any | GrommetColumnConfig<any>;
  filter?: boolean | FilterConfig;
}
