# React Dapps Boilerplate


```js
$ Election.deployed().then(function (i) { app = i; })
$ app.candidates(1)
Result {
  '0': <BN: 1>,
  '1': 'Candidate 1',
  '2': <BN: 0>,
  id: <BN: 2>,
  name: 'Candidate 1',
  voteCount: <BN: 0> }
$ app.candidates(1).then(function(c) {candidate = c;})
$ candidate[0]
<BN: 1>
$ candidate[1]
'Candidate 1'
$ candidate[2]
<BN: 0>
$ candidate[2].toNumber()
0
```

Get all connected account:
```
$ web3.eth.getAccounts()
```
