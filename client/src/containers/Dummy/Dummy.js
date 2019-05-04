import React, { Component } from 'react';
import { connect } from 'react-redux';

import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/dapp';

class Dummy extends Component {
    // state = {
    //     storageValue: 0,
    //     web3: null,
    //     accounts: null,
    //     contract: null
    // };

    componentWillMount = () => {
        this.props.onInitWeb3AccountContract();
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
                        // this.props.setStorageValue(response.toNumber());
                    });
                })
                .on('error', (error) => {
                    console.log(error);
                });
        });
    };

    render() {
        console.log(this.props.candidatesCount);
        if (this.props.candidatesCount === 0) {
            return <Spinner />;
        }
        return (
            <div>
                <h3>Election Results</h3>
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Votes</th>
                        </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </table>
                <hr />

                {/* <Button btnType="Success" clicked={this.incrementStorageValueHandler}>ADD</Button> */}
                {/* <div>The stored value is: {this.props.storageValue}</div> */}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        web3: null,
        accounts: null,
        contract: null,
        candidates: [],
        candidatesCount: 0
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onInitWeb3AccountContract: () => dispatch(actions.initWeb3AccountContract()),
        onFetchCandidates: () => dispatch(actions.fetchCandidates())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dummy);