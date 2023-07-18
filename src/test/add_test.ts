import {DateTime, } from '../index';
import {units} from '../units/units';

const now = new DateTime();
const quarta = now.add(2, units.day);
console.log(now.isValid, quarta.isValid);
