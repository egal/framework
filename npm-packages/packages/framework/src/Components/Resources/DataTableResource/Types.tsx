import * as React from 'react';
import { ColumnConfig as GrommetColumnConfig } from 'grommet/components/DataTable';

// TODO: Implementation of primary and secondary filters.
export type DataTableResourceFieldFilterConfig = {
  // TODO: Only cases: undefined,true || true,undefined, make strict type.
  primary?: true;
  secondary?: true;
};

export interface DataTableResourceFieldConfig {
  name: string;
  header: string;
  renderType?: 'boolean' | 'checkbox' | 'toggle';
  renderDataTable?: (datum: any) => React.ReactNode;
  formInputEnabled?: boolean;
  renderFormInput?: (entity: any) => React.ReactElement; // TODO: Нормальные параметры.
  dataTableColumnAdditionalProps?: any | GrommetColumnConfig<any>;
  filter?: true | DataTableResourceFieldFilterConfig;
}

export interface DataTableResourceConfig {
  modelName: string;
  serviceName: string;
  perPage: number;
  fields: DataTableResourceFieldConfig[];
  keyFieldName: string;
}
