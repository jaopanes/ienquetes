import axios from 'axios'

export default axios.create({
    baseURL: 'http://localhost/ienquetes/public/api/'
})