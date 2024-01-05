// SPDX-License-Identifier: MIT

pragma solidity ^0.8.12;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


error EmptySpace();



contract AlwriteG is ERC1155, Ownable {


  
    mapping(uint256 => string) private uris;
    mapping(uint256 => bool) public idAvailability;
    mapping(address => Post) public posts;
    mapping(address => uint256) public walletInfo;
    mapping(address => uint256) public bonus;
    mapping(address => address[]) public newWhitelist;
    mapping(address => mapping(address => uint256)) public timeline;

    

    uint256 public price = 0 ether;
    uint256 public LENGTH = 10 days;
    uint256 public LENGTH_DEPLOYMENT = 30 days;
    uint256 public FreeTimeline = 30 seconds;
    uint256 public postsAllowed = 5;
    uint256 public starttime;
    uint256 public postsNumber;
    uint256 public walletSmartContract;

    bool public permissionless;

    

    
    constructor() ERC1155("") Ownable(msg.sender) {
        starttime = block.timestamp;
    }


    struct Post {
        address[] group;
        uint256 wallet;
        mapping(address => uint256) timeline;
        bool created;
    }


    struct WalletBalance {
        uint walletOwner;
        uint walletCoauthor;
    }



    function setPrice(uint256 _price) external onlyOwner {
        price = _price;
    } 


    function setPostNumberAllowed(uint256 _postNumber) external onlyOwner {
        postsAllowed = _postNumber;
    }

    function setPermisionless() external onlyOwner {
        permissionless = true;
    }


    function uri(uint256 tokenId) override public view returns (string memory) {
        return(uris[tokenId]);
    }
    
    function setTokenUri(uint256 tokenId, string memory _uri) private {
        uris[tokenId] = _uri;
    }

    function getAuthors(address _token) view public returns(address[] memory) {
        return newWhitelist[_token];
    }
    


    function addToGroupNew(address _new) external {
        Post storage newPost = posts[msg.sender];
        require(newPost.group.length < 5, "five is the most you can have");
        newPost.group.push(_new);
        newPost.timeline[_new] = block.timestamp;
    }


    function addToGroup(address _coauthor) external {
        require(newWhitelist[msg.sender].length < 5, "five is the most you can have");
        newWhitelist[msg.sender].push(_coauthor);
        timeline[msg.sender][_coauthor] = block.timestamp;
    }



    function consultantToGroup(address _coauthor) external {
        require(newWhitelist[msg.sender].length < 5, "five is the most you can have");
        newWhitelist[msg.sender].push(_coauthor);
        timeline[msg.sender][_coauthor] = block.timestamp;
    }



    function removeFromGroup(address _remove) external {
        require(_remove != address(0), "Invalid coauthor address");
        Post storage newPost = posts[msg.sender];

        if (newPost.timeline[_remove] + FreeTimeline < block.timestamp) {
            uint calc = walletInfo[msg.sender] / newPost.group.length;
            (bool su, ) = payable(_remove).call{value: calc}("");
            require(su);

            walletInfo[msg.sender] -= calc;
        }

        for (uint256 i = 0; i < newPost.group.length; i++) {
            if (newPost.group[i] == _remove) {
                // Found the coauthor, delete it by shifting the array
                newPost.group[i] = newPost.group[newPost.group.length - 1];
                newPost.group.pop();
                return;
            }
        }

        
    }



    function deposit() payable external {
        require(msg.value >= price, "Not enough eth!");
        Post storage newPost = posts[msg.sender];

        if (!newPost.created) {
            require(postsNumber < 5);
            newPost.created = true;
            postsNumber++;
        }

        newPost.wallet += msg.value;
    }




    function withdraw(address _owner) public {
        Post storage newPost = posts[_owner];
        bool open = false;
        for (uint256 i = 0; i < newPost.group.length; i++) {
            if (newPost.group[i] == msg.sender) {
                open = true;
            }
        }
        if (newPost.group.length > 0 && open) {
            for (uint256 i = 0; i < newPost.group.length; i++) {
                (bool success, ) = payable(newPost.group[i]).call{value: newPost.wallet / newPost.group.length}("");
                require(success);

                newPost.wallet = 0;

                newPost.timeline[newPost.group[i]] = block.timestamp;
            }  
        }       
    } 

    
    
    

}