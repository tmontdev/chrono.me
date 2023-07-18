import TimeZone from './timezones/timezone.enum';
import {findData, getInfo, tzid} from './timezones/timezone';
import {TimeZoneInfo} from './timezones/timezone.info';
import {unitFactor, units} from './units/units';
export {TimeZoneInfo} from './timezones/timezone.info';
export {unitFactor, units} from './units/units';
export {default as Timezone} from './timezones/timezone.enum';

// @ts-ignore
// eslint-disable-next-line new-cap
const local: TimeZone = TimeZone[Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC'];
const localtzid: tzid | undefined = findData(local);


export class DateTime {
  private _date: Date;
  private timezone?: TimeZoneInfo;
  private tzid?: tzid;

  get isValid(): boolean {
    return !isNaN(this._date.valueOf()) &&
            !!this.timezone?.idx &&
            !isNaN(this.timezone.idx!);
  }

  unix(): number {
    return this._date.getTime();
  }

  add(amount: number, unit: units = units.millisecond): DateTime {
    // @ts-ignore
    const milli = this.unix() + (amount * unitFactor[unit]);
    return new DateTime(milli);
  }


  constructor();
  constructor(date?: string | number | Date);
  constructor(...props: any[]) {
    if (!props.length) {
      this._date = new Date();
    } else {
      this._date = new Date(props.at(0));
    }

    this.tzid = localtzid;
    if (this.tzid) {
      this.timezone = getInfo(this.tzid, local, this._date);
    }
    return;
  }
}

export function datetime(date?: string | number | Date): DateTime {
  return new DateTime(date);
}

