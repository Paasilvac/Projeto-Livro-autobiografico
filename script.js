const btnTopo = document.getElementById("btnTopo");
const topo = document.querySelector(".topo");
let resizeTimeoutId;
let rafAtualizacaoId;

function medirAlturaViewportMobile() {
  if (window.visualViewport && window.visualViewport.height) {
    return window.visualViewport.height;
  }
  return window.innerHeight;
}

function atualizarDimensoesMobile() {
  if (!topo) return;

  const alturaTopo = topo.offsetHeight;
  const alturaViewport = medirAlturaViewportMobile();

  document.documentElement.style.setProperty("--topo-mobile-altura", `${alturaTopo}px`);
  document.documentElement.style.setProperty("--viewport-mobile-altura", `${alturaViewport}px`);
}

function agendarAtualizacaoDimensoes() {
  if (rafAtualizacaoId) {
    cancelAnimationFrame(rafAtualizacaoId);
  }

  rafAtualizacaoId = requestAnimationFrame(() => {
    atualizarDimensoesMobile();
    rafAtualizacaoId = null;
  });
}

window.addEventListener("load", agendarAtualizacaoDimensoes);
window.addEventListener("orientationchange", agendarAtualizacaoDimensoes);
window.addEventListener("resize", () => {
  clearTimeout(resizeTimeoutId);
  resizeTimeoutId = window.setTimeout(agendarAtualizacaoDimensoes, 120);
});

if (btnTopo) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      btnTopo.style.display = "block";
    } else {
      btnTopo.style.display = "none";
    }
  });

  btnTopo.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}