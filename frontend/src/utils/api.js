export let appURLs = {
   // web: 'http://localhost:8000/',
   web: 'https://coloration.onrender.com/'
 }
 
 
 export const webAPI = {
 
   /************************ Account API *********************************/
 
   postAccountData: 'api/account/addAcountDetails',
   getAccountData: 'api/account/getallAccountDetails',
   deleteAccountData: 'api/account/delete/',
   updateAccountData: 'api/account/update/',
   getAccountById: 'api/account/get/',
 
 
   /************************ Product API *********************************/
 
 
   getProductData: 'api/product/getProductData',
   getProductById: 'api/product/getProductById',
   addProductData: 'api/product/addProductData',
   changeProductStatus: 'api/product/update/',
   getAllProductsByAccountID: 'api/product/getAllProductsByAccountID',
   getProductByName: 'api/product/getProductByName',
 
 
   /************************ bagage API *********************************/
   deleteProduct: 'api/bagage/delete/',
   addBagageData: 'api/bagage/addBagageData',
   findByComAndAcc: 'api/bagage/findByComAndAcc',
   updateBaggageData: 'api/bagage/update/',
   getLastBagageID:'api/bagage/getLastBagageID',
 
 
   /************************ Advance API *********************************/
   addAdvance: 'api/Advance/addAdvance',
   getallAdvanceDetails: 'api/Advance/getallAdvanceDetails',
   updateAdvanceDetails: 'api/Advance/updateAdvanceDetails/',
   getaAdvanceAmountByAccAndProd: 'api/Advance/getaAdvanceAmountByAccAndProd',
 
   /************************ Advance Tot API *********************************/
   addAdvanceTot: 'api/Sub/AdvanceTot/addAdvanceTot',
   getaAdvanceTotAmountByAccAndProd: 'api/Sub/AdvanceTot/getaAdvanceTotAmountByAccAndProd',
   updateAdvanceTotDetails: 'api/Sub/AdvanceTot/updateAdvanceTotDetails/',
 
   /************************ Invoice API *********************************/
 
   getAllInvoice: 'api/Invoice/getAllInvoice',
   addInvoiceData: 'api/Invoice/addInvoiceData',
   getInvoiceByAccName: 'api/Invoice/getInvoiceByAccName',
   deleteInvoiceByID: 'api/Invoice/deleteInvoiceByID/',
   getInvoiceListByAccId : 'api/Invoice/getInvoiceListByAccId',
   updateInvoiceByID : 'api/Invoice/updateInvoiceByID/',
   getInvoiceByID : 'api/Invoice/getInvoiceByID/',
 
 
 
   /************************ Quotation API *********************************/
 
   getAllQuotation: 'api/Quotation/getAllQuotation',
   addQuotationData: 'api/Quotation/addQuotationData',
   getQuotationByAccName: 'api/Quotation/getQuotationByAccName',
   deleteQuotationByID: 'api/Quotation/deleteQuotationByID/',
 
 
 
   /************************ Draft Invoice API *********************************/
 
   addDraftInvoiceData: 'api/draft/Invoice/addDraftInvoiceData',
   getallDraftInvoiceDetails: 'api/draft/Invoice/getallDraftInvoiceDetails',
   updateDraftInvoiceDetails: 'api/draft/Invoice/updateDraftInvoiceDetails',
   getDraftInvoiceByAccAndPro: 'api/draft/Invoice/updateDraftInvoiceDetails',
 
 
   /************************ Invoice Report API *********************************/
   postInvoiceDetails: 'api/Reports/Invoice/postInvoiceDetails',
   getInvoiceDetails: 'api/Reports/Invoice/getInvoiceDetails',
 
   /************************ Quotation Report API *********************************/
   postQuotationReportData: 'api/Reports/Quotation/postQuotationReportData',
   getQuotationReportDetails: 'api/Reports/Quotation/getQuotationReportDetails',
 
   /************************ PayReminder Report API *********************************/
   addPayReminder: 'api/payReminder/addPayReminder',
   getPayReminderByInvoiceNo : 'api/payReminder/getPayReminderByInvoiceNo',
   updatePayReminderDetails : 'api/payReminder/updatePayReminderDetails/',
 
 
   /************************ Img Uploading API *********************************/
 
   uploadBaggageImg: 'api/product/bagageImg/uploadBaggageImg',
 }