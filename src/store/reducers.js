import * as actionTypes from  './actions';

const initialState = {
    ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0,
        tomatoes: 0,
        onions: 0
    },
    totalPrice: 4
};

const INGREDIENT_PRICESS = {
    salad: 0.2,
    tomatoes: 0.1,
    bacon: 0.5,
    cheese: 1,
    meat: 1.1,
    onions: 0.1
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return{
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] +1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICESS[action.ingredientName]

            };
        case actionTypes.REMOVE_INGREDIENT:
            if( state.ingredients[action.ingredientName] > 0){
                return {
                    ...state,
                    [action.ingredientName]: state.ingredients[action.ingredientName] -1,
                    totalPrice: state.totalPrice - INGREDIENT_PRICESS[action.ingredientName]

                };
            } else {
                return state;
            }

        default:
            return state;

    }
};

export default reducer;