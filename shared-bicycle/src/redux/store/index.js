/**
 * 引入createStore
 */
import { createStore } from 'redux'
import reducer from './../reducer'
import { composeWithDevTools } from 'redux-devtools-extension'

const store=createStore(reducer,composeWithDevTools());
export default store;


// const store = createStore(reducer, /* preloadedState, */ composeWithDevTools(
//     // Specify name here, actionsBlacklist, actionsCreators and other options if needed
//   ));

// export default store;



