#!/usr/bin/env node

const { Command } = require("commander");
const packageJson = require("../package.json");
const encryptor = require("../src/encryptor");
const keyManager = require("../src/keyManager");
const apiManager = require("../src/apiManager"); 

const program = new Command();

program.version(packageJson.version, "-v, --version", "Display the current version of env-manager");

program
  .command("generate-key")
  .description("Generate an encryption key securely")
  .action(() => {
    keyManager.generateKey();
  });

program
  .command("encrypt <file>")
  .description("Encrypt a .env file")
  .action((file) => {
    encryptor.encryptFile(file);
  });

program
  .command("decrypt <file>")
  .description("Decrypt an encrypted .env file")
  .action((file) => {
    encryptor.decryptFile(file);
  });

program
  .command("push [file]") // `file` bersifat opsional
  .description("Upload an encrypted file from cloud storage")
  .option("--all", "Upload all files from cloud storage")
  .action((file, options) => {
    if (options.all) {
      apiManager.uploadAllFiles();
    } else if (file) {
      apiManager.uploadFile(file);
    } else {
      console.error("Error: Please specify a filename or use --all to download all files.");
    }
  });

program
  .command("pull [file]") // `file` bersifat opsional
  .description("Download an encrypted file from cloud storage")
  .option("--all", "Download all files from cloud storage")
  .action((file, options) => {
    if (options.all) {
      apiManager.downloadAllFiles();
    } else if (file) {
      apiManager.downloadFile(file);
    } else {
      console.error("Error: Please specify a filename or use --all to download all files.");
    }
  });

program
  .command("delete [file]") // `file` bersifat opsional
  .description(" Delete specific file from cloud storage")
  .option("--all", "Delete all files from cloud storage")
  .action((file, options) => {
    if (options.all) {
      apiManager.deleteAllFile();
    } else if (file) {
      apiManager.deleteFile(file);
    } else {
      console.error("Error: Please specify a filename or use --all to delete all files.");
    }
  });

program
  .command("list")
  .description("List all uploaded files in cloud storage")
  .action(() => {
    apiManager.listFiles();
  });

program
  .command("set-api-url <url>")
  .description("Set the API URL for cloud storage")
  .action((url) => {
    apiManager.setApiUrl(url);
  });

program
  .command("get-api-url")
  .description("Get the API URL for cloud storage")
  .action(() => {
    apiManager.showApiUrl();
  });

program.parse(process.argv);
