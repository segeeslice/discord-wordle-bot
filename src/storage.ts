import { JsonDB, Config } from 'node-json-db';

import WordleArc from './classes/WordleArc';
import WordleResult from './classes/WordleResult';
import dateUtils from './dateUtils';

const DB_NAME = "db";
const SHOULD_SAVE_AFTER_EACH_PUSH = true;
const DB_INSTANCE = new JsonDB(new Config(DB_NAME, SHOULD_SAVE_AFTER_EACH_PUSH));

async function getWordleResults(wordleNumber: number): Promise<{[key: string]: WordleResult} | undefined> {
    const dataPath = `/rawScores/${wordleNumber}`;
    const rawResult: {[key: string]: {[key: string]: number}} | undefined = await DB_INSTANCE.getData(dataPath);

    if (!rawResult) {
        return undefined;
    }

    const wordleResults: {[key: string]: WordleResult} = {};
    for (const username in rawResult) {
        if (!Object.keys(rawResult[username]).includes('score')) {
            console.warn(`Received malformatted data for username ${username}: ${rawResult[username]}`);
            continue;
        }

        wordleResults[username] = new WordleResult(wordleNumber, username, rawResult[username].score);
    }

    return wordleResults;
}

function saveWordleResult(wordleResult: WordleResult): Promise<void> {
    const dataPath = `/rawScores/${wordleResult.wordleNumber}/${wordleResult.username}`;
    const data = {
        'score': wordleResult.score,
    };

    const shouldMergeWithExisting = true;
    return DB_INSTANCE.push(dataPath, data, shouldMergeWithExisting);

    // TODO: update this to also save inside of the current arc, since we want
    //       results to be tied to ongoing arcs
}

function saveArcInformation(arcInfo: WordleArc): Promise<void> {
    const today = dateUtils.getTodaysDateWithoutTime();
    const baseDataPath : string = arcInfo.startDate >= today
        ? "/arcs/current"
        : "/arcs/past";
    const dataPath: string = `${baseDataPath}/${arcInfo.name}`;

    const data = {
        'startDate': arcInfo.startDate,
        'endDate': arcInfo.endDate,
        'wordleResults': arcInfo.arcResults
    };

    const shouldMergeWithExisting = true;
    return DB_INSTANCE.push(dataPath, data, shouldMergeWithExisting);
}

export default {
    getWordleResults,
    saveWordleResult,
    saveArcInformation
}
