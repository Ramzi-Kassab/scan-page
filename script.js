function startScan() {
  const reader = new Html5Qrcode("reader");
  const config = { fps: 10, qrbox: 250 };

  reader.start({ facingMode: "environment" }, config,
    qrCodeMessage => {
      const parts = qrCodeMessage.split(';');
      parts.forEach(p => {
        const [key, val] = p.split('=');
        const field = document.getElementById(key);
        if (field) field.value = val;
      });
      reader.stop();
    },
    errorMessage => {
      console.warn("QR error", errorMessage);
    }
  ).catch(err => console.error("Camera start error", err));
}
