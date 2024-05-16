const xlsxFile = require("read-excel-file/node");
const { modalUserCommunity } = require("../schema/treasure");
const {
  PhantasmaTS,
  ScriptBuilder,
  Transaction,
  Base16,
  PhantasmaKeys,
  Address,
} = require("phantasma-ts");
const {
  dataTreasureEye,
  dataTreasureMouth,
  dataTreasureBackgrounds,
} = require("../data/treasure");

const convertExcelAndSaveDatabase = async () => {
  let arrayExcelFileData = [];
  try {
    let tempExcelfile = await xlsxFile("./assets/airdrop.xlsx");
    for (var i = 1; i < tempExcelfile.length; i++) {
      let amount = tempExcelfile[i][2];
      if (
        amount === null ||
        amount === 0 ||
        amount === undefined ||
        amount === "0"
      ) {
        amount = 0;
      }
      arrayExcelFileData.push({
        idDiscord: tempExcelfile[i][0],
        addressWallet: tempExcelfile[i][1],
        amount: amount,
      });
      //   let tempEachRow = new modalUserCommunity({
      // idDiscord: tempExcelfile[i][0],
      // addressWallet: tempExcelfile[i][1],
      // amount: amount,
      //   });
      //   let tempUsersCommunity = await modalUserCommunity.find({
      //     addressWallet: tempExcelfile[i][1],
      //   });
      //   if (tempUsersCommunity.length === 0) {
      //     tempEachRow.save();
      //   }
    }
    return arrayExcelFileData;
  } catch (error) {
    console.log(error);
  }
};

const mintTreasure = async (toAddress, genre, treasureType) => {
  let Keys = PhantasmaKeys.fromWIF(process.env.REACT_APP_PRIVATE_OWNER);
  let description;
  if (genre === "Backgrounds") {
    description = "This feature is used to customize your SANDY's background.";
  } else if (genre === "Eyes") {
    description = "This feature is used to customize your SANDY's eyes.";
  } else if (genre === "Mouths") {
    description = "This feature is used to customize your SANDY's mouth.";
  }

  let expiration = new Date(Date.now() + 60 * 60 * 10 * 1000);
  let script;

  let sb = new ScriptBuilder();
  let myScript = sb.AllowGas(Keys.Address, Address.Null, 100000, 210000);
  // myScript = sb.CallInterop("Runtime.TransferTokens", [Keys.Address.Text, "P2K65RZhfxZhQcXKGgSPZL6c6hkygXipNxdeuW5FU531Bqc", "SOUL", 1000000000]);

  myScript = sb.CallContract(process.env.REACT_APP_CONTRACT, "mintTreasure", [
    toAddress,
    genre,
    treasureType,
    description,
  ]);
  myScript = sb.SpendGas(Keys.Address);
  script = myScript.EndScript();
  const Payload = Base16.encode("Airdrop-Deposit");
  const tx = new Transaction(
    process.env.REACT_APP_NETWORK,
    "main",
    script,
    expiration,
    Payload
  );
  tx.signWithKeys(Keys);

  const rawTx = Base16.encodeUint8Array(tx.ToByteAray(true));
  let RPC = new PhantasmaTS.PhantasmaAPI(
    process.env.REACT_APP_RPC_URL,
    null,
    process.env.REACT_APP_NETWORK
  );
  let hash;
  try {
    hash = await RPC.sendRawTransaction(rawTx);
  } catch (error) {
    console.log(error);
  }
  return hash;
};

const randomInt = (value) => {
  return Math.floor(Math.random() * value);
};

const handleCreateRandomTreasureImage = () => {
  let randomCountBack = randomInt(dataTreasureBackgrounds.length);
  let randomCountEye = randomInt(dataTreasureEye.length);
  let randomCountMouth = randomInt(dataTreasureMouth.length);

  let randomType = randomInt(3);
  let type, name;
  if (randomType === 0) {
    type = "Backgrounds";
    name = dataTreasureBackgrounds[randomCountBack].name;
  } else if (randomType === 1) {
    type = "Eyes";
    name = dataTreasureEye[randomCountEye].name;
  } else if (randomType === 2) {
    type = "Mouths";
    name = dataTreasureMouth[randomCountMouth].name;
  }

  return { type, name };
};

const airdropTreasure = async () => {
  let arrayExcelData = await convertExcelAndSaveDatabase();

  for (var i = 0; i < arrayExcelData.length; i++) {
    if (arrayExcelData[i].amount > 0) {
      let dataMinted = [];
      for (var j = 0; j < arrayExcelData[i].amount; j++) {
        let { type, name } = handleCreateRandomTreasureImage();
        let tempHash = await mintTreasure(
          arrayExcelData[i].addressWallet,
          type,
          name
        );
        console.log("tempHash:", tempHash);
        let flagSuccess;
        if (
          tempHash !== null ||
          tempHash !== undefined ||
          tempHash !== "undefined"
        ) {
          flagSuccess = true;
        } else {
          flagSuccess = false;
        }
        dataMinted.push({
          genre: type,
          name: name,
          flagSuccess: flagSuccess,
          hashProcessed: tempHash,
          dateProcessed: new Date().toLocaleString("en-US", {
            timeZone: "America/New_York",
            timeZoneName: "short",
          }),
        });
      }
      console.log("dataMinted:", dataMinted);
      let dataEachCommunity = {
        idDiscord: arrayExcelData[i].idDiscord,
        addressWallet: arrayExcelData[i].addressWallet,
        amount: arrayExcelData[i].amount,
        dataMinted: dataMinted,
      };

      console.log("dataEachCommunity:", dataEachCommunity);
      let modalEachCommunity = new modalUserCommunity(dataEachCommunity);
      await modalEachCommunity.save();
    }
  }
};

module.exports = {
  convertExcelAndSaveDatabase: convertExcelAndSaveDatabase,
  mintTreasure: mintTreasure,
  airdropTreasure: airdropTreasure,
};
