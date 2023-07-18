export enum units {
    millisecond = 'millisecond',
    second = 'second',
    minute = 'minute',
    hour = 'hour',
    day = 'day',
    week = 'week',
    month = 'month',
    year = 'year'
};

export enum unitFactor {
    millisecond = 1,
    second = millisecond * 1000,
    minute = second * 60,
    hour = minute * 60,
    day = hour * 24,
    week = day * 7
}