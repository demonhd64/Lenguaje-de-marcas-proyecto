
export function mensajes(mensaje, type = "success"){

    Toastify({
        text: mensaje   ,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: type === "success" ? "green" : "red",
          cursor: "default"
        },
        onClick: function(){} // Callback after click
      }).showToast();

}