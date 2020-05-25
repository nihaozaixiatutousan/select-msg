function trimInit(value: string):any {
  return value.trim();
}

// filter

function sliceStr(value:string , num:number):any{
  return value.substring(num);
}
// search string

function fillStr(value:string, str:string):any{
  return value.indexOf(str);
}

export {trimInit,sliceStr,fillStr};