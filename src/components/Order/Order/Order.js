import React from  'react';
import classes from './Order.css';

const order = (props) => {

    const ingredient = [];
    for(let ingName in props.ingredients){
        ingredient.push({
            name: ingName,
            amount: props.ingredients[ingName]
        });
    }
    const ing =ingredient.map((ing,index) => (<span
        style={{textTransform: 'capitalize', display: 'inline-block', margin: '0 8px', border: '1px solid #ccc', padding: '5px', boxShadow:'1px 1px 1px  black'}}
        key={ing.name}> {ing.name} ({ing.amount})</span>))

    return (
        <div className={classes.Order}>
            <p><strong>Ingredients:</strong> {ing}</p>
            <p>Price: <strong>{Number.parseFloat(props.price).toFixed(2)} USD</strong></p>
        </div>
    );
}
export default order;