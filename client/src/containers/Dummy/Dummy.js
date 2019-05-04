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
        const { accounts, contract } = this.props;

        contract.methods.get().call().then(currentValue => {
            // Stores a given value
            // await contract.methods.set(currentValue.toNumber() + 1).send({ from: accounts[0] });
            contract.methods.set(currentValue.toNumber() + 1).send({ from: accounts[0] })
                // https://web3js.readthedocs.io/en/1.0/web3-eth-contract.html#id15
                // for another event
                .on('confirmation', (confirmationNumber) => {
                    // TODO if (confirmationNumber === 5) {} ???
                    contract.methods.get().call().then(response => {
                        this.props.setStorageValue(response.toNumber());
                    });
                })
                .on('error', (error) => {
                    console.log(error);
                });
        });
    };

    render() {
        if (!this.props.web3) {
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
                <Button btnType="Success" clicked={this.incrementStorageValueHandler}>ADD</Button>
                <div>The stored value is: {this.props.storageValue}</div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        storageValue: state.storageValue,
        web3: state.web3,
        accounts: state.accounts,
        contract: state.contract
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onInitDapp: () => dispatch(actions.initWeb3AccountContract()),
        setStorageValue: (updatedStorageValue) => dispatch(actions.setStorageValue(updatedStorageValue))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dummy);