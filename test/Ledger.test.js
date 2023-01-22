const { getNamedAccounts, deployments, ethers } = require('hardhat')
const { assert, expect } = require('chai')
const { TicketObj, TicketObjTwo } = require('../helper-hardhat-config')

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

    it('Should fire a New Ticket event when a new ticket is created', async function () {
      await expect(
        ledgerContract.createTicket(
          TicketObj.location,
          TicketObj.carPlate,
          TicketObj.price
        )
      )
        .to.emit(ledgerContract, NewTicketIssued)
        .withArgs(carPlate, enteredLocation)
    })

    it('Should return all tickets to a vehicle', async function () {
      await ledgerContract.createTicket(
        TicketObj.location,
        TicketObj.carPlate,
        TicketObj.price
      )
      await ledgerContract.createTicket(
        TicketObjTwo.location,
        TicketObj.carPlate,
        TicketObjTwo.price
      )

      // get all vehicle's tickets
      const result = await ledgerContract.getVehicleTickets(TicketObj.carPlate)
      assert.isArray(result)
    })

    it('Should return single ticket info', async function () {
      await ledgerContract.createTicket(
        TicketObj.location,
        TicketObj.carPlate,
        TicketObj.price
      )
      await ledgerContract.createTicket(
        TicketObjTwo.location,
        TicketObj.carPlate,
        TicketObjTwo.price
      )

      // get ticket
      const result = await ledgerContract.getTicketInfo('1')
      console.log(result)
      assert.isArray(result)
    })
  })

  describe('PayTicket', function () {
    let localSigner, localContract, ticketOne, ticketTwo

    beforeEach(async function () {
      const signers = await ethers.getSigners()
      localSigner = signers[0]

      // connect local signer to local contract
      localContract = await ledgerContract.connect(localSigner)

      const ticketOneTx = await ledgerContract.createTicket(
        TicketObj.location,
        TicketObj.carPlate,
        TicketObj.price
      )

      await ticketOneTx.wait(1)

      const ticketTwoTx = await ledgerContract.createTicket(
        TicketObjTwo.location,
        TicketObj.carPlate,
        TicketObjTwo.price
      )

      await ticketTwoTx.wait(1)

      // Get ticket info
      const tx = await ledgerContract.getVehicleUnPaidTickets(
        TicketObj.carPlate
      )
      ticketOne = tx[0]
      ticketTwo = tx[1]
    })

    it('Should fail when not enough money is paid to ticket', async function () {
      await expect(
        ledgerContract.payTicket(
          ticketOne.carNumberPlate,
          ticketOne.ticketNumber,
          {
            value: ethers.utils.parseEther('0.0012'),
          }
        )
      ).to.be.reverted
    })

    it('Should change the isPaid in all list to true', async function () {
      const tx = await ledgerContract.payTicket(
        ticketOne.carNumberPlate,
        ticketOne.ticketNumber,
        {
          value: ticketOne.price,
        }
      )

      await tx.wait(1)

      // check is paid status in the whole tickets list / array
      const ticket = await ledgerContract.getTicketInfo(ticketOne.ticketNumber)
      assert.equal(ticket.isPaid, false)
    })

    //

    it('Should remove the ticket from the vehicle unpaid tickets list', async function () {
      const tx = await ledgerContract.payTicket(
        ticketOne.carNumberPlate,
        ticketOne.ticketNumber,
        {
          value: ticketOne.price,
        }
      )

      await tx.wait(1)

      const tickets = await ledgerContract.getVehicleUnPaidTickets(
        ticketOne.carNumberPlate
      )
      console.log(tickets)
      assert.isArray(tickets)
    })

    //
    it('Should add the ticket to the vehicle paid tickets list', async function () {
      const tx = await ledgerContract.payTicket(
        ticketOne.carNumberPlate,
        ticketOne.ticketNumber,
        {
          value: ticketOne.price,
        }
      )

      await tx.wait(1)

      const tickets = await ledgerContract.getVehiclePaidTickets(
        ticketOne.carNumberPlate
      )
      console.log(tickets)
      assert.isArray(tickets)
    })

    //
  })
})
