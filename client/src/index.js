import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter} from 'react-router-dom'
import ConnectedSearch from './components/Search'
// import ConnectedSearch from './components/TestTable'
import { Route } from 'react-router'
// import createHistory from 'history/createBrowserHistory'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import mainReducer from './Reducers'
import watchFetchSearchData from './Sagas.js'
import './index.css';
import "@blueprintjs/table/dist/table.css";
import { ApolloClient, ApolloProvider, gql } from 'react-apollo';
//saga middleware
const sagaMiddleware = createSagaMiddleware()

//redux store with saga middleware
const store = createStore(
  mainReducer,
  applyMiddleware(sagaMiddleware)
)

const client = new ApolloClient()
// activate the saga(s)
sagaMiddleware.run(watchFetchSearchData)

//fetch initial data
store.dispatch({type: 'FETCH_SEARCH_DATA', payload:{firstName: "*"}})

ReactDOM.render(
  <ApolloProvider client={client} store={store}>
    <BrowserRouter>
      <div>
        <Route path="/" component={App}>
          {" "}
        </Route>
        <Route exact path="/search" component={ConnectedSearch} />
      </div>
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById("root")
);
