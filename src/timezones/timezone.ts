import TimeZone from './timezone.enum';
import {TimeZoneInfo} from './timezone.info';

const tzinfo = require('tzinfo');

type tzi = {
    idx: number
    tt_gmtoff: number
    tt_isdst: number
    tt_abbrind: number
    abbrev: string
}

export type tzid = {
    ttimes: number[]
    types: number[]
    tzinfo: tzi[]
}


export function findData(tz: TimeZone): tzid | undefined {
  try {
    const buf = tzinfo.readZoneinfoFileSync(tz);
    if (!buf) {
      return;
    }
    return tzinfo.parseZoneinfo(buf);
  } catch (err) {
    return;
  }
}

export function getInfo(tzid: tzid, name: TimeZone, date?: Date | string): TimeZoneInfo {
  const tz: tzi = tzinfo.findTzinfo(tzid, date || new Date());
  return {
    idx: tz.idx,
    name: name,
    abbrev: tz.abbrev,
    offset: tz.tt_gmtoff,
    isDST: !!tz.tt_isdst,
  };
}

export function findInfo(tz: TimeZone, date?: Date | string): TimeZoneInfo {
  const tzid = findData(tz);
  if (!tzid) {
    throw Error(`Could not find timezone data for ${tz}`);
  }
  return getInfo(tzid, tz, date);
}
