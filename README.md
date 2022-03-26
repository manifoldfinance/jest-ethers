# @contractshark/jest-env



## Quickstart 

```shell
yarn add -D @contractshark/jest-env
```


## Ganache Provider Interface


```typescript
/**
* IEthereumOptions
* @export
* @class EthersJestEnvironment
* @extends {NodeEnvironment}
*/
export interface IEthereumOptions {
      account_keys_path?: string;
      accounts?: object[];
      allowUnlimitedContractSize?: boolean;
      blockTime?: number;
      db_path?: string;
      debug?: boolean;
      default_balance_ether?: number;
      fork?: string | object;
      fork_block_number?: string | number;
      forkCacheSize?: number;
      gasLimit?: string | number;
      gasPrice?: string;
      hardfork?: "[]";
      hd_path?: string;
      locked?: boolean;
          logger?: {
            log(msg: string): void,
          };
    networkId?: number;
    port?: number;
    seed?: any;
    time?: Date;
    total_accounts?: number;
    unlocked_accounts?: string[];
    verbose?: boolean;
    vmErrorsOnRPCResponse?: boolean;
    ws?: boolean;
}

```

## Ethers

Injected Web3 via Ethers provider for mainnet/testnet testing:

```javascript
test('accounts', async () => {
    const unlockedAccounts = ethersProvider.getAccounts();

    expect(unlockedAccounts.length).toBe(10);
});

```


## License 

Apache-2.0
