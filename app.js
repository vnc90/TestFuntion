import {ethers,JsonRpcProvider } from "ethers";
import {abi} from "./ABI.js";
// const provider = new ethers.providers.JsonRpcProvider('https://data-seed-prebsc-2-s2.binance.org:8545')
// const provider = new ethers.providers.JsonRpcProvider('https://data-seed-prebsc-1-s1.binance.org:8545'); 
const providerUrl = 'https://data-seed-prebsc-1-s1.binance.org:8545';
const provider = new JsonRpcProvider(providerUrl);
const keyDeloyer = 'bf9f947ecc0a08bebf9cd683bf0b09308a9589bd80a53f41ddb2f5a6baccccaf'
const keyPatient = '79e1fef333c2aa5b3ef0dacbba8f3e0668edb40831d0c3223cabfe191a8be039'
const signer = new ethers.Wallet(keyPatient, provider)
const bmedicalAddress  = '0x537Ce76Ffe5733A8665394A037B4A28ccFd1C4F8'

const bMedicalContract = new ethers.Contract(bmedicalAddress, abi,signer)
const gasPrice = ethers.parseUnits('3', 'gwei');
// override gasPrice defaults
signer.provider.gasPrice = async () => {
    return gasPrice;
}

// save data to patient
const addressPatient = '0x109a5fc36488f28f58A0Fd2a6a1cC2020A0A7BDB'
const hashData = '$2y$10$E0yzvW0a6aGU5/73e/zEuuuXBcWZ4qPW1.yFHnkQLBqWkubY2SN20'

// function save data to blockchain


const saveData = async (addressPatient, hashData) => {

    const transaction = await bMedicalContract.addData(addressPatient,hashData)
    console.log('Tx :', transaction.hash);
    return transaction.hash
    
}

// FUNCTION SET ROLE FOR DOCTOR
const setDoctorRole = async (address) => {

    const transaction = await bMedicalContract.setDoctorRole(address)
    console.log('Tx :', transaction.hash);
    return transaction.hash
    
}

// FUNCTION CHECK TRANSACTION STATUS
const checkTransaction = async (tx) =>{

    const transactionResult = await provider.waitForTransaction(tx)
    if (transactionResult.status === 1){
        console.log('Transaction Successful')
        return true
    }else{
        console.log('transaction failed')
        return false
    }
}
///// READ SELF DATA
const data = await bMedicalContract.getData()
data.forEach(hash => {
    console.log(hash);
})


///////// SAVE DATA
// const tx = await saveData(addressPatient,hashData)
// check transaction result
// await checkTransaction(tx)

////////////////// DOCTOR READ DATA
// const dataDoctorRead = await bMedicalContract.doctorGetData(addressPatient)
// dataDoctorRead.forEach(hash => {
//     console.log(hash)
// })