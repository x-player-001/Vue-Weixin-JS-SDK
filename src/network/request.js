import axios from 'axios'

export function wxRequest(config) {
  const instance = axios.create({
    baseURL: '/wx',
    timeout: 5000
  })

  return instance(config);
}