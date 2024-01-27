
const handleToast = () => {
  Toastify({
    text: "Valor adicionado a tabela!",
    duration: 5000, 
    close: true, 
    gravity: "bottom", 
    position: "right",
    stopOnFocus: true,
    style: {
      background: "#6741d9",
      border: "8px",
    }, 
    
  }).showToast();
}

export {
  handleToast
}