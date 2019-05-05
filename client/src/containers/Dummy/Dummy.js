import React, { Component } from 'react';
import { connect } from 'react-redux';

import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/dapp';

class Dummy extends Component {

    componentWillMount = () => {
        this.props.onInitWeb3AccountContract();
        // this.props.onFetchCandidates();
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
        if (this.props.candidatesCount === 0) {
            return <Spinner />;
        }

        let candidates = this.props.candidates.map(candidate => {
            return (
                <tr key={candidate.id}>
                    <td>{candidate.id}</td>
                    <td>{candidate.name}</td>
                    <td>{candidate.voteCount}</td>
                </tr>
            );
        });

        // for (let candidate of this.props.candidates) {
        //     console.log(candidate);
        // }

        // for (let i = 1; i <= this.props.candidatesCount; i++) {
        //     candidates = this.props.candidates[i];
        // }

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
                        {candidates}
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
    // console.log("state:");
    // console.log(state);
    return {
        web3: state.web3,
        accounts: state.accounts,
        contract: state.contract,
        candidates: state.candidates,
        candidatesCount: state.candidatesCount
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onInitWeb3AccountContract: () => dispatch(actions.initWeb3AccountContract()),
        onFetchCandidates: () => dispatch(actions.fetchCandidates())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dummy);