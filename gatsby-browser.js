import React from 'react';
import Layout from './src/components/layout';
import './styles/index.css';

// Wraps every page in a component
export const wrapPageElement = ({ element, props }) => {
  return <Layout {...props}>{element}</Layout>;
};

export const onInitialClientRender = () => {
  console.log('INITIAL CLIENT RENDER');
};
