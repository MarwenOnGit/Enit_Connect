const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { resolveSafeExtension, buildSafeFilename, badRequest, MAX_UPLOAD_BYTES } = require('./uploadSanitize');

const UPLOAD_DIR = path.join(__dirname, '..', 'uploads');
fs.mkdirSync(UPLOAD_DIR, { recursive: true });

const storage1 = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_DIR);
  },
  filename: function (req, file, cb) {
    const ext = resolveSafeExtension(req, file);
    if (!ext) {
      return cb(badRequest('Invalid or unsupported file type.'));
    }
    cb(null, buildSafeFilename(file.fieldname, ext));
  }
});

const upload = multer({ storage: storage1, limits: { fileSize: MAX_UPLOAD_BYTES } });

const savedoc = upload.single('file');

module.exports = savedoc;
