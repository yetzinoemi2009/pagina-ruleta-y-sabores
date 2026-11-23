// 1) Confirmación de 3 botones al ELIMINAR (Estilo que pediste)
document.querySelectorAll('form[action="eliminar.php"]').forEach(form => {
  form.addEventListener('submit', function(e) {
      e.preventDefault(); // Detenemos el envío real

      Swal.fire({
          title: "¿Deseas eliminar el producto?",
          text: "¡No podrás revertir esto!",
          icon: "warning",
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: "Sí, eliminar",
          denyButtonText: `No eliminar`,
          cancelButtonText: "Cancelar",
          confirmButtonColor: '#d33',       // Rojo para eliminar
          denyButtonColor: '#6c757d',       // Gris para "No eliminar"
          cancelButtonColor: '#3085d6'      // Azul para "Cancelar"
      }).then((result) => {
          if (result.isConfirmed) {
              // Si dice "Sí, eliminar", enviamos el formulario a eliminar.php
              form.submit(); 
          } else if (result.isDenied) {
              // Si dice "No eliminar"
              Swal.fire("Cancelado", "El producto está a salvo :)", "info");
          }
          // Si dice "Cancelar", no hace nada y se cierra la ventana
      });
  });
});

// 2) Auto-cerrar alertas de Bootstrap a los 4 segundos
setTimeout(() => {
  document.querySelectorAll('.alert').forEach(a => {
      if (typeof bootstrap !== 'undefined') {
          bootstrap.Alert.getOrCreateInstance(a).close();
      }
  });
}, 4000);

// 3) Vista previa de la imagen
const inputImg = document.querySelector('[name="imagen"]');
if (inputImg) {
  inputImg.addEventListener('change', e => {
      const file = e.target.files[0];
      if (!file) return;
      const url = URL.createObjectURL(file);
      let prev = document.getElementById('preview');
      if (!prev) {
          prev = document.createElement('img');
          prev.id = 'preview';
          prev.style.cssText = 'max-width:180px;margin-top:10px;border-radius:6px;';
          e.target.closest('.col-12').appendChild(prev);
      }
      prev.src = url;
  });
}

// 4) Alertas de SweetAlert2 al recargar la página (Guardar, Actualizar, Eliminar y Errores)
document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const mensaje = urlParams.get('mensaje');

  if (mensaje) {
      if (mensaje === 'guardado' || mensaje === 'actualizado') {
          // Alerta central para guardar/editar
          Swal.fire({
              title: mensaje === 'guardado' ? "¡Sabor agregado!" : "¡Sabor actualizado!",
              text: mensaje === 'guardado' ? "El producto ya está en la ruleta." : "Los cambios se guardaron correctamente.",
              icon: "success",
              draggable: true,
              confirmButtonColor: '#6d28d9'
          });
      } else if (mensaje === 'eliminado') {
          // ¡Alerta en el CENTRO al eliminar!
          Swal.fire({
              icon: "success",
              title: "Producto eliminado",
              showConfirmButton: false,
              timer: 2000 // Desaparece en 2 segundos
          });
      } else {
          // Errores
          Swal.fire({
              title: "¡Ups!",
              text: mensaje === 'error' ? 'Hubo un error en el servidor.' : mensaje,
              icon: "error",
              confirmButtonText: 'Entendido'
          });
      }

      // Limpiamos la URL para que no salga el "?mensaje=..." en localhost
      const urlLimpia = window.location.protocol + "//" + window.location.host + window.location.pathname;
      window.history.replaceState({}, document.title, urlLimpia);
  }
});