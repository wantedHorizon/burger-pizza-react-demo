import React from 'react';
import Button from "../../UI/Button/Button";
import classes from './CheckoutSummary.css';
import Burger from "../../Burger/Burger";
const checkoutSummary = (props) => {

    return (
        <div className={classes.CheckoutSummary}>
            <h1>We Hope it taste well!</h1>
            <div style={{width: '100%', margin: 'auto'}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button btnType="Danger" click={props.checkoutCancelled}>Cancel</Button>
            <Button btnType="Success" click={props.checkoutContinued}>Continue</Button>
        </div>
    );
}
export default checkoutSummary;