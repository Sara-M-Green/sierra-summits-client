import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import Homepage from './homepage';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <Homepage />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});