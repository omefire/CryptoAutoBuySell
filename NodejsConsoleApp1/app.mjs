"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import { Lucid, Blockfrost } from "lucid-cardano";
const sdk_1 = require("@minswap/sdk");
//const { Asset, BlockfrostAdapter, NetworkId } = await import ('@minswap/sdk');
//import "@minswap/sdk";
const blockfrost_js_1 = require("@blockfrost/blockfrost-js");
async function getSNEKPrice2() {
    const api = new sdk_1.BlockfrostAdapter({
        networkId: sdk_1.NetworkId.MAINNET,
        blockFrost: new blockfrost_js_1.BlockFrostAPI({
            projectId: "mainnetXt6wdY4GmQQXDaJtL9NyGAwLStcH1u6P",
            network: "mainnet",
        }),
    });
    const minAdaPool = await api.getV2PoolByPair(sdk_1.Asset.fromString("lovelace"), sdk_1.Asset.fromString("29d222ce763455e3d7a09a665ce554f00ac89d2e99a1a83d267170c64d494e"));
    if (minAdaPool) {
        const [a, b] = await api.getV2PoolPrice({ pool: minAdaPool });
        console.log(`ADA/MIN price: ${a.toString()}; MIN/ADA price: ${b.toString()}`);
    }
}
getSNEKPrice2();
//# sourceMappingURL=app.mjs.map