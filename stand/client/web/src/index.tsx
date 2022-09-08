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

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <>
    <Router>
      <div className="App">
        <App
          layout={Layout}
          menu={
            <Menu logotype={logo}>
              <MenuItemLink header={'Home'} path={'/'} element={<h1>Home page</h1>} />
              <MenuItemLink
                header={'Users'}
                path={'/first'}
                element={
                  <Table
                    header={'Users table header'}
                    serviceName={'auth'}
                    modelName={'Employee'}
                    columns={[
                      { header: 'ID', field: 'id', type: 'string', editable: false },
                      { header: 'Address', field: 'address', type: 'string', editable: false },
                      { header: 'Adult', field: 'adult', type: 'string', editable: false },
                      { header: 'Phone', field: 'phone', type: 'number', editable: false },
                      { header: 'Weight', field: 'weight', type: 'number', editable: false }
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
  </>
);
