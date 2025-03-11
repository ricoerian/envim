const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const keyManager = require("./keyManager");

function encryptFile(filename) {
    if (!fs.existsSync(filename)) {
        console.error("❌ File not found:", filename);
        process.exit(1);
    }

    const key = keyManager.getKey();
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);

    const fileData = fs.readFileSync(filename);
    const encryptedData = Buffer.concat([cipher.update(fileData), cipher.final()]);

    const outputFilename = filename + ".enc";
    fs.writeFileSync(outputFilename, Buffer.concat([iv, encryptedData]));

    console.log(`✅ File encrypted successfully: ${outputFilename}`);
}

function decryptFile(filename) {
    if (!fs.existsSync(filename)) {
        console.error("❌ File not found:", filename);
        process.exit(1);
    }

    const key = keyManager.getKey();
    const fileData = fs.readFileSync(filename);

    const iv = fileData.slice(0, 16);
    const encryptedData = fileData.slice(16);
    const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);

    let decryptedData;
    try {
        decryptedData = Buffer.concat([decipher.update(encryptedData), decipher.final()]);
    } catch (error) {
        console.error("❌ Decryption failed! Incorrect password or corrupt file.");
        process.exit(1);
    }

    const outputFilename = filename.replace(".enc", "");
    fs.writeFileSync(outputFilename, decryptedData);

    console.log(`✅ File decrypted successfully: ${outputFilename}`);
}

module.exports = { encryptFile, decryptFile };
