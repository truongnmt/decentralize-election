import React, { Component } from 'react';
import { connect } from 'react-redux';

import Spinner from '../../components/UI/Spinner/Spinner';
import Button from '../../components/UI/Button/Button';
import * as actions from '../../store/actions/dapp';
import classes from './Dummy.module.css';

class Dummy extends Component {
    state = {
        formSelectedCandidateID: 1
    }

    componentWillMount = () => {
        this.props.onInitWeb3AccountContract();
        // this.props.onFetchCandidates();
    };

    castVoteHandler = (event) => {
        event.preventDefault();

        const { accounts, contract } = this.props;
        console.log(this.state.formSelectedCandidateID);

        contract.methods.vote(1).send({ from: accounts[0] })
            .on('confirmation', (confirmationNumber) => {
                console.log("Confirmation number: " + confirmationNumber);
                this.props.onFetchCandidates();
            }).on('error', (error) => {
                console.log(error);
            });
    };

    handleFormSelectChangeHandler = e => {
        this.setState({ formSelectedCandidateID: e.target.value });
    }

    render() {
        if (this.props.candidatesCount === 0) {
            return <Spinner />;
        }

        // console.log(this.props.candidates);
        let candidates = this.props.candidates.map(candidate => {
            return (
                <tr key={candidate.id.toNumber()}>
                    <td>{candidate.id.toNumber()}</td>
                    <td>{candidate.name}</td>
                    <td>{candidate.voteCount.toNumber()}</td>
                </tr>
            );
        });

        let form = (
            <form onSubmit={this.castVoteHandler}>
                <label htmlFor="candidatesSelect">Select Candidates</label>
                <select id="candidatesSelect" onChange={this.handleFormSelectChangeHandler} >
                    <option value="1">Candidate 1</option>
                    <option value="2">Candidate 2</option>
                </select>
                <Button btnType="Success">Vote</Button>
            </form>
        )

        return (
            <div className={classes.Dummy}>
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

                <p>Your account: {this.props.accounts}</p>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
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