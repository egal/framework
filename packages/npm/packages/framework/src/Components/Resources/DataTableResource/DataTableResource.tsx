import * as React from 'react';
import { ActionGetItemsParams } from '../../../DataProvider';
import {
  Box,
  Box as GrommetBox,
  Button as GrommetButton,
  Form as GrommetForm,
  FormField,
  Pagination as GrommetPagination,
} from 'grommet';
import {
  FullBoxLoader,
  FullLayerModal,
  SomethingWentWrongFullLayerError,
} from '../../../Widgets';
import { DataTable } from '../../../Widgets/DataTable';
import { useResource, useEntityManipulate, useRelay } from '../../../Hooks';
import { DataTableResourceConfig } from './Types';
import { useFieldsConvertor } from './Hooks';
import { useEffect, useState } from 'react';
import { Form } from '../../Form';
import { InputFactory } from '../../Factories';
import { useInterfaceConfigContext } from '../../../Contexts';

export function DataTableResource({
  serviceName,
  modelName,
  perPage,
  fields = [],
}: DataTableResourceConfig) {
  const { dataTableResource: interfaceConfig } = useInterfaceConfigContext();

  const [
    creatingEnabled,
    creatingEntity,
    enableCreating,
    disableCreating,
    changeCreatingEntity,
    resetCreatingEntity,
    ,
  ] = useEntityManipulate();

  const [
    updatingEnabled,
    updatingEntity,
    enableUpdating,
    disableUpdating,
    changeUpdatingEntity,
    resetUpdatingEntity,
    ,
  ] = useEntityManipulate();

  const [
    filteringEnabled,
    filteringEntity,
    enableFiltering,
    disableFiltering,
    changeFilteringEntity,
    resetFilteringEntity,
    ,
  ] = useEntityManipulate();

  const [
    secondaryFiltersEditEnabled,
    enableSecondaryFiltersEdit,
    disableSecondaryFiltersEdit,
  ] = useRelay();

  const [selectedKeys, setSelectedKeys] = useState<(string | number)[]>([]);

  const [
    getResult,
    ,
    error,
    actionGet,
    actionCreate,
    actionUpdate,
    actionDelete,
    ,
    modelMetadata,
    fieldMetadata,
  ] = useResource<any, any, ActionGetItemsParams>(serviceName, modelName, {
    pagination: {
      per_page: perPage,
      page: 1,
    },
  });

  useEffect(() => {
    enableFiltering({});
    return () => {
      filteringEnabled && disableFiltering();
    };
  }, []);

  // TODO: Crutch, may be.
  if (error !== undefined && error.code === 'ERR_UNDEFINED') {
    return <SomethingWentWrongFullLayerError />;
  }

  // TODO: Crutch. DataTable placeholder prop or use Suspense.
  if (getResult === undefined || modelMetadata === undefined) {
    return <FullBoxLoader />;
  }

  const [toFormFieldConfigs, toDataTableFieldConfigs] = useFieldsConvertor(
    modelMetadata,
    fieldMetadata
  );

  const [CreateButton, UpdateButton, DeleteButton] = [
    GrommetButton,
    GrommetButton,
    GrommetButton,
  ];

  return (
    <>
      {creatingEnabled && (
        <FullLayerModal onClose={disableCreating}>
          <Form
            value={creatingEntity}
            fields={toFormFieldConfigs(fields, { excludeGuarded: true })}
            onChange={changeCreatingEntity}
            onReset={resetCreatingEntity}
            onSubmit={() => actionCreate(creatingEntity).then(disableCreating)}
          />
        </FullLayerModal>
      )}
      {updatingEnabled && (
        <FullLayerModal onClose={disableUpdating}>
          <Form
            value={updatingEntity}
            fields={toFormFieldConfigs(fields)}
            onChange={changeUpdatingEntity}
            onReset={resetUpdatingEntity}
            onSubmit={() =>
              actionUpdate(
                updatingEntity[modelMetadata.primary_key.name],
                updatingEntity
              ).then(disableUpdating)
            }
          />
        </FullLayerModal>
      )}
      {secondaryFiltersEditEnabled && (
        <FullLayerModal
          onClose={disableSecondaryFiltersEdit}
          full={'vertical'}
          position={'right'}
        >
          <Form
            value={filteringEntity}
            fields={toFormFieldConfigs(fields, {
              enableAllForce: true,
              filterSecondaryFilterable: true,
            })}
            onChange={changeFilteringEntity}
          />
        </FullLayerModal>
      )}
      <GrommetBox fill pad={'small'} justify={'between'}>
        <GrommetBox gap={'small'}>
          <GrommetForm value={filteringEntity} onChange={changeFilteringEntity}>
            <GrommetBox
              direction={'row'}
              align={'end'}
              justify={'end'}
              gap={'small'}
            >
              {toFormFieldConfigs(fields, {
                filterPrimaryFilterable: true,
                enableAllForce: true,
              }).map((field, key) => (
                <FormField
                  htmlFor={field.name}
                  key={key}
                  margin={'none'}
                  {...field}
                >
                  <InputFactory {...field} />
                </FormField>
              ))}
              <Box>
                <GrommetButton
                  label="More filters"
                  size={'large'}
                  onClick={enableSecondaryFiltersEdit}
                  primary
                />
              </Box>
              <Box>
                <GrommetButton
                  label="Filter"
                  size={'large'}
                  type="submit"
                  primary
                  onClick={() => {
                    const fieldsNames = Object.keys(filteringEntity);
                    const res = fieldsNames.flatMap((key, index) => {
                      const condition = [key, 'co', filteringEntity[key]];
                      return index + 1 === fieldsNames.length
                        ? [condition]
                        : [condition, 'AND'];
                    });

                    actionGet({ filter: res }, 'merge');
                  }}
                  // TODO: Disabled, not working because input not controlled.
                  // disabled={filteringEntityIsDirty}
                />
              </Box>
              <Box>
                <GrommetButton
                  label="Reset filters"
                  size={'large'}
                  type="reset"
                  // TODO: Disabled.
                  // disabled={filteringEntityIsDirty}
                  onClick={() => {
                    resetFilteringEntity();
                    actionGet({ filter: [] }, 'merge');
                  }}
                />
              </Box>
            </GrommetBox>
          </GrommetForm>
          <GrommetBox direction={'row'} justify={'end'} gap={'small'}>
            <GrommetBox>
              <CreateButton
                {...interfaceConfig.createButton}
                onClick={
                  // TODO: Normal start entity.
                  () => enableCreating({})
                }
              />
            </GrommetBox>
            <GrommetBox>
              <UpdateButton
                {...interfaceConfig.updateButton}
                disabled={selectedKeys.length !== 1}
                onClick={() =>
                  enableUpdating(
                    getResult.items.find(
                      (item: any) =>
                        item[modelMetadata.primary_key.name] === selectedKeys[0]
                    )
                  )
                }
              />
            </GrommetBox>
            <GrommetBox>
              <DeleteButton
                {...interfaceConfig.deleteButton}
                badge={selectedKeys.length > 0 && selectedKeys.length}
                disabled={selectedKeys.length < 1}
                onClick={() =>
                  selectedKeys.map((deletableKey) => {
                    // TODO: Use batchUpdate, after remake on server.
                    actionDelete(deletableKey).then(() =>
                      setSelectedKeys(
                        selectedKeys.filter((key) => key !== deletableKey)
                      )
                    );
                  })
                }
              />
            </GrommetBox>
          </GrommetBox>
          <GrommetBox overflow="auto">
            <DataTable
              select={selectedKeys}
              onSelect={(selectedKeys) => setSelectedKeys(selectedKeys)}
              onClickRow={'select'}
              fields={toDataTableFieldConfigs(fields)}
              entities={getResult.items}
            />
          </GrommetBox>
        </GrommetBox>
        <GrommetBox justify={'between'} direction={'row'}>
          <GrommetBox>Total: {getResult.total_count}</GrommetBox>
          <GrommetPagination
            onChange={({ page }: { page: number }): void => {
              setSelectedKeys([]);
              actionGet({ pagination: { page: page } }, 'deepMerge');
            }}
            page={getResult.current_page}
            step={getResult.per_page}
            numberItems={getResult.total_count}
          />
        </GrommetBox>
      </GrommetBox>
    </>
  );
}
