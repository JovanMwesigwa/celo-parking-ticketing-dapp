// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";
/*
    1. We need an admin address to issue a new ticket
    2. Ticket object should have - {
        price,
        date created,
        car number plate,
        is paid -- (bool)
    }
    3. Anyone can pay for the ticket on the owner's behalf

    NB: The car's license plate is very important because we may need to query 
        its details or loop through and filter between paid and unpaid tickets (using the license plates)
 */

contract Ledger {
    // Set the admin default address
    address private i_admin;

    // Create the ticket issuing object
    struct Ticket {
        string location;
        string carNumberPlate;
        uint256 price;
        uint256 issuedAt;
        bool isPaid;
    }

    // All Tickets array
    Ticket[] private tickets;

    // Constructor
    constructor() {
        i_admin = msg.sender;
    }

    // View functions
    function getAdminAddress() public view returns (address) {
        return i_admin;
    }

    // get all tickets obj
    function getAllTickets() public view returns (Ticket[] memory) {
        return tickets;
    }
}
