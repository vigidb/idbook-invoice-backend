const express = require("express");
const {
  createInvoice,
  getInvoices,
  updateInvoice,
  deleteInvoice,
  getInvoice,
  generateNewInvoiceNumber,
  patchInvoice
} = require("../controllers/invoiceController");
// const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Invoices
 *   description: API endpoints for managing invoices
 */

/**
 * @swagger
 * /api/invoices:
 *   get:
 *     summary: Retrieve all invoices
 *     tags: [Invoices]
 *     responses:
 *       200:
 *         description: A list of invoices
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Invoice'
 *   post:
 *     summary: Create a new invoice
 *     tags: [Invoices]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Invoice'
 *     responses:
 *       201:
 *         description: The created invoice
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Invoice'
 *       400:
 *         description: Invalid input
 */
router
  .route("/")
  .post(createInvoice)
  .get(getInvoices);

/**
 * @swagger
 * /api/invoices/generate-invoice-number:
 *   get:
 *     summary: Generate a new invoice number
 *     tags: [Invoices]
 *     responses:
 *       200:
 *         description: A new invoice number generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 invoiceNumber:
 *                   type: string
 *       400:
 *         description: Error generating invoice number
 */
router
  .route("/generate-invoice-number")
  .get(generateNewInvoiceNumber);

/**
 * @swagger
 * /api/invoices/{id}:
 *   get:
 *     summary: Retrieve a single invoice by ID or invoice number
 *     tags: [Invoices]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The invoice ID (MongoDB ObjectId) or invoice number
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single invoice
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Invoice'
 *       404:
 *         description: Invoice not found
 *   put:
 *     summary: Update an invoice by ID or invoice number
 *     tags: [Invoices]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The invoice ID (MongoDB ObjectId) or invoice number
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Invoice'
 *     responses:
 *       200:
 *         description: The updated invoice
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Invoice'
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Invoice not found
 *   delete:
 *     summary: Delete an invoice by ID or invoice number
 *     tags: [Invoices]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The invoice ID (MongoDB ObjectId) or invoice number
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Invoice deleted successfully
 *       404:
 *         description: Invoice not found
 *   patch:
 *     summary: Partially update an invoice by ID or invoice number
 *     tags: [Invoices]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The invoice ID (MongoDB ObjectId) or invoice number
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Invoice'
 *     responses:
 *       200:
 *         description: The updated invoice with provided fields
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Invoice'
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Invoice not found
 */
router
  .route("/:id")
  .put(updateInvoice)
  .delete(deleteInvoice)
  .get(getInvoice)
  .patch(patchInvoice);

module.exports = router;

/**
 * @swagger
 * components:
 *   schemas:
 *     Invoice:
 *       type: object
 *       properties:
 *         logo:
 *           type: string
 *         header:
 *           type: string
 *         footer:
 *           type: string
 *         invoiceNumber:
 *           type: string
 *         invoiceDate:
 *           type: string
 *           format: date-time
 *         dueDate:
 *           type: string
 *           format: date-time
 *         notes:
 *           type: string
 *         billedBy:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             address:
 *               type: string
 *             GSTIN:
 *               type: string
 *             PAN:
 *               type: string
 *             email:
 *               type: string
 *             website:
 *               type: string
 *         billedTo:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             address:
 *               type: string
 *             GSTIN:
 *               type: string
 *             PAN:
 *               type: string
 *         supplyDetails:
 *           type: object
 *           properties:
 *             countryOfSupply:
 *               type: string
 *             placeOfSupply:
 *               type: string
 *         items:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               quantity:
 *                 type: number
 *               price:
 *                 type: number
 *               amount:
 *                 type: number
 *         GST:
 *           type: number
 *         GSTType:
 *           type: string
 *         total:
 *           type: number
 *         status:
 *           type: string
 *           enum:
 *             - Pending
 *             - Paid
 *             - Overdue
 *         nextScheduleDate:
 *           type: string
 *           format: date-time
 *         tags:
 *           type: array
 *           items:
 *             type: string
 */
