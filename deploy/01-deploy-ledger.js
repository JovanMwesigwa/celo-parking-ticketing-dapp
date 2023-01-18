module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deployer } = await getNamedAccounts()

  const { deploy, log } = deployments

  const args = []
  const waitConfirmations = 1

  await deploy('Ledger', {
    from: deployer,
    args: args,
    waitConfirmations: waitConfirmations,
    log: true,
  })

  log('Ledger contract deployed --------------')
}

module.exports.tags = ['all', 'deploy']
