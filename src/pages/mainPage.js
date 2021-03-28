import { Button, Grid,  Paper, Typography, makeStyles, Container,} from "@material-ui/core";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import React, { useEffect, useState } from 'react';
import { useThemeDispatch } from "../context/theme/context";
import { useThemeState } from "../context/theme";
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import { useDispatch } from "react-redux";
import { setSnackbar } from "../context/snackbar/snackbar";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { romType } from "../lib/romType"
import { autodetect } from "../lib/autodetect"
import { decToHex, hexToDec } from "../lib/conversion/HexConversion"

import { PcToSnes as addressLoROM1PcToSnes, SnesToPc as addressLoROM1SnesToPc } from "../lib/conversion/AddressLoROM1"
import { PcToSnes as addressLoROM2PcToSnes, SnesToPc as addressLoROM2SnesToPc } from "../lib/conversion/AddressLoROM2"
import { PcToSnes as addressHiROMPcToSnes, SnesToPc as addressHiROMSnesToPc } from "../lib/conversion/AddressHiROM"
import { PcToSnes as addressExLoROMPcToSnes, SnesToPc as addressExLoROMSnesToPc } from "../lib/conversion/AddressExLoROM"
import { PcToSnes as addressExHiROMPcToSnes, SnesToPc as addressExHiROMSnesToPc } from "../lib/conversion/AddressExHiROM"
import { PcToSnes as addressRAMPcToSnes, SnesToPc as addressRAMSnesToPc } from "../lib/conversion/AddressRAMZSNES"
import { PcToSnes as addressVRAMPcToSnes, SnesToPc as addressVRAMSnesToPc } from "../lib/conversion/AddressVRAMZSNES"

import { 
  getLocalLastChangedIsPCAddress, setLocalLastChangedIsPCAddress,
  getLocalLastChangedAddress, setLocalLastChangedAddress,
  getLocalRomTypeDropdown, setLocalRomTypeDropdown

} from "../lib/localStorage"

import AlertDialog from "./aboutModal"

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
    maxWidth: 300,
  },
  paper: {
    padding: theme.spacing(4),
    margin: "auto",
  },
  img: {
    width: "100%",
  },
  divider: {
    marginBottom: theme.spacing(2),
  },
}));

const romTypesDropdownItems = [
  { id: romType.LoROM1, label: 'LoROM: 00:8000 - 6F:FFFF' },
  { id: romType.LoROM2, label: 'LoROM: 80:8000 - FF:FFFF' },
  { id: romType.HiROM, label: 'HiROM: C0:0000 - FF:FFFF' },
  { id: romType.ExLoROM, label: 'ExLoROM: 80:8000 - FF:FFFF & 00:8000 - 7D:FFFF' },
  { id: romType.ExHiROM, label: 'ExHiROM: C0:0000 - FF:FFFF & 40:0000 - 7D:FFFF' },
  { id: romType.RAM, label: 'RAM: 7E:0000 - 7F:FFFF' },
  { id: romType.VRAM, label: 'VRAM: 0000 - FFFF' }
];

export default function Users() {
  const classes = useStyles();

  const { theme } = useThemeState();
  const dispatchTheme = useThemeDispatch();

  const _toggleTheme = () => dispatchTheme({ type: "TOGGLE_THEME" });

  const dispatch = useDispatch();

  const [pcAddress, setPcAddress] = useState("$00:0000");
  const [snesAddress, setSnesAddress] = useState("$00:0000");
  const [romTypeDropdown, setRomTypeDropdown] = React.useState(romType.LoROM1);
  const [lastChangedIsPCAddress, setLastChangedIsPCAddress] = React.useState(true);

  const [isMounted, setIsmounted] = React.useState(false);

  function onSnesAddressChange(value, addressType) {
      setSnesAddress(value);

      setLocalLastChangedIsPCAddress(false);
      setLocalLastChangedAddress(value)

      setLastChangedIsPCAddress(false);
      let decimal = hexToDec(value)

      let ret;
      switch(addressType) {
        case romType.LoROM1:
          ret = addressLoROM1SnesToPc(decimal);
          break;
        case romType.LoROM2:
          ret = addressLoROM2SnesToPc(decimal);
          break;
        case romType.HiROM:
          ret = addressHiROMSnesToPc(decimal);
          break;
        case romType.ExLoROM:
          ret = addressExLoROMSnesToPc(decimal);
          break;
        case romType.ExHiROM:
          ret = addressExHiROMSnesToPc(decimal);
          break;
        case romType.RAM:
          ret = addressRAMSnesToPc(decimal);
          break;
        case romType.VRAM:
          ret = addressVRAMSnesToPc(decimal);
          break;
        default:
          dispatch(
            setSnackbar(
              true,
              "error",
              "Invalid rom type"
            )
          )
          return;
      }

      setPcAddress(decToHex(ret[0]));

      if (!ret[1]){
        dispatch(
          setSnackbar(
            true,
            "error",
            "Invalid SNES address"
          )
        )
      }
  }

  function onPcAddressChange(value, addressType) {
      setPcAddress(value);

      setLocalLastChangedIsPCAddress(true);
      setLocalLastChangedAddress(value)

      setLastChangedIsPCAddress(true);
      let decimal = hexToDec(value);
      let ret;
      switch(addressType) {
        case romType.LoROM1:
          ret = addressLoROM1PcToSnes(decimal);
          break;
        case romType.LoROM2:
          ret = addressLoROM2PcToSnes(decimal);
          break;
        case romType.HiROM:
          ret = addressHiROMPcToSnes(decimal);
          break;
        case romType.ExLoROM:
          ret = addressExLoROMPcToSnes(decimal);
          break;
        case romType.ExHiROM:
          ret = addressExHiROMPcToSnes(decimal);
          break;
        case romType.RAM:
          ret = addressRAMPcToSnes(decimal);
          break;
        case romType.VRAM:
          ret = addressVRAMPcToSnes(decimal);
          break;
        default:
          dispatch(
            setSnackbar(
              true,
              "error",
              "Invalid rom type"
            )
          )
          return;
      }

      setSnesAddress(decToHex(ret[0]));
      
      if (!ret[1]){
        dispatch(
          setSnackbar(
            true,
            "error",
            "Invalid PC address"
          )
        )
      }
  }
  

  const handleChange = (event) => {
    setRomTypeDropdown(event.target.value);
  };

  useEffect(() => {
    if (isMounted) {
      setLocalRomTypeDropdown(romTypeDropdown);

      if (lastChangedIsPCAddress) {
        onPcAddressChange(pcAddress, romTypeDropdown);
      } 
      else {
        onSnesAddressChange(snesAddress, romTypeDropdown);
      }
    }
  // eslint-disable-next-line
  }, [ romTypeDropdown ]);

  useEffect(() => {
    let lastChangedIsPCAddress_ = getLocalLastChangedIsPCAddress()
    setLastChangedIsPCAddress(lastChangedIsPCAddress_);

    let romTypeDropdown_ = getLocalRomTypeDropdown()
    setRomTypeDropdown(romTypeDropdown_);

    let lastChangedAddress_ = getLocalLastChangedAddress();

    if (lastChangedIsPCAddress_) {
      onPcAddressChange(lastChangedAddress_, romTypeDropdown_);
    } else {
      onSnesAddressChange(lastChangedAddress_, romTypeDropdown_);
    }

    setIsmounted(true);

  // eslint-disable-next-line
  }, [ ]);

	const changeHandlerAutoDetect = (event) => {
		let file = event.target.files[0];

    const reader = new FileReader()

    reader.onload = event => {
      const buffer = reader.result;
      const data = new Int8Array(buffer);
      let identifiedRomType = autodetect(data);

      if (identifiedRomType !== romType.Invalid) {
        setRomTypeDropdown(identifiedRomType);

        dispatch(
          setSnackbar(
            true,
            "success",
            `ROM memory map type indentified as: ${identifiedRomType}`
          )
        )
      } else {
        dispatch(
          setSnackbar(
            true,
            "error",
            "Cannot determine ROM memory map type."
          )
        )
      }
    }

    reader.readAsArrayBuffer(file);
	};

  return (
    <>
      <Paper className={classes.paper}>
        <Grid container justify="space-between" alignItems="flex-start">
          <Grid item>
            <Typography gutterBottom variant="h4">
              Lunar Address JS
            </Typography>
          </Grid>

          <Grid item>
            <Grid container spacing={4} alignItems="center">
              <Grid item>
              <label htmlFor="upload-photo">
                <input
                  style={{ display: 'none' }}
                  id="upload-photo"
                  name="upload-photo"
                  accept=".smc,.sfc"
                  type="file"
                  onChange={changeHandlerAutoDetect} 
                />

                <Button color="primary" variant="contained" component="span">
                  Auto-Detect Type
                </Button>
              </label>

              </Grid>
              
              <Grid item>
                <AlertDialog />
              </Grid>
              
              <Grid item>
                <IconButton onClick={_toggleTheme}>
                { theme === "light" ? <Brightness7Icon /> : <Brightness4Icon /> }
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>

      <br/>

      <Paper className={classes.paper}>
        <>
          <Container>
             <Grid container spacing={6}>
               <Grid item md={12}>
                 <FormControl className={classes.formControl} variant="filled">
                   <InputLabel>SNES ROM Type</InputLabel>
                   <Select value={romTypeDropdown} onChange={handleChange}>
                     {romTypesDropdownItems.map((x) => (
                         <MenuItem key={x.id} value={x.id}>{x.label}</MenuItem>
                     ))}
                   </Select>
                 </FormControl>
               </Grid>
                <Grid item md={6}>
                 <TextField
                   label="PC Address"
                   variant="filled"
                   value={pcAddress}
                   onChange={ (e) => onPcAddressChange(e.target.value, romTypeDropdown) }
                 />
               </Grid>
               <Grid item md={6}>
                <TextField
                  label="SNES Address"
                  variant="filled"
                  value={snesAddress}
                  onChange={ (e) => onSnesAddressChange(e.target.value, romTypeDropdown) }
                />
              </Grid>
            </Grid>
          </Container>
        </>
      </Paper>
    </>
  );
}