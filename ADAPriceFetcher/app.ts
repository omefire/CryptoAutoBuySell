import axios from "axios";
import { Lucid, Blockfrost } from "lucid-cardano";
import { Asset, BlockfrostAdapter, NetworkId } from "@minswap/sdk";
import { BlockFrostAPI } from "@blockfrost/blockfrost-js";

async function getSNEKPrice2() {
    const api = new BlockfrostAdapter({
        networkId: NetworkId.MAINNET,
        blockFrost: new BlockFrostAPI({
            projectId: "mainnetXt6wdY4GmQQXDaJtL9NyGAwLStcH1u6P",
            network: "mainnet",
        }),
    });

    const minAdaPool = await api.getV2PoolByPair(
        Asset.fromString("lovelace"),
        Asset.fromString("29d222ce763455e3d7a09a665ce554f00ac89d2e99a1a83d267170c64d494e")
    )

    if (minAdaPool) {
        const [a, b] = await api.getV2PoolPrice({ pool: minAdaPool });
        console.log(
            `ADA/MIN price: ${a.toString()}; MIN/ADA price: ${b.toString()}`
        );
    }
}

getSNEKPrice2();

async function getSNEKPrice() {
    const api = new BlockfrostAdapter({
        networkId: NetworkId.MAINNET,
        blockFrost: new BlockFrostAPI({
            projectId: "mainnetXt6wdY4GmQQXDaJtL9NyGAwLStcH1u6P",
            network: "mainnet",
        }),
    });

    const SNEK: string = "279c909f348e533da5808898f87f9a14bb2c3dfbbacccd631d927a3f534e454b";
    const ADA: string = "lovelace";
    api.getV2PoolByPair(Asset.fromString(SNEK), Asset.fromString(ADA)).then(
        poolState => {
            console.log(poolState);
        },
        reason => {
            console.error(reason);
        });
}

getSNEKPrice2();

async function fetchSNEK() {
    //const data = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=snek&vs_currencies=usd');
    //const data = await response.json();
    //console.log(`SNEK price: $${data.snake.usd}`);

}

const intervalInMinutes = 0.1;
const intervalInMilliseconds = intervalInMinutes * 60 * 1000;

// Run the async function every x minutes
setInterval(async () => {
    console.log('Fetching SNEK price...');
    await fetchSNEK();
}, intervalInMilliseconds);