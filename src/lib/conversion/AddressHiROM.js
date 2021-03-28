export function PcToSnes(PcAddress) {
    let SnesAddress = 0;
    let IsValidPcAddress;

    if (PcAddress >= 0xC00000)
    {
        IsValidPcAddress = false;
    }
    else
    {
        IsValidPcAddress = true;
        SnesAddress = PcAddress | 0xC00000;
    }
    return [SnesAddress, IsValidPcAddress];
}

export function SnesToPc(SnesAddress) {
    let PcAddress = 0;
    let IsValidPcAddress;

    if ((SnesAddress >= 0xC00000 && SnesAddress <= 0xFFFFFF))
    {
        IsValidPcAddress = false;
    }
    else
    {
        IsValidPcAddress = true;
        PcAddress = (SnesAddress & 0x3FFFFF);
    }

    return [PcAddress, IsValidPcAddress];
}