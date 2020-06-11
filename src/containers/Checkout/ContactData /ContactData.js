import React, { Component } from 'react';
import Button from "../../../components/UI/Button/Button";
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from "../../../components/UI/Spinner/Spinner";
class ContactData extends Component {

    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        // this.purcaseCancelHandler();
        this.setState({lodaing: true});
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
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
                    this.setState({loading: false});
                    alert("order completed successfully");
                    this.props.history.push('/');

                }
            )
            .catch(err => {
                console.log(err);
                this.setState({loading: false})
                alert("order faild");
            })
            .finally();
    }
    render() {
            let form = (this.state.loading) ?<Spinner /> : (<div className={classes.ContactData}>
                <h4>Enter your contact data</h4>
                <form action="">
                    <input className={classes.Input}  type="text" name="name" placeholder="your name"/>
                    <input className={classes.Input} type="email" name="email" placeholder="your Mail"/>
                    <input className={classes.Input} type="text" name="street" placeholder="your address"/>
                    <input className={classes.Input} type="numbers" name="postal" placeholder="your postal code"/>
                    <Button btnType="Success" click={this.orderHandler} >Order</Button>
                </form>
            </div>)
        return (
            <div>
            {form}

            </div>
        );
    }
}

export default ContactData;