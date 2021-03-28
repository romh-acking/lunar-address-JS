import { romType } from "./romType"

export function getLocalLastChangedIsPCAddress() {
    let lastChangedIsPCAddress = localStorage.getItem('lastChangedIsPCAddress');

    lastChangedIsPCAddress = (lastChangedIsPCAddress === null || lastChangedIsPCAddress === undefined || lastChangedIsPCAddress === "true");

    return lastChangedIsPCAddress;
}

export function setLocalLastChangedIsPCAddress(value) {
    localStorage.setItem('lastChangedIsPCAddress', value);
}

export function getLocalLastChangedAddress(){
    let lastChangedAddress_ = localStorage.getItem('lastChangedAddress');

    if (lastChangedAddress_ === null){
      lastChangedAddress_ = "$00:0000";
    }

    return lastChangedAddress_;
}

export function setLocalLastChangedAddress(value) {
    localStorage.setItem('lastChangedAddress', value);
}


export function getLocalRomTypeDropdown(){
    let romTypeDropdown_ = localStorage.getItem('romTypeDropdown');

    if (romTypeDropdown_ === null){
        romTypeDropdown_ = romType.LoROM1;
    }

    return romTypeDropdown_;
}

export function setLocalRomTypeDropdown(value) {
    localStorage.setItem('romTypeDropdown', value);
}