const mongoose = require("mongoose");

const schemaCountsMint = new mongoose.Schema({
  Moon: {
    Organic: {
      Total: {
        type: Number,
        default: 50,
      },
      Remaining: {
        type: Number,
        default: 40,
      },
    },
    Precious: {
      Total: {
        type: Number,
        default: 50,
      },
      Remaining: {
        type: Number,
        default: 45,
      },
    },
    Energy: {
      Total: {
        type: Number,
        default: 50,
      },
      Remaining: {
        type: Number,
        default: 50,
      },
    },
  },
  Sun: {
    Organic: {
      Total: {
        type: Number,
        default: 50,
      },
      Remaining: {
        type: Number,
        default: 43,
      },
    },
    Precious: {
      Total: {
        type: Number,
        default: 30,
      },
      Remaining: {
        type: Number,
        default: 25,
      },
    },
    Energy: {
      Total: {
        type: Number,
        default: 50,
      },
      Remaining: {
        type: Number,
        default: 20,
      },
    },
  },
  Pearl: {
    Organic: {
      Total: {
        type: Number,
        default: 20,
      },
      Remaining: {
        type: Number,
        default: 16,
      },
    },
    Precious: {
      Total: {
        type: Number,
        default: 50,
      },
      Remaining: {
        type: Number,
        default: 50,
      },
    },
    Energy: {
      Total: {
        type: Number,
        default: 50,
      },
      Remaining: {
        type: Number,
        default: 40,
      },
    },
  },
});

const countsMint = mongoose.model("counts_mints", schemaCountsMint);

module.exports = {
  modalCountsMint: countsMint,
};
