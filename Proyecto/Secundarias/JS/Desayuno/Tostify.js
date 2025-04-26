export function mensajes(mensaje, type = "success", foto = null) {
  let contenido = "";

  if (foto) {
    contenido = `
      <div style="display: flex; align-items: center; gap: 10px; width: 100%;left: 0; right: 0">
        <div style="display: inline-flex; align-items: center; gap: 10px;">
          <img src="${foto}" alt="Foto" style="width: 30px; height: 30px; border-radius: 50%; object-fit: cover ;margin: 0; padding: 0;">
          <span style="margin: 0; padding: 0;">${mensaje}</span>
        </div>
        <i class="material-icons close-btn" style="cursor: pointer;">delete_outline</i>
      </div>
    `;
  } else {
    contenido = `
      <div style="display: flex; align-items: center; width: 100%; left:0; right: 0">
        <span style="margin: 0; padding: 0;">${mensaje}</span>
        <i class="material-icons close-btn" style="cursor: pointer;">delete_outline</i>
      </div>
    `;
  }

  const toast = Toastify({
    text: contenido,
    duration: 3000,
    newWindow: true,
    close: false, // quitamos el botón default de Toastify
    gravity: "bottom",
    position: "right",
    stopOnFocus: true,
    style: {
      background: type === "success" ? "green" : "red",
      cursor: "default",
      display: "flex",
      alignItems: "center",
      color: "white",
      width:"fit-content",
      maxWidth: "100%"
    },
    escapeMarkup: false,
    onClick: function () {}
  });

  toast.showToast();

  // Detectar y cerrar cuando se pulse el botón de la papelera
  setTimeout(() => {
    const closeBtn = document.querySelector('.toastify .close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        closeBtn.closest('.toastify').remove();
      });
    }
  }, 100);
}
