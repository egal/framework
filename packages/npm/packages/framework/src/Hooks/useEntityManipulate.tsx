import { useState } from 'react';

export type EntityManipulate<EntityType> = {
  enabled: boolean;
  entity: EntityType | undefined; // TODO: Undefined if first is false.
  enable: (entity: EntityType) => void;
  disable: () => void;
  changeEntity: (newEntity: EntityType) => void;
  resetEntity: () => void;
  entityIsDirty: boolean;
};

export function useEntityManipulate<EntityType = any>(): EntityManipulate<EntityType> {
  const [enabled, setEnabled] = useState<boolean>(false);
  const [entity, setEntity] = useState<EntityType>();
  const [originalEntity, setOriginalEntity] = useState<EntityType>();
  const [entityIsDirty, setEntityIsDirty] = useState(true);

  const enable = (entity: EntityType) => {
    if (enabled) {
      throw new Error(
        'Entity manipulate enable impossible, is already enabled!'
      );
    }

    setOriginalEntity(entity);
    setEntity(entity);
    setEnabled(true);
  };

  const changeEntity = (newEntity: EntityType) => {
    if (!enabled) {
      throw new Error(
        'Change entity impossible, manipulate entity not enabled!'
      );
    }

    setEntity(newEntity);
    setEntityIsDirty(entity !== originalEntity);
  };

  const disable = () => {
    if (!enabled) {
      throw new Error(
        'Entity manipulate disable impossible, is already disabled!'
      );
    }

    setOriginalEntity(undefined);
    setEntity(undefined);
    setEnabled(false);
  };

  const resetEntity = () => {
    if (!enabled) {
      throw new Error(
        'Reset entity impossible, manipulate entity not enabled!'
      );
    }

    setEntity(originalEntity);
    setEntityIsDirty(false);
  };

  return {
    enabled,
    entity,
    enable,
    disable,
    changeEntity,
    resetEntity,
    entityIsDirty,
  };
}
