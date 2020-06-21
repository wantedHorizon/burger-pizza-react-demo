import React from 'react';
import classes from './BuildControls.css';
import BuildControl from "./BuildControl/BuildControl";

const  controls = [
    { label: 'Salad', type: 'salad'},
    { label: 'Tomatoes', type: 'tomatoes'},
    { label: 'Bacon', type: 'bacon'},
    { label: 'Cheese', type: 'cheese'},
    { label: 'Meat', type: 'meat'},
    { label: 'Onion', type: 'onions'}
];
const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <strong>
        <p>Current Price: {props.totalPrice.toFixed(2)}</p>
        </strong>
        {
            controls.map( ctrl => (
                <BuildControl
                    key={ctrl.label}
                    label={ctrl.label}
                    added={() => props.ingredientAdded(ctrl.type)}
                    removed={() => props.ingredientRemoved(ctrl.type)}
                    disabled={props.disabled[ctrl.type]}
                />
            ) )
        }
        <button className={classes.OrderButton}
                disabled={!props.purchasable}
                onClick={props.ordered}
        >
            ORDER NOW
        </button>

    </div>
);

export default buildControls;