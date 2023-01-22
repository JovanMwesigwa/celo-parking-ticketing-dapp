const { ethers } = require('hardhat')

const TicketObj = {
  location: 'Naalya',
  carPlate: 'UGX-632-J',
  price: ethers.utils.parseEther('0.02'),
  isPaid: false,
}

const TicketObjTwo = {
  location: 'Kireka',
  carPlate: 'UBV-735-K',
  price: ethers.utils.parseEther('0.025'),
  isPaid: false,
}

module.exports = {
  TicketObj,
  TicketObjTwo,
}
