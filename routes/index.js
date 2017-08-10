var express = require('express');
var Web3 = require('web3');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.sendFile("index.html", {root: __dirname+'/../views'});
  //sendFile needs absolute path

});

router.post('/getBalance', function(req, res, next) {
  console.log("in method "+req.body.account);
  var account = req.body.account;
  var config = req.body.config;
  var web3 = new Web3(new Web3.providers.HttpProvider(config.etheURL));
  var abi = JSON.parse(config.tokenContractInterface);
  var tokenContract = web3.eth.contract(abi);
  var contractInstance = tokenContract.at(config.etheContractAddr);
  var bal=contractInstance.coinBalanceOf(account).toLocaleString();
  var returnValue='{"account":"'+account+'", "balance":"'+bal+'"}';
  res.send(returnValue);
});

router.post('/send', function(req, res, next) {
  console.log("in method send "+req.body.sender);
  var sender = req.body.sender;
  var receiver = req.body.receiver;
  var value = req.body.value;
  var config = req.body.config;
  var web3 = new Web3(new Web3.providers.HttpProvider(config.etheURL));
  var abi = JSON.parse(config.tokenContractInterface);
  var tokenContract = web3.eth.contract(abi);
  var contractInstance = tokenContract.at(config.etheContractAddr);
  web3.personal.unlockAccount(sender,'jboss.1234');
  contractInstance.sendCoin.sendTransaction(receiver,value,{from: sender});

//  var bal=contractInstance.coinBalanceOf(account).toLocaleString();
//  var returnValue='{"account":"'+account+'", "balance":"'+bal+'"}';
//  res.send(returnValue);
  res.send("ok")
});
module.exports = router;
