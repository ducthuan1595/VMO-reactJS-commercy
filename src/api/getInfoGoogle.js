export const getInfoGoogle = (token) => {
  const infoUser = fetch(
    "https://people.googleapis.com/v1/people/me?personFields=names,emailAddresses,photos,phoneNumbers,nicknames,locations", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )
  .then(res => res.json())
  .then(data => {
    return data;
  })
  .catch(err => console.log(err))

  return infoUser;
}