import React, {Component} from 'react';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from '../../axios-orders';
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

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
        ingredients: null,
        totalPrice: 2,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        axios.get('/ingredients.json')
            .then(res => {
                this.setState({ingredients: res.data});
            }).catch(error => {
            this.setState({error: true})
        });
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
        // alert("you continued!");
        // this.purcaseCancelHandler();
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'eliran',
                address: {
                    street: 'test 1',
                    zip: '67546',
                    country: 'Israel',
                },
                email: 'test@test.com',
                deliveryMethod: 'fastest'
            }
        }
        this.setState({loading: true});
        axios.post('/orders.json', order)
            .then(res => {
                    this.setState({loading: false, purchasing: false})
                }
            )
            .catch(err => {
                console.log(err);
                this.setState({loading: false, purchasing: false})
            })
            .finally();
    }

    render() {

        let orderSummary = <Spinner/>;

        let burgerMenu = this.state.error ? <p>Ingredients loading failed</p> : <Spinner/>;
        if (this.state.ingredients) {

            const disabledInfo = {
                ...this.state.ingredients
            };
            for (let key in disabledInfo) {
                disabledInfo[key] = disabledInfo[key] <= 0
            }
            burgerMenu = (
                <Aux>
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

            orderSummary = <OrderSummary
                totalPrice={this.state.totalPrice}
                purchaseCanceled={this.purcaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                ingredients={this.state.ingredients}/>;

        }

        if (this.state.loading) {
            orderSummary = <Spinner/>
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing}
                       loading={this.state.loading}
                       modelClosed={this.purcaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burgerMenu}

            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);