"use strict";
/* Made by @Gusarich and @Miandic */
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultisigOrder = void 0;
const crypto_1 = require("@ton/crypto");
const core_1 = require("@ton/core");
class MultisigOrder {
    constructor(payload) {
        this.signatures = {};
        this.payload = payload;
    }
    static fromCell(cell) {
        let s = cell.beginParse();
        let signatures = s.loadMaybeRef()?.beginParse();
        const messagesCell = s.asCell();
        let order = new MultisigOrder(messagesCell);
        if (signatures) {
            while (signatures.remainingBits > 0) {
                const signature = signatures.loadBuffer(64);
                const ownerId = signatures.loadUint(8);
                order.signatures[ownerId] = signature;
                if (signatures.remainingRefs > 0) {
                    signatures = signatures.loadRef().asSlice();
                }
                else {
                    signatures.skip(1);
                }
            }
            signatures.endParse();
        }
        return order;
    }
    static fromPayload(payload) {
        return new MultisigOrder(payload);
    }
    addSignature(ownerId, signature, multisig) {
        const signingHash = this.payload.hash();
        if (!(0, crypto_1.signVerify)(signingHash, signature, multisig.owners.get(ownerId).slice(0, -1))) {
            throw Error('invalid signature');
        }
        this.signatures[ownerId] = signature;
    }
    sign(ownerId, secretKey) {
        const signingHash = this.payload.hash();
        this.signatures[ownerId] = (0, crypto_1.sign)(signingHash, secretKey);
        return signingHash;
    }
    unionSignatures(other) {
        this.signatures = Object.assign({}, this.signatures, other.signatures);
    }
    clearSignatures() {
        this.signatures = {};
    }
    toCell(ownerId) {
        let b = (0, core_1.beginCell)().storeBit(0);
        for (const ownerId in this.signatures) {
            const signature = this.signatures[ownerId];
            b = (0, core_1.beginCell)()
                .storeBit(1)
                .storeRef((0, core_1.beginCell)()
                .storeBuffer(signature)
                .storeUint(parseInt(ownerId), 8)
                .storeBuilder(b)
                .endCell());
        }
        return (0, core_1.beginCell)()
            .storeUint(ownerId, 8)
            .storeBuilder(b)
            .storeBuilder(this.payload.asBuilder())
            .endCell();
    }
}
exports.MultisigOrder = MultisigOrder;
