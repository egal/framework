import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import logo from './assets/logo.svg';
import Menu from './egal/Components/Navigate/Menu';
import MenuItemLink from './egal/Components/Navigate/MenuItemLink';
import MenuItemGroup from './egal/Components/Navigate/MenuItemGroup';
import { BrowserRouter as Router, Routes } from 'react-router-dom';
import App from './egal/Components/App';
import Layout from './egal/Components/Layout';
import Table from './egal/Components/Table';
import NotFound from './egal/Components/NotFound';
import {
  Box as GrommetBox,
  DataTable as GrommetDataTable,
  Grommet as Grommet,
  Meter as GrommetMeter,
  Text as GrommetText
} from 'grommet';
import { DataTable } from './egal/Components/DataTable';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Grommet>
      <Router>
        <div className="App">
          <App
            layout={Layout}
            menu={
              <Menu logotype={logo}>
                <MenuItemLink header={'Home'} path={'/'} element={<h1>Home page</h1>} />
                <MenuItemLink header={'Users'} path={'/first'} element={<h1>HAGSdgfahsd</h1>} />
                <MenuItemLink
                  header={'Users on Grommet'}
                  path={'/users-grommet'}
                  element={
                    <DataTable
                      serviceName={'auth'}
                      modelName={'Employee'}
                      columns={[
                        { property: 'address', header: 'Address', primary: true },
                        { property: 'adult', header: 'Adult', primary: true },
                        { property: 'phone', header: 'Phone', primary: true },
                        { property: 'weight', header: 'Weight', primary: true },
                        {
                          property: 'percent',
                          header: 'Complete',
                          render: (datum) => (
                            <GrommetBox pad={{ vertical: 'xsmall' }}>
                              <GrommetMeter values={[{ value: datum.weight }]} thickness="small" size="small" />
                            </GrommetBox>
                          )
                        }
                      ]}
                    />
                  }
                />
                <MenuItemLink header={'Second'} path={'/second'} element={<h1>Second page</h1>} />
                <MenuItemGroup header={'Third'}>
                  <MenuItemLink header={'1'} path={'/1'} element={<h1>1 page</h1>} />
                  <MenuItemLink header={'2'} path={'/2'} element={<h1>2 page</h1>} />
                </MenuItemGroup>
                <MenuItemLink header={'Fourth'} path={'/fourth'} element={<h1>Fourth page</h1>} />
              </Menu>
            }
            additionalRoutes={[
              { path: '*', element: <NotFound /> },
              { path: '/custom', element: <h1>Custom route!</h1> }
            ]}
          />
        </div>
      </Router>
    </Grommet>
  </React.StrictMode>
);
