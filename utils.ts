import axios from 'axios';
export async function sendWelcomeMaiL(name: string, email: string){
  const res = await axios({
    url: "https://awesome-blackwell-208752.netlify.app/.netlify/functions/welcome",
    method: 'post',
    data: { email, name }
  })
  console.log(res.status, res.data);
  return res.status;
}

type IntercomUser = {
  name: string
  email: string
  phone: string
}

export async function addToIntercom(user: IntercomUser){
  const res = await axios({
    url: "https://awesome-blackwell-208752.netlify.app/.netlify/functions/addToIntercom",
    method: 'post',
    data: user
  })
  console.log(res.status, res.data);
  return res.status;
}