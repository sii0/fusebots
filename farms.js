const Superagent = require('superagent');
module.exports = async (ctx) => {


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
const psyapikey ='F9N3CT7XA66TVTBAUBKQVGJFI1I57H51MJ'; // my API key for BSCscan
const usdourl = '0x5801d0e1c7d977d78e4890880b8e579eb4943276'; // USDO contract address
const usdo_busd_lp_pcs = '0x2220ecdd9ff26dfd2605d2b489e55b2056159853'; // pancakeswap usdo-busd LP
const usdo_busd_lp_ot ='0x1597b1a1e4f387724fbf90d3f7ff8c883f8e8de1'; // omnitrade usdo-busd LP
// LP partner contracts
const usdorosn = '0x1544E3D6F5B485889499D020Ad6E3eadBA9df525'; // usdo - rosn lp
const usdobdp = '0xc5Ca9F1bb9a88Bac08368e7085984dB113daEc49'; // usdo - bdp lp
const usdofet = '0x184d310749D4E86635b146F6F6E75900A22AF733'; // usdo - fet lp
const usdomtlx = '0xa4c50baC074769449e46C889920A5aFd8E6ED9e0'; // usdo - mtlx lp
const usdoocp = '0xe595fF226bF6e30479ef8D7fa3DA4086194DB42f'; // usdo - ocp lp
const usdobnb = '0x8518D5906A6C72b0157d55caFf239dc43c19AbF6'; // usdo - bnb lp
const usdoopen = '0x07558dD9c7d478C67163760b5F80D19E6f5A1D5F'; // usdo - usdo lp
// farms
const farm_reef = '0x17d51Ef54805a157A51Cd6866C6b27365e08010A'; // stake busd-usdo lp (PCS)
const farm_ocp = '0x42475b1cF40aEdB3BD59e69cc8e400D417e1fA80'; // stake busd-usdo lp (OT)
const farm_mtlx = '0xef2118CFfb66B73a80a8d0D6f1c2110fE2C65fB0'; // stake busd-usdo lp (OT)
const farm_fet = '0x557E864059eA67aEB992b27abbAef0bD1DcF6A39'; // stake busd-usdo lp (OT)
const farm_usdo = '0xFeA7A0e39C3e9DF323C93EB7661bf83078c499A8'; // single USDO staking
// LP partner
const farm_rosn = '0x142Ec87C867F85df9cb8e1d4b1B1B6d067DE016c';
const farm_bdp = '0xBcB92826D58cf5Dd98473Fdc2BF6aE0B5DD53a3D';
const farm_feto = '0xD68d6Ef87137ae861228EAa37C0028025a54E28e';
const farm_mtlxo = '0xfff60307fE36162CdA037F42F646827af13ee3A5';
const farm_ocpo = '0xC3d0aF47222e282aDa64Ef1A8f76b3baFc743716';
const farm_bnbo = '0x194bB6Cc4dD075DB371858ff534118DAFe538372';
const farm_openo = '0x5Edd9EFd5598438A6460dE4722a902Dd38A46385';
// get total supply of partners USDO LP tokens
const supplyrosn = await Superagent.get(
        `https://api.bscscan.com/api?module=stats&action=tokensupply&contractaddress=${usdorosn}&apikey=${psyapikey}`
    );
const supplybdp = await Superagent.get(
        `https://api.bscscan.com/api?module=stats&action=tokensupply&contractaddress=${usdobdp}&apikey=${psyapikey}`
    );
const supplyfet = await Superagent.get(
        `https://api.bscscan.com/api?module=stats&action=tokensupply&contractaddress=${usdofet}&apikey=${psyapikey}`
    );
const supplymtlx = await Superagent.get(
        `https://api.bscscan.com/api?module=stats&action=tokensupply&contractaddress=${usdomtlx}&apikey=${psyapikey}`
    );
const supplyocp = await Superagent.get(
        `https://api.bscscan.com/api?module=stats&action=tokensupply&contractaddress=${usdoocp}&apikey=${psyapikey}`
  );
const supplybnb = await Superagent.get(
        `https://api.bscscan.com/api?module=stats&action=tokensupply&contractaddress=${usdobnb}&apikey=${psyapikey}`
);
const supplyopen = await Superagent.get(
        `https://api.bscscan.com/api?module=stats&action=tokensupply&contractaddress=${usdoopen}&apikey=${psyapikey}`
);
    // & USDO in above LP contract
const valuerosn = await Superagent.get(
      `https://api.bscscan.com/api?module=account&action=tokenbalance&contractaddress=${usdourl}&address=${usdorosn}&tag=latest&apikey=${psyapikey}`
    );
const valuebdp = await Superagent.get(
      `https://api.bscscan.com/api?module=account&action=tokenbalance&contractaddress=${usdourl}&address=${usdobdp}&tag=latest&apikey=${psyapikey}`
    );
const valuefet = await Superagent.get(
      `https://api.bscscan.com/api?module=account&action=tokenbalance&contractaddress=${usdourl}&address=${usdofet}&tag=latest&apikey=${psyapikey}`
    );
const valuemtlx = await Superagent.get(
      `https://api.bscscan.com/api?module=account&action=tokenbalance&contractaddress=${usdourl}&address=${usdomtlx}&tag=latest&apikey=${psyapikey}`
    );
const valueocp = await Superagent.get(
      `https://api.bscscan.com/api?module=account&action=tokenbalance&contractaddress=${usdourl}&address=${usdoocp}&tag=latest&apikey=${psyapikey}`
    );
const valuebnb = await Superagent.get(
      `https://api.bscscan.com/api?module=account&action=tokenbalance&contractaddress=${usdourl}&address=${usdobnb}&tag=latest&apikey=${psyapikey}`
    );
const valueopen = await Superagent.get(
      `https://api.bscscan.com/api?module=account&action=tokenbalance&contractaddress=${usdourl}&address=${usdoopen}&tag=latest&apikey=${psyapikey}`
    );
// REEF farm >>
// get balance from  farm contract
const farmreef = await Superagent.get(
      `https://api.bscscan.com/api?module=account&action=tokenbalance&contractaddress=${usdo_busd_lp_pcs}&address=${farm_reef}&tag=latest&apikey=${psyapikey}`
    );
// ^ number of LP tokens staked
var stakereef = abbreviateNumber((farmreef.body.result) / 1E+18);
// OCP farm >>
// get balance from  farm contract
const farmocp = await Superagent.get(
      `https://api.bscscan.com/api?module=account&action=tokenbalance&contractaddress=${usdo_busd_lp_ot}&address=${farm_ocp}&tag=latest&apikey=${psyapikey}`
    );
// ^ number of LP tokens staked
var stakeocp = abbreviateNumber((farmocp.body.result) / 1E+18);
// MTLX farm >>
// get balance from  farm contract
const farmmtlx = await Superagent.get(
      `https://api.bscscan.com/api?module=account&action=tokenbalance&contractaddress=${usdo_busd_lp_ot}&address=${farm_mtlx}&tag=latest&apikey=${psyapikey}`
    );
// ^ number of LP tokens staked
var stakemtlx = abbreviateNumber((farmmtlx.body.result) / 1E+18);
// FET farm >>
// get balance from  farm contract
const farmfet = await Superagent.get(
      `https://api.bscscan.com/api?module=account&action=tokenbalance&contractaddress=${usdo_busd_lp_ot}&address=${farm_fet}&tag=latest&apikey=${psyapikey}`
    );
// ^ number of LP tokens staked
var stakefet = abbreviateNumber((farmfet.body.result) / 1E+18);
// USDO farm >>
// get balance from  farm contract
const farmusdo = await Superagent.get(
      `https://api.bscscan.com/api?module=account&action=tokenbalance&contractaddress=${usdourl}&address=${farm_usdo}&tag=latest&apikey=${psyapikey}`
    );
// ^ number of LP tokens staked
var stakeusdo = abbreviateNumber((farmusdo.body.result) / 1E+18);
// ROSN farm >>
// get balance from  farm contract
const farmrosn = await Superagent.get(
      `https://api.bscscan.com/api?module=account&action=tokenbalance&contractaddress=${usdorosn}&address=${farm_rosn}&tag=latest&apikey=${psyapikey}`
    );
// ^ number of LP tokens staked
var stakerosn = abbreviateNumber((farmrosn.body.result) / 1E+18);
// bdp farm >>
// get balance from  farm contract
const farmbdp = await Superagent.get(
      `https://api.bscscan.com/api?module=account&action=tokenbalance&contractaddress=${usdobdp}&address=${farm_bdp}&tag=latest&apikey=${psyapikey}`
    );
// ^ number of LP tokens staked
var stakebdp = abbreviateNumber((farmbdp.body.result) / 1E+18);
// FET-USDO farm >>
// get balance from  farm contract
const farmfeto = await Superagent.get(
      `https://api.bscscan.com/api?module=account&action=tokenbalance&contractaddress=${usdofet}&address=${farm_feto}&tag=latest&apikey=${psyapikey}`
    );
// MTLX-USDO farm >>
// get balance from  farm contract
const farmmtlxo = await Superagent.get(
      `https://api.bscscan.com/api?module=account&action=tokenbalance&contractaddress=${usdomtlx}&address=${farm_mtlxo}&tag=latest&apikey=${psyapikey}`
    );
// OCP-USDO farm >>
// get balance from  farm contract
const farmocpo = await Superagent.get(
  `https://api.bscscan.com/api?module=account&action=tokenbalance&contractaddress=${usdoocp}&address=${farm_ocpo}&tag=latest&apikey=${psyapikey}`
);
// BNB-USDO farm >>
// get balance from  farm contract
const farmbnbo = await Superagent.get(
  `https://api.bscscan.com/api?module=account&action=tokenbalance&contractaddress=${usdobnb}&address=${farm_bnbo}&tag=latest&apikey=${psyapikey}`
);
// OPEN-USDO farm >>
// get balance from  farm contract
const farmopeno = await Superagent.get(
  `https://api.bscscan.com/api?module=account&action=tokenbalance&contractaddress=${usdoopen}&address=${farm_openo}&tag=latest&apikey=${psyapikey}`
);
// value of staked LP tokens in farm
var bdpfarmval =         (
            (((valuebdp.body.result) / 1E+18) * 2)
        / 100)
        *
        ( 100 /
        (
            ((supplybdp.body.result) / 1E+18)
        /
            ((farmbdp.body.result) / 1E+18)
            )
    );
var rosnfarmval =         (
            (((valuerosn.body.result) / 1E+18) * 2)
        / 100)
        *
        ( 100 /
        (
            ((supplyrosn.body.result) / 1E+18)
        /
            ((farmrosn.body.result) / 1E+18)
            )
    );
var fetfarmval =         (
            (((valuefet.body.result) / 1E+18) * 2)
        / 100)
        *
        ( 100 /
        (
            ((supplyfet.body.result) / 1E+18)
        /
            ((farmfeto.body.result) / 1E+18)
            )
    );
var mtlxfarmval =        (
            (((valuemtlx.body.result) / 1E+18) * 2)
        / 100)
        *
        ( 100 /
        (
            ((supplymtlx.body.result) / 1E+18)
        /
            ((farmmtlxo.body.result) / 1E+18)
            )
    );
var ocpfarmval =       (
          (((valueocp.body.result) / 1E+18) * 2)
      / 100)
      *
      ( 100 /
      (
          ((supplyocp.body.result) / 1E+18)
      /
          ((farmocpo.body.result) / 1E+18)
          )
    );
var bnbfarmval =       (
          (((valuebnb.body.result) / 1E+18) * 2)
      / 100)
      *
      ( 100 /
      (
          ((supplybnb.body.result) / 1E+18)
      /
          ((farmbnbo.body.result) / 1E+18)
          )
  );
var openfarmval =      (
        (((valueopen.body.result) / 1E+18) * 2)
    / 100)
    *
    ( 100 /
    (
        ((supplyopen.body.result) / 1E+18)
    /
        ((farmopeno.body.result) / 1E+18)
        )
);
var totalstaked = abbreviateNumber(((farmfet.body.result) / 1E+18) + ((farmmtlx.body.result) / 1E+18) + ((farmocp.body.result) / 1E+18) + ((farmreef.body.result) / 1E+18) );

var totalpartner = abbreviateNumber(bdpfarmval + rosnfarmval + fetfarmval + mtlxfarmval + ocpfarmval + bnbfarmval + openfarmval );

//        :omtrad: _OCP farm:      ${stakeocp} (rewards ceased)_
// == == == == == == == == == == == == == == == == == == == == ==
// ] (https://bscscan.com/tokenholdings?a=${farm_bdp})
//  == == == == == == == == == == == == == == == sure would be nice to add clickable links to the text ...


// Format message output with context


  const message = (
`== :omnif:OmniFARMS stats ==
    *USDO-BUSD LP tokens staked:* \r
        :pancakes: REEF farm:   ${stakereef}
        :omtrad: MTLX farm:   ${stakemtlx}
        :omtrad: FET farm:      ${stakefet} \r
               _Total:             ${totalstaked} LP tokens_ \n
    *USDO native farm:* \r
        :usdo: ${stakeusdo} $USDO staked \n
    *USDO LP partner farms:* \r
        :pancakes: BDP farm:      ~??${abbreviateNumber(bdpfarmval)} staked
        :pancakes: ROSN farm:   ~??${abbreviateNumber(rosnfarmval)} staked
        :pancakes: FET farm:       ~??${abbreviateNumber(fetfarmval)} staked
        :pancakes: MTLX farm:   ~??${abbreviateNumber(mtlxfarmval)} staked
        :pancakes: OCP farm:      ~??${abbreviateNumber(ocpfarmval)} staked
        :pancakes: WBNB farm:  ~??${abbreviateNumber(bnbfarmval)} staked
        :pancakes: pOPEN farm: ~??${abbreviateNumber(openfarmval)} staked
               _Total:             ${totalpartner} value staked_
        `
      );
// Send result back to slack
    await ctx.client.send(message);
    };