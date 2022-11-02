import * as React from 'react';
import { Pagination as GrommetPagination } from 'grommet/components/Pagination';
import { useResourceContext } from './Resource';
import { useEffect } from 'react';
import { Box as GrommetBox } from 'grommet/components/Box';
import { Spinner } from 'grommet';

type Props = {
  defaultPerPage?: number;
  totalMessage?: string;
};

export function Pagination({
  defaultPerPage = 10,
  totalMessage = 'Total',
}: Props) {
  const { resource, selectedKeys, extensions } = useResourceContext();

  useEffect(() => {
    extensions.pagination.makeExists();
    resource.getItems.mergeParams({
      pagination: {
        per_page: defaultPerPage,
        page: 1,
      },
    });
    extensions.pagination.makeReady();
  }, []);

  // TODO: Find a better way.
  if (!resource.getItems.result) {
    return <Spinner />;
  }

  const isNeedPaginationElement =
    resource.getItems.result.total_count > resource.getItems.result.per_page;

  return (
    <GrommetBox justify={'between'} direction={'row'} align={'center'}>
      <GrommetBox>
        {totalMessage}: {resource.getItems.result.total_count}
      </GrommetBox>
      {isNeedPaginationElement && (
        <GrommetPagination
          onChange={({ page }: { page: number }): void => {
            selectedKeys.reset();
            if (resource.getItems.params.pagination?.page !== page) {
              resource.getItems.deepMergeParams({ pagination: { page: page } });
            }
          }}
          page={resource.getItems.result.current_page}
          step={resource.getItems.result.per_page}
          numberItems={resource.getItems.result.total_count}
        />
      )}
    </GrommetBox>
  );
}
