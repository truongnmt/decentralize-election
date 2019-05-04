import * as actionTypes from './actionTypes';
import SimpleStorageContract from "../../contracts/SimpleStorage.json";
import getWeb3 from "../../utils/getWeb3";

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

export const setStorageValue = (storageValue) => {
    return {
        type: actionTypes.SET_STORAGE_VALUE,
        storageValue: storageValue
    };
};

export const setContract = (contract) => {
    return {
        type: actionTypes.SET_CONTRACT,
        contract: contract
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
                    // Get the contract storageValue
                    instance.methods.get().call().then(storageValue => {
                        dispatch(setStorageValue(storageValue.toNumber()));
                    })
                        .catch(error => {
                            // TODO dispatch(fetchStorageValueFailed());
                            console.log(error);
                        });
                })
                    .catch(error => {
                        // TODO dispatch(fetchContractFailed());
                        console.log(error);
                    })

            })
                .catch(error => {
                    // TODO dispatch(fetchAccountsFailed());
                    console.log(error);
                });
        }).catch(error => { // .on('error', (error) => {
            // TODO dispatch(fetchWeb3Failed());
            console.log(error);
        });
    };
};