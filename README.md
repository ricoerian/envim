# 🔐 Env Encryptor

**env-encryptor** is a CLI tool for securely encrypting, decrypting, and managing `.env` files with cloud storage integration.


## 📦 Installation
To install this package globally, run:

```
npm i env-encryptor
```


<br>


## 🚀 Usage

### Options
| Option      | Description                  |
|------------|------------------------------|
| `-h, --help` | Display help for command |

### Commands
| Command                 | Description |
|-------------------------|-------------|
| `generate-key`          | Generate an encryption key securely |
| `encrypt <file>`        | Encrypt a `.env` file |
| `decrypt <file>`        | Decrypt an encrypted `.env` file |
| `push [options] [file]` | Upload an encrypted file to cloud storage |
| `pull [options] [file]` | Download an encrypted file from cloud storage |
| `delete [options] [file]` | Delete a specific file from cloud storage |
| `list`                 | List all uploaded files in cloud storage |
| `set-api-url <url>`     | Set the API URL for cloud storage |
| `get-api-url`          | Get the API URL for cloud storage |
| `help [command]`       | Display help for a specific command |


<br>

## 🔑 Generate an Encryption Key
To encrypt a ``.env`` file, run:
```
npx envim encrypt .env
```
The encrypted file will be saved as ``.env.enc``.


<br>


## 🔓 Decrypt an Encrypted .env File
To decrypt ``.env.enc`` back to ``.env``:


<br>


## 📤 Upload an Encrypted File to Cloud Storage
To upload ``.env.enc`` to the cloud storage:
```
npx envim push ``.env.enc``
```
To upload all encrypted files in the directory:
```
npx envim push --all
```


<br>


## 📥 Download an Encrypted File from Cloud Storage
To download ``.env.enc`` from the cloud storage:
```
npx envim pull ``.env.enc``
```
To download all encrypted files available in cloud storage:
```
npx envim pull --all
```


<br>



## ❌ Delete a File from Cloud Storage
To delete a specific file from cloud storage:
```
npx env-manager delete .env.enc
```
To delete all files from cloud storage:
```
npx env-manager delete --all
```


<br>


## 📂 List Uploaded Files
To list all files currently stored in cloud storage:
```
npx env-manager list
```


<br>



## ⚙️ Set API URL for Cloud Storage
To configure the API endpoint used for uploading and downloading files:
```
npx env-manager set-api-url https://your-api.com
```
To retrieve the currently set API URL:
```
npx env-manager get-api-url
```


<br>



# 🛠 Troubleshooting
If you encounter issues, check the available commands:
```
npx env-manager --help
```
Check the installed version:
```
npx env-manager --version
```


<br>



## 📜 License
Created by : [Abdillah AG](https://www.linkedin.com/in/abdillah-ag-930172167/)
<br>
MIT License © 2025 env-manager


---

This **README.md** is now fully structured, in **English**, and formatted **entirely in Markdown**. 🚀✨

