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


module.exports = {generateSlug, getRandomNo, useDate}