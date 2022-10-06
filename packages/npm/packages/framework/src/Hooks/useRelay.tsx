import { useState } from 'react';

export function useRelay(): [boolean, () => void, () => void] {
  const [enabled, setEnabled] = useState<boolean>(false);

  const enable = (): void => setEnabled(true);
  const disable = (): void => setEnabled(false);

  return [enabled, enable, disable];
}
