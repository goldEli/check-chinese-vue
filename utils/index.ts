// import api from "@/apis/index";

import { Ref } from "nuxt/dist/app/compat/capi";

// export const useApi = () => api;

// export const getNeedArr = (array, size) => {
//   //获取所需指定长度分割的数组;参数1为用于分割的总数组,参数2为分割数组后每个小数组的长度
//   const length = array.length;
//   //判断不是数组，或者size没有设置，size小于1，就返回空数组
//   if (!length || !size || size < 1) {
//     return [];
//   }
//   //核心部分
//   let index = 0; //用来表示切割元素的范围start
//   let resIndex = 0; //用来递增表示输出数组的下标

//   //根据length和size算出输出数组的长度，并且创建它。
//   let result = new Array(Math.ceil(length / size));
//   //进行循环
//   while (index < length) {
//     //循环过程中设置result[0]和result[1]的值。该值根据array.slice切割得到。
//     result[resIndex++] = array.slice(index, (index += size));
//   }
//   //输出新数组
//   return result;
// };

export function isObject(obj: any) {
  if (Array.isArray(obj)) {
    return true;
  }
  return Object.prototype.toString.call(obj) === "[object Object]";
}

export function handleParams(obj: Ref<any> | any) {
  if (!isObject(obj)) {
    return obj;
  }
  if (isRef(obj)) {
    const o = obj.value as any;
    for (const key in o) {
      if (isObject(o[key])) {
        (obj.value as any)[key] = JSON.stringify(o[key]);
      }
    }
  } else {
    for (const key in obj) {
      if (isObject(obj[key])) {
        obj[key] = JSON.stringify(obj[key]);
      }
    }
  }
  return obj;
}
