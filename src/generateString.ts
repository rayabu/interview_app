import crypto from 'crypto';

const algorithm = 'aes-256-ctr';
//normally store this password on the server in a secure way
const password = 'FoCKvdLslUuB4y3EZlKate7XGottHski1LmyqJHvzzz';
const ivLength = 16;

export const encrypt = (value: string): string => {
  const iv = crypto.randomBytes(ivLength);
  const cipher = crypto.createCipheriv(
    algorithm,
    Buffer.from(password, 'base64'),
    iv,
  );
  let encrypted = cipher.update(value);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString('hex') + ':' + encrypted.toString('hex');
};

export const decrypt = (value: string): string => {
  const textParts = value.split(':');
  const iv = Buffer.from(textParts.shift(), 'hex');
  const encryptedText = Buffer.from(textParts.join(':'), 'hex');
  const decipher = crypto.createDecipheriv(
    algorithm,
    Buffer.from(password, 'base64'),
    iv,
  );
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
};

export default {
  encrypt,
  decrypt,
};
