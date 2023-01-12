import { JsonDB, Config } from 'node-json-db';
import WordleResult from './classes/WordleResult';

const SHOULD_SAVE_AFTER_EACH_PUSH = true;

const RAW_SCORE_DB_NAME = "raw_scores";
const RAW_SCORE_DB_INSTANCE = new JsonDB(new Config(
    RAW_SCORE_DB_NAME,
    SHOULD_SAVE_AFTER_EACH_PUSH));

// TODO: Utilize this to calculate and store comparative scores on each wordle save
// const COMPARATIVE_SCORE_DB_NAME = "comparative_scores";
// const COMPARATIVE_SCORE_DB_INSTANCE = new JsonDB(new Config(
//     COMPARATIVE_SCORE_DB_NAME,
//     SHOULD_SAVE_AFTER_EACH_PUSH));

interface UserScoreDetails {
   score: number
}

function saveWordleResult(wordleResult: WordleResult): Promise<void> {
    const dataPath = `/${wordleResult.wordleNumber}`;
    const data: { [key: string]: UserScoreDetails } = {};
    data[wordleResult.username] = { 'score': wordleResult.score } as UserScoreDetails;
    const shouldMergeWithExisting = true;

    return RAW_SCORE_DB_INSTANCE.push(dataPath, data, shouldMergeWithExisting);
}

export default {
    saveWordleResult,
}
