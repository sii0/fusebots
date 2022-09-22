const Superagent = require('superagent');
module.exports = async (ctx) => {

// const usdourl = 'https://bscscan.com/token/0x5801d0e1c7d977d78e4890880b8e579eb4943276';
// const usdopool = 'https://bscscan.com/tokenholdings?a=0x28141301e048D8d895CC52F63E2cf1B12B5A7DbB';

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


// get BNB stats
  const bnbstat = await Superagent.get(
      'https://api.bscscan.com/api?module=stats&action=bnbprice&apikey=F9N3CT7XA66TVTBAUBKQVGJFI1I57H51MJ'
    );
// extract price
var bnbprice = (bnbstat.body.result.ethusd);


// get OPEN balance from Pancakeswap LP contract
  const openget = await Superagent.get(
      'https://api.bscscan.com/api?module=account&action=tokenbalance&contractaddress=0xaBaE871B7E3b67aEeC6B46AE9FE1A91660AadAC5&address=0x1090c996fd1490d15dd7906322ee676a5cc3cf82&tag=latest&apikey=F9N3CT7XA66TVTBAUBKQVGJFI1I57H51MJ'
    );
// get BNB balance from Pancakeswap LP contract
  const bnbget = await Superagent.get(
      'https://api.bscscan.com/api?module=account&action=tokenbalance&contractaddress=0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c&address=0x1090c996fd1490d15dd7906322ee676a5cc3cf82&tag=latest&apikey=F9N3CT7XA66TVTBAUBKQVGJFI1I57H51MJ'
    );
// Divide BNB tokens by OPEN tokens

var openbal = ((openget.body.result) / 1E+18); 
var bnbbal = ((bnbget.body.result) / 1E+18); 
var openliq = ((bnbbal * 2) * bnbprice)

var openprice = ((bnbbal * bnbprice) / openbal);


// Format message output with context
  const message = (
      `:open:$OPEN currently trading at\r
:heavy_dollar_sign:${abbreviateNumber(openprice)} against :large_orange_diamond:BUSD \n
       *Liquidity pool breakdown* \r
          $OPEN tokens: ${abbreviateNumber(openbal)} \r
          $WBNB tokens: ${abbreviateNumber(bnbbal)} \r
       *Total value in Pool:* 💲${abbreviateNumber(openliq)} \n
_LP contract:_ \r
https://bscscan.com/tokenholdings?a=0x1090c996fd1490d15dd7906322ee676a5cc3cf82 \n
_OmniC Holders:_ \r
https://bscscan.com/token/0xaBaE871B7E3b67aEeC6B46AE9FE1A91660AadAC5#balances
      `
      );

// Send result back to slack
    await ctx.client.send(message);
    };