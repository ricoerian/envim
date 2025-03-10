const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const readline = require("readline-sync");

const projectRoot = process.cwd();
const KEY_FILE = path.join(projectRoot, "key.enc");

function generateKey() {
    const password = readline.question("Enter a secure password: ", { hideEchoBack: true });
    const salt = crypto.randomBytes(16);
    const key = crypto.scryptSync(password, salt, 32);

    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);

    const encryptedKey = Buffer.concat([cipher.update(key), cipher.final()]);
    const data = Buffer.concat([salt, iv, encryptedKey]);

    fs.writeFileSync(KEY_FILE, data);
    console.log("✅ Encryption key generated and securely stored.");
}

function getKey() {
    if (!fs.existsSync(KEY_FILE)) {
        console.error("❌ Encryption key not found! Run `env-manager generate-key` first.");
        process.exit(1);
    }

    const password = readline.question("Enter your password: ", { hideEchoBack: true });
    const data = fs.readFileSync(KEY_FILE);

    const salt = data.slice(0, 16);
    const iv = data.slice(16, 32);
    const encryptedKey = data.slice(32);

    const key = crypto.scryptSync(password, salt, 32);
    const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);

    let decryptedKey;
    try {
        decryptedKey = Buffer.concat([decipher.update(encryptedKey), decipher.final()]);
    } catch (error) {
        console.error("❌ Incorrect password!");
        process.exit(1);
    }

    return decryptedKey;
}

module.exports = { generateKey, getKey };
