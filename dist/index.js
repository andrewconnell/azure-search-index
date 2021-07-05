"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const axios_1 = __importDefault(require("axios"));
const API_VERSION = '2019-05-06';
async function run() {
    try {
        core.debug('Reading settings...');
        const SEARCH_INSTANCE = core.getInput('azure-search-instance');
        const SEARCH_INDEXER = core.getInput('azure-search-indexer');
        const SEARCH_ADMIN_KEY = core.getInput('azure-search-admin-key');
        // create URL for search index call
        const ENDPOINT = `https://${SEARCH_INSTANCE}.search.windows.net/indexers/${SEARCH_INDEXER}/run?api-version=${API_VERSION}`;
        // setup headers
        const HEADERS = {
            'api-key': SEARCH_ADMIN_KEY,
            'content-length': 0
        };
        // execute reindex
        try {
            core.debug(`Sending HTTP POST to ${ENDPOINT}`);
            await axios_1.default.post(ENDPOINT, undefined, { headers: HEADERS });
            core.info(`Search index '${SEARCH_INDEXER}' reindexed.`);
        }
        catch (error) {
            core.setFailed(`Failed to reindex the search index ${SEARCH_INDEXER}: ${error.message}`);
        }
    }
    catch (error) {
        core.setFailed('Unknown error occurred: ${error.message}');
    }
}
run();
