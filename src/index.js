import React from 'react';
import { render } from 'react-dom';
import registerServiceWorker from 'registerServiceWorker';

import App from 'app/App.jsx';

render(<App />, document.getElementById('root'));
registerServiceWorker();

