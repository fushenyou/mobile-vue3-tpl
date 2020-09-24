import _numeral from "numeral";
import dayjs from "dayjs";

/**
 * @description 金额、时间、字节、进度格式化
 * ```js
 * 用法{{ value | numeral('￥0.00')}}
 *
 * // 金额格式化
 * null => ￥0.00 => ￥0.00
 * 0 => 0,0.00 => 0.00
 * 1000.234 => 0,0.00 => 1,000.23
 * 1000.234 => 0,0.00[0] => 1,000.234
 *
 * //时间格式化
 * 0 => '00:00:00' => '0:00:00'
 * null => '00:00:00' => '0:00:00'
 * 25 => '00:00:00' => '0:00:25'
 * 238 => '00:00:00' => '0:03:58'
 * 63846 => '00:00:00' => '17:44:06'
 * ```
 * // 字节
 * 100 => '0b' => '100B'
 * 5242880 => '0b' => '5M'
 *
 * //进度格式化
 * 0.13 => "0%" => "13%"
 * 0.974878234 => '0.000%' => '97.488%'
 * @param {*} value
 * @param {*} format
 */
export function numeral(value: any, format: string): string {
  return _numeral(value).format(format);
}
/**
 * @description 字符串时间转时间对象
 * @param {*} value
 * @param {*} format defaut YYYYMMDDHHmmss
 */
export function str2Date(value: dayjs.ConfigType, format = "YYYYMMDDHHmmss"): dayjs.Dayjs {
  return dayjs(value, format);
}

/**
 * @description 时间转字符串
 * @param {*} value
 * @param {*} format
 */
export function date2Str(value: dayjs.ConfigType, format = "YYYY-MM-DD HH:mm:ss"): string {
  return dayjs(value).format(format);
}

/**
 * @description 时间字符串格式化
 * @param {*} value 输入值
 * @param {*} from 输入时间格式
 * @param {*} to 输出时间格式
 */
export function dateStrFormat(value: dayjs.ConfigType, from: string, to: string): string {
  return date2Str(str2Date(value, from), to);
}

/**
 * @description 计算输入时间与当前时间相差时间
 * 距离现在的相对时间 .fromNow(withoutSuffix?: boolean)
 * 返回 string 距离现在的相对时间
 * 距离 X 的相对时间 .from(compared: Dayjs, withoutSuffix?: boolean)
 * 返回 string 距离 X 的相对时间
 * 到现在的相对时间 .toNow(withoutSuffix?: boolean)
 * 返回 string 到现在的相对时间
 * 到 X 的相对时间 .to(compared: Dayjs, withoutSuffix?: boolean)
 * 返回 string 到 X 的相对时间
 */
export function relative(
  value: dayjs.ConfigType,
  format: string,
  type: "fromNow" | "from" | "toNow" | "to" = "from"
): string {
  return (<any>str2Date(value, format))[type]();
}

/**
 * 将后台返回YYYY-MM-DD HH:mm:ss 格式时间字符串 直接截取
 * @param {*} value
 */
export function subYMD(value: string, num = 10): string {
  if (!value) return "--";
  return value.substr(0, num);
}

export function hideIdCard(value: string): string {
  if (!value) return "--";
  return value.substr(0, 5) + " ***** ***** " + value.substr(-3);
}

export function hideMobile(value: string): string {
  if (!value) return "--";
  return value.substr(0, 3) + " **** " + value.substr(-4);
}
