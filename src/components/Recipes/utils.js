import axios from 'axios'

export const sendIt = (mail) => {
  return axios.post(`https://fridge-raider-server.herokuapp.com/api/email/send`, mail)
    .catch(error => console.log(error))
}

// local testing
// export const sendIt = (mail) => {
//   return axios.post(`http://localhost:3000/api/email/send`, mail)
//     .catch(error => console.log(error))
// }