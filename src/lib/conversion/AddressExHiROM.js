export function PcToSnes(PcAddress) {
    let SnesAddress = 0;
    let IsValidPcAddress;

    if (PcAddress >= 0x7E0000)
    {
        IsValidPcAddress = false;
    }
    else
    {
        IsValidPcAddress = true;

        SnesAddress = PcAddress;
        if (PcAddress < 0x400000)
        {
            SnesAddress |= 0xC00000;
        }

        if (PcAddress >= 0x7E0000)
        {
            SnesAddress -= 0x400000;
        }
    }
    return [SnesAddress, IsValidPcAddress];
}

export function SnesToPc(SnesAddress) {
    let PcAddress = 0;
    let IsValidPcAddress;

    if ((SnesAddress >= 0xC00000 && SnesAddress <= 0xFFFFFF) || (SnesAddress >= 0x400000 && SnesAddress <= 0x7DFFFF))
    {
        IsValidPcAddress = true;
        PcAddress = SnesAddress & 0x3FFFFF;

        if (SnesAddress < 0xC00000)
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