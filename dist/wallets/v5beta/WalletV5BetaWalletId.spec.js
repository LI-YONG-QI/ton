"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@ton/core");
const WalletV5BetaWalletId_1 = require("./WalletV5BetaWalletId");
describe('Wallet V5Beta wallet id', () => {
    it('Should serialise wallet id', () => {
        const walletId = {
            walletVersion: 'v5',
            networkGlobalId: -239,
            workchain: 0,
            subwalletNumber: 0
        };
        const actual = (0, core_1.beginCell)().store((0, WalletV5BetaWalletId_1.storeWalletIdV5Beta)(walletId)).endCell();
        const expected = (0, core_1.beginCell)()
            .storeInt(walletId.networkGlobalId, 32)
            .storeInt(walletId.workchain, 8)
            .storeUint(0, 8)
            .storeUint(walletId.subwalletNumber, 32)
            .endCell();
        expect(expected.equals(actual)).toBeTruthy();
    });
    it('Should deserialise wallet id', () => {
        const expected = {
            walletVersion: 'v5',
            networkGlobalId: -239,
            workchain: 0,
            subwalletNumber: 0
        };
        const actual = (0, WalletV5BetaWalletId_1.loadWalletIdV5Beta)((0, core_1.beginCell)()
            .storeInt(expected.networkGlobalId, 32)
            .storeInt(expected.workchain, 8)
            .storeUint(0, 8)
            .storeUint(expected.subwalletNumber, 32)
            .endCell().beginParse());
        expect(expected).toEqual(actual);
    });
    it('Should serialise wallet id', () => {
        const walletId = {
            walletVersion: 'v5',
            networkGlobalId: -3,
            workchain: -1,
            subwalletNumber: 1234
        };
        const actual = (0, core_1.beginCell)().store((0, WalletV5BetaWalletId_1.storeWalletIdV5Beta)(walletId)).endCell();
        const expected = (0, core_1.beginCell)()
            .storeInt(walletId.networkGlobalId, 32)
            .storeInt(walletId.workchain, 8)
            .storeUint(0, 8)
            .storeUint(walletId.subwalletNumber, 32)
            .endCell();
        expect(expected.equals(actual)).toBeTruthy();
    });
    it('Should deserialise wallet id', () => {
        const expected = {
            walletVersion: 'v5',
            networkGlobalId: -239,
            workchain: -1,
            subwalletNumber: 1
        };
        const actual = (0, WalletV5BetaWalletId_1.loadWalletIdV5Beta)((0, core_1.beginCell)()
            .storeInt(expected.networkGlobalId, 32)
            .storeInt(expected.workchain, 8)
            .storeUint(0, 8)
            .storeUint(expected.subwalletNumber, 32)
            .endCell().beginParse());
        expect(expected).toEqual(actual);
    });
});
