import { createStore } from 'redux';
import notesApp from './reducers';

export const store = createStore(notesApp);

store.subscribe(() => {
    console.log('-***- subscription fired -***-');
    console.log(arguments);
    console.log(store.getState());
    console.log('-***- subscription console end -***-');
});