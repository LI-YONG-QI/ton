import { Builder, OutActionSendMsg, SendMode, Slice } from '@ton/core';
import { OutActionExtended, OutActionWalletV5 } from "../v5beta/WalletV5OutActions";
import { WalletV5R1SendArgs } from "./WalletContractV5R1";
export declare function storeOutActionExtendedV5R1(action: OutActionExtended): (builder: Builder) => void;
export declare function loadOutActionExtendedV5R1(slice: Slice): OutActionExtended;
export declare function storeOutListExtendedV5R1(actions: (OutActionExtended | OutActionSendMsg)[]): (builder: Builder) => void;
export declare function loadOutListExtendedV5R1(slice: Slice): (OutActionExtended | OutActionSendMsg)[];
/**
 * Safety rules -- actions of external messages must have +2 in the SendMode. Internal messages actions may have arbitrary SendMode.
 */
export declare function toSafeV5R1SendMode(sendMode: SendMode, authType: WalletV5R1SendArgs['authType']): number;
export declare function patchV5R1ActionsSendMode(actions: OutActionWalletV5[], authType: WalletV5R1SendArgs['authType']): OutActionWalletV5[];
