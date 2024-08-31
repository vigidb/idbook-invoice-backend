const mongoose = require("mongoose");
const InvoiceSchema = new mongoose.Schema(
  {
    logo: String,
    header: String,
    footer: String,
    invoiceNumber: { type: String, required: true, unique: true },
    invoiceDate: { type: Date, required: true },
    dueDate: { type: Date, required: true },
    notes: String,
    billedBy: {
      name: String,
      address: String,
      GSTIN: String,
      PAN: String,
      email: String,
      website: String,
    },
    billedTo: { name: String, address: String, GSTIN: String, PAN: String },
    supplyDetails: { countryOfSupply: String, placeOfSupply: String },
    items: [
      {
        name: String,
        description: String,
        quantity: Number,
        price: Number,
        amount: Number,
      },
    ],
    GST: { type: Number },
    GSTType: { type: String, default: "CGST/SGST" },
    total: { type: Number, required: true },
    status: {
      type: String,
      enum: ["Pending", "Paid", "Overdue"],
      default: "Pending",
    },
    nextScheduleDate: { type: Date },
    tags: [String],
  },
  { timestamps: true }
);
module.exports = mongoose.model("Invoice", InvoiceSchema);
