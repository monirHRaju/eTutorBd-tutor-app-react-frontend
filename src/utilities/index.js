import axios from 'axios'

export const imageUpload = async imageData => {
  const formData = new FormData()
  formData.append('image', imageData)

  const { data } = await axios.post(
    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
    formData
  )
  return data?.data?.display_url
}



// save or update user in db
export const saveOrUpdateUser = async userData => {
    const { data } = await axios.post(`/users`, userData)
  
  return data
}

export const generateJobId = () => {
  const year = new Date().getFullYear();
  const random = Math.floor(1000 + Math.random() * 9000);
  return `TU-${year}-${random}`;
};
