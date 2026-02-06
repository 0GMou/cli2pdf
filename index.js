const { chromium } = require('playwright');
const path = require('path');

(async () => {
  // 1. Detectar argumentos
  const args = process.argv.slice(2);
  const urlArg = args.find(arg => arg.startsWith('http'));
  const forceFullHD = args.includes('--fhd'); // Detectamos la opción

  if (!urlArg) {
    console.error('\n❌ ERROR: Debes proporcionar una URL.');
    console.log('Uso estándar: node index.js "URL"');
    console.log('Uso ancho fijo: node index.js "URL" --fhd\n');
    process.exit(1);
  }

  // Asegurar protocolo
  const urlObjetivo = urlArg.startsWith('http') ? urlArg : `https://${urlArg}`;
  const widthSetting = forceFullHD ? 1920 : 1280; // 1920 si es --fhd, sino 1280 base
  
  console.log(`🚀 Iniciando Chromium para: ${urlObjetivo}`);
  if (forceFullHD) console.log("🖥️  Modo: Ancho Fijo (1920px)");

  const browser = await chromium.launch();
  const page = await browser.newPage();

  // 2. IMPORTANTE: Definir el tamaño de la ventana ANTES de cargar
  // Esto obliga a la web a renderizar en versión escritorio completa
  await page.setViewportSize({ width: widthSetting, height: 1080 });

  try {
    await page.goto(urlObjetivo, { waitUntil: 'networkidle', timeout: 60000 });

    console.log("⬇️  Bajando para cargar contenido (Scroll)...");
    
    // Lógica de Scroll Infinito
    await page.evaluate(async () => {
      await new Promise((resolve) => {
        let totalHeight = 0;
        const distance = 100;
        const timer = setInterval(() => {
          const scrollHeight = document.body.scrollHeight;
          window.scrollBy(0, distance);
          totalHeight += distance;

          if(totalHeight >= scrollHeight){
            clearInterval(timer);
            resolve();
          }
        }, 50);
      });
    });

    // Espera de seguridad
    await page.waitForTimeout(2000);

    // Obtener dimensiones finales
    const pageData = await page.evaluate(() => {
      return {
        width: document.documentElement.scrollWidth,
        height: document.documentElement.scrollHeight,
        title: document.title
      };
    });

    // Limpiar nombre de archivo
    const safeTitle = pageData.title.replace(/[^a-z0-9áéíóúñü \-_]/gi, '').trim() || 'pagina_web';
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
    const filename = `${safeTitle}_${timestamp}.pdf`;
    
    // Ruta absoluta
    const outputPath = path.resolve(process.cwd(), filename);

    // Decidir el ancho final del PDF
    // Si forzamos FHD, usamos 1920px clavados. Si no, usamos lo que la web diga.
    const finalPdfWidth = forceFullHD ? '1920px' : `${pageData.width}px`;

    console.log(`📏 Dimensiones PDF: ${finalPdfWidth} x ${pageData.height}px`);

    // Solución del espacio en blanco (media: screen)
    await page.emulateMedia({ media: 'screen' });

    // Generar PDF
    await page.pdf({
      path: outputPath,
      width: finalPdfWidth,
      height: `${pageData.height + 20}px`, // Un pequeño margen extra seguro
      printBackground: true,
      margin: { top: '0', bottom: '0', left: '0', right: '0' },
      pageRanges: '1'
    });

    console.log(`✅ PDF Guardado: ${filename}`);

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await browser.close();
  }
})();
