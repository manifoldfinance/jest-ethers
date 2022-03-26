/** 
 *  @package EthersJestEnvironment
 *  @version DRAFT
 *  @author Sam Bacha
 *  @summary TODO: Write summary for EthersJestEnvironment
 * 
 */

import { Config } from '@jest/types';
import NodeEnvironment from 'jest-environment-node';
import { validate } from 'jest-validate';

import { AddressInfo } from 'net';
import { ethers } from 'ethers';
//import { server } from '@ganache/core/lib/index';
//import { JsonRpcProvider } from 'ethers';
import * as JestGanache from '@ganache/core/lib/src/server';
import Ganache, { ServerOptions } from '@ganache/core/typings';
import { server } from '@ganache/cli';
//import { Provider } from '@ganache/core/lib/src/provider';
//mport type Ganache from '@ganache/core/typings';
import "@ganache/options";
// IProviderOptions
import { Connector as EthereumConnector, Provider as EthereumProvider } from "@ganache/ethereum";
export type { Provider as EthereumProvider } from "@ganache/ethereum";
import { Connector, ConnectorsByName, DefaultFlavor, FlavorName } from "@ganache/flavors";
export declare type Provider = Connector["provider"];
import { Options as ProviderOptions } from "@ganache/flavors";

import { Definitions } from "@ganache/options";


/**
 * 
 *
 * @export
 * @class EthersJestEnvironment
 * @extends {NodeEnvironment}
 */
export default class EthersJestEnvironment extends NodeEnvironment {
  server: typeof Ganache | undefined = undefined;
  options: Partial<JestGanache.Server>;
  Options: ServerOptions<"ethereum">;
  ethereum: any;

  constructor(config: Config.ProjectConfig) {
    super(config);

    const options = config.testEnvironmentOptions as any;
    validate(options, {
      exampleConfig: {
        fork_block_number: 12057129,
        port: 8545,
        db_path: '',
        vmErrorsOnRPCResponse: true,
        gasLimit: 200000000000,
        allowUnlimitedContractSize: true,
        gasPrice: '0x2E90EDD000',
        unlocked_accounts: [],
        network_id: 1,
        networkId: 1,
        fork: '',
        accounts: [],
        _chainIdRpc: 1,
        _chainId: 1,
      },
    });

    this.options = options;
  }

  async setup(): Promise<void> {
    await super.setup();

    const server = Ganache.server(this.Options);

    await new Promise<void>((resolve, reject) => {
      server
        .on('open', () => {
          console.log('Ganache started successfully', this.options.port);
          if (this.options.fork) {
            console.log(`Forked off of node: ${this.options.fork}\n`);
          }
          console.log(
            `\nTest chain started on port ${this.options.port}, listening...`,
          );
          resolve();
        })
            // @ts-expect-error
        .on('error', reject)
        .listen(0, 'localhost');
    });

        // @ts-expect-error
    const { port } = server.address() as AddressInfo;

    this.ethereum.server = server;

    this.global.ganacheUrl = `ws://localhost:${port}`;

    this.global.ethersProvider = new ethers.providers.Web3Provider(
      server.provider as any,
    );
  }

  async teardown(): Promise<void> {
    if (this.server) {
          // @ts-expect-error
      this.server.close();
    }

    await super.teardown();
  }

  runScript<T>(script: any): T | null {
    // @ts-expect-error
    return super.runScript(script);
  }
}
