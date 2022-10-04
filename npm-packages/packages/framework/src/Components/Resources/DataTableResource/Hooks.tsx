import { ServerFieldMetadata, ServerModelMetadata } from '../../../Metadata';
import { DataTableResourceFieldConfig } from './Types';
import { FieldConfig } from '../../../Widgets/DataTable';
import { FormFieldConfig } from '../../Form';

type ToInputConfig = {
  excludeGuarded?: boolean;
  enableAllForce?: boolean;
  filterPrimaryFilterable?: boolean;
  filterSecondaryFilterable?: boolean;
};

type FilterConfig = {
  excludeGuarded?: boolean;
  filterPrimaryFilterable?: boolean;
  filterSecondaryFilterable?: boolean;
};

type Return = [
  (
    fields: DataTableResourceFieldConfig[],
    config?: ToInputConfig
  ) => FormFieldConfig[],
  (fields: DataTableResourceFieldConfig[]) => FieldConfig[]
];

export function useFieldsConvertor(
  modelMetadata: ServerModelMetadata,
  fieldMetadata: (name: string) => ServerFieldMetadata
): Return {
  const filter = (
    fields: DataTableResourceFieldConfig[],
    config: FilterConfig
  ): DataTableResourceFieldConfig[] => {
    const defaultConfig: FilterConfig = {
      excludeGuarded: false,
      filterPrimaryFilterable: false,
      filterSecondaryFilterable: false,
    };

    config = { ...defaultConfig, ...config };

    return fields.filter((field) => {
      const fieldMeta = fieldMetadata(field.name);

      const isGuarded = fieldMeta.guarded;

      const isSecondaryFilterable =
        field.filter === true ||
        (field.filter !== undefined &&
          field.filter.primary === undefined &&
          field.filter.secondary === true);

      const isPrimaryFilterable =
        field.filter !== true &&
        field.filter !== undefined &&
        field.filter.secondary === undefined &&
        field.filter.primary === true;

      const needExclude = config.excludeGuarded && isGuarded;

      const needSave =
        (!config.filterSecondaryFilterable || isSecondaryFilterable) &&
        (!config.filterPrimaryFilterable || isPrimaryFilterable);

      return !needExclude && needSave;
    });
  };

  const toFormFieldConfigs = (
    fields: DataTableResourceFieldConfig[],
    config: FilterConfig & {
      enableAllForce?: boolean;
    }
  ): FormFieldConfig[] => {
    const defaultConfig = {
      enableAllForce: false,
    };

    config = { ...defaultConfig, ...config };

    return filter(fields, config).map((field) => {
      const fieldMeta = fieldMetadata(field.name);
      return {
        name: field.name,
        label: field.header,
        renderType: field.renderType ?? fieldMeta.type,
        render: field.renderFormInput ?? undefined,
        enabled:
          config.enableAllForce ||
          (field.formInputEnabled ??
            ((field.formInputEnabled === undefined || field.formInputEnabled) &&
              !fieldMeta.guarded)),
      };
    });
  };

  const toDataTableFieldConfigs = (
    fields: DataTableResourceFieldConfig[],
    config: FilterConfig
  ): FieldConfig[] => {
    return filter(fields, config).map((field): FieldConfig => {
      const fieldMeta = fieldMetadata(field.name);
      return {
        name: field.name,
        header: field.header,
        render: field.renderDataTable,
        renderType: field.renderType ?? fieldMeta.type,
      };
    });
  };

  return [toFormFieldConfigs, toDataTableFieldConfigs] as Return;
}
