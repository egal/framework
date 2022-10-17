import { ActionHook, ActionModel, useAction } from './useAction';
import { useEffect } from 'react';

type ActionMetadata = any;

type FieldMetadata = {
  name: string;
  type: string;
  guarded: boolean;
  hidden: boolean;
};

type FakeFieldMetadata = any;

type RelationMetadata = {
  name: string;
  guarded: boolean;
  related: ModelMetadata;
  type: 'belongs_to' | string;
};

type ModelMetadata = {
  primary_key: FieldMetadata;
  actions: ActionMetadata[];
  fields: FieldMetadata[];
  fake_fields: FakeFieldMetadata[];
  relations: RelationMetadata[];
};

type Result = ModelMetadata;

type Params = {};

export type ActionGetMetadataHook = Omit<ActionHook<Result, Params>, 'call'>;

export function useActionGetMetadata(model: ActionModel): ActionGetMetadataHook {
  const { result, error, call } = useAction<Result, Params>(
    model,
    'getMetadata'
  );

  useEffect(() => {
    call({});
  }, []);

  return { result, error };
}
