import React, { createContext, useContext } from 'react';
import { ButtonProps } from 'grommet/components/Button';
import { AuthContext } from '../Auth';
import { CheckBox, Text } from 'grommet';

export type DataTableResourceInterfaceConfig = {
  createButton: ButtonProps;
  updateButton: Omit<ButtonProps, 'disabled'>;
  deleteButton: Omit<ButtonProps, 'badge' & 'disabled'>;
};

type RenderType = 'default' | 'boolean' | 'toggle' | 'checkbox';

export type InterfaceConfig = {
  dataTableResource: DataTableResourceInterfaceConfig;
  view: {
    [key in RenderType | string]: (value: any) => React.ReactElement;
  };
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
  view: {
    default: (value) => <Text>{value as string}</Text>,
    boolean: (value) => <CheckBox checked={value as boolean} />,
    checkbox: (value) => <CheckBox checked={value as boolean} />,
    toggle: (value) => <CheckBox checked={value as boolean} toggle />,
  },
};

export const InterfaceConfigContext =
  createContext<InterfaceConfig>(interfaceConfig);

export function useInterfaceConfigContext() {
  return useContext(InterfaceConfigContext);
}
