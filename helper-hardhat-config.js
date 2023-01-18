const { ethers } = require('hardhat')

const TicketObj = {
  location: 'Naalya',
  carPlate: 'UGX-632-J',
  price: ethers.utils.parseEther('0.02'),
  isPaid: false,
}

module.exports = {
  TicketObj,
}
