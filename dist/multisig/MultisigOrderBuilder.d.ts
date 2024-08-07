import { Builder, MessageRelaxed } from '@ton/core';
import { MultisigOrder } from './MultisigOrder';
export declare class MultisigOrderBuilder {
    messages: Builder;
    queryId: bigint;
    private walletId;
    private queryOffset;
    constructor(walletId: number, offset?: number);
    addMessage(message: MessageRelaxed, mode: number): void;
    clearMessages(): void;
    build(): MultisigOrder;
    private updateQueryId;
}
