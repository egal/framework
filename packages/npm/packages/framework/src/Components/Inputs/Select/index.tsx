import React, { useEffect, useState } from 'react';
import { Select as GrommetSelect, SelectProps } from 'grommet';
import { ActionModel, useActionGetItems } from '../../../Hooks';
import type { Params } from '../../../Hooks';

type Props = Omit<SelectProps, 'options'> & {
  model: ActionModel;
  actionGetItemsInitParams?: Params;
};

const Select: React.FC<Props> = ({
  actionGetItemsInitParams = {},
  model,
  ...props
}) => {
  const actionGetItems = useActionGetItems(model, actionGetItemsInitParams);
  const [data, setData] = useState([]);

  useEffect(() => {
    actionGetItems.call().then((response: any) => {
      setData(response.items);
    });
  }, []);

  return <GrommetSelect options={data} {...props} />;
};

export { Select };
