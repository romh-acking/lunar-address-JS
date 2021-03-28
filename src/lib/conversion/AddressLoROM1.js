export function PcToSnes(PcAddress) {
    let SnesAddress = 0;
    let IsValidPcAddress;

    if (PcAddress >= 0x400000)
    {
        IsValidPcAddress = false;
    }
    else
    {
        IsValidPcAddress = true;
        SnesAddress = PcAddress << 1;
        SnesAddress &= 0x7F0000;
        SnesAddress |= (PcAddress | 0x8000) & 0xFFFF;

        if (PcAddress > 0x380000)
        {
            SnesAddress += 0x800000;
        }
    }
    
    return [SnesAddress, IsValidPcAddress];
}

export function SnesToPc(SnesAddress) {
    let PcAddress = 0;
    let IsValidPcAddress;

    if (SnesAddress >= 0x8000 && SnesAddress <= 0x6FFFFF)
    {
        IsValidPcAddress = true;
        PcAddress = (SnesAddress & 0x7FFF | ((SnesAddress & 0x7F0000) >> 1));
    }
    else
    {
        IsValidPcAddress = false;
    }

    return [PcAddress, IsValidPcAddress];
}