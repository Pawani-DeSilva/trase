import BaseMarkup from 'html/base.ejs';
import FeedbackMarkup from 'html/includes/_feedback.ejs';

import React, { StrictMode } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { Provider } from 'react-redux';
import NotSupportedOnMobile from 'react-components/mobile/not-supported.component';
import TopNav from 'react-components/nav/top-nav/top-nav.container';

import 'styles/not-supported.scss';

export const mount = (root, store) => {
  root.innerHTML = BaseMarkup({
    feedback: FeedbackMarkup()
  });

  render(
    <StrictMode>
      <Provider store={store}>
        <TopNav />
      </Provider>
    </StrictMode>,
    document.getElementById('nav')
  );

  render(<NotSupportedOnMobile />, document.getElementById('page-react-root'));
};

export const unmount = () => {
  unmountComponentAtNode(document.getElementById('page-react-root'));
  unmountComponentAtNode(document.getElementById('nav'));
};
