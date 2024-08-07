import { Builder, OutActionSendMsg, Slice } from '@ton/core';
import { OutActionExtended } from "./WalletV5OutActions";
export declare function storeOutActionExtendedV5Beta(action: OutActionExtended): (builder: Builder) => void;
export declare function loadOutActionV5BetaExtended(slice: Slice): OutActionExtended;
export declare function storeOutListExtendedV5Beta(actions: (OutActionExtended | OutActionSendMsg)[]): (builder: Builder) => void;
export declare function loadOutListExtendedV5Beta(slice: Slice): (OutActionExtended | OutActionSendMsg)[];
