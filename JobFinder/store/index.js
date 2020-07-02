import { createStore, compose, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from '../reducers';
import { persistStore, persistReducer } from 'redux-persist';
import { AsyncStorage } from 'react-native';

const persistConfig = 
{
    key: 'root',
    storage: AsyncStorage,

    // only 'likedJobs' will be persisted.
    whitelist: ['likedJobs']
}

const persistedReducer = persistReducer(persistConfig, reducers);

// When Redux starts up it sends warmup action to all reducers and middlewares. All these happens behind the scene. Compose is used when you 
// want to pass multiple store enhancers to the store. Store enhancers are higher order functions that add some extra functionality to the store.
// The only store enhancer which is supplied with Redux by default is applyMiddleware however many other are available.
const store = createStore(persistedReducer, {}, applyMiddleware(ReduxThunk));
const persistor = persistStore(store);

export { store, persistor };