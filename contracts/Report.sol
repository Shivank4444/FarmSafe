// SPDX-License-Identifier: MIT

pragma solidity ^0.8.12;

//0xe9a9baa843605876f95eed6DF8230f7314F7cE91

contract Report{

    struct report{
        uint timestamp;
        string crops;
        string state;
        uint price;
        uint quantity;
        string terms;
        uint payment;
    }
    report[] Reports;

    function viewReports() public view returns(report[] memory){
        return Reports;
    }

    address[2] adminId = [0xCAb9B57a22A721F45af5f002A40Fb6818c203469];

    function LoginAsAdmin() public view returns(bool){
        for (uint i = 0; i < adminId.length; i++) {
            if (adminId[i] == msg.sender) {
                return true;
            }
        }
        return false;
    }

    modifier isPeople(){
        require(msg.sender != address(0),"Invalid Address");
        _;
    }

    function ReportCrime(string memory _crops, string memory _state, uint _price, uint _quantity, string memory _terms, uint _payment) public isPeople {
        Reports.push(report(block.timestamp, _crops,_state,_price,_quantity,_terms,_payment));
    }
}
