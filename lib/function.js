// var getRandomValues = require('get-random-values');
 function generateSlug(data){
   
    let slug = data
                .toLowerCase()
                .replace(/[^\w ]+/g, '')
                .replace(/ +/g, '-');  
    return slug;
}

function useDate() { 
  const today= new Date();
  var mm = String(today.getMonth() + 1).padStart(2, '0')
  var dd = String(today.getDate()).padStart(2, '0')
   return  today.getFullYear() + '/' + mm + '/' + dd  
}
 function getRandomNo(){
    
    var i = new Date().getTime();
    i = i & 0xffffff;
    return i;
}
function getDaysDiff (start_date, end_date, date_format = 'YYYY-MM-DD') {
   const getDateAsArray = (date) => {
     return moment(date.split(/\D+/), date_format);
   }
   return getDateAsArray(end_date).diff(getDateAsArray(start_date), 'days') + 1;
 }


module.exports = {generateSlug, getRandomNo, useDate, getDaysDiff}