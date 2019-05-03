import React, { Component } from 'react';

import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import SimpleStorageContract from "../../contracts/SimpleStorage.json";
import getWeb3 from "../../utils/getWeb3";

class Dummy extends Component {
    state = {
        storageValue: 0,
        web3: null,
        accounts: null,
        contract: null
    };

    componentDidMount = async () => {
        try {
            // Get network provider and web3 instance.
            const web3 = await getWeb3();

            // Use web3 to get the user's accounts.
            const accounts = await web3.eth.getAccounts();

            // Get the contract instance.
            const networkId = await web3.eth.net.getId();
            const deployedNetwork = SimpleStorageContract.networks[networkId];
            const instance = new web3.eth.Contract(
                SimpleStorageContract.abi,
                deployedNetwork && deployedNetwork.address,
            );

            // Get the contract storageValue
            const storageValue = await instance.methods.get().call();

            // Set web3, accounts, and contract to the state, and then proceed with an
            // example of interacting with the contract's methods.
            this.setState({
                storageValue: storageValue.toNumber(),
                web3: web3,
                accounts: accounts,
                contract: instance
            });
        } catch (error) {
            // Catch any errors for any of the above operations.
            alert(
                `Failed to load web3, accounts, or contract. Check console for details.`,
            );
            console.error(error);
        }
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
                <Button btnType="Success" clicked={this.incrementStorageValueHandler}>ADD</Button>
                <div>The stored value is: {this.state.storageValue}</div>
            </div>
        );
    }
}

export default Dummy;