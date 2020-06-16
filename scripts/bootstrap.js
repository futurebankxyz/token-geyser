const _require = require('app-root-path').require;
const BlockchainCaller = _require('/util/blockchain_caller');
const chain = new BlockchainCaller(web3);

const AmpleforthErc20 = artifacts.require('uFragments/UFragments.sol');
const TokenGeyser = artifacts.require('TokenGeyser.sol');

async function bootstrap () {
  const accounts = await chain.getUserAccounts();
  const owner = accounts[0];

  // uniAMPLV2 on rinkeby: '0xd10a9E72795FE28B82AE3FD1D33927EB50ef204b'
  const ampl = await AmpleforthErc20.at('0x027dbcA046ca156De9622cD1e2D907d375e53aa7');
  const dist = await TokenGeyser.new('0xd10a9E72795FE28B82AE3FD1D33927EB50ef204b', ampl.address,
    10, 25, 6 * 3600, 100000, {
      from: owner,
    });
  console.log('uniAMPL contract: ', '0xd10a9E72795FE28B82AE3FD1D33927EB50ef204b');
  console.log('CVTD contract:', dist.address);
  console.log("DEPLOYED")
  await ampl.approve(dist.address, '15000000000000', {
    from: owner,
  });
  console.log("APPROVED")
  await dist.lockTokens('15000000000000', 24 * 3600 * 30 * 3, {
    from: owner,
  });
  console.log("LOCKED")

  // const ampl = await AmpleforthErc20.new();
  // await ampl.initialize(owner);
  // await ampl.setMonetaryPolicy(owner);
  // await ampl.transfer(other, '10000000000000');

  // const dist = await TokenGeyser.new(ampl.address, ampl.address, 10, 25, 6 * 3600);
  // await ampl.approve(dist.address, '200000000000000');
  // await ampl.approve(dist.address, '10000000000000', {
  //   from: other
  // });
  // await dist.lockTokens('100000000000000', 24 * 3600 * 2);
  // await dist.stake('25000000000000', []);
  // await dist.stake('10000000000000', [], {
  //   from: other
  // });

  // console.log('Ampl contract:', ampl.address);
  // console.log('CVTD contract:', dist.address);

  // const t = setInterval(async () => {
  //   await chain.waitForSomeTime(1);
  // }, 1000);

  // const sleep = require('util').promisify(setTimeout);
  // await sleep(24 * 3600 * 1000);
}

module.exports = function (done) {
  bootstrap().then(done).catch(e => {
    console.error(e);
    process.exit(1);
  });
};
