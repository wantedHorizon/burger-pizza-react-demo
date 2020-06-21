import React, {Component} from 'react';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from '../../axios-orders';
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';



class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }

    state = {
        // ingredients: null,
        totalPrice: 2,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        // axios.get('/ingredients.json')
        //     .then(res => {
        //         this.setState({ingredients: res.data});
        //     }).catch(error => {
        //     this.setState({error: true})
        // });
    }

    updatePurcaseState(updatedIngredient) {

        const sum = Object.keys(updatedIngredient).map(igkey => updatedIngredient[igkey]).reduce((sum, el) => sum + el, 0);
        return sum > 0;
    }

    purcaseHandler = () => {
        this.setState({purchasing: true});
    }

    // addIngredientHandler = (type) => {
    //     const newCount = this.props.ings[type] + 1;
    //     const updatedIngredient = {
    //         ...this.props.ings
    //     };
    //     updatedIngredient[type] = newCount;
    //     const newPrice = this.props.price + INGREDIENT_PRICESS[type];
    //     this.setState({totalPrice: newPrice, ingredients: updatedIngredient});
    //     this.updatePurcaseState(updatedIngredient);
    // }

    // removeIngredientHandler = (type) => {
    //     const oldCount = this.props.ings[type];
    //     const oldPrice = this.props.price;
    //     if (oldCount > 0 && oldPrice > 0) {
    //         const newCount = oldCount - 1;
    //         const updatedIngredient = {
    //             ...this.props.ings
    //         };
    //         updatedIngredient[type] = newCount;
    //         const newPrice = this.props.price - INGREDIENT_PRICESS[type];
    //         this.setState({totalPrice: newPrice, ingredients: updatedIngredient});
    //         this.updatePurcaseState(updatedIngredient);
    //     } else {
    //         alert("action is not allowed");
    //     }
    //
    // }

    purcaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        // alert("you continued!");
        // this.purcaseCancelHandler();
        // const order = {
        //     ingredients: this.props.ings,
        //     price: this.props.price,
        //     customer: {
        //         name: 'eliran',
        //         address: {
        //             street: 'test 1',
        //             zip: '67546',
        //             country: 'Israel',
        //         },
        //         email: 'test@test.com',
        //         deliveryMethod: 'fastest'
        //     }
        // }
        // this.setState({loading: true});
        // axios.post('/orders.json', order)
        //     .then(res => {
        //             this.setState({loading: false, purchasing: false})
        //         }
        //     )
        //     .catch(err => {
        //         console.log(err);
        //         this.setState({loading: false, purchasing: false})
        //     })
        //     .finally();
        // const queryParams = [];
        // for(let index in this.props.ings){
        //     let temp= ( encodeURIComponent(index) + '='+ encodeURIComponent(this.props.ings[index]) );
        //     queryParams.push(temp);
        // }
        // queryParams.push('price='+this.props.price);
        // const queryString = queryParams.join('&');
        // this.props.history.push({
        //     pathname:'checkout',
        //     search: '?' +queryString
        // });
        this.props.history.push('/checkout');
    }

    render() {

        let orderSummary = <Spinner/>;

        let burgerMenu = this.state.error ? <p>Ingredients loading failed</p> : <Spinner/>;
        if (this.props.ings) {

            const disabledInfo = {
                ...this.props.ings
            };
            for (let key in disabledInfo) {
                disabledInfo[key] = disabledInfo[key] <= 0
            }
            burgerMenu = (
                <Aux>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls
                        totalPrice={this.props.price}
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        purcaseable={this.updatePurcaseState(this.props.ings)}
                        ordered={this.purcaseHandler}
                    />
                </Aux>
            );

            orderSummary = <OrderSummary
                totalPrice={this.props.price}
                purchaseCanceled={this.purcaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                ingredients={this.props.ings}/>;

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

    const mapStateToProps = state => {
        return {
            ings: state.ingredients,
            price: state.totalPrice
        };
    };

    const mapDispatchToProps = dispatch => {
        return {
            onIngredientAdded: (name) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: name}),
            onIngredientRemoved: (name) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: name})

        }
    }

export default connect(mapStateToProps,mapDispatchToProps)( withErrorHandler(BurgerBuilder, axios) );