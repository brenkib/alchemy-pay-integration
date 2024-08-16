import * as crypto from 'crypto';

export class HmacUtil {
    static hmac256(key: string, msg: string) {
        const mac = crypto.createHmac('sha256', key);
        const data = mac.update(msg).digest('hex').toLowerCase();
        console.log(`HmacSHA256 rawContent is [${msg}], key is [${key}], hash result is [${data}]`);
        return data;
    }

    static getStringToSign(params: {[key: string]: string | number}) {
        const treeMap = new Map(Object.entries(params).sort());
        let s2s = '';

        for (const [k, v] of treeMap) {
            if (!k || typeof v === 'object') {
                continue;
            }
            if (v !== null && v !== undefined && String(v)) {
                s2s += `${k}=${v}&`;
            }
        }

        return s2s.slice(0, -1);
    }
}
