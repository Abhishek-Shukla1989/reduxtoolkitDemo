import axios from "axios"
import { createSlice } from "@reduxjs/toolkit"
const initialState = {
	balance:0,
	loanAmount:0,
	purpose:"",
	isLoading:false
}

const accontSlice = createSlice({
	name:'account',
	initialState,
	reducers:{
		deposit(state,action)
		{
			state.isLoading = false
			state.balance = state.balance+ action.payload
		},

		withdraw(state,action)
		{
			state.balance = state.balance-action.payload
		},
		requestLoan:{
			prepare(amount, purpose)
			{
				return {
					payload:{amount, purpose}
				}
			},
		reducer(state,action)
		{
			if(state.loanAmount>0) return
			state.loanAmount = action.payload.amount
			state.purpose = action.payload.purpose
			state.balance = state.balance + action.payload.amount
		}},
		returnLoan(state)
		{
			state.balance = state.balance- state.loanAmount
			state.loanAmount = 0
			state.purpose = ""
		},
		convertingCurrency(state)
		{
           state.isLoading = true
		}
	}
})

console.log(accontSlice)
export const { withdraw, requestLoan, returnLoan} = accontSlice.actions;
export default accontSlice.reducer

export function deposit(amount,currency)
{

	if(currency === "USD") return {type:"account/deposit", payload:amount}
	return async  function (dispatch, getState)
	{
		dispatch({type:"account/convertingCurrency"})
		console.log(`https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`)
      // Api call here
     const response =  await axios.get(`https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`)
     console.log(response.status === 200)
	 if(response.status === 200)
	 {
		dispatch({type:"account/deposit", payload:response.data.rates.USD})
	 }
	}
}



/*
export default function accountReducer(state = initialState,action)
{
	switch(action.type)
	{
		case "account/deposit":
		return {...state,isLoading:false, balance:state.balance+action.payload}

		case "account/withdrawl":
		return {...state, balance:state.balance-action.payload}

		case "account/requestLoan":
		    if(state.loanAmount>0) return state
			return {...state, loanAmount:action.payload.amount, purpose:action.payload.purpose,balance:state.balance+action.payload.amount}

	   case "account/payLoan":
			return {...state, loanAmount:0,purpose:"", balance:state.balance-state.loanAmount}
		case "account/convertingCurrency":
				return {...state, isLoading:true}
		default:
		return {...state}

	}
}

//Account action creators
export function deposit(amount,currency)
{

	if(currency === "USD") return {type:"account/deposit", payload:amount}
	return async  function (dispatch, getState)
	{
		dispatch({type:"account/convertingCurrency"})
		console.log(`https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`)
      // Api call here
     const response =  await axios.get(`https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`)
     console.log(response.status === 200)
	 if(response.status === 200)
	 {
		dispatch({type:"account/deposit", payload:response.data.rates.USD})
	 }
	}
}


export function withdraw(amount)
{
  return {type:"account/withdrawl", payload:amount}
}


export function requestLoan(amount, purpose)
{
  return {type:"account/requestLoan", payload:{amount:amount, purpose:purpose}}
}

export function returnLoan()
{
  return {type:"account/payLoan"}
}
*/