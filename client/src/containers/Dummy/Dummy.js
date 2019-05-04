import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/dapp';

class Dummy extends Component {
    // state = {
    //     storageValue: 0,
    //     web3: null,
    //     accounts: null,
    //     contract: null
    // };

    componentDidMount = () => {
        this.props.onInitDapp();
    };

    incrementStorageValueHandler = () => {
        const { accounts, contract } = this.state;

        contract.methods.get().call().then(currentValue => {
            // Stores a given value
            // await contract.methods.set(currentValue.toNumber() + 1).send({ from: accounts[0] });
            contract.methods.set(currentValue.toNumber() + 1).send({ from: accounts[0] })
                // https://web3js.readthedocs.io/en/1.0/web3-eth-contract.html#id15
                // for another event
                .on('confirmation', (confirmationNumber) => {
                    // TODO if (confirmationNumber === 5) {} ???
                    contract.methods.get().call().then(response => {
                        this.setState({ storageValue: response.toNumber() });
                    });
                })
                .on('error', (error) => {
                    console.log(error);
                });
        });
    };

    render() {
        if (!this.state.web3) {
            return <Spinner />;
        }
        return (
            <div className="App">
                <h1>Good to Go!</h1>
                <p>Your Truffle Box is installed and ready.</p>
                <h2>Smart Contract Example</h2>
                <p>
                    If your contracts compiled and migrated successfully, below will show
                    a stored a number.
                </p>
                {/* <Button btnType="Success" clicked={this.incrementStorageValueHandler}>ADD</Button> */}
                <Button btnType="Success">ADD</Button>
                <div>The stored value is: {this.state.storageValue}</div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        storageValue: state.dapp.storageValue,
        web3: state.dapp.web3,
        accounts: state.dapp.accounts,
        contract: state.dapp.contract
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onInitDapp: () => dispatch(actions.initWeb3AccountContract())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dummy);