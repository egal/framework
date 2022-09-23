import type { ReactNode } from 'react';
import type { ColumnConfig as GrommetColumnConfig } from 'grommet/components/DataTable';

export interface FieldConfig<TRowType = any> {
  name: string;
  header: string;
  renderType?: 'boolean' | 'checkbox' | 'toggle';
  renderDataTable?: (datum: TRowType) => ReactNode;
  formInputEnabled?: boolean;
  renderFormInput?: () => ReactNode; // TODO: Нормальные параметры.
  dataTableColumnAdditionalProps?: any | GrommetColumnConfig<TRowType>;
}
