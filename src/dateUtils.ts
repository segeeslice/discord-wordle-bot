function removeTimeFromDate(date: Date) : Date {
    date.setUTCHours(0, 0, 0, 0);
    return date;
}

function getTodaysDateWithoutTime() : Date {
    const now = new Date();
    return removeTimeFromDate(now);
}

export default {
    removeTimeFromDate,
    getTodaysDateWithoutTime,
}
