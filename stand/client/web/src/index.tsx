import ReactDOM from 'react-dom/client';
import './index.css';
import logo from './assets/logo.svg';
import {
  App,
  Layout,
  DataTableResource,
  NotFoundFullLayerError as NotFound,
  useResource,
  ActionGetItemsParams
} from '@egalteam/framework';
import { Heading, Meter as GrommetMeter } from 'grommet';
import { grommet as grommetTheme } from 'grommet/themes';
import { deepMerge } from 'grommet/utils';
import React from 'react';

function TestComponent() {
  const [
    getResult,
    getParams,
    error,
    actionGet,
    actionCreate,
    actionUpdate,
    actionDelete,
    actionGetMetadata,
    metadata,
    fieldMetadata
  ] = useResource<any, any, ActionGetItemsParams>('auth', 'Employee', {
    pagination: {
      per_page: 10,
      page: 1
    }
  });

  return (
    <>
      <p>{JSON.stringify(getResult)}</p>
      <button
        onClick={() => {
          if (!getParams.pagination?.page) {
            throw new Error();
          }

          actionGet(
            {
              pagination: {
                page: getParams.pagination?.page + 1
              }
            },
            'deepMerge'
          );
        }}>
        NextPage
      </button>
      <button onClick={() => actionGet()}>Reload</button>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <App
    mobileResolutionSupport={false}
    layout={<Layout logotype={logo} />}
    theme={deepMerge(grommetTheme, {
      table: {
        footer: {
          background: {
            color: 'background-back'
          }
        }
      },
      dataTable: {
        pinned: {
          header: {
            background: {
              opacity: '0.9',
              color: 'background-front'
            }
          }
        }
      }
    })}
    menu={[
      { header: 'Home', path: '/', element: <Heading>Home page</Heading> },
      { header: 'Test', path: '/test', element: <TestComponent /> },
      {
        header: 'Home',
        items: [
          { header: 'Home', path: '/', element: <Heading>Home page</Heading> },
          { header: 'Home', path: '/', element: <Heading>Home page</Heading> },
          {
            header: 'Home',
            items: [
              { header: 'Home', path: '/', element: <Heading>Home page</Heading> },
              { header: 'Home', path: '/', element: <Heading>Home page</Heading> }
            ]
          }
        ]
      },
      {
        header: 'Employees',
        path: '/employees',
        element: (
          <DataTableResource
            serviceName={'auth'}
            modelName={'Employee'}
            keyFieldName={'id'}
            perPage={10}
            fields={[
              { name: 'id', header: 'ID' },
              { name: 'address', header: 'Address', filter: true },
              { name: 'adult', header: 'Adult', renderType: 'toggle', filter: { secondary: true } },
              { name: 'phone', header: 'Phone' },
              {
                name: 'weight',
                header: 'Weight',
                renderDataTable: (item) => (
                  <GrommetMeter values={[{ value: item.weight }]} thickness="small" size="small" />
                )
              },
              { name: 'created_at', header: 'Created at', filter: { primary: true } },
              { name: 'updated_at', header: 'Updated at' }
            ]}
          />
        )
      }
    ]}
    additionalRoutes={[
      { path: '*', element: <NotFound /> },
      { path: '/custom', element: <h1>Custom route!</h1> }
    ]}
  />
);
