import WordleResult from './WordleResult';

export class WordleArc {

    private _name: string = '';
    public get name() { return this._name; }
    private set name(nameIn: string) {
        this._name = nameIn;
        if (!this._name) throw 'Invalid Arc Name: ' + this._name;
    }

    private _startDate: Date = new Date();
    public get startDate() { return this._startDate; }
    private set startDate(dateIn: Date) {
        this._startDate = dateIn;
        if (!this._startDate) throw 'Invalid Arc Start Date: ' + this._startDate;
    }

    private _endDate: Date = new Date();
    public get endDate() { return this._endDate; }
    private set endDate(dateIn: Date | undefined | null) {
        if (!dateIn) {
            this._endDate = new Date();
        }
        else {
            this._endDate = dateIn;
        }
    }

    private _arcResults: WordleResult[] = new Array();
    public get arcResults() { return this._arcResults; }
    private set arcResults(results: WordleResult[]) {
        this._arcResults = results;
        if (!this._arcResults) this._arcResults = new Array();
     }

    public constructor(nameIn: string, startDate: Date, endDate: Date | undefined, results: WordleResult[]) {
        this.name = nameIn;
        this.startDate = startDate;
        this.endDate = endDate;
        this.arcResults = results;
    }
}

export default WordleArc;