const fetchDeleteUser = (id) => {
  const tokenJWT = localStorage.getItem("token");

  //console.log("id deleted", id);
  return fetch(
    `${process.env.REACT_APP_BASE_URL}/accounts/delete-account/${id}`,
    {
      method: "DELETE",
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${tokenJWT}`,
      },
    }
  )
    .then((response) => {
     return response
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
};

export default fetchDeleteUser;
