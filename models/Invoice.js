const mongoose = require("mongoose");

// Define Invoice Schema
const InvoiceSchema = new mongoose.Schema(
  {
    logo: String,
    header: String,
    footer: String,
    invoiceNumber: { type: String, required: true, unique: true, index: true }, // Index added for better search performance
    invoiceDate: { type: Date, required: true },
    dueDate: { type: Date }, 
    notes: String,
    billedBy: {
      name: { type: String, required: true },
      address: { type: String, required: true },
      GSTIN: { type: String }, 
      PAN: { type: String }, 
      email: {
        type: String,
        validate: {
          validator: function (v) {
            return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
          },
          message: (props) => `${props.value} is not a valid email!`,
        },
      },
      website: String,
      phone: {
        type: String,
        validate: {
          validator: function (v) {
            return /\d{10}/.test(v);
          },
          message: (props) => `${props.value} is not a valid phone number!`,
        },
      },
    },
    billedTo: {
      name: { type: String, required: true },
      address: { type: String, required: true },
      GSTIN: { type: String }, 
      PAN: { type: String }, 
      email: {
        type: String,
        validate: {
          validator: function (v) {
            return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
          },
          message: (props) => `${props.value} is not a valid email!`,
        },
      },
      website: String,
      phone: {
        type: String,
        validate: {
          validator: function (v) {
            return /\d{10}/.test(v);
          },
          message: (props) => `${props.value} is not a valid phone number!`,
        },
      },
    },
    supplyDetails: { countryOfSupply: String, placeOfSupply: String },
    items: [
      {
        name: { type: String, required: true },
        description: String,
        quantity: { type: Number, required: true, min: 1 },
        price: { type: Number, required: true, min: 0 },
        amount: { type: Number, required: true },
        tax: { type: Number, min: 0 }, 
      },
    ],
    GST: { type: Number, min: 0 }, 
    GSTType: { type: String, default: "CGST/SGST" },
    total: { type: Number, required: true, min: 0 }, // Required because it's not virtual
    totalAmount: { type: Number, min: 0 }, 
    totalTax: { type: Number, min: 0 }, 
    status: {
      type: String,
      enum: ["Pending", "Paid", "Overdue"],
      default: "Pending",
    },
    nextScheduleDate: { type: Date },
    tags: [String],
    paymentHistory: [
      {
        date: { type: Date, default: Date.now },
        amount: { type: Number, required: true, min: 0 },
        paymentMode: { type: String, enum: ["Cash", "Card", "Bank Transfer", "Other"], required: true },
        reference: String,
      },
    ],
  },
  { timestamps: true }
);

// Virtual to calculate total amount (sum of item amounts)
InvoiceSchema.virtual("computedTotal").get(function () {
  return this.items.reduce((total, item) => total + item.amount, 0);
});

// Virtual to calculate total tax based on item tax values
InvoiceSchema.virtual("computedTotalTax").get(function () {
  return this.items.reduce((total, item) => total + item.tax, 0);
});

// Pre-save hook to auto-calculate and update total amount and tax before saving the document
InvoiceSchema.pre("save", function (next) {
  this.totalAmount = this.computedTotal;
  this.totalTax = this.computedTotalTax;
  next();
});

// Custom method to update invoice status based on payment history
InvoiceSchema.methods.updateStatus = function () {
  const totalPaid = this.paymentHistory.reduce((total, payment) => total + payment.amount, 0);
  if (totalPaid >= this.totalAmount) {
    this.status = "Paid";
  } else if (new Date() > this.dueDate) {
    this.status = "Overdue";
  } else {
    this.status = "Pending";
  }
  return this.status;
};

// Post-save hook to log changes after saving the document
InvoiceSchema.post("save", function (doc) {
  console.log(`Invoice ${doc.invoiceNumber} has been saved successfully.`);
});

module.exports = mongoose.model("Invoice", InvoiceSchema);
