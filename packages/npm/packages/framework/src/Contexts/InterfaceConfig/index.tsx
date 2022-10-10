import { createContext, useContext } from 'react';
import { ButtonProps } from 'grommet/components/Button';
import { AuthContext } from '../Auth';

export type DataTableResourceInterfaceConfig = {
  createButton: ButtonProps;
  updateButton: Omit<ButtonProps, 'disabled'>;
  deleteButton: Omit<ButtonProps, 'badge' & 'disabled'>;
};

export type InterfaceConfig = {
  dataTableResource: DataTableResourceInterfaceConfig;
};

export const interfaceConfig: InterfaceConfig = {
  dataTableResource: {
    createButton: {
      size: 'large',
      label: 'Create',
      color: 'status-ok',
      primary: true,
    },
    updateButton: {
      size: 'large',
      label: 'Update',
      color: 'status-warning',
      primary: true,
    },
    deleteButton: {
      size: 'large',
      label: 'Delete',
      color: 'status-error',
      primary: true,
    },
  },
};

export const InterfaceConfigContext =
  createContext<InterfaceConfig>(interfaceConfig);

export function useInterfaceConfigContext() {
  return useContext(InterfaceConfigContext);
}
