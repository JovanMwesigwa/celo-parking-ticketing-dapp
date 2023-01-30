// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.7;

// 1. We need an admin address to issue a new ticket
// 2. Ticket object should have - {
//     price,
//     date created,
//     car number plate,
//     is paid -- (bool)
// }
// 3. Anyone can pay for the ticket on the owner's behalf

// NB: The car's license plate is very important because we may need to query
//     its details or loop through and filter between paid and unpaid tickets (using the license plates)

error Ledger__NotPermitted();
error Ledger__NotEnoughFundsPaid();

contract Ledger {
    // Set the admin default address
    address private immutable i_admin;
    uint256 private s_ticketCount;
    uint256 private s_ledgerBalance;

    // Create the ticket issuing object
    struct Ticket {
        uint256 ticketNumber;
        string location;
        string carNumberPlate;
        uint256 price;
        uint256 issuedAt;
        bool isPaid;
    }

    // All Tickets array
    Ticket[] private s_tickets;

    mapping(string => Ticket[]) private s_vehicleTickets;
    mapping(string => Ticket[]) private s_vehicleUpaidTickets;
    mapping(string => Ticket[]) private s_vehiclePaidTickets;

    // Events
    event NewTicketIssued(string indexed carPlate, string indexed location);
    event TicketPaid(uint256 indexed ticketNumber, string indexed carPlate);

    // Constructor
    constructor() {
        i_admin = msg.sender;
        s_ticketCount = 0;
        s_ledgerBalance = 0;
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
            Ticket(
                s_ticketCount,
                enteredLocation,
                carPlate,
                tixPrice,
                block.timestamp,
                false
            )
        );

        s_vehicleTickets[carPlate].push(
            Ticket(
                s_ticketCount,
                enteredLocation,
                carPlate,
                tixPrice,
                block.timestamp,
                false
            )
        );

        s_vehicleUpaidTickets[carPlate].push(
            Ticket(
                s_ticketCount,
                enteredLocation,
                carPlate,
                tixPrice,
                block.timestamp,
                false
            )
        );

        s_ticketCount += 1;

        // add the vehicle to the s_vehicleTicket mapping
        emit NewTicketIssued(carPlate, enteredLocation);
    }

    function payTicket(
        string memory carPlate,
        uint256 ticketNo
    ) public payable {
        // Get the required ticket
        Ticket memory vehicleTicket = s_vehicleTickets[carPlate][ticketNo];
        uint256 tixPrice = vehicleTicket.price;

        // Verify to see that they'repaying the right ticket amount
        if (msg.value < tixPrice) {
            revert Ledger__NotEnoughFundsPaid();
        }

        // Update the contract balances
        s_ledgerBalance += msg.value;

        // Change the in memory vehicleTicket is Paid to true
        vehicleTicket.isPaid = true;

        // Change the isPaid status to true in the all s_tickets array
        Ticket storage fromAllTix = s_tickets[ticketNo];
        fromAllTix.isPaid = true;

        // Change in the vehicleTicket isPaid to true
        s_vehicleTickets[carPlate][ticketNo].isPaid = true;

        // Clear / Remove the ticket from the vehicle's unpaid tickets
        delete s_vehicleUpaidTickets[carPlate][ticketNo];

        // Add it to the paid tickets array;
        s_vehiclePaidTickets[carPlate].push(vehicleTicket);

        // Emit event to show a new ticket paid..
        emit TicketPaid(ticketNo, carPlate);
    }

    // View functions
    function getAdminAddress() public view returns (address) {
        return i_admin;
    }

    // get all tickets obj
    function getAllTickets() public view returns (Ticket[] memory) {
        return s_tickets;
    }

    function getTicketInfo(
        uint256 ticketNo
    ) public view returns (Ticket memory) {
        // return s_vehicleUpaidTickets[carPlate][ticketNo];
        return s_tickets[ticketNo];
    }

    // Get vehicle tickets
    function getVehicleTickets(
        string memory carPlate
    ) public view returns (Ticket[] memory) {
        return s_vehicleTickets[carPlate];
    }

    function getVehicleUnPaidTickets(
        string memory carPlate
    ) public view returns (Ticket[] memory) {
        return s_vehicleUpaidTickets[carPlate];
    }

    function getVehiclePaidTickets(
        string memory carPlate
    ) public view returns (Ticket[] memory) {
        return s_vehiclePaidTickets[carPlate];
    }
}
