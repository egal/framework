import { ServerFieldMetadata, ServerModelMetadata } from '../../../Metadata';
import { DataTableResourceFieldConfig } from './Types';
import { InputConfig } from '../../../Widgets';
import { FieldConfig } from '../../../Widgets/DataTable';

type ToInputConfig = {
  excludeGuarded?: boolean;
  enableAllForce?: boolean;
  filterPrimaryFilterable?: boolean;
  filterSecondaryFilterable?: boolean;
};

export function useFieldsConvertor(
  modelMetadata: ServerModelMetadata,
  fieldMetadata: (name: string) => ServerFieldMetadata
): [
  (
    fields: DataTableResourceFieldConfig[],
    config?: ToInputConfig
  ) => InputConfig[],
  (fields: DataTableResourceFieldConfig[]) => FieldConfig[]
] {
  const toInputConfigs = (
    fields: DataTableResourceFieldConfig[],
    config: ToInputConfig = {
      excludeGuarded: false,
      filterSecondaryFilterable: false,
      filterPrimaryFilterable: false,
      enableAllForce: false,
    }
  ): InputConfig[] => {
    return fields
      .filter((field) => {
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
      })
      .map((field) => {
        const fieldMeta = fieldMetadata(field.name);
        return {
          name: field.name,
          header: field.header,
          renderType: field.renderType ?? fieldMeta.type,
          render: field.renderFormInput ?? undefined,
          enabled:
            config.enableAllForce ||
            (field.formInputEnabled ??
              ((field.formInputEnabled === undefined ||
                field.formInputEnabled) &&
                !fieldMeta.guarded)),
        };
      });
  };

  const toDataTableFieldConfigs = (
    fields: DataTableResourceFieldConfig[]
  ): FieldConfig[] => {
    return fields.map((field): FieldConfig => {
      const fieldMeta = fieldMetadata(field.name);
      return {
        name: field.name,
        header: field.header,
        render: field.renderDataTable,
        renderType: field.renderType ?? fieldMeta.type,
      };
    });
  };

  return [toInputConfigs, toDataTableFieldConfigs];
}
