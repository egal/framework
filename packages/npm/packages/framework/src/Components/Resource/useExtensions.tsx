import { useEffect, useState } from 'react';

type Extension = {
  exists: boolean;
  ready: boolean;
  makeExists: () => void;
  makeReady: () => void;
};

function useExtension(): Extension {
  const [exists, setExists] = useState(false);
  const [ready, setReady] = useState(false);

  const makeExists = () => setExists(true);
  const makeReady = () => setReady(true);

  return {
    exists,
    ready,
    makeExists,
    makeReady,
  };
}

export type Extensions = {
  showing: Extension;
  creating: Extension;
  updating: Extension;
  deleting: Extension;
  pagination: Extension;
  ready: boolean;
};

export function useExtensions(): Extensions {
  const pagination = useExtension();
  const showing = useExtension();
  const creating = useExtension();
  const updating = useExtension();
  const deleting = useExtension();

  const [ready, setReady] = useState(false);

  useEffect(() => {
    const check = (extension: Extension) =>
      !extension.exists || (extension.exists && extension.ready);

    if (
      check(pagination) &&
      check(showing) &&
      check(creating) &&
      check(updating) &&
      check(deleting)
    ) {
      setReady(true);
    }
  }, [pagination, showing, creating, updating, deleting]);

  return {
    showing,
    creating,
    updating,
    deleting,
    pagination,
    ready,
  };
}
