import { PhantasmaLink } from "phantasma-ts";
import { PhantasmaTS } from "phantasma-ts";
import { VMObject } from "phantasma-ts/core";

//using this for testing purposes only
export const PhantasmaAPIClient = new PhantasmaTS.PhantasmaAPI(
  process.env.REACT_APP_RPC_URL as any,
  "",
  process.env.REACT_APP_NETWORK as any
  // process.env.REACT_APP_NETWORK as any // mainnet, simnet, testnet
);
//parameters
const ContractName = process.env.REACT_APP_CONTRACT as any; //Will be SANDY -> Local test name

export async function mintBody(
  link: PhantasmaLink,
  sandyType: any,
  sandySkin: any
) {
  let gasPrice = 100000;
  let gasLimit = 9999999;
  let funcName = "mintBody";
  let addressTo = link.account.address;

  let sb = new PhantasmaTS.ScriptBuilder();
  const payload = PhantasmaTS.Base16.encode("Sandy Games");
  let script = sb
    .BeginScript()
    .AllowGas(addressTo, sb.NullAddress, gasPrice, gasLimit)
    .CallContract(ContractName, funcName, [
      addressTo,
      "TK_TEST_SANDY",
      "This is TK's test sandy",
      sandyType,
      sandySkin,
    ])
    .SpendGas(addressTo)
    .EndScript();

  link.signTx(
    script,
    payload,
    function (tx) {
      console.log("This was Successful" + tx);
    },
    function () {
      console.error("error could not send transaction");
    }
  );

  /*
  let sR = await PhantasmaAPIClient.invokeRawScript("main", script).then(
    (scriptResults) => {
      const bytes = PhantasmaTS.Base16.decodeUint8Array(scriptResults.result);
      const vm = new PhantasmaTS.VMObject();
      const readerVM = new PhantasmaTS.PBinaryReader(bytes);
      vm.UnserializeData(readerVM);
      return vm.Data;
    }
  );
  */

  //console.log("sR is: " + sR);
  //console.log("Results" + scriptResults.results);
  //console.log("Result" + scriptResults.result);
}
//Will need a function to get NFts based on Series ID

export async function getBodyNft(link: PhantasmaLink) {
  let nftIDs: any;
  try {
    nftIDs = await PhantasmaAPIClient.getTokenBalance(
      link.account.address,
      ContractName,
      "main"
    );

    // console.log("nftIDs:",nftIDs)
  } catch (error) {
    console.log("error getTokenBalance:", error);
  }

  // list off all Ids a particular user owns wrt the Contract Symbol
  // let sandyInfo: any = [];
  let arrayNFTInfo: any[] = [];
  if (nftIDs.ids !== undefined) {
    // let arrayNFTInfo: any = [];

    // for (let i = 0; i < nftIDs.ids.length; i++) {
    //   let eachNftInfo: any;
    //   try {
    //     eachNftInfo = await PhantasmaAPIClient.getNFT(
    //       ContractName,
    //       nftIDs.ids[i]
    //     );
    //   } catch (error) {
    //     console.log(error);
    //   }

    //   arrayNFTInfo.push(eachNftInfo);
    // }

    for (let i = 0; i < nftIDs.ids.length; i++) {
      let eachInfo: any = await PhantasmaAPIClient.getNFT(
        ContractName,
        nftIDs.ids[i]
      );
      if (eachInfo.error) {
        continue;
      } else {
        arrayNFTInfo.push(eachInfo);
      }
    }
    // console.log(arrayNFTInfo);

    // for (const key in arrayNFTInfo) {
    //   sandyInfo.push(arrayNFTInfo[key]);
    // }
  }
  // console.log(sandyInfo);
  return arrayNFTInfo;
}

function isMapOfVMObject(obj: any): obj is Map<VMObject, VMObject> {
  // Perform the necessary checks to determine if `obj` is a Map<VMObject, VMObject>
  // Return true if it is, false otherwise
  return obj instanceof Map;
}

export function FormatData(vm: VMObject): any {
  const result: any = {};
  if (vm.Data instanceof Map && isMapOfVMObject(vm.Data)) {
    console.log("map", vm);
    /*if (vm.Data.size == 4) {
			let index = 0;
			let _keyAddress = '';
			for (const item of vm.Data.keys()) {
				_keyAddress = item.AsString();
				index++;
				if (index == 3) break;
			}

			if (_keyAddress == 'LengthInBytes') {
				//return Address.FromBytes(Base16.decodeUint8Array(hexData.toUpperCase()));
			}
		}*/
    for (const item of vm.Data) {
      console.log(item);
      const _key = item[0].AsString();
      result[_key] = FormatData(item[1]);
    }
  } else if (vm.Data instanceof Array) {
    const arr: any[] = [];
    console.log("array", vm);

    for (const item of vm.Data) {
      console.log("array item", item);
      arr.push(FormatData(item));
    }
    return arr;
  } else if (vm.Data instanceof VMObject) {
    console.log("vm data", vm);
    return FormatData(vm.Data);
  } else {
    console.log("vm", vm);
    /*if (vm.Type == VMType.Bytes) {
			const data = DecodeInformation(vm.AsString());
			return FormatData(data);
		}*/
    return vm.AsString();
  }
  return result;
}

// const { PhantasmaProvider } = require("@phantasma-io/phantasma-provider");

// Create a new instance of the PhantasmaProvider
// const provider = new PhantasmaProvider("https://rpc.phantasma.io");

// // Define your wallet address
// const walletAddress = "YOUR_WALLET_ADDRESS";

// // Subscribe to transaction events
// provider.subscribeToAddressTransactions(walletAddress, (tx) => {
//   // Check if the transaction involves SOUL tokens
//   const tokenTransfers = tx.events.filter(
//     (event) => event.kind === "TokenSend" && event.symbol === "SOUL"
//   );

//   if (tokenTransfers.length > 0) {
//     console.log("SOUL tokens received!");
//     console.log(tokenTransfers);
//   }
// });
