import * as actionTypes from './actionTypes';
import SimpleStorageContract from "../../contracts/Election.json";
import getWeb3 from "../../utils/getWeb3";
import store from '../store';

export const setWeb3 = (web3) => {
    return {
        type: actionTypes.SET_WEB3,
        web3: web3
    };
};

export const setAccounts = (accounts) => {
    return {
        type: actionTypes.SET_ACCOUNTS,
        accounts: accounts
    };
};

export const setContract = (contract) => {
    return {
        type: actionTypes.SET_CONTRACT,
        contract: contract
    };
};

export const setCandidates = (candidates) => {
    return {
        type: actionTypes.SET_CANDIDATES,
        candidates: candidates
    };
};

export const addCandidate = (candidate) => {
    return {
        type: actionTypes.ADD_CANDIDATE,
        candidate: candidate
    };
};

export const setCandidatesCount = (candidatesCount) => {
    return {
        type: actionTypes.SET_CANDIDATES_COUNT,
        candidatesCount: candidatesCount
    };
};

export const initWeb3AccountContract = () => {
    return dispatch => {
        // Get network provider and web3 instance.
        // const web3 = await getWeb3();
        getWeb3().then(web3 => {
            dispatch(setWeb3(web3));
            // Use web3 to get the user's accounts.
            web3.eth.getAccounts().then(accounts => {
                dispatch(setAccounts(accounts));
                // Get the contract instance.
                web3.eth.net.getId().then(networkId => {
                    const deployedNetwork = SimpleStorageContract.networks[networkId];
                    const instance = new web3.eth.Contract(
                        SimpleStorageContract.abi,
                        deployedNetwork && deployedNetwork.address,
                    );
                    dispatch(setContract(instance));
                    // Get the total number of candidates
                    instance.methods.candidatesCount().call().then(candidatesCount => {
                        dispatch(setCandidatesCount(candidatesCount.toNumber()));

                        // get all candidates
                        const candidates = [];
                        dispatch(setCandidates(candidates));
                        for (let i = 1; i <= candidatesCount.toNumber(); i++) {
                            instance.methods.candidates(i).call().then(candidate => {
                                dispatch(addCandidate({
                                    id: candidate[0],
                                    name: candidate[1],
                                    voteCount: candidate[2]
                                }));
                            });
                        }
                    }).catch(error => {
                        // TODO dispatch(fetchStorageValueFailed());
                        console.log(error);
                    });
                }).catch(error => {
                    // TODO dispatch(fetchContractFailed());
                    console.log(error);
                });
            }).catch(error => {
                // TODO dispatch(fetchAccountsFailed());
                console.log(error);
            });
        }).catch(error => { // .on('error', (error) => {
            // TODO dispatch(fetchWeb3Failed());
            console.log(error);
        });
    };
};

export const fetchCandidates = () => {
    return dispatch => {
        const contract = store.getState().contract;
        // Get the total number of candidates
        contract.methods.candidatesCount().call().then(candidatesCount => {
            dispatch(setCandidatesCount(candidatesCount.toNumber()));

            // get all candidates
            const candidates = [];
            dispatch(setCandidates(candidates));
            for (let i = 1; i <= candidatesCount.toNumber(); i++) {
                contract.methods.candidates(i).call().then(candidate => {
                    dispatch(addCandidate({
                        id: candidate[0],
                        name: candidate[1],
                        voteCount: candidate[2]
                    }));
                })
            }
        }).catch(error => {
            // TODO dispatch(fetchStorageValueFailed());
            console.log(error);
        });
    };
};