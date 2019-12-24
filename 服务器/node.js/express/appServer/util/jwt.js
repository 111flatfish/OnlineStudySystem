const fs = require('fs');
const path = require('path');
const jwt = require("jsonwebtoken");
// 创建 token 类
class Jwt {
    constructor(data) {
        // 用户id
        this.data = data;

    }

    //生成token
    generateToken() {
        let data = this.data;
        let created = Math.floor(Date.now() / 1000);

        let cert = fs.readFileSync(path.join(__dirname, '../pem/rsa_private_key.pem'));//私钥 可以自己生成
        let token = jwt.sign({
            data,
            exp: created + 240 * 60,
        }, cert, {algorithm: 'RS256'});
        return token;
    }

    // 校验token
    verifyToken() {
        let token = this.data;
        console.log("jwt token:"+token);
        let cert = fs.readFileSync(path.join(__dirname, '../pem/rsa_public_key.pem'));//公钥 可以自己生成
        console.log("cert:"+cert);
        let res;
        try {
            let result = jwt.verify(token, cert, {algorithms: ['RS256']}) || {};
            console.log("jwt result:"+result.data);
            let {exp = 0} = result, current = Math.floor(Date.now() / 1000);
            if (current <= exp) {
                res = result.data || {};
            }
        } catch (e) {
            res = 'err';
            console.log("err:"+e);
        }
        return res;
    }
}

module.exports = Jwt;
