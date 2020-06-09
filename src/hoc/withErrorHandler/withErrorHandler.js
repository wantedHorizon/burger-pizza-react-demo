import React, {Component} from 'react';
import Modal from "../../components/UI/Modal/Modal";
import Aux from '../Aux/Aux';
const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            err: null
        }
        componentWillMount()
         {
           this.reqInterceptor= axios.interceptors.request.use( req => {
                    this.setState({err: null});
                    return req;
                }
            ,error => this.setState({err:error}));

           this.resInterceptors = axios.interceptors.response.use(res=> res, err => {
                this.setState({err: err});
                // console.log(err);
            } )
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptors);

        }

        errorConfirmedHandler = () => {
            this.setState({err:null})
        }

        render() {
            return (
                <Aux>
                    <Modal show={this.state.err}
                           modalClosed={this.errorConfirmedHandler}
                    >
                        <div style={{display: 'flex',flexFlow: 'column'}}>
                        {this.state.err ? this.state.err.message: null}
                        <button onClick={this.errorConfirmedHandler}>Confirm</button>

                        </div>
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        }

    }
}

export default withErrorHandler;