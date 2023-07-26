import {DateTime, TimeZone, units} from '../index';

const now = new DateTime();
const utc = new DateTime(new Date(), TimeZone.UTC);

console.log(utc.unix(), now.unix());
