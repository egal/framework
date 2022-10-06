import { useState } from 'react';

export function useEntityManipulate<EntityType = any>(): [
  boolean,
  EntityType | undefined, // TODO: Undefined if first is false.
  (entity: EntityType) => void,
  () => void,
  (newEntity: EntityType) => void,
  () => void,
  boolean
] {
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
    console.log(entityIsDirty);
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

  return [
    enabled,
    entity,
    enable,
    disable,
    changeEntity,
    resetEntity,
    entityIsDirty,
  ];
}