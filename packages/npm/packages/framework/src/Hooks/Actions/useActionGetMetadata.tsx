import { ActionHook, ActionModel, useAction } from './useAction';
import { useEffect } from 'react';

type Action = any;

type Field = {
  name: string;
  type: string;
  required: boolean;
  guarded: boolean;
  hidden: boolean;
};

type Relation = {
  name: string;
  guarded: boolean;
  related: Model;
  type: 'belongs_to' | string;
};

type Model = {
  primary_key: Field;
  actions: Action[];
  fields: Field[];
  fake_fields: Field[];
  relations: Relation[];
};

type Result = Model;

type Params = {};

export type ActionGetMetadataHook = Omit<ActionHook<Result, Params>, 'call'> & {
  getAllFields: () => Field[];
  findField: (name: string) => Field;
};

export function useActionGetMetadata(
  model: ActionModel
): ActionGetMetadataHook {
  const { result, error, call } = useAction<Result, Params>(
    model,
    'getMetadata'
  );

  useEffect(() => {
    call({});
  }, []);

  const getAllFields = () => {
    if (result === undefined) throw new Error('#1666682378');

    return [result.primary_key, ...result.fields, ...result.fake_fields];
  };

  const findField = (name: string): Field => {
    const field = getAllFields().find((field) => field.name === name);

    if (field === undefined)
      throw new Error(`Undefined '${name}' field! #1666682378`);

    return field;
  };

  return { result, error, findField, getAllFields };
}

export type ServerModelActionMetadata = Action;
export type ServerModelFieldMetadata = Field;
export type ServerModelRelationMetadata = Relation;
export type ServerModelMetadata = Model;
