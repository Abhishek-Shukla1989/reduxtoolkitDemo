// import { applyMiddleware, combineReducers, createStore } from "redux"
import { configureStore } from "@reduxjs/toolkit"
// import thunk from "redux-thunk"
import accountReducer  from "./features/accounts/accountSlice"
import customerReducer
 from "./features/customers/customerSlice"
// import { composeWithDevTools } from "redux-devtools-extension"

const store = configureStore({
	reducer:{
	account:accountReducer,
	customer:customerReducer
	}
})
// const rootReducer = combineReducers({
// 	account:accountReducer,
// 	customer:customerReducer
// })
// const store = createStore(rootReducer,composeWithDevTools(applyMiddleware(thunk)))

export default store

