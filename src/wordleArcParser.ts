import WordleArc from './classes/WordleArc';
import WordleResult from './classes/WordleResult';

// We can expand this further with regex if desired
function parseArcInformation (message_text: string) : WordleArc | undefined {
    let parts = message_text.split(/\s+/);

    let command = parts[0];
    let arcName = parts[1];
    let startDate = parts[2];
    let endDate = parts[3];

    if (command != 'addarc') return;
    if (!arcName) throw 'Arc Name is required';
    if (!startDate) throw 'Start Date is required';

    return new WordleArc(
        arcName,
        new Date(startDate),
        new Date(endDate),
        new Array()
    );
}

export default {
    parseArcInformation
}