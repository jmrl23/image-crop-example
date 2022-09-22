import FormData from 'form-data'
import axios from 'axios'
import { createReadStream } from 'fs'

/**
 * Test image upload API
 *
 * @async
 * @returns {Promise<void>}
 */
async function test(): Promise<void> {
  const formData = new FormData()
  formData.append('image', createReadStream(__dirname + '/../test-image.jpg'))
  const response = await axios.post('http://localhost:3000/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  const data = response.data
  console.log(data)
}

test().catch(console.error)