import { tmpdir } from 'os'
import { join } from 'path'

import express, { Request, Response } from 'express'
import multer, { Multer } from 'multer'
import sharp from 'sharp'

/**
 * Express application instance
 *
 * @type {express.Application}
 */
const app: express.Application = express()

/**
 * Multer instance
 *
 * @type {Multer}
 */
const upload: Multer = multer({
  storage: multer.memoryStorage(),
  dest: tmpdir(),
  limits: {
    fileSize: 1e+7
  },
  fileFilter(req: Request, file, callback) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/))
      return callback(new Error('Please upload an IMAGE'))
    callback(null, true)
  },
})

// API for image upload
app.post('/upload',
  upload.single('image'),
  async (request: Request, response: Response) => {
    if (!request.file?.buffer)
      return response.status(400).end('BAD REQUEST')
    const fileName = join(__dirname, '../uploads', `${Date.now()}-${request.file?.originalname}`)
    await sharp(request.file.buffer)
      .png()
      .resize({ width: 300, height: 300 })
      .toFile(fileName)
    response.status(200).end('OK')
  }
)

app.listen(3000, () => {
  console.log('http://localhost:3000')
})
