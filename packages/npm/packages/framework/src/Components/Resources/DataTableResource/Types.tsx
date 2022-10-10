import * as React from 'react';
import { ColumnConfig as GrommetColumnConfig } from 'grommet/components/DataTable';

// TODO: Implementation of primary and secondary filters.
// TODO: Only cases: undefined,true || true,undefined, make strict type.
export type DataTableResourceFieldFilterConfig =
  | true
  | {
      primary: true;
      secondary?: undefined;
    }
  | {
      primary?: undefined;
      secondary: true;
    };

export interface DataTableResourceFieldConfig {
  name: string;
  header: string;
  renderType?: string | 'boolean' | 'checkbox' | 'toggle';
  renderDataTable?: (datum: any) => React.ReactNode;
  formInputEnabled?: boolean;
  renderFormInput?: () => React.ReactElement; // TODO: Нормальные параметры.
  dataTableColumnAdditionalProps?: Partial<GrommetColumnConfig<any>>;
  filter?: DataTableResourceFieldFilterConfig;
}

export interface DataTableResourceConfig {
  modelName: string;
  serviceName: string;
  perPage: number;
  fields: DataTableResourceFieldConfig[];
}
