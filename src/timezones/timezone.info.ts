import TimeZone from "./timezone.enum";

export type TimeZoneInfo = {
    idx?: number
    name:  TimeZone | string;
    offset?: number;
    isDST?: boolean;
    abbrev?: string;
}