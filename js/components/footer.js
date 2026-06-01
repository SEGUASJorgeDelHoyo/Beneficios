export function renderFooter() {
  return `
    <footer class="app-footer" id="main-footer">
      <div class="footer-content">
        <div class="footer-col">
          <h4>Delegaciones Seguas</h4>
          <p><strong style="color:#fff">Seguas Zaragoza</strong></p>
          <p>Polígono Industrial Puerta Norte</p>
          <p>Calle Tomillo 18, 50820 Zaragoza</p>
          <p>Tel: <a href="tel:976455584">976 45 55 84</a></p>
          <p><a href="mailto:seguas@seguas.com">seguas@seguas.com</a></p>
          <br>
          <p><strong style="color:#fff">Seguas Sant Cugat del Vallès</strong></p>
          <p>Vallsolana Garden Business Park</p>
          <p>Edifici Vinson, Oficina 19</p>
          <p>08174 Sant Cugat del Vallès (Barcelona)</p>
          <p>Tel: <a href="tel:930129962">930 12 99 62</a></p>
          <div class="footer-social">
            <a href="https://www.youtube.com/@seguasairecomprimidoyfrioi1287" target="_blank" rel="noopener" aria-label="YouTube">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.5 31.5 0 0 0 0 12a31.5 31.5 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1c.4-1.9.5-5.8.5-5.8s0-3.9-.5-5.8zM9.5 15.5V8.5l6.3 3.5-6.3 3.5z"/></svg>
            </a>
            <a href="https://www.linkedin.com/company/seguas/" target="_blank" rel="noopener" aria-label="LinkedIn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05a3.74 3.74 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77A1.75 1.75 0 0 0 0 1.73v20.54A1.75 1.75 0 0 0 1.77 24h20.45A1.75 1.75 0 0 0 24 22.27V1.73A1.75 1.75 0 0 0 22.22 0z"/></svg>
            </a>
          </div>
        </div>
        <div class="footer-col">
          <h4>Blog</h4>
          <a href="https://www.seguas.com/categoria/aire-comprimido/" target="_blank">Aire Comprimido</a>
          <a href="https://www.seguas.com/categoria/refrigeracion/" target="_blank">Refrigeración</a>
          <a href="https://www.seguas.com/categoria/climatizacion/" target="_blank">Climatización</a>
          <a href="https://www.seguas.com/categoria/equipos-y-mantenimiento/" target="_blank">Equipos y Mantenimiento</a>
          <a href="https://www.seguas.com/categoria/calidad-y-m-a/" target="_blank">Calidad y M.A.</a>
          <a href="https://www.seguas.com/categoria/ingenieria-proyectos/" target="_blank">Ingeniería</a>
          <a href="https://www.seguas.com/categoria/noticias-seguas/" target="_blank">Noticias</a>
        </div>
        <div class="footer-col">
          <h4>Soluciones Industriales</h4>
          <a href="https://www.seguas.com/servicios/aire-comprimido/" target="_blank">Aire comprimido industrial</a>
          <a href="https://www.seguas.com/servicios/refrigeracion-industrial/" target="_blank">Refrigeración industrial</a>
          <a href="https://www.seguas.com/servicios/climatizacion-industrial/" target="_blank">Climatización industrial</a>
          <a href="https://www.seguas.com/servicios/descarbonizacion-industrial/" target="_blank">Descarbonización industrial</a>
          <a href="https://www.seguas.com/soluciones-en-mantenimiento-industrial/" target="_blank">Mantenimiento industrial</a>
        </div>
      </div>
      <div class="footer-bottom">
        <div class="footer-legal">
          <a href="https://www.seguas.com/aviso-legal/" target="_blank">Aviso legal</a>
          <a href="https://www.seguas.com/politica-de-privacidad/" target="_blank">Política de privacidad</a>
          <a href="https://www.seguas.com/politica-de-calidad/" target="_blank">Política de calidad</a>
          <a href="https://www.seguas.com/politica-de-cookies/" target="_blank">Política de cookies</a>
        </div>
        <div class="footer-copy">© ${new Date().getFullYear()} Seguas. Todos los derechos reservados.</div>
      </div>
    </footer>
  `;
}
