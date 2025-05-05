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
      flexDirection: "column",
      alignItems: "flex-start",
      color: "white",
      width: "fit-content",
      maxWidth: "100%"
    },
    escapeMarkup: false,
    onClick: function () {} // vacío o elimínalo si no lo usas
  });

  toast.showToast();

  // 💡 Aquí agregamos el listener inmediatamente después de mostrar el toast
  toast.toastElement.addEventListener("click", (e) => {
    if (e.target.classList.contains("close-btn")) {
      toast.toastElement.remove();
    }
  });

  // Progreso animado
  const isMobile = window.innerWidth <= 768;
  const duration = 3000;
  const interval = isMobile ? 20 : 10;
  const step = (interval / duration) * 100;

  const progressBar = toast.toastElement.querySelector('.progress');
  let width = 100;

  const progressInterval = setInterval(() => {
    width -= step;
    if (width <= 0) {
      width = 0;
      clearInterval(progressInterval);
    }
    progressBar.style.width = width + '%';
  }, interval);
}
