const token = localStorage.getItem('token')
const FetchCreateUser = async (leadObj) => {
 
    return fetch(`${process.env.REACT_APP_BASE_URL}/accounts/sign-up`, {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
         "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(leadObj),
    })
      .then((data) => {
        if (data.ok) {
          //console.log("thêm nhân viên bầngpi thành công");
          //console.log("data ", data);
          return true;
        } else {
          return false;
        }
      })
      .catch((error) => {
        console.error("Lỗi:", error);
        return false;
      });
  };

  export default FetchCreateUser;