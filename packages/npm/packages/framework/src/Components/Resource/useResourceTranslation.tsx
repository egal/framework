import { useTranslation } from 'react-i18next';
import { ActionModel } from '../../Hooks';
import { TOptions } from 'i18next';

export type ResourceTranslation = {
  t: (key: string, options?: TOptions) => string;
};

export function useResourceTranslation({
  name: model,
  service,
}: ActionModel): ResourceTranslation {
  const { t: tModels } = useTranslation('models', { useSuspense: false });
  const { t: tResource } = useTranslation('resource', { useSuspense: false });

  const t = (key: string, options: TOptions = {}) => {
    const tModelsKey = `${service}.${model}.resource.${key}`;
    let label = tModels(tModelsKey, { ...options, defaultValue: undefined });
    if (label === tModelsKey) console.log(key);
    if (label === tModelsKey) label = tResource(key, options);

    return label;
  };

  return {
    t,
  };
}
