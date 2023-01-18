const { getNamedAccounts, deployments, ethers } = require('hardhat')
const { assert, expect } = require('chai')
const { TicketObj } = require('../helper-hardhat-config')

describe('Ledger', function () {
  let signer, ledgerContract, ledgerAddress
  beforeEach(async function () {
    // get the deployer
    const { deployer } = await getNamedAccounts()

    await deployments.fixture(['all'])

    const contract = await ethers.getContract('Ledger')
    ledgerAddress = contract.address

    // signer
    const signers = await ethers.getSigners()
    signer = signers[0]

    // connect signer
    // ledgerContract = await contract.connect(signer)
    ledgerContract = await contract.connect(signer)
  })

  it('Should deploy the contract successfully', async function () {
    assert(ledgerContract.address)
  })

  describe('Constructor', function () {
    it('Should set the admin address successfully', async function () {
      const currentAddress = signer.address
      const adminAddress = await ledgerContract.getAdminAddress()

      assert.equal(currentAddress, adminAddress.toString())
    })
  })

  describe('CreateTicket', function () {
    let localSigner, localContract

    beforeEach(async function () {
      const signers = await ethers.getSigners()
      localSigner = signers[0]

      // connect local signer to local contract
      localContract = await ledgerContract.connect(localSigner)
    })

    it('Should fail when non admin creates a ticket', async function () {
      expect(
        await localContract.createTicket(
          TicketObj.location,
          TicketObj.carPlate,
          TicketObj.price
        )
      ).to.be.reverted
    })

    it('Should successfully add a ticket to the contract', async function () {
      const tx = await ledgerContract.createTicket(
        TicketObj.location,
        TicketObj.carPlate,
        TicketObj.price
      )

      await tx.wait(1)

      const tickets = await ledgerContract.getAllTickets()
      assert.isArray(tickets)
    })
  })
})
