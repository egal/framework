import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import logo from './assets/logo.svg';
import App from './egal/Components/App';
import Layout from './egal/Components/Layout';
import NotFound from './egal/Components/NotFound';
import { Meter as GrommetMeter } from 'grommet';
import { DataTable } from './egal/Components/DataTable';

import { grommet as grommetTheme } from 'grommet/themes';
import { deepMerge } from 'grommet/utils';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <App
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
    layout={Layout}
    menu={{
      logotype: logo,
      items: [
        { header: 'Home', path: '/', element: <h1>Home page</h1> },
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
            <DataTable
              serviceName={'auth'}
              modelName={'Employee'}
              primaryKey={'id'}
              perPage={10}
              columns={[
                { property: 'id', header: 'ID', primary: true },
                { property: 'address', header: 'Address' },
                { property: 'adult', header: 'Adult' },
                { property: 'phone', header: 'Phone' },
                {
                  property: 'weight',
                  header: 'Weight',
                  render: (item) => <GrommetMeter values={[{ value: item.weight }]} thickness="small" size="small" />
                }
              ]}
            />
          )
        }
      ]
    }}
    additionalRoutes={[
      { path: '*', element: <NotFound /> },
      { path: '/custom', element: <h1>Custom route!</h1> }
    ]}
  />
);
