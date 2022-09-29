import * as React from 'react';
import { ActionGetItemsParams } from '../../../DataProvider';
import {
  Box as GrommetBox,
  Button as GrommetButton,
  CheckBox as GrommetCheckBox,
  Heading,
  Heading as GrommetHeading,
  Layer as GrommetLayer,
  Pagination as GrommetPagination,
  Paragraph as GrommetParagraph,
  Spinner as GrommetSpinner,
} from 'grommet';

import { Filter as GrommetFilterIcon } from 'grommet-icons/icons';
import {
  FullBoxLoader,
  FullLayerModal,
  InputConfig,
  SomethingWentWrongFullLayerError,
} from '../../../Widgets';
import { FormWidget } from '../../../Widgets/Form/FormWidget';
import { useResource } from '../../../Hooks';
import { DataTable, FieldConfig } from '../../../Widgets/DataTable';
import { useEntityManipulate } from '../../../Hooks/useEntityManipulate';
import { DataTableResourceConfig, DataTableResourceFieldConfig } from './Types';
import { useFieldsConvertor } from './Hooks';
import { useEffect, useState } from 'react';
import { useRelay } from '../../../Hooks/useRelay';

export function DataTableResource({
  serviceName,
  modelName,
  perPage,
  fields = [],
  keyFieldName,
}: DataTableResourceConfig) {
  const [
    creatingEnabled,
    creatingEntity,
    enableCreating,
    disableCreating,
    changeCreatingEntity,
    resetCreatingEntity,
  ] = useEntityManipulate();

  const [
    updatingEnabled,
    updatingEntity,
    enableUpdating,
    disableUpdating,
    changeUpdatingEntity,
    resetUpdatingEntity,
  ] = useEntityManipulate();

  const [
    filteringEnabled,
    filteringEntity,
    enableFiltering,
    disableFiltering,
    changeFilteringEntity,
    resetFilteringEntity,
  ] = useEntityManipulate();

  const [
    secondaryFiltersEditEnabled,
    enableSecondaryFiltersEdit,
    disableSecondaryFiltersEdit,
  ] = useRelay();

  const [
    getResult,
    getParams,
    error,
    actionGet,
    actionCreate,
    actionUpdate,
    actionDelete,
    actionGetMetadata,
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
  }, []);

  // TODO: Crutch, may be.
  if (error !== undefined && error.code === 'ERR_UNDEFINED') {
    return <SomethingWentWrongFullLayerError />;
  }

  // TODO: Crutch. DataTable placeholder prop or use Suspense.
  if (getResult === undefined || modelMetadata === undefined) {
    return <FullBoxLoader />;
  }

  const [toInputConfigs, toDataTableFieldConfig] = useFieldsConvertor(
    modelMetadata,
    fieldMetadata
  );

  return (
    <>
      {creatingEnabled && (
        <FullLayerModal onClose={disableCreating}>
          <FormWidget
            entity={creatingEntity}
            fields={toInputConfigs(fields, { excludeGuarded: true })}
            onChange={changeCreatingEntity}
            resettable
            onReset={resetCreatingEntity}
            submittable
            onSubmit={() => actionCreate(creatingEntity).then(disableCreating)}
          />
        </FullLayerModal>
      )}
      {updatingEnabled && (
        <FullLayerModal onClose={disableUpdating}>
          <FormWidget
            entity={updatingEntity}
            fields={toInputConfigs(fields)}
            onChange={changeUpdatingEntity}
            resettable
            onReset={resetUpdatingEntity}
            submittable
            onSubmit={() =>
              actionUpdate(creatingEntity[keyFieldName], creatingEntity).then(
                disableUpdating()
              )
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
          <FormWidget
            entity={filteringEntity}
            fields={toInputConfigs(fields, {
              enableAllForce: true,
              filterSecondaryFilterable: true,
            })}
            onChange={changeFilteringEntity}
          />
        </FullLayerModal>
      )}
      <GrommetBox
        pad={'small'}
        height={'100%'}
        width={'100%'}
        justify={'between'}
        gap={'small'}
      >
        <GrommetBox width={'100%'} direction={'row'} justify={'between'}>
          <GrommetBox direction={'row'}>
            <GrommetButton
              icon={<GrommetFilterIcon />}
              onClick={enableSecondaryFiltersEdit}
            />
            <FormWidget
              submittable
              onSubmit={() => {
                const fieldsNames = Object.keys(filteringEntity);
                const res = fieldsNames.flatMap((key, index) => {
                  const condition = [key, 'co', filteringEntity[key]];
                  return index + 1 === fieldsNames.length
                    ? [condition]
                    : [condition, 'AND'];
                });

                actionGet({ filter: res }, 'deepMerge');
              }}
              resettable
              onReset={() => {
                resetFilteringEntity();
                actionGet();
              }}
              entity={filteringEntity}
              fields={toInputConfigs(fields, {
                enableAllForce: true,
                filterPrimaryFilterable: true,
              })}
              onChange={changeFilteringEntity}
              formBoxProps={{
                direction: 'row',
                gap: 'small',
              }}
              formFieldsBoxProps={{
                direction: 'row',
                gap: 'small',
              }}
              buttonsBoxProps={{
                direction: 'row',
                gap: 'small',
              }}
            />
          </GrommetBox>
        </GrommetBox>
        <GrommetBox width={'100%'} direction={'row'} justify={'between'}>
          {/* TODO: Actions. */}
          <>More Actions to be here...</>
          <GrommetButton
            label={'Create'}
            onClick={
              // TODO: Normal start entity.
              () => enableCreating({})
            }
          />
        </GrommetBox>
        <GrommetBox height={'100%'} width={'100%'} overflow="auto">
          <DataTable
            fields={toDataTableFieldConfig(fields)}
            entities={getResult.items}
          />
        </GrommetBox>
        <GrommetBox justify={'between'} direction={'row'}>
          <GrommetBox />
          <GrommetPagination
            onChange={({ page }: { page: number }): void => {
              actionGet({ pagination: { page: page } }, 'deepMerge');
            }}
            page={getResult.current_page}
            step={getResult.per_page}
            numberItems={getResult.total_count}
          />
          <GrommetBox>Total: {getResult.total_count}</GrommetBox>
        </GrommetBox>
      </GrommetBox>
    </>
  );
}
