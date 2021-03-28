export function PcToSnes(PcAddress) {
    let SnesAddress = 0;
    let IsValidPcAddress;

    if (!(PcAddress >= 0x20C13 && PcAddress < 0x30C13))
    {
        IsValidPcAddress = false;
    }
    else
    {
        IsValidPcAddress = true;
        SnesAddress = (PcAddress - 0x20C13) >> 1;
    }
    
    return [SnesAddress, IsValidPcAddress];
}

export function SnesToPc(SnesAddress) {
    let PcAddress = 0;
    let IsValidPcAddress;

    if (SnesAddress >= 0x0000 && SnesAddress < 0x8000)
    {
        IsValidPcAddress = true;
        PcAddress = (SnesAddress << 1) + 0x20C13;

    }
    else 
    {
        IsValidPcAddress = false;
    }

    return [PcAddress, IsValidPcAddress];
}