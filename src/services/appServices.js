import customAxios from "../customAxios"

// delete entity 
export const deleteEntity = (url) => {
    return new Promise((resolve, reject) => {
      customAxios.delete(url).then(res => resolve(res)).catch(err => reject(err))
    })
  }
  