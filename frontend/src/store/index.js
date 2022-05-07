import {createStore, combineReducers, applyMiddleware} from 'redux'
import Mode from './reducers/mode.reducer'
import { authentication } from './reducers/authentication.reducer';
import { alert } from './reducers/alert.reducer';
import {createLogger} from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import chatReducer from './reducers/chat.reducer';
import pitchReducer from './reducers/pitch.reducer';
import filesReducer from './reducers/files.reducer';
import teamReducer from './reducers/team.reducer';
import viewsReducer from './reducers/views.reducer'

const loggerMiddleware = createLogger();

export default createStore(
    combineReducers({
        mode: Mode,
        authentication: authentication,
        pitch: pitchReducer,
        chat: chatReducer,
        team: teamReducer,
        views: viewsReducer,
        files: filesReducer,
        alert: alert,
    }),    
    applyMiddleware(thunkMiddleware,loggerMiddleware)
)
