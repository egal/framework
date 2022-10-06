export type Action = any;

export type ServerFieldMetadata = {
  name: string;
  type: string;
  guarded: boolean;
  hidden: boolean;
};

export type FakeField = any;

export type Relation = any;

export type ServerModelMetadata = {
  primary_key: ServerFieldMetadata;
  actions: Action[];
  fields: ServerFieldMetadata[];
  fake_fields: FakeField[];
  relations: Relation[];
};