const changeStatus = async (id, elem) => {
    const auth = elem.checked
    try {
      await axios.put("/skaters", {
        id,
        auth
      })
      alert(auth ? "Usuario Habilitado" : "Usuario Deshabilitado")

    }
    catch ({ respose }) {
        const { data } = response;
        const { error } = data;
        alert(error);
      } 
    }
    
  