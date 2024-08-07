"use strict";
/**
 * Copyright (c) Whales Corp.
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletContractV2R2 = void 0;
const core_1 = require("@ton/core");
const createWalletTransfer_1 = require("./signing/createWalletTransfer");
class WalletContractV2R2 {
    static create(args) {
        return new WalletContractV2R2(args.workchain, args.publicKey);
    }
    constructor(workchain, publicKey) {
        this.workchain = workchain;
        this.publicKey = publicKey;
        // Build initial code and data
        let code = core_1.Cell.fromBoc(Buffer.from('te6cckEBAQEAYwAAwv8AIN0gggFMl7ohggEznLqxnHGw7UTQ0x/XC//jBOCk8mCDCNcYINMf0x8B+CO78mPtRNDTH9P/0VExuvKhA/kBVBBC+RDyovgAApMg10qW0wfUAvsA6NGkyMsfy//J7VQETNeh', 'base64'))[0];
        let data = (0, core_1.beginCell)()
            .storeUint(0, 32) // Seqno
            .storeBuffer(publicKey)
            .endCell();
        this.init = { code, data };
        this.address = (0, core_1.contractAddress)(workchain, { code, data });
    }
    /**
     * Get Wallet Balance
     */
    async getBalance(provider) {
        let state = await provider.getState();
        return state.balance;
    }
    /**
     * Get Wallet Seqno
     */
    async getSeqno(provider) {
        let state = await provider.getState();
        if (state.state.type === 'active') {
            let res = await provider.get('seqno', []);
            return res.stack.readNumber();
        }
        else {
            return 0;
        }
    }
    /**
     * Send signed transfer
     */
    async send(provider, message) {
        await provider.external(message);
    }
    /**
     * Sign and send transfer
     */
    async sendTransfer(provider, args) {
        let transfer = this.createTransfer(args);
        await this.send(provider, transfer);
    }
    /**
     * Create signed transfer
     */
    createTransfer(args) {
        let sendMode = core_1.SendMode.PAY_GAS_SEPARATELY;
        if (args.sendMode !== null && args.sendMode !== undefined) {
            sendMode = args.sendMode;
        }
        return (0, createWalletTransfer_1.createWalletTransferV2)({
            seqno: args.seqno,
            sendMode,
            secretKey: args.secretKey,
            messages: args.messages,
            timeout: args.timeout
        });
    }
    /**
     * Create sender
     */
    sender(provider, secretKey) {
        return {
            send: async (args) => {
                let seqno = await this.getSeqno(provider);
                let transfer = this.createTransfer({
                    seqno,
                    secretKey,
                    sendMode: args.sendMode,
                    messages: [(0, core_1.internal)({
                            to: args.to,
                            value: args.value,
                            init: args.init,
                            body: args.body,
                            bounce: args.bounce
                        })]
                });
                await this.send(provider, transfer);
            }
        };
    }
}
exports.WalletContractV2R2 = WalletContractV2R2;
