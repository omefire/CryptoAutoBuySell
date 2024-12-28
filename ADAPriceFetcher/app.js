"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
function fetchSNEK() {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield axios_1.default.get('https://api.coingecko.com/api/v3/simple/price?ids=snake&vs_currencies=usd').then(response => response.data);
        //const data = await response.json();
        console.log(`SNEK price: $${data.snake.usd}`);
    });
}
const intervalInMinutes = 1;
const intervalInMilliseconds = intervalInMinutes * 60 * 1000;
// Run the async function every x minutes
setInterval(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Fetching SNEK price...');
    yield fetchSNEK();
}), intervalInMilliseconds);
//# sourceMappingURL=app.js.map