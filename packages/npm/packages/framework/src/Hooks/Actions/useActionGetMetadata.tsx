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

  const findRelation = (name: string) => {
    if (result === undefined) throw new Error('#1668056490');

    const relation = result.relations.find(
      (relation) => relation.name === name
    );

    if (relation === undefined)
      throw new Error(`Undefined '${name}' relation! #1668056490`);

    return relation;
  };

  const findRelationField = (name: string) => {
    const nameSplit = name.split('.');

    if (nameSplit.length > 2) throw new Error(`#1668056490`);

    const { primary_key, fields, fake_fields } = findRelation(
      nameSplit[0]
    ).related;

    const field = [primary_key, ...fields, ...fake_fields].find(
      (field) => field.name === nameSplit[1]
    );

    if (field === undefined)
      throw new Error(`Undefined '${name}' field! #1668056490`);

    return field;
  };

  const findField = (name: string): Field => {
    if (name.includes('.')) return findRelationField(name);

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
