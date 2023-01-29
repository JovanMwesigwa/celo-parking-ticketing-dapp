const { network } = require('hardhat')

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deployer } = await getNamedAccounts()

  const { deploy, log } = deployments

  const args = []
  const waitConfirmations = 1

  // Only verify the contract when we are deploying on celo test net
  log('Local networks detected!')

  await deploy('Ledger', {
    from: deployer,
    args: args,
    waitConfirmations: waitConfirmations,
    log: true,
  })
  log('Ledger contract deployed --------------')
}

module.exports.tags = ['all', 'deploy']
