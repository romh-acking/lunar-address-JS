export function PcToSnes(PcAddress) {
    let SnesAddress = 0;
    let IsValidPcAddress;

    if (PcAddress >= 0x7F0000)
    {
        IsValidPcAddress = false;
    }
    else
    {
        IsValidPcAddress = true;
        SnesAddress = PcAddress << 1;
        SnesAddress &= 0x7F0000;
        SnesAddress |= (PcAddress | 0x8000) & 0xFFFF;

        if (PcAddress < 0x400000)
        {
            SnesAddress += 0x800000;
        }
    }
    return [SnesAddress, IsValidPcAddress];
}

export function SnesToPc(SnesAddress) {
    let PcAddress = 0;
    let IsValidPcAddress;

    if ((SnesAddress >= 0x808000 && SnesAddress <= 0xFFFFFF) || (SnesAddress >= 0x008000 && SnesAddress <= 0x7dffff))
    {
        IsValidPcAddress = true;

        PcAddress = (SnesAddress & 0x7FFF | ((SnesAddress & 0x7F0000) >> 1));

        if (SnesAddress < 0x800000)
        {
            PcAddress += 0x400000;
        }
    }
    else
    {
        IsValidPcAddress = false;
    }

    return [PcAddress, IsValidPcAddress];
}