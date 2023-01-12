export class WordleResult {
    // == Fields ==

    private _wordleNumber: number = 0;
    public get wordleNumber() { return this._wordleNumber; }
    private set wordleNumber(wordleNumberIn: number) {
        this._wordleNumber = Math.round(wordleNumberIn);
        if (this._wordleNumber <= 0) throw 'Invalid Wordle number: ' + this._wordleNumber;
    }

    private _username: string = '';
    public get username() { return this._username; }
    private set username(usernameIn: string) {
        if (!usernameIn) 'Username is required';
        this._username = usernameIn;
    }

    private _score: number = 0;
    public get score() { return this._score; }
    private set score(scoreIn: number) {
        this._score = Math.round(scoreIn);
        if (this._score <= 0 || this._score > 6) throw 'Invalid score: ' + this._score;
    }

    // == Constructor ==

    public constructor(wordleNumberIn: number, usernameIn: string, scoreIn: number)
    {
        this.wordleNumber = wordleNumberIn;
        this.username = usernameIn;
        this.score = scoreIn;
    }
}

export default WordleResult;
