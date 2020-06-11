import React, {Component} from 'react';
import Order from "../../components/Order/Order/Order";
import axios from '../../axios-orders';
import Spinner from "../../components/UI/Spinner/Spinner";
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
class Orders extends Component {
    state = {
        orders: null,
        loading: true
    }
    componentDidMount() {
        axios.get('/orders.json')
            .then(res => {
                console.log(res.data);
                this.setState({orders: fetchedData ,loading:false});
                const fetchedData = [];
                for(let key in res.data){
                    fetchedData.push({
                        ...res.data[key],
                        id: key
                    });
                }
              //  console.log(fetchedData);
                this.setState({orders: fetchedData ,loading:false});


            }).catch(error => {
            this.setState({error: true, loading: false})
        });
    }

    render() {
        let Orders = <Spinner/>
        if(this.state.orders){
            Orders = this.state.orders.map( order => {
                return <Order key={order.id} ingredients={order.ingredients} price={order.price}/>
            })
        }

        return (
            <React.Fragment>
                {Orders}
            </React.Fragment>
        )
            ;
    }
}

export default WithErrorHandler(Orders, axios);