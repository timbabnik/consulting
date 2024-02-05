// SPDX-License-Identifier: MIT

pragma solidity ^0.8.12;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";






contract AlwriteG is ERC1155, Ownable {


  
    
    mapping(address => Group) public consultingGroups;
    
    uint256 public FreeTimeline = 30 seconds;
    uint256 public groupsAllowed = 5;
    uint256 public groupsCounter;
    
    bool public permissionless;



    
    constructor() ERC1155("") Ownable(msg.sender) {}




    struct Group {
        address[] group;
        uint256 wallet;
        mapping(address => uint256) timeline;
        bool created;
    }






    function setGroupNumberAllowed(uint256 _groupsAllowed) external onlyOwner {
        groupsAllowed = _groupsAllowed;
    }

    function setPermisionless() external onlyOwner {
        permissionless = true;
    }


    function getGroup() view public returns(address[] memory) {
        return consultingGroups[msg.sender].group;
    }


   



    


    function addToGroupNew(address _new) external {
        Group storage newGroup = consultingGroups[msg.sender];
        require(newGroup.group.length < 5, "five is the most you can have");
        newGroup.group.push(_new);
        newGroup.timeline[_new] = block.timestamp;
    }



    function consultantToGroup(address _coauthor) payable external {
        (bool success, ) = payable(_coauthor).call{value: msg.value}("");
        require(success);
    }



    function removeFromGroup(address _remove) external {
        require(_remove != address(0), "Invalid coauthor address");
        Group storage newGroup = consultingGroups[msg.sender];

        if (newGroup.timeline[_remove] + FreeTimeline < block.timestamp) {
            uint calc = newGroup.wallet / newGroup.group.length;
            (bool su, ) = payable(_remove).call{value: calc}("");
            require(su);

            newGroup.wallet -= calc;
        }

        for (uint256 i = 0; i < newGroup.group.length; i++) {
            if (newGroup.group[i] == _remove) {
                // Found the coauthor, delete it by shifting the array
                newGroup.group[i] = newGroup.group[newGroup.group.length - 1];
                newGroup.group.pop();
                return;
            }
        }

        
    }



    function deposit() payable external {
        require(msg.value >= 0, "Not enough eth!");
        Group storage newGroup = consultingGroups[msg.sender];

        if (!newGroup.created) {
            if (!permissionless) {
                require(groupsCounter < groupsAllowed);
            }
            newGroup.created = true;
            groupsCounter++;
        }

        newGroup.wallet += msg.value;
    }




    function withdraw(address _owner) public {
        Group storage newGroup = consultingGroups[_owner];
        bool open = false;

        for (uint256 i = 0; i < newGroup.group.length; i++) {
            if (newGroup.group[i] == msg.sender) {
                open = true;
                break; // Exit the loop once found
            }
        }

        require(open, "You are not in the group");

        uint256 amountPerRecipient = newGroup.wallet / newGroup.group.length;
        uint256 remainder = newGroup.wallet % newGroup.group.length;

        for (uint256 i = 0; i < newGroup.group.length; i++) {
            uint256 amountToSend = amountPerRecipient;

            // Distribute the remainder to the first recipient
            if (i == 0) {
                amountToSend += remainder;
            }

            (bool success, ) = payable(newGroup.group[i]).call{value: amountToSend}("");
            require(success);

            newGroup.timeline[newGroup.group[i]] = block.timestamp;
        }

        newGroup.wallet = 0;
    }



    
    
    

}