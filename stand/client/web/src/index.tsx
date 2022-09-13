import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import logo from './assets/logo.svg';
import App from './egal/Components/App';
import Layout from './egal/Components/Layout';
import NotFound from './egal/Components/NotFound';
import {
  Box as GrommetBox,
  DataTable as GrommetDataTable,
  Grommet,
  Meter as GrommetMeter,
  Text as GrommetText
} from 'grommet';
import { DataTable } from './egal/Components/DataTable';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App
      layout={Layout}
      menu={{
        logotype: logo,
        items: [
          { header: 'Home', path: '/', element: <h1>Home page</h1> },
          {
            header: 'Home',
            items: [
              { header: 'Home', path: '/', element: <h1>Home page</h1> },
              { header: 'Home', path: '/', element: <h1>Home page</h1> }
            ]
          },
          {
            header: 'Users',
            path: '/users',
            element: (
              <DataTable
                serviceName={'auth'}
                modelName={'Employee'}
                primaryKey={'id'}
                columns={[
                  { property: 'address', header: 'Address', primary: true },
                  { property: 'adult', header: 'Adult', primary: true },
                  { property: 'phone', header: 'Phone', primary: true },
                  {
                    property: 'weight',
                    header: 'Complete',
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
  </React.StrictMode>
);
