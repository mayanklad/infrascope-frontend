import axios from 'axios'

const BASE_URL = 'http://localhost:8080'

export const getAnsibleGraph = async (file) => {
  const formData = new FormData()
  formData.append('file', file)

  const response = await axios.post(`${BASE_URL}/ansible`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return response.data
}
