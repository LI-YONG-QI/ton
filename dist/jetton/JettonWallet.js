"use strict";
/**
 * Copyright (c) Whales Corp.
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.JettonWallet = void 0;
class JettonWallet {
    static create(address) {
        return new JettonWallet(address);
    }
    constructor(address) {
        this.address = address;
    }
    async getBalance(provider) {
        let state = await provider.getState();
        if (state.state.type !== 'active') {
            return 0n;
        }
        let res = await provider.get('get_wallet_data', []);
        return res.stack.readBigNumber();
    }
}
exports.JettonWallet = JettonWallet;
