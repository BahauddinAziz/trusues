pragma solidity ^0.5.0;

contract Trusues{
    
    struct account{
        string username;
        string password;
    }
    
    mapping(address => mapping(string => account)) private accounts;
    
    function addAccounts(string memory accountName, string memory username, string memory password) public {
        accounts[msg.sender][accountName].username = username; 
        accounts[msg.sender][accountName].password = password; 
    }
    
    function getAccounts(address addr, string memory accountName) view public 
    returns(string memory username, string memory password){
        username = accounts[addr][accountName].username;
        password = accounts[addr][accountName].password;
    }
}