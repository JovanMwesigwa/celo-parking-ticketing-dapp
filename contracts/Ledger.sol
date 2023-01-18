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

error Ledger__NotPermitted();

contract Ledger {
    // Set the admin default address
    address private immutable i_admin;

    // Create the ticket issuing object
    struct Ticket {
        string location;
        string carNumberPlate;
        uint256 price;
        uint256 issuedAt;
        bool isPaid;
    }

    // All Tickets array
    Ticket[] private s_tickets;

    // Events
    event NewTicketIssued(string indexed carPlate, string indexed location);

    // Constructor
    constructor() {
        i_admin = msg.sender;
    }

    function createTicket(
        string memory enteredLocation,
        string memory carPlate,
        uint256 tixPrice
    ) public {
        if (msg.sender != i_admin) {
            revert Ledger__NotPermitted();
        }

        // Create a new Ticket obj
        s_tickets.push(
            Ticket(enteredLocation, carPlate, tixPrice, block.timestamp, false)
        );

        emit NewTicketIssued(carPlate, enteredLocation);
    }

    // View functions
    function getAdminAddress() public view returns (address) {
        return i_admin;
    }

    // get all tickets obj
    function getAllTickets() public view returns (Ticket[] memory) {
        return s_tickets;
    }
}
