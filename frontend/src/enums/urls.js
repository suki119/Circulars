export let appURLs = {
  web: 'http://localhost:4000/',

  //web: 'http://203.115.26.13:4000/'
}


export const webAPI = {

  /************************ All Circulars API *********************************/

  getAllCirculars: 'upload/',


  /************************ PDF File Upload API *********************************/

  pdfFileInsert: 'upload/',
  pdfFileDelete: 'upload/',

  /************************ User API *********************************/
  login: 'user/login',
  userInsert:'user/register',
  getAllUsers:'user/',
  updateUser:'user/',
  deleteUser:'user/',


   /************************QMS PDF File Upload API *********************************/

  qmsPdfFileInsert: 'QMS-upload/',
  qmsPdfFileDelete: 'QMS-upload/',



}