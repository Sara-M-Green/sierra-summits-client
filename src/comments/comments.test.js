import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import Comments from './comments';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <Comments />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});