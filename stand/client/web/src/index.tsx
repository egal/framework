import ReactDOM from 'react-dom/client';
import './index.css';
import logo from './assets/logo.svg';
import { App, Layout, DataTableResource, NotFound, useResource, ActionGetItemsParams } from '@egalteam/framework';
import { Meter as GrommetMeter } from 'grommet';
import { grommet as grommetTheme } from 'grommet/themes';
import { deepMerge } from 'grommet/utils';
import React from 'react';

function TestComponent() {
  const { getResult, actionGet, getParams } = useResource<any, any, ActionGetItemsParams>({
    serviceName: 'auth',
    modelName: 'Employee',
    initGetParams: {
      pagination: {
        per_page: 10,
        page: 1
      }
    }
  });

  return (
    <h1>
      Render!
      <button
        onClick={() => {
          console.log(getResult);
        }}>
        Show
      </button>
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
          console.log(getResult);
        }}>
        Click me
      </button>
    </h1>
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
      { header: 'Home', path: '/', element: <h1>Home page</h1> },
      { header: 'Test', path: '/test', element: <TestComponent /> },
      {
        header: 'Home',
        items: [
          { header: 'Home', path: '/', element: <h1>Home page</h1> },
          { header: 'Home', path: '/', element: <h1>Home page</h1> },
          {
            header: 'Home',
            items: [
              { header: 'Home', path: '/', element: <h1>Home page</h1> },
              { header: 'Home', path: '/', element: <h1>Home page</h1> }
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
              { name: 'id', header: 'ID', filter: { primary: true } },
              { name: 'address', header: 'Address', filter: true },
              { name: 'adult', header: 'Adult', renderType: 'toggle' },
              { name: 'phone', header: 'Phone' },
              {
                name: 'weight',
                header: 'Weight',
                renderDataTable: (item) => (
                  <GrommetMeter values={[{ value: item.weight }]} thickness="small" size="small" />
                )
              },
              { name: 'created_at', header: 'Created at' },
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
