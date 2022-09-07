import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import logo from './assets/logo.svg';
import Menu from './egal/Components/Navigate/Menu';
import MenuItemLink from './egal/Components/Navigate/MenuItemLink';
import MenuItemGroup from './egal/Components/Navigate/MenuItemGroup';
import { BrowserRouter } from 'react-router-dom';
import App from './egal/Components/App';
import Layout from './egal/Components/Layout';
import Table from './egal/Components/Table';
import NotFound from './egal/Components/NotFound';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <div className="App">
        <App
          layout={Layout}
          menu={
            <Menu logotype={logo}>
              <MenuItemLink header={'Home'} path={'/'}>
                <h1>Home page</h1>
              </MenuItemLink>
              <MenuItemLink header={'Users'} path={'/first'}>
                <Table
                  header={'Users table header'}
                  modelName={'users'}
                  columns={[
                    { header: 'ID', modelFieldPath: 'id', type: 'number', editable: false },
                    {
                      header: 'First name',
                      modelFieldPath: 'first_name',
                      type: 'string',
                      editable: false
                    },
                    { header: 'Email', modelFieldPath: 'email', type: 'string', editable: false },
                    { header: 'Age', modelFieldPath: 'age', type: 'number', editable: false }
                  ]}
                />
              </MenuItemLink>
              <MenuItemLink header={'Second'} path={'/second'}>
                <h1>Second page</h1>
              </MenuItemLink>
              <MenuItemGroup header={'Third'}>
                <MenuItemLink header={'1'} path={'/1'}>
                  <h1>1 page</h1>
                </MenuItemLink>
                <MenuItemLink header={'2'} path={'/2'}>
                  <h1>2 page</h1>
                </MenuItemLink>
              </MenuItemGroup>
              <MenuItemLink header={'Fourth'} path={'/fourth'}>
                <h1>Fourth page</h1>
              </MenuItemLink>
            </Menu>
          }
          additionalRoutes={[
            { path: '*', element: <NotFound /> },
            { path: '/custom', element: <h1>Custom route!</h1> }
          ]}
        />
      </div>
    </BrowserRouter>
  </React.StrictMode>
);
