export function mensajes(mensaje, type = "success", foto = null) {
  let contenido = "";

  if (foto) {
    contenido = `
      <div style="display: flex; align-items: center; gap: 10px; width: 100%; left: 0; right: 0">
        <div style="display: inline-flex; align-items: center; gap: 10px;">
          <img src="${foto}" alt="Foto" style="width: 30px; height: 30px; border-radius: 50%; object-fit: cover; margin: 0; padding: 0;">
          <span style="margin: 0; padding: 0;">${mensaje}</span>
        </div>
        <i class="material-icons close-btn" style="cursor: pointer;">delete_outline</i>
      </div>
      <div class="progress-bar" style="width: 100%; height: 5px; background: rgba(255, 255, 255, 0.3); margin-top: 5px;">
        <div class="progress" style="height: 100%; width: 0; background: white;"></div>
      </div>
    `;
  } else {
    contenido = `
      <div style="display: flex; align-items: center; width: 100%; left: 0; right: 0">
        <span style="margin: 0; padding: 0;">${mensaje}</span>
        <i class="material-icons close-btn" style="cursor: pointer;">delete_outline</i>
      </div>
      <div class="progress-bar" style="width: 100%; height: 5px; background: rgba(255, 255, 255, 0.3); margin-top: 5px;">
        <div class="progress" style="height: 100%; width: 0; background: white;"></div>
      </div>
    `;
  }

  const toast = Toastify({
    text: contenido,
    duration: 3000,
    newWindow: true,
    close: false,
    gravity: "bottom",
    position: "right",
    stopOnFocus: true,
    style: {
      background: type === "success" ? "green" : "red",
      cursor: "default",
      display: "flex",
      flexDirection: "column", // Asegura que el contenido se apile verticalmente
      alignItems: "flex-start", // Alinea el contenido a la izquierda
      color: "white",
      width: "fit-content",
      maxWidth: "100%"
    },
    escapeMarkup: false,
    onClick: function () {}
  });

  toast.showToast();

  // Animar la barra de progreso
  const progressBar = toast.toastElement.querySelector('.progress');
  let width = 100;
  const duration = 3000; // Duración total en milisegundos
  const interval = 10; // Intervalo de actualización en milisegundos
  const step = (interval / duration) * 100; //Velocidad a la que se tiene que reducir para dar el parecido de que se reduce smooth

  const progressInterval = setInterval(() => {
    width -= step;
    if (width >= 100) {
      width = 0;
      clearInterval(progressInterval);
    }
    progressBar.style.width = width + '%';
  }, interval);

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