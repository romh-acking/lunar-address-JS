  export function decToHex(decAddr){
    let bank = (decAddr & 0xFF0000) >> 16;
    let hiLo = (decAddr & 0x00FFFF);

    return `$${bank.toString(16).toUpperCase().padStart(2, "0")}:${hiLo.toString(16).toUpperCase().padStart(4, "0")}`;
  }

  export function hexToDec(hexString){
    hexString = hexString.replace(/[^0-9a-fA-F]+/g, "");
    return parseInt(hexString, 16);
  }