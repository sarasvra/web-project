
export function validatePhone(phone: string) {
     phone = phone.trim()
  if (!phone) {
    return "لطفاً شماره موبایل را وارد کنید";
  }
  else if (!/^\d+$/.test(phone) || !phone.startsWith("09") 
           || phone.length !== 11) {
   return "شماره موبایل وارد شده صحیح نمی باشد"
  }

  return "";
}

export function validatename(name : string) {
    if(!name) {
        return "لطفا نام خود را وارد کنید"
    }
   

  if (!/^[\u0600-\u06FFa-zA-Z\s]+$/.test(name)) {
    return "نام و نام خانوادگی فقط باید شامل حروف باشد";
  }


    return "";
}


export function validatePassword (password : string) {
     if(!password) {
        return "لطفا رمز خود را وارد کنید"
     }
     else if(password.trim().length < 8) {
        return "رمز عبور باید حداقل شامل هشت کاراکتر باشد"
     }
      if (!/[A-Z]/.test(password)) {
        return "رمز عبور باید حداقل یک حرف بزرگ داشته باشد";
     }

    if (!/[a-z]/.test(password)) {
        return "رمز عبور باید حداقل یک حرف کوچک داشته باشد";
    }

    if (!/[0-9]/.test(password)) {
        return "رمز عبور باید حداقل یک عدد داشته باشد";
    }

     return "";

}

export function validateconfirmPassword (password : string , confirmPassword : string){
    confirmPassword = confirmPassword.trim()
    if(!confirmPassword) {
        return "لطفا تکرار رمز عبور را وارد کنید"
    }
    else if(password !== confirmPassword) {
        return "رمز عبور با تکرار آن یکسان نیست"
    }

    return ""
}
