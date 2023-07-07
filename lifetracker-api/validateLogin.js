function validateEmail(email){
   let emailPattern= /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
   return emailPattern.test(email)
}

function validatePassword(password){
   let passwordPattern= /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
   return passwordPattern.test(password)
}

function add(a,b, callback){
   return callback(a+b)
}

module.exports= {validateEmail, validatePassword, add}