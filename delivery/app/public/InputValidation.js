//验证手机号码是否合法
export function verificationPhoneNumber(phoneNumber) {
    let myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (phoneNumber.length == 0 || phoneNumber == null) {
        return false;
    } else if (!myreg.test(phoneNumber)) {
        return false;
    } else {
        return true;
    }
}

//验证密码是否合法,长度不小于6位数和字母组合
export function verifcationPassword(password) {
    let str = password;
    if (str == null || str.length < 6||str.length>16) {
        return false;
    }
    let reg = new RegExp(/^(?![^a-zA-Z]+$)(?!\D+$)/);
    if (reg.test(str))
        return true;
}

//验证码是否正确
export function verifcationSmsCode(smsCode) {
    let str = smsCode;
    if (str == null || str.length != 6) {
        return false;
    }
    let reg = new RegExp(/^\d+(.\d+)?$/);
    if (reg.test(str))
        return true
}