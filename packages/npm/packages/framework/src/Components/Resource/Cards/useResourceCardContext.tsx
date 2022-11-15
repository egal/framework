import * as React from 'react';
import { useContext } from 'react';
import { CardContext, CardContextType } from './CardContext';

export function useResourceCardContext<ItemType>(): CardContextType<ItemType> {
  const context = useContext(CardContext);

  if (context === undefined) throw new Error('#1668488260');

  return context;
}
