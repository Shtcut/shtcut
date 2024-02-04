import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import * as dateFns from 'date-fns';
import { Between } from 'typeorm';
import * as _ from 'lodash';
import slugify from 'slugify';
import { Dict } from '../types';

export abstract class Utils {
  public static getCountryCallingCode(code = 'NG') {
    const countryCode = [
      { AF: '+93' },
      { AX: '+358' },
      { AL: '+355' },
      { DZ: '+213' },
      { AS: '+1684' },
      { AD: '+376' },
      { AO: '+244' },
      { AI: '+1264' },
      { AQ: '+672' },
      { AG: '+1268' },
      { AR: '+54' },
      { AM: '+374' },
      { AW: '+297' },
      { AU: '+61' },
      { AT: '+43' },
      { AZ: '+994' },
      { BS: '+1242' },
      { BH: '+973' },
      { BD: '+880' },
      { BB: '+1246' },
      { BY: '+375' },
      { BE: '+32' },
      { BZ: '+501' },
      { BJ: '+229' },
      { BM: '+1441' },
      { BT: '+975' },
      { BO: '+591' },
      { BQ: '+5997' },
      { BA: '+387' },
      { BW: '+267' },
      { BV: '+' },
      { BR: '+55' },
      { IO: '+246' },
      { UM: '+' },
      { VG: '+1284' },
      { VI: '+1 340' },
      { BN: '+673' },
      { BG: '+359' },
      { BF: '+226' },
      { BI: '+257' },
      { KH: '+855' },
      { CM: '+237' },
      { CA: '+1' },
      { CV: '+238' },
      { KY: '+1345' },
      { CF: '+236' },
      { TD: '+235' },
      { CL: '+56' },
      { CN: '+86' },
      { CX: '+61' },
      { CC: '+61' },
      { CO: '+57' },
      { KM: '+269' },
      { CG: '+242' },
      { CD: '+243' },
      { CK: '+682' },
      { CR: '+506' },
      { HR: '+385' },
      { CU: '+53' },
      { CW: '+599' },
      { CY: '+357' },
      { CZ: '+420' },
      { DK: '+45' },
      { DJ: '+253' },
      { DM: '+1767' },
      { DO: '+1809' },
      { EC: '+593' },
      { EG: '+20' },
      { SV: '+503' },
      { GQ: '+240' },
      { ER: '+291' },
      { EE: '+372' },
      { ET: '+251' },
      { FK: '+500' },
      { FO: '+298' },
      { FJ: '+679' },
      { FI: '+358' },
      { FR: '+33' },
      { GF: '+594' },
      { PF: '+689' },
      { TF: '+' },
      { GA: '+241' },
      { GM: '+220' },
      { GE: '+995' },
      { DE: '+49' },
      { GH: '+233' },
      { GI: '+350' },
      { GR: '+30' },
      { GL: '+299' },
      { GD: '+1473' },
      { GP: '+590' },
      { GU: '+1671' },
      { GT: '+502' },
      { GG: '+44' },
      { GN: '+224' },
      { GW: '+245' },
      { GY: '+592' },
      { HT: '+509' },
      { HM: '+' },
      { VA: '+379' },
      { HN: '+504' },
      { HK: '+852' },
      { HU: '+36' },
      { IS: '+354' },
      { IN: '+91' },
      { ID: '+62' },
      { CI: '+225' },
      { IR: '+98' },
      { IQ: '+964' },
      { IE: '+353' },
      { IM: '+44' },
      { IL: '+972' },
      { IT: '+39' },
      { JM: '+1876' },
      { JP: '+81' },
      { JE: '+44' },
      { JO: '+962' },
      { KZ: '+76' },
      { KE: '+254' },
      { KI: '+686' },
      { KW: '+965' },
      { KG: '+996' },
      { LA: '+856' },
      { LV: '+371' },
      { LB: '+961' },
      { LS: '+266' },
      { LR: '+231' },
      { LY: '+218' },
      { LI: '+423' },
      { LT: '+370' },
      { LU: '+352' },
      { MO: '+853' },
      { MK: '+389' },
      { MG: '+261' },
      { MW: '+265' },
      { MY: '+60' },
      { MV: '+960' },
      { ML: '+223' },
      { MT: '+356' },
      { MH: '+692' },
      { MQ: '+596' },
      { MR: '+222' },
      { MU: '+230' },
      { YT: '+262' },
      { MX: '+52' },
      { FM: '+691' },
      { MD: '+373' },
      { MC: '+377' },
      { MN: '+976' },
      { ME: '+382' },
      { MS: '+1664' },
      { MA: '+212' },
      { MZ: '+258' },
      { MM: '+95' },
      { NA: '+264' },
      { NR: '+674' },
      { NP: '+977' },
      { NL: '+31' },
      { NC: '+687' },
      { NZ: '+64' },
      { NI: '+505' },
      { NE: '+227' },
      { NG: '+234' },
      { NU: '+683' },
      { NF: '+672' },
      { KP: '+850' },
      { MP: '+1670' },
      { NO: '+47' },
      { OM: '+968' },
      { PK: '+92' },
      { PW: '+680' },
      { PS: '+970' },
      { PA: '+507' },
      { PG: '+675' },
      { PY: '+595' },
      { PE: '+51' },
      { PH: '+63' },
      { PN: '+64' },
      { PL: '+48' },
      { PT: '+351' },
      { PR: '+1787' },
      { QA: '+974' },
      { XK: '+383' },
      { RE: '+262' },
      { RO: '+40' },
      { RU: '+7' },
      { RW: '+250' },
      { BL: '+590' },
      { SH: '+290' },
      { KN: '+1869' },
      { LC: '+1758' },
      { MF: '+590' },
      { PM: '+508' },
      { VC: '+1784' },
      { WS: '+685' },
      { SM: '+378' },
      { ST: '+239' },
      { SA: '+966' },
      { SN: '+221' },
      { RS: '+381' },
      { SC: '+248' },
      { SL: '+232' },
      { SG: '+65' },
      { SX: '+1721' },
      { SK: '+421' },
      { SI: '+386' },
      { SB: '+677' },
      { SO: '+252' },
      { ZA: '+27' },
      { GS: '+500' },
      { KR: '+82' },
      { SS: '+211' },
      { ES: '+34' },
      { LK: '+94' },
      { SD: '+249' },
      { SR: '+597' },
      { SJ: '+4779' },
      { SZ: '+268' },
      { SE: '+46' },
      { CH: '+41' },
      { SY: '+963' },
      { TW: '+886' },
      { TJ: '+992' },
      { TZ: '+255' },
      { TH: '+66' },
      { TL: '+670' },
      { TG: '+228' },
      { TK: '+690' },
      { TO: '+676' },
      { TT: '+1868' },
      { TN: '+216' },
      { TR: '+90' },
      { TM: '+993' },
      { TC: '+1649' },
      { TV: '+688' },
      { UG: '+256' },
      { UA: '+380' },
      { AE: '+971' },
      { GB: '+44' },
      { US: '+1' },
      { UY: '+598' },
      { UZ: '+998' },
      { VU: '+678' },
      { VE: '+58' },
      { VN: '+84' },
      { WF: '+681' },
      { EH: '+212' },
      { YE: '+967' },
      { ZM: '+260' },
      { ZW: '+263' },
    ];
    const countryCallNum = countryCode.find((c) => c[code]);
    return countryCallNum[code];
  }

  /**
   * The function adds a specified number of hours to the current date and time.
   * @param [hour=1] - The "hour" parameter is an optional parameter that specifies the number of hours
   * to add to the current date and time. If no value is provided, it defaults to 1.
   * @returns a Date object with the hour increased by the specified amount.
   */
  public static addHourToDate(hour = 1) {
    const date = new Date();
    const hours = date.getHours() + hour;
    date.setHours(hours);
    return date;
  }

  /**
   * The function generates a random code of a specified size, consisting of either numbers or
   * alphanumeric characters.
   * @param [size=6] - The size parameter determines the length of the generated code. By default, it
   * is set to 6, but you can change it to any positive integer value to generate a code of that
   * length.
   * @param [alpha=false] - The "alpha" parameter is a boolean value that determines whether the
   * generated code should include alphabetic characters (A-Z, a-z) or only numeric characters (0-9).
   * If "alpha" is set to true, the generated code will include alphabetic characters along with
   * numeric characters. If "
   * @returns a randomly generated code of the specified size.
   */
  public static generateCode(size = 6, alpha = false) {
    const characters = alpha ? '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz' : '0123456789';
    const charactersArray = characters.split('');
    let selections = '';
    for (let i = 0; i < size; i++) {
      const index = Math.floor(Math.random() * charactersArray.length);
      selections += charactersArray[index];
      charactersArray.splice(index, 1);
    }
    return selections;
  }

  /**
   * The function generates a unique ID by combining a key with a randomly generated UUID.
   * @param {string} key - The `key` parameter is a string that is used as a prefix for generating a
   * unique ID. If a `key` is provided, it will be used as the prefix. If no `key` is provided, the
   * default value of `'key'` will be used as the prefix.
   * @returns a string that consists of the provided key (or the string 'key' if no key is provided)
   * concatenated with a unique identifier generated by the uuidv4() function.
   */
  public static generateUniqueId(key: string): string {
    return `${key || 'key'}-${uuidv4()}`;
  }

  /**
   * The function checks if a given string is a valid UUID.
   * @param {string} id - The `id` parameter is a string representing a UUID (Universally Unique
   * Identifier).
   * @returns The function `isValidUUID` returns a boolean value.
   */
  public static isValidUUID(id: string): boolean {
    const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
    return regexExp.test(id);
  }

  /**
   * This function takes a string and returns a slugified version of it, converting it to lowercase and
   * replacing spaces with hyphens.
   * @param {string} text - The input text that needs to be converted into a slug format.
   * @returns If the `text` parameter is null, undefined, or empty, then it will return the same value.
   * If the `text` parameter contains spaces, then it will return a slugified version of the text in
   * lowercase. Otherwise, it will return the `text` parameter in lowercase.
   */
  public static slugifyText(text: string) {
    if (text === null || typeof text === 'undefined' || _.isEmpty(text)) {
      return text;
    }
    if (text.indexOf(' ') >= 0) {
      return slugify(text.toLowerCase());
    }
    return text.toLowerCase();
  }

  /**
   * The function updates the verification status of an object by setting the value of a specific key
   * to true and removing the corresponding verification code.
   * @param object - The `object` parameter is an object that contains two properties: `verifications`
   * and `verificationCodes`.
   * @param key - The "key" parameter is a unique identifier used to update a specific verification in
   * the object. It is used as a key to access and update the corresponding verification value in the
   * "verifications" object.
   * @returns an object with two properties: "verificationCodes" and "verifications".
   */
  public static updateVerification(object, key) {
    const verifications = {
      ...object.verifications,
      [key]: true,
    };
    const verificationCodes = _.omit({ ...object.verificationCodes }, [key]);
    return { verificationCodes, verifications };
  }

  /**
   * The function checks if a value is a valid MongoDB ObjectId.
   * @param value - The `value` parameter is the value that needs to be checked if it is a valid
   * MongoDB ObjectId.
   * @returns a boolean value.
   */
  static isObjectId(value): boolean {
    try {
      return value && value.length > 12 && String(new mongoose.Types.ObjectId(value)) === String(value);
    } catch (e) {
      return false;
    }
  }

  /**
   * The function adds a "deleted" property with a value of false to an object.
   * @param {Dict} object - The parameter "object" is a dictionary object.
   * @returns a new object that is a copy of the input object with an additional property "deleted" set
   * to false.
   */
  static conditionWithDelete(object: Dict) {
    return { ...object, deleted: false };
  }

  /**
   * The function converts a value to a MongoDB ObjectId using the mongoose library.
   * @param value - The value parameter is the value that you want to convert to a MongoDB ObjectId.
   * @returns a new instance of the mongoose.Types.ObjectId class, with the value passed as an
   * argument.
   */
  static toObjectId(value) {
    return new mongoose.Types.ObjectId(value);
  }

  /**
   * The function generates a date range for a given date, based on the specified database type.
   * @param {string} date - A string representing a specific date.
   * @param [dbType=NoSQL] - The `dbType` parameter is a string that specifies the type of database
   * being used. It has a default value of `'NoSQL'`, but can be overridden with a different value if
   * needed.
   * @returns an object that represents a date range. The format of the returned object depends on the
   * value of the `dbType` parameter. If `dbType` is set to 'NoSQL', the returned object will have the
   * properties `` and ``, which are used in NoSQL databases to represent less than or equal to
   * and greater than or equal to comparisons. If `
   */
  public static generateSingleDateRange(date: string, dbType = 'NoSQL') {
    const startDate = dateFns.startOfDay(dateFns.parseISO(date));
    const endDate = dateFns.endOfDay(dateFns.parseISO(date));
    return dbType === 'NoSQL' ? { $lte: startDate, $gte: endDate } : Between(startDate, endDate);
  }

  /**
   * The function `toObjectIdValue` takes an array of object IDs and a record object, and returns a new
   * object with the same keys as the input object, but with the values converted to object IDs.
   * @param {string[]} objectIds - An array of string values representing the keys of the properties in
   * the `obj` parameter that need to be converted to ObjectId values.
   * @param obj - The `obj` parameter is an object of type `Record<string, any>`. This means it is an
   * object with string keys and values of any type.
   * @returns an object where the keys are the elements of the `objectIds` array, and the values are
   * the result of calling the `toObjectId` function on the corresponding values in the `obj` object.
   */
  public static toObjectIdValue(objectIds: string[], obj: Record<string, any>) {
    return objectIds.reduce((acc, key) => {
      if (_.has(obj, key)) {
        acc[key] = this.toObjectId(obj[key]);
      }
      return acc;
    }, {});
  }

  /**
   * The function generates a date range based on the input object and database type.
   * @param {any} obj - The `obj` parameter is a JSON string that represents a date range. It should
   * have the following structure:
   * @param [dbType=NoSQL] - The `dbType` parameter is a string that specifies the type of database
   * being used. It has a default value of 'NoSQL', but can be overridden with a different value if
   * needed.
   * @returns The function `generateDateRange` returns either an object or a function call, depending
   * on the value of the `dbType` parameter. If `dbType` is equal to 'NoSQL', it returns an object with
   * two properties: `` and ``, which represent the start and end dates of the date range. If
   * `dbType` is not equal to 'NoSQL',
   */
  public static generateDateRange(obj: any, dbType = 'NoSQL') {
    try {
      const dateRange: any = JSON.parse(obj);
      if (dateRange && dateRange.startDate && dateRange.endDate) {
        const startDate = dateFns.startOfDay(dateFns.parseISO(dateRange.startDate));
        const endDate = dateFns.endOfDay(dateFns.parseISO(dateRange.endDate));
        return dbType === 'NoSQL' ? { $lte: startDate, $gte: endDate } : Between(startDate, endDate);
      }
      return this.generateSingleDateRange(dateRange.startDate || dateRange.endDate || new Date(), dbType);
    } catch (e) {
      throw this.generateSingleDateRange(obj, dbType);
    }
  }

  /**
   * The function cleans up a mobile number by removing leading zeros and adding the country code if
   * necessary.
   * @param mobile - The `mobile` parameter is the mobile number that needs to be cleaned up.
   * @returns the cleaned up mobile number.
   */
  public static cleanUpMobileNumber(mobile) {
    let mobileNo = mobile.toString().trim();
    if (mobile.substring(0, 1) === '0' && mobileNo.length === 11) {
      mobile = `234${mobile.substring(1)}`;
    } else if (mobileNo.substring(0, 1) !== '+') {
      mobileNo = `${mobileNo}`;
    }
    return mobileNo;
  }

  public static isLocalAddress(ip: string) {
    return /^(127\.0\.0\.1|::1|fe80(:1)?::1(%.*)?)$/i.test(ip);
  }
  public static mongoUpdateDefaultProps(obj?: Dict) {
    return { upsert: true, new: true, ...obj };
  }
}
