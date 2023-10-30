import {datetime, TimeZone, units, setDefaultTimeZone} from '../index';
setDefaultTimeZone(TimeZone['UTC']);

const factored = [
    units.millisecond,
    units.second,
    units.minute,
    units.hour,
    units.day,
    units.week,
];

const notFactored = [
    units.month,
    units.year,
];

function testClone(): void {
    const now = datetime();
    const cloned = now.clone();
    const match = now.unix() == cloned.unix();
    if (!match) {
        throw Error('clone unix does not match');
    }
}

function testTimezoneImmutability() {
    const n = new Date();
    const now = datetime(n);
    console.log({now});

    if (now.unix() != n.getTime()) {
        throw Error(`now is ${now.unix()}, but should be ${n.getTime()}`);
    }
    for (const tz of Object.values(TimeZone)) {
        const target = now.tz(tz);
        if (now.unix() != target.unix()) {
            throw Error(`now is ${now.unix()}, but in ${tz} is ${target.unix()}`);
        }
        console.log(`${tz} ok`);
    }
    const end = datetime();
    console.log(`test took ${end.unix() - now.unix()}ms`);
}

function testAddFactor() {
    const now = datetime();
    for (const factor of factored) {
        // @ts-ignore
        const added = now.add(1, factor);
    }
    const end = datetime();
    console.log(`test took ${end.unix() - now.unix()}ms`);
}
function testAddNotFactored(): void {
    const now = datetime();
    for (const un of notFactored) {
        const added = now.add(14, un);
        console.log(added);
    }
    const end = datetime();
    console.log(`test took ${end.unix() - now.unix()}ms`);
}

function testLeapYear(): void {
    const lastLeapYear = datetime('2020-02-29', 'UTC');
    const next = lastLeapYear.add(1, units.year);
    console.log({lastLeapYear, next});
}

function format(): void {
    const now = datetime();
    console.log(now.format());
}

testClone();
testTimezoneImmutability();
testAddNotFactored();
testAddFactor();
testLeapYear();
format();
