import * as core from "@actions/core";
import github from "@actions/github";
import Axios from "axios";

const API_VERSION = '2019-05-06';

async function run(): Promise<void> {
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
      core.debug(`Sending HTTP POST to ${ENDPOINT}`)

      await Axios.post(ENDPOINT, undefined, { headers: HEADERS } );
      core.info(`Search index '${SEARCH_INDEXER}' reindexed.`);
    } catch (error) {
      core.setFailed(`Failed to reindex the search index ${SEARCH_INDEXER}: ${error.message}`);
    }
  } catch (error) {
    core.setFailed('Unknown error occurred: ${error.message}');
  }
}

run();