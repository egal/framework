import * as React from 'react';
import { useResourceContext } from '../Resource';
import { useEffect, useState } from 'react';
import { CardContext } from './CardContext';
import { Spinner } from 'grommet';

type Props<ItemType> = {
  item: ItemType;
  children: React.ReactNode;
};

export function Card<ItemType>({ children, item }: Props<ItemType>) {
  const {
    selectedKeys: { value: selectedKeys, set: setSelectedKeys },
    resource: {
      metadata: { result: metadata },
    },
  } = useResourceContext();
  const [selected, setSelected] = useState(false);

  if (metadata === undefined) return <Spinner />;

  useEffect(() => {
    const key = item[metadata.primary_key.name];
    setSelected(selectedKeys.includes(key));
  }, []);

  useEffect(() => {
    console.log(selectedKeys);
  }, [selectedKeys]);

  const changeSelecting = () => {
    const key = item[metadata.primary_key.name];

    console.log(selected);
    if (selected) {
      const newSelectedKeys = selectedKeys;
      const index = newSelectedKeys.indexOf(key);
      if (index !== -1) newSelectedKeys.splice(index, 1);
      setSelectedKeys(newSelectedKeys);
      console.log(newSelectedKeys);
    } else {
      const newSelectedKeys = selectedKeys;
      newSelectedKeys.push(key);
      setSelectedKeys(newSelectedKeys);
      console.log(newSelectedKeys);
    }

    // TODO: Remove next line. Because useEffect on 28 line must be updates this value.
    setSelected(!selected);
  };

  return (
    <CardContext.Provider value={{ item, selected, changeSelecting }}>
      {children}
    </CardContext.Provider>
  );
}
