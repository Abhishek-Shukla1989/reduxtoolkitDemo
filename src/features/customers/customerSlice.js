import { createSlice } from "@reduxjs/toolkit"

const initialState={
	fullName:"",
	nationalId:"",
	createdAt:""

}

const customerSlice = createSlice({
	name:'customer',
	initialState,
	reducers:{
		createCustomer:{
		prepare(fullName, nationalId, createdAt)
		{
			return  {
				payload:{fullName, nationalId, createdAt}
			}
		},
		reducer(state,action)
		{
			state.fullName = action.payload.fullName
			state.nationalId = action.payload.nationalId
			state.createdAt = action.payload.createdAt
		}
	},
	updateCustomerName(state, action)
	{
		state.fullName = action.payload.fullName
	}
		
	}
})
console.log(customerSlice)
export const {createCustomer, updateCustomerName} = customerSlice.actions
export default customerSlice.reducer
/*
export default function customerReducer(state = initialStateCustomer,action)
{
	switch(action.type)
	{
		case "customer/createCustomer":
		return {...state, fullName:action.payload.fullName, nationalId:action.payload.nationalId, createdAt:action.payload.createdAt}

		case "customer/updateCustomerName":
		return {...state, fullName:action.payload}

		default:
		return {...state}

	}
}
//Customer action creators

export function createCustomer(fullname,nationalId)
{
	return ({type:"customer/createCustomer", payload:{fullName:fullname, nationalId:nationalId, createdAt:new Date().toDateString()}})
}


export function updateCustomerName(fullName)
{
	return ({type:"customer/updateCustomerName",payload:{fullName:fullName}})
}

*/