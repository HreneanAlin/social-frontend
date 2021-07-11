const visitatorReducer = (state = {}, action) => {
	switch (action.type) {
		case "SET_VISITATOR":
			return {
				...state,
				visitator: action.payload,
            }
        default:
            return state
	}
}

export default visitatorReducer