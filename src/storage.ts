import { JsonDB, Config } from 'node-json-db';
import WordleArc from './classes/WordleArc';
import WordleResult from './classes/WordleResult';

const DB_NAME = "db";
const SHOULD_SAVE_AFTER_EACH_PUSH = true;
const DB_INSTANCE = new JsonDB(new Config(DB_NAME, SHOULD_SAVE_AFTER_EACH_PUSH));



}

function saveWordleResult(wordleResult: WordleResult): Promise<void> {
    const dataPath = `/rawScores/${wordleResult.wordleNumber}/${wordleResult.username}`;
    const data = {
        'score': wordleResult.score,
    };

    const shouldMergeWithExisting = true;
    return DB_INSTANCE.push(dataPath, data, shouldMergeWithExisting);

interface ArcInformation {
    startDate: Date,
    endDate: Date | undefined,
    wordleResults: WordleResult[]
}

function saveArcInformation(arcInfo: WordleArc): Promise<void> {
    const dataPath = `/${arcInfo.name}`;
    const data: { [key: string]: ArcInformation } = {}; 
    data[arcInfo.name] = { 'startDate': arcInfo.startDate, 'endDate': arcInfo.endDate, 'wordleResults': arcInfo.arcResults } as ArcInformation;
    const shouldMergeWithExisting = true;
    return DB_INSTANCE.push(dataPath, data, shouldMergeWithExisting);
}

export default {
    saveWordleResult,
    saveArcInformation
}
