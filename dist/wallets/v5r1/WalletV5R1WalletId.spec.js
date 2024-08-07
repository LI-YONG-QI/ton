"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@ton/core");
const WalletV5R1WalletId_1 = require("./WalletV5R1WalletId");
describe('Wallet V5R1 wallet id', () => {
    it('Should serialise wallet id', () => {
        const walletId = {
            networkGlobalId: -239,
            context: {
                walletVersion: 'v5r1',
                workchain: 0,
                subwalletNumber: 0
            }
        };
        const actual = (0, core_1.beginCell)().store((0, WalletV5R1WalletId_1.storeWalletIdV5R1)(walletId)).endCell();
        const context = (0, core_1.beginCell)()
            .storeUint(1, 1)
            .storeInt(walletId.context.workchain, 8)
            .storeUint(0, 8)
            .storeUint(walletId.context.subwalletNumber, 15)
            .endCell().beginParse().loadInt(32);
        const expected = (0, core_1.beginCell)().storeInt(BigInt(context) ^ BigInt(walletId.networkGlobalId), 32).endCell();
        expect(expected.equals(actual)).toBeTruthy();
    });
    it('Should deserialise wallet id', () => {
        const expected = {
            networkGlobalId: -239,
            context: {
                walletVersion: 'v5r1',
                workchain: 0,
                subwalletNumber: 0
            }
        };
        const context = (0, core_1.beginCell)()
            .storeUint(1, 1)
            .storeInt(expected.context.workchain, 8)
            .storeUint(0, 8)
            .storeUint(expected.context.subwalletNumber, 15)
            .endCell().beginParse().loadInt(32);
        const actual = (0, WalletV5R1WalletId_1.loadWalletIdV5R1)((0, core_1.beginCell)().storeInt(BigInt(context) ^ BigInt(expected.networkGlobalId), 32).endCell().beginParse(), expected.networkGlobalId);
        expect(expected).toEqual(actual);
    });
    it('Should serialise wallet id', () => {
        const walletId = {
            networkGlobalId: -3,
            context: 239239239
        };
        const context = (0, core_1.beginCell)()
            .storeUint(0, 1)
            .storeUint(walletId.context, 31)
            .endCell().beginParse().loadInt(32);
        const actual = (0, core_1.beginCell)().store((0, WalletV5R1WalletId_1.storeWalletIdV5R1)(walletId)).endCell();
        const expected = (0, core_1.beginCell)()
            .storeInt(BigInt(context) ^ BigInt(walletId.networkGlobalId), 32)
            .endCell();
        expect(expected.equals(actual)).toBeTruthy();
    });
    it('Should deserialise wallet id', () => {
        const expected = {
            networkGlobalId: -3,
            context: 239239239
        };
        const context = (0, core_1.beginCell)()
            .storeUint(0, 1)
            .storeUint(expected.context, 31)
            .endCell().beginParse().loadInt(32);
        const actual = (0, WalletV5R1WalletId_1.loadWalletIdV5R1)((0, core_1.beginCell)()
            .storeInt(BigInt(context) ^ BigInt(expected.networkGlobalId), 32)
            .endCell().beginParse(), expected.networkGlobalId);
        expect(expected).toEqual(actual);
    });
});
