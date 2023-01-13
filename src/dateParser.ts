// Date parsing is strange, so handle any finnicky stuff we want in one spot.
// Per JavaScript documentation, only intended to support YYYY-MM-DD
function parseDate(rawDate: string) : Date | undefined {
    const rawDateIsValid = Date.parse(rawDate) > 0;
    if (!rawDateIsValid) return undefined;

    return new Date(rawDate);
}

export default {
    parseDate,
}
