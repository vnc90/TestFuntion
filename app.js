import {ethers,JsonRpcProvider } from "ethers";
import {abi} from "./ABI.js";
// const provider = new ethers.providers.JsonRpcProvider('https://data-seed-prebsc-2-s2.binance.org:8545')
// const provider = new ethers.providers.JsonRpcProvider('https://data-seed-prebsc-1-s1.binance.org:8545'); 
const providerUrl = 'https://data-seed-prebsc-1-s1.binance.org:8545';
const provider = new JsonRpcProvider(providerUrl);
const signer = new ethers.Wallet('bf9f947ecc0a08bebf9cd683bf0b09308a9589bd80a53f41ddb2f5a6baccccaf', provider)
const bmedicalAddress  = '0x537Ce76Ffe5733A8665394A037B4A28ccFd1C4F8'

const bMedicalContract = new ethers.Contract(bmedicalAddress, abi,signer)

// const data = await bMedicalContract.getData()
// console.log(data)

const dataDoctorRead = await bMedicalContract.doctorGetData('0x823D2c337b9Ec4ed0e2F17Ea27BaE1A6f603d589')
console.log(dataDoctorRead)