const Invoice = require("../models/Invoice");
const mongoose = require("mongoose");

exports.createInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.create(req.body);
    res.status(201).json({ success: true, data: invoice });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
exports.getInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find({});
    res.status(200).json({ success: true, data: invoices });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
exports.updateInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({ success: true, data: invoice });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
exports.deleteInvoice = async (req, res) => {
  try {
    const { id } = req.params;

    let invoice;

    // Check if the provided id is a valid MongoDB ObjectId
    if (mongoose.Types.ObjectId.isValid(id)) {
      // Try to find and delete the invoice by MongoDB ID
      invoice = await Invoice.findByIdAndDelete(id);
    } 
    
    // If not a valid ObjectId, try to delete by invoiceNumber
    if (!invoice) {
      invoice = await Invoice.findOneAndDelete({ invoiceNumber: id });
    }

    // If no invoice is deleted, return a 404 error
    if (!invoice) {
      return res.status(404).json({ success: false, message: "Invoice not found" });
    }

    res.status(204).json({ success: true, message: "Invoice deleted successfully" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};


exports.getInvoice = async (req, res) => {
  try {
    const { id } = req.params;

    let invoice;

    // Check if the provided id is a valid MongoDB ObjectId
    if (mongoose.Types.ObjectId.isValid(id)) {
      // Try to find the invoice by MongoDB ID
      invoice = await Invoice.findById(id);
    } 
    
    // If not a valid ObjectId, try to find by invoiceNumber
    if (!invoice) {
      invoice = await Invoice.findOne({ invoiceNumber: id });
    }

    // If no invoice found, return a 404 error
    if (!invoice) {
      return res.status(404).json({ success: false, message: "Invoice not found" });
    }

    res.status(200).json({ success: true, data: invoice });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const generateInvoiceNumber = async () => {
  // Get the current date components (YYYY and MM)
  const currentYear = new Date().getFullYear();
  const currentMonth = (new Date().getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based, so add 1

  // Default starting invoice number
  const initialInvoiceNumber = 50239;

  // Find the last invoice for the current year and month
  const lastInvoice = await Invoice.findOne({
    invoiceNumber: { $regex: `^Idb-${currentYear}-${currentMonth}-` }
  }).sort({ invoiceNumber: -1 });

  // If no invoices found for the current year and month, start with 'Idb-YYYY-MM-50239'
  if (!lastInvoice || !lastInvoice.invoiceNumber) {
    return `Idb-${currentYear}-${currentMonth}-${initialInvoiceNumber}`;
  }

  // Extract the numeric part of the last invoice number (after 'Idb-YYYY-MM-')
  const invoiceNumberParts = lastInvoice.invoiceNumber.split('-');
  const lastNumber = parseInt(invoiceNumberParts[3], 10);

  // If parsing fails or the invoice number is invalid, reset to the initial number
  if (isNaN(lastNumber)) {
    return `Idb-${currentYear}-${currentMonth}-${initialInvoiceNumber}`;
  }

  // Increment the numeric part of the invoice number
  const newInvoiceNumber = lastNumber + 1;

  // Return the new invoice number in the format 'Idb-YYYY-MM-XXXX'
  return `Idb-${currentYear}-${currentMonth}-${newInvoiceNumber}`;
};


// const generateInvoiceNumber = async () => {
//   const lastInvoice = await Invoice.findOne().sort({ invoiceNumber: -1 });
  
//   // If no invoices found, start with 'INV-001'
//   if (!lastInvoice || !lastInvoice.invoiceNumber) {
//     return 'INV-001';
//   }

//   // Extract the numeric part from the last invoice number
//   const invoiceNumberParts = lastInvoice.invoiceNumber.split('-');
//   const lastNumber = parseInt(invoiceNumberParts[1], 10);

//   // If the parsing fails or the invoice number is invalid, reset to 1
//   if (isNaN(lastNumber)) {
//     return 'INV-001';
//   }

//   // Increment the numeric part and return the new invoice number
//   const newInvoiceNumber = `INV-${(lastNumber + 1).toString().padStart(3, '0')}`;
//   return newInvoiceNumber;
// };



// Generate a new invoice number without saving the invoice
exports.generateNewInvoiceNumber = async (req, res) => {
  try {
    const invoiceNumber = await generateInvoiceNumber();
    res.status(200).json({ success: true, invoiceNumber });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};


exports.patchInvoice = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    let invoice;

    // Check if the provided id is a valid MongoDB ObjectId
    if (mongoose.Types.ObjectId.isValid(id)) {
      // Try to find and update the invoice by MongoDB ID
      invoice = await Invoice.findByIdAndUpdate(id, updateData, { new: true });
    } 
    
    // If not a valid ObjectId, try to update by invoiceNumber
    if (!invoice) {
      invoice = await Invoice.findOneAndUpdate({ invoiceNumber: id }, updateData, { new: true });
    }

    // If no invoice is found, return a 404 error
    if (!invoice) {
      return res.status(404).json({ success: false, message: "Invoice not found" });
    }

    res.status(200).json({ success: true, data: invoice });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
