import React, {Component} from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

const INGREDIENT_PRICESS = {
    salad: 0.2,
    tomatoes: 0.1,
    bacon: 0.5,
    cheese: 1,
    meat: 1.1,
    onions: 0.1
}

class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }

    state = {
        ingredients: {
            salad: 0,
            tomatoes: 0,
            bacon: 0,
            cheese: 0,
            meat: 0,
            onions: 0
        },
        totalPrice: 2,
        purchasable: false,
        purchasing: false
    }

    updatePurcaseState(updatedIngredient) {

        const sum = Object.keys(updatedIngredient).map(igkey => updatedIngredient[igkey]).reduce((sum, el) => sum + el, 0);
        this.setState({purchasable: sum > 0});
    }

    purcaseHandler = () => {
        this.setState({purchasing: true});
    }

    addIngredientHandler = (type) => {
        const newCount = this.state.ingredients[type] + 1;
        const updatedIngredient = {
            ...this.state.ingredients
        };
        updatedIngredient[type] = newCount;
        const newPrice = this.state.totalPrice + INGREDIENT_PRICESS[type];
        this.setState({totalPrice: newPrice, ingredients: updatedIngredient});
        this.updatePurcaseState(updatedIngredient);
    }
    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const oldPrice = this.state.totalPrice;
        if (oldCount > 0 && oldPrice > 0) {
            const newCount = oldCount - 1;
            const updatedIngredient = {
                ...this.state.ingredients
            };
            updatedIngredient[type] = newCount;
            const newPrice = this.state.totalPrice - INGREDIENT_PRICESS[type];
            this.setState({totalPrice: newPrice, ingredients: updatedIngredient});
            this.updatePurcaseState(updatedIngredient);
        } else {
            alert("action is not allowed");
        }

    }
    purcaseCancelHandler = () => {
        this.setState({purchasing: false});
    }
    purchaseContinueHandler = () => {
        alert("you continued!");
        this.purcaseCancelHandler();
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        return (
            <Aux>
                 <Modal show={this.state.purchasing}

                        modelClosed={this.purcaseCancelHandler}>
                     <OrderSummary
                         totalPrice={this.state.totalPrice}
                         purchaseCanceled={this.purcaseCancelHandler}
                         purchaseContinued={this.purchaseContinueHandler}
                         ingredients={this.state.ingredients}/>
                 </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                    totalPrice={this.state.totalPrice}
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    purcaseable={this.state.purchasable}
                    ordered={this.purcaseHandler}
                />
            </Aux>
        );
    }
}

export default BurgerBuilder;