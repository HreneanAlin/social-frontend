import userReducer from './components/home/reducers/setUser'
import visitatorReducer from './components/home/reducers/setVisitator'
import {combineReducers} from 'redux'

const rootReducer = combineReducers({
    user:userReducer,
    visitator:visitatorReducer
   
})

export default rootReducer