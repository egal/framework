export default interface TableColumnType {
  header: string;
  type: 'number' | 'string';
  viewWidget?: any;
  editWidget?: any;
  editable: boolean;
  modelFieldPath: string;
}
