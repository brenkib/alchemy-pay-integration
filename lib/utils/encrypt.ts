import * as crypto from 'crypto';

export function encrypt(plainText: string, secretKeyData: string) {
    try {
        const plainTextData = Buffer.from(plainText, 'utf8');
        const secretKey = Buffer.from(secretKeyData, 'utf8');
        const iv = secretKeyData.substring(0, 16);

        const cipher = crypto.createCipheriv('aes-128-cbc', secretKey, iv);

        let encrypted = cipher.update(plainTextData);
        encrypted = Buffer.concat([encrypted, cipher.final()]);

        return encrypted.toString('base64');
    } catch (e) {
        console.log(`AES encrypting exception, msg is ${(e as Error).toString()}`);
    }
    return "";
}