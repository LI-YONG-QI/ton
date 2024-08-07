"use strict";
/**
 * Copyright (c) Whales Corp.
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@ton/core");
const createTestClient_1 = require("../utils/createTestClient");
const JettonMaster_1 = require("./JettonMaster");
const JettonWallet_1 = require("./JettonWallet");
describe('JettonMaster', () => {
    it('should resolve jetton wallet address', async () => {
        let client = (0, createTestClient_1.createTestClient)('mainnet');
        let master = client.open(JettonMaster_1.JettonMaster.create(core_1.Address.parse('EQDQoc5M3Bh8eWFephi9bClhevelbZZvWhkqdo80XuY_0qXv')));
        let walletAddress = await master.getWalletAddress(core_1.Address.parse('EQCo6VT63H1vKJTiUo6W4M8RrTURCyk5MdbosuL5auEqpz-C'));
        let jettonData = await master.getJettonData();
        expect(walletAddress.equals(core_1.Address.parse('EQDslTlGmbLTFi0j4MPT7UVggWR7XRDI2bW6vmNG6Tc_FBDE'))).toBe(true);
        expect(jettonData.mintable).toBe(true);
        expect(jettonData.adminAddress.equals(core_1.Address.parse('EQCppzUtmGSMg3FIRlFLzhToqbaC0xjmjzOn0o7H4M8Aua1t'))).toBe(true);
        let wallet = client.open(JettonWallet_1.JettonWallet.create(walletAddress));
        let balance = await wallet.getBalance();
        expect(balance).toBe(0n);
    });
});
