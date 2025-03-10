const axios = require("axios");
const fs = require("fs");
const path = require("path");
const FormData = require("form-data");

const projectRoot = process.cwd();
const CONFIG_FILE = path.join(projectRoot, "env-encryptor.json");

// 🔹 Fungsi untuk membaca URL API dari config.json
function getApiUrl() {
    if (!fs.existsSync(CONFIG_FILE)) {
        console.error("API URL belum diset! Gunakan: env-manager set-api <url>");
        process.exit(1);
    }
    const config = JSON.parse(fs.readFileSync(CONFIG_FILE, "utf-8"));
    return config.apiUrl;
}

// 🔹 Fungsi untuk menyimpan URL API ke config.json
function setApiUrl(url) {
    fs.writeFileSync(CONFIG_FILE, JSON.stringify({ apiUrl: url }, null, 2));
    console.log(`API URL telah diset ke: ${url}`);
}

function showApiUrl(url) {
  const apiUrl = getApiUrl();
  console.log(`API URL: ${apiUrl}`)
}

// 🔹 Upload file ke API
async function uploadFile(filePath) {
  try {
      const apiUrl = getApiUrl(); // Pastikan fungsi ini mengembalikan URL API yang benar
      const fileName = path.basename(filePath);
      
      if (!fs.existsSync(filePath)) {
          throw new Error(`File not found: ${filePath}`);
      }

      const formData = new FormData();
      formData.append("file", fs.createReadStream(filePath));

      const response = await axios.post(`${apiUrl}/upload`, formData, {
          headers: {
              ...formData.getHeaders(), // Menambahkan header yang sesuai untuk multipart/form-data
          },
      });

      console.log("✅ Upload successful:", response.data.message);
  } catch (error) {
      if (error.response) {
          console.error("❌ Upload failed:", error.response.data);
      } else {
          console.error("❌ Upload failed:", error.message);
      }
  }
}

// 🔹 Upload semua file terenkripsi di folder
async function uploadAllFiles() {
    try {
        const files = fs.readdirSync(process.cwd()).filter(file => file.endsWith(".enc"));
        if (files.length === 0) {
            console.log("Tidak ada file .enc untuk diupload.");
            return;
        }

        for (const file of files) {
            await uploadFile(file);
        }
    } catch (error) {
        console.error("Upload all files failed:", error.message);
    }
}

// 🔹 Download file dari API
async function downloadFile(fileName) {
    try {
        const apiUrl = getApiUrl();
        const response = await axios({
            url: `${apiUrl}/download/${fileName}`,
            method: "GET",
            responseType: "stream",
        });

        const filePath = path.join(process.cwd(), fileName);
        response.data.pipe(fs.createWriteStream(filePath));
        console.log(`File ${fileName} berhasil diunduh.`);
    } catch (error) {
        console.error("Download failed:", error.message);
    }
}

// 🔹 Download semua file
async function downloadAllFiles() {
    try {
        const apiUrl = getApiUrl();
        const response = await axios.get(`${apiUrl}/files`);
        const files = response.data.files;

        if (files.length === 0) {
            console.log("Tidak ada file di cloud.");
            return;
        }

        for (const file of files) {
            await downloadFile(file);
        }
    } catch (error) {
        console.error("Download all files failed:", error.message);
    }
}

async function deleteFile(filename) {
    try {
        const apiUrl = getApiUrl();
        const response = await axios.delete(`${apiUrl}/delete/${filename}`);
        const { message } = response.data;
        console.log(`Message: ${message}`);
    } catch (error) {
        console.error("Delete file files failed:", error.message);
    }
}


async function deleteAllFile() {
    try {
        const apiUrl = getApiUrl();
        const response = await axios.delete(`${apiUrl}/delete-all`);
        const { message } = response.data;
        console.log(`Message: ${message}`);
    } catch (error) {
        console.error("Delete all file files failed:", error.message);
    }
}

// 🔹 List file yang sudah terupload
async function listFiles() {
    try {
        const apiUrl = getApiUrl();
        const response = await axios.get(`${apiUrl}/files`);
        const { files } = response.data;

        if (!files.length) {
            console.log('Belum ada file! Upload sekarang dengan perintah [envim upload <nama-file.ext>]')
            return;
        }

        console.log("File di cloud :");
        files.forEach(file => {
            console.log(`- ${file}`);
        });

    } catch (error) {
        console.error("Gagal mengambil daftar file:", error.message);
    }
}

module.exports = {
    getApiUrl,
    setApiUrl,
    uploadFile,
    uploadAllFiles,
    downloadFile,
    downloadAllFiles,
    deleteFile,
    deleteAllFile,
    listFiles,
};
