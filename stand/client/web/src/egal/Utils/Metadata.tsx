export type Action = any;
export type Field = {
  name: string;
  type: string;
  fillable: boolean;
  guarded: boolean;
  hidden: boolean;
};
export type FakeField = any;
export type Relation = any;

export type Model = {
  primary_key: Field;
  actions: Action[];
  fields: Field[];
  fake_fields: FakeField[];
  relations: Relation[];
};
