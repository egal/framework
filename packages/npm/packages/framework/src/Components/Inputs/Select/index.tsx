import React, { useEffect, useState } from 'react';
import { Select as GrommetSelect, SelectProps } from 'grommet';
import { ActionModel, useActionGetItems } from '../../../Hooks';
import { ActionGetItemsParams } from '../../../Hooks';
import { FullBoxLoader } from '../../../Widgets';

type Props = Omit<SelectProps, 'options'> & {
  model: ActionModel;
  actionGetItemsInitParams?: ActionGetItemsParams;
};

export function Select<
  ItemType extends string | boolean | number | JSX.Element | object
>({ actionGetItemsInitParams = {}, model, ...props }: Props) {
  const actionGetItems = useActionGetItems<ItemType>(
    model,
    actionGetItemsInitParams
  );

  useEffect(() => {
    actionGetItems.call();
  }, []);

  if (!actionGetItems.result) return <FullBoxLoader />;

  return <GrommetSelect options={actionGetItems.result.items} {...props} />;
}
