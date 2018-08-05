import { createStore, applyMiddleware } from 'redux';
import notesApp from './reducers';

import thunk from 'redux-thunk';

export const store = createStore(
    notesApp,
    applyMiddleware(thunk)
  );

store.subscribe(() => {
    console.log('-***- subscription console start -***-');
    console.log(arguments);
    console.log(store.getState());
    console.log('-***- subscription console end -***-');
});