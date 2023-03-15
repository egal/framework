export type Scope = {
  name: string;
  parameters?: [];
};

export type Scopes = Scope[];

export type Operator =
  | '<'
  | '<='
  | '>'
  | '>='
  | '='
  | '!='
  | 'like'
  | 'not like'
  | 'ilike'
  | 'not ilike'
  | 'in'
  | 'not in'
  | 'all in'
  | 'any in';

type BaseFilter = {
  type?: 'and' | 'or';
};

type LogicalFilter = BaseFilter & {
  field: string;
  operator: Operator;
  value: any;
};

type ConditionalFilter = BaseFilter & {
  nested: Filters;
};

export type Filter = LogicalFilter | ConditionalFilter;

export type Filters = Filter[];

export type Search = {
  [key: string]: any;
};

export type SortCondition = {
  field: string;
  direction: 'asc' | 'desc';
};

export type Sort = SortCondition[];

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

export type SearchQuery = {
  limit?: number;
  page?: number;
};

export type SearchBody = {
  scopes?: Scopes;
  filters?: Filters;
  search?: Search;
  sort?: Sort;
  aggregates?: Aggregates;
  includes?: Includes;
};
