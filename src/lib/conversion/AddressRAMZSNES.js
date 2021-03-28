export function PcToSnes(PcAddress) {
    let SnesAddress = 0;
    let IsValidPcAddress;

    if (PcAddress < 0xC13 || PcAddress >= 0x20C13)
    {
        IsValidPcAddress = false;
    }
    else
    {
        IsValidPcAddress = true;
        SnesAddress = 0xC13 + 0x7E0000;
    }
    
    return [SnesAddress, IsValidPcAddress];
}

export function SnesToPc(SnesAddress) {
    let PcAddress = 0;
    let IsValidPcAddress;

    if (SnesAddress >= 0x7E0000 && SnesAddress <= 0x7FFFFF)
    {
        IsValidPcAddress = true;
        PcAddress = (0x1FFFF & SnesAddress) + 0xC13;
    }
    else
    {
        IsValidPcAddress = false;
    }


    return [PcAddress, IsValidPcAddress];
}