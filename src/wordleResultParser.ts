import WordleResult from './classes/WordleResult';

const WORDLE_REGEX: RegExp = /Wordle (?<wordleNumber>\d+) (?<score>\d)\/6/;

function parseWordleResult (message_text: string, username: string) : WordleResult | undefined {
    let regexMatch = message_text.match(WORDLE_REGEX);
    if (!regexMatch) {
        return;
    }

    if (!regexMatch.groups) {
        throw 'Something went wrong - Wordle Regex is misconfigured';
    }

    let wordleNumber = parseInt(regexMatch.groups.wordleNumber);
    let score = parseInt(regexMatch.groups.score);

    return new WordleResult(
        wordleNumber,
        username,
        score
    );
}

export default {
    parseWordleResult
}
