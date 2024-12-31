import { Asset, BlockfrostAdapter, NetworkId } from "@minswap/sdk";
import { BlockFrostAPI } from "@blockfrost/blockfrost-js";
import axios from "axios";
import fs from 'fs';
const env = JSON.parse(fs.readFileSync("./env.json").toString());
const api = new BlockfrostAdapter({
    networkId: NetworkId.MAINNET,
    blockFrost: new BlockFrostAPI({
        projectId: env.BLOCKFROST_API_KEY,
        network: "mainnet",
    }),
});
async function getSNEKPrice() {
    const snekAdaPool = await api.getV2PoolByPair(Asset.fromString("lovelace"), Asset.fromString("279c909f348e533da5808898f87f9a14bb2c3dfbbacccd631d927a3f534e454b") // SNEK
    );
    if (snekAdaPool) {
        const [a, b] = await api.getV2PoolPrice({ pool: snekAdaPool });
        //console.log(`ADA/SNEK price: 1 SNEK is ${a.toString()} ADA;`); // SNEK/ADA price: 1 ADA is ${b.toString()} SNEK
        const resp = await axios.get('https://api.binance.com/api/v3/ticker/price?symbol=ADAUSDT');
        const snekPriceInUSD = resp.data.price * a;
        console.log(`SNEK/USDT price: 1 SNEK is ${snekPriceInUSD} USDT`);
    }
}
// Get the price every 1 minute
(async function getSNEKPrice2() {
    await getSNEKPrice();
    setTimeout(getSNEKPrice2, 1000 * 60);
})();
//# sourceMappingURL=app.js.map