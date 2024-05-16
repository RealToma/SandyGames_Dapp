const express = require("express");
const router = express.Router();

const outfitListSchema = require("../schema/outfit");
const outfitMintingStatusSchema = require("../schema/outfitMintingStatus");

const {
  PhantasmaTS,
  ScriptBuilder,
  Transaction,
  Base16,
  PhantasmaKeys,
  Address,
  VMObject,
  PBinaryReader,
} = require("phantasma-ts");
const { modalCountsMint } = require("../schema/counts_mint");
const { modalUsersUpfront } = require("../schema/users");

router.get("/get_counts", async (req, res) => {
  try {
    let dataCountsMint = await modalCountsMint.find();
    return res.json({ flagSuccess: true, data: dataCountsMint });
  } catch (error) {
    console.log(error);
    return res.json({ flagSuccess: false, msgError: error });
  }
});

router.post("/update_counts", async (req, res) => {
  try {
    let dataCountsMint = await modalCountsMint.find();
    let tempRemaining =
      dataCountsMint[0]._doc[req.body.sandyType][req.body.sandyMaterial][
        "Remaining"
      ] - 1;
    // console.log("dataFound:", dataCountsMint[0]._id);

    const filter = { _id: dataCountsMint[0]._id }; // Filter to match the document(s) you want to update
    const update = {
      $set: {
        [`${req.body.sandyType}.${req.body.sandyMaterial}.Remaining`]:
          tempRemaining, // New value for Moon.Organic.Remaining
      },
    };

    await modalCountsMint.updateOne(filter, update);
    return res.json({ flagSuccess: true });
  } catch (error) {
    console.log(error);
    return res.json({ flagSuccess: false, msgError: error });
  }
});

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

router.post("/mint_outfit", async (req, res) => {
  try {
    const entry = await outfitMintingStatusSchema.findById(
      "64dde8439c3284d963ac06cb"
    );

    const entryList = await outfitListSchema.find({
      week_number: entry.active_week,
    });

    const mintingPayload = entryList.at(getRandomNumber(0, entryList.length));
    let tempHash = await mintOutfit(
      req.body.address,
      mintingPayload.genre,
      mintingPayload.category_name
    );

    console.log("genre:", mintingPayload.genre);

    console.log("category:", mintingPayload.category_name);

    if (tempHash !== null || tempHash !== undefined) {
      outfitListSchema.findByIdAndUpdate(mintingPayload._id, {
        week_number: -1 * mintingPayload.week_number,
      });

      return res.json({
        flagSuccess: true,
        mintingPayload,
      });
    } else {
      return res.json({
        flagSuccess: false,
        mintingPayload,
      });
    }
  } catch (err) {
    return res.json({
      flagSuccess: false,
      msgError: err,
    });
  }
});

async function mintOutfit(toAddress, type, name) {
  let Keys = PhantasmaKeys.fromWIF(process.env.REACT_APP_PRIVATE_OWNER);
  let expiration = new Date(Date.now() + 60 * 60 * 10 * 1000);
  let script;

  let sb = new ScriptBuilder();
  let myScript = sb.AllowGas(Keys.Address, Address.Null, 100000, 210000);

  // myScript = sb.CallInterop("Runtime.TransferTokens", [Keys.Address.Text, "P2K65RZhfxZhQcXKGgSPZL6c6hkygXipNxdeuW5FU531Bqc", "SOUL", 1000000000]);
  const nowTime = new Date();
  const offset = 6 - nowTime.getDay();

  nowTime.setMilliseconds(0);
  nowTime.setSeconds(0);
  nowTime.setMinutes(0);
  nowTime.setHours(0);
  nowTime.setDate(nowTime.getDate() + offset);

  let description;
  if (type === "arms") {
    description = "This is the arms piece to one of SANDY's outfits.";
  } else if (type === "body") {
    description = "This is the body piece to one of SANDY's outfits.";
  } else if (type === "head") {
    description = "This is the head piece to one of SANDY's outfits.";
  } else if (type === "legs") {
    description = "This is the legs piece to one of SANDY's outfits.";
  } else {
    description = "This is the item piece to one of SANDY's outfits.";
  }

  myScript = sb.CallContract(process.env.REACT_APP_CONTRACT, "mintOutfit", [
    toAddress,
    type,
    name,
    nowTime.valueOf() / 1000,
    description,
  ]);

  myScript = sb.SpendGas(Keys.Address);
  script = myScript.EndScript();

  const Payload = Base16.encode("Sandy Games");
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

  // console.info(rawTx);
}

router.post("/set_upfront", async (req, res) => {
  try {
    let tempUsersUpfront = await modalUsersUpfront.find({
      addressWallet: req.body.addressWallet,
    });
    if (tempUsersUpfront.length !== 0) {
      return res.json({
        flagSuccess: false,
        msgError: "You're already registered in upfront option.",
      });
    } else {
      const now = new Date();
      const options = { timeZone: "America/New_York", timeZoneName: "short" };
      const estDateTime = now.toLocaleString("en-US", options);
      const estDate = estDateTime.split(",");
      const newUserUpfront = new modalUsersUpfront({
        addressWallet: req.body.addressWallet,
        timeRegistered: estDate[0],
      });
      newUserUpfront.save();
      return res.json({
        flagSuccess: true,
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      flagSuccess: false,
      msgError: error,
    });
  }
});

router.post("/get_upfront", async (req, res) => {
  try {
    let tempUsersUpfront = await modalUsersUpfront.find({
      addressWallet: req.body.addressWallet,
    });
    if (tempUsersUpfront.length !== 0) {
      return res.json({
        flagSuccess: true,
      });
    } else {
      return res.json({
        flagSuccess: false,
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      flagSuccess: false,
    });
  }
});

/**
 * InvokeRawScript
 * @param contractName
 * @param contractMethod
 * @param args
 * @param callback
 */
function InvokeRawScript(contractName, contractMethod, args, callback) {
  const sb = new ScriptBuilder();
  const myScript = sb
    .BeginScript()
    .CallContract(contractName, contractMethod, args)
    .EndScript();

  let RPC = new PhantasmaTS.PhantasmaAPI(
    process.env.REACT_APP_RPC_URL,
    null,
    process.env.REACT_APP_NETWORK
  );

  RPC.invokeRawScript();

  RPC.invokeRawScript("main", myScript).then((result) => {
    const bytes = Base16.decodeUint8Array(result.result);
    const vm = new VMObject();
    const readerVM = new PBinaryReader(bytes);
    vm.UnserializeData(readerVM);

    callback(vm);
  });
}

router.post("/test01", async (req, res) => {
  InvokeRawScript("AAAC", "getStatusP", [req.body.address], (result) => {
    console.log("result");
    console.log(result);

    return res.status(200).json({
      result,
    });
  });
});

module.exports = {
  router,
  mintOutfit,
};
