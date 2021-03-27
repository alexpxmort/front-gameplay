export const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
  }

export const setNull = (str)=>{
  str = String(str)
  if(str.toLowerCase() == 'null'){
    str = null
  }

  return str
}

export const  empty = ( val ) =>{

  // test results
  //---------------
  // []        true, empty array
  // {}        true, empty object
  // null      true
  // undefined true
  // ""        true, empty string
  // ''        true, empty string
  // 0         false, number
  // true      false, boolean
  // false     false, boolean
  // Date      false
  // function  false

      if (val === undefined)
      return true;

  if (typeof (val) == 'function' || typeof (val) == 'number' || typeof (val) == 'boolean' || Object.prototype.toString.call(val) === '[object Date]')
      return false;

  if (val == null || val.length === 0)        // null or 0 length array
      return true;

  if (typeof (val) == "object") {
      // empty object

      var r = true;

      for (var f in val)
          r = false;

      return r;
  }

  if( val == '<empty string>')
  return true

  return false;
}