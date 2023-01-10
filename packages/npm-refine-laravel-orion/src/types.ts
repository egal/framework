export type Scope = {
  name: string;
  parameters?: [];
};

export type Scopes = Scope[];

export type Filter = {
  type?: 'and' | 'or';
  field: string;
  operator: string;
  value: any;
};

export type Filters = Filter[];

export type Search = {
  [key: string]: any;
};

export type Sort = {
  field: string;
  direction: 'asc' | 'desc';
}[];

export type Aggregate = {
  relation: string;
  type: string;
  filters?: Filters;
};

export type Aggregates = Aggregate[];

export type Include = {
  relation: string;
  filters?: Filters;
};

export type Includes = Include[];

export type SearchBody = {
  scopes?: Scopes;
  filters?: Filters;
  search?: Search;
  sort?: Sort;
  aggregates?: Aggregates;
  includes?: Includes;
};
