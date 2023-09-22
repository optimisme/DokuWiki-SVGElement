window.addEventListener('load', svgElementConvertImgToSvg);
function svgElementConvertImgToSvg() {
    // Seleccioneu totes les imatges SVG de la pàgina que estiguin dins d'un element <a>
    const images = document.querySelectorAll('a > img[src$=".svg"]');

    images.forEach(img => {
        const parentAnchor = img.parentElement;

        fetch(img.src)
            .then(response => response.text())
            .then(data => {
                // Creem un contenidor per parsejar l'SVG
                const parser = new DOMParser();
                const parsedSvg = parser.parseFromString(data, 'image/svg+xml');
                const svgElement = parsedSvg.documentElement;

                // Eliminem qualsevol element <script> dins de l'SVG
                const scripts = svgElement.querySelectorAll('script');
                scripts.forEach(script => {
                    script.parentNode.removeChild(script);
                });

                // Copiem els atributs de l'element <img> a l'element <svg>
                for (let i = 0; i < img.attributes.length; i++) {
                    const attr = img.attributes[i];
                    if (attr.name !== 'src') { // Evitem copiar l'atribut 'src'
                        svgElement.setAttribute(attr.name, attr.value);
                    }
                }

                // Establim l'estil de l'SVG per ocupar tot l'espai disponible
                svgElement.style.width = "100%";
                svgElement.style.maxWidth = "100%";
                svgElement.style.height = "auto";
                svgElement.style.display = "block";
                svgElement.setAttribute('preserveAspectRatio', 'xMidYMid meet');

                // Reemplaça l'element <a> amb l'element <svg>
                parentAnchor.replaceWith(svgElement);
            })
            .catch(error => {
                console.error("Error carregant l'SVG:", error);
            });
    });
}