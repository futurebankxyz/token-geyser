const AmpleforthErc20 = artifacts.require('uFragments/UFragments.sol');
const ContVestTokenDist = artifacts.require('ContVestTokenDist.sol');

async function bootstrap () {
  const ampl = await AmpleforthErc20.at('0x027dbcA046ca156De9622cD1e2D907d375e53aa7');
  const dist = await ContVestTokenDist.new(ampl.address, ampl.address, 10, 25, 6 * 3600, 100000);
  console.log("--Contract deployed");
  await ampl.approve(dist.address, '10000000000000');
  console.log("--AMPL approved");
  await dist.lockTokens('10000000000000', 24 * 3600 * 30);
  console.log("--AMPL locked");
  console.log('Ampl contract:', ampl.address);
  console.log('CVTD contract:', dist.address);
}

module.exports = function (done) {
  bootstrap().then(done).catch(e => {
    console.error(e);
    process.exit(1);
  });
};
