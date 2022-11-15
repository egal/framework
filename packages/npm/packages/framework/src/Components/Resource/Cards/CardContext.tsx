import React from 'react';

export type CardContextType<ItemType> = {
  item: ItemType;
  selected: boolean;
  changeSelecting: () => void;
};

export const CardContext = React.createContext<
  CardContextType<any> | undefined
>(undefined);
