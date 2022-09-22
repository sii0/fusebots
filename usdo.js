const Superagent = require('superagent');
module.exports = async (ctx) => {

// const usdourl = 'https://bscscan.com/token/0x5801d0e1c7d977d78e4890880b8e579eb4943276';
// const usdopool = 'https://bscscan.com/tokenholdings?a=0x2220EcdD9ff26DfD2605D2b489E55B2056159853';


// pretty math
function abbreviateNumber(value) {
  let newValue = value;
  const suffixes = ["", "K", "M", "B","T"];
  let suffixNum = 0;
  while (newValue >= 1000) {
    newValue /= 1000;
    suffixNum++;
  }

  newValue = newValue.toPrecision(4);

  newValue += suffixes[suffixNum];
  return newValue;
}


// Holders? could scrape bscscan HTML..
// NS path for metadata HTML tag of USDO page on BSCscan
//const usdometa = document.querySelector("head > meta:nth-child(8)");




// get BUSD balance from Pancakeswap LP contract
  const busdget = await Superagent.get(
      'https://api.bscscan.com/api?module=account&action=tokenbalance&contractaddress=0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56&address=0x2220EcdD9ff26DfD2605D2b489E55B2056159853&tag=latest&apikey=F9N3CT7XA66TVTBAUBKQVGJFI1I57H51MJ'
    );

// get USDO balance from Pancakeswap LP contract
  const usdoget = await Superagent.get(
      'https://api.bscscan.com/api?module=account&action=tokenbalance&contractaddress=0x5801D0e1C7D977D78E4890880B8E579eb4943276&address=0x2220EcdD9ff26DfD2605D2b489E55B2056159853&tag=latest&apikey=F9N3CT7XA66TVTBAUBKQVGJFI1I57H51MJ'
    );

// Divide BUSD tokens by USDO tokens to get effective $USDO trading price (both being stablecoins, if pool is perfectly 50:50 balanced both will trade at $1)
const usdoprice = (busdget.body.result / usdoget.body.result);

// Individual token balances, humanified.
var usdobal = ((usdoget.body.result) / 1E+18); 
var busdbal = ((busdget.body.result) / 1E+18); 

// actual value of USDO balance
var usdoval = (usdobal * usdoprice);

// total pool value. could prob just double BUSD balance..
var usdoliq = (usdoval + busdbal);

// Calculate which token in the LP has greater balance.
if (usdobal > busdbal) {
                var pegbuy = (`:usdo:USDO`)
        } else {
                var pegbuy = (`:large_orange_diamond:BUSD`)
        }

// Calculate how much to buy to equalize pool balance.
if (usdobal > busdbal) {
            var pegamount = ((usdobal - busdbal)/2)
        } else {
            var pegamount = ((busdbal - usdobal)/2)
        }



// Format message output with context
  const message = (
      `:usdo:USDO trading on PCS at\r
:heavy_dollar_sign:${abbreviateNumber(usdoprice)} against :large_orange_diamond:BUSD \n
  _Buying ${abbreviateNumber(pegamount)} ${pegbuy} will return to peg_ \n
       :pancakes: *Pool breakdown* \r
          :large_orange_diamond:BUSD tokens: ${abbreviateNumber(busdbal)} \r
          :usdo:USDO tokens: ${abbreviateNumber(usdobal)} \r
       *Total value:*??${abbreviateNumber(usdoliq)} \n
_LP Transactions:_ \r
https://bscscan.com/address/0x2220EcdD9ff26DfD2605D2b489E55B2056159853#tokentxns \n
_USDO Holders:_ \r
https://bscscan.com/token/0x5801d0e1c7d977d78e4890880b8e579eb4943276#balances
      `
      );

// Send result back to slack
    await ctx.client.send(message);
    };