window.addEventListener('load', svgElementConvertImgToSvg);
function svgElementConvertImgToSvg() {
    // Get all site images
    const images = document.querySelectorAll('a > img[src$=".svg"]');

    images.forEach(img => {
        const parentAnchor = img.parentElement;

        fetch(img.src)
            .then(response => response.text())
            .then(data => {
                // Create the new SVG element
                const parser = new DOMParser();
                const parsedSvg = parser.parseFromString(data, 'image/svg+xml');
                const svgElement = parsedSvg.documentElement;

                // Remove all <script> tags
                const scripts = svgElement.querySelectorAll('script');
                scripts.forEach(script => {
                    script.parentNode.removeChild(script);
                });

                // Copy all attributes from the <img> to the <svg>
                for (let i = 0; i < img.attributes.length; i++) {
                    const attr = img.attributes[i];
                    if (attr.name !== 'src') { // Evitem copiar l'atribut 'src'
                        svgElement.setAttribute(attr.name, attr.value);
                    }
                }

                // Set the SVG element styles
                svgElement.style.width = "100%";
                svgElement.style.maxWidth = "100%";
                svgElement.style.height = "auto";
                svgElement.style.display = "block";
                svgElement.setAttribute('preserveAspectRatio', 'xMidYMid meet');

                // Replace the <img> with the <svg>
                parentAnchor.replaceWith(svgElement);
            })
            .catch(error => {
                console.error("Error carregant l'SVG:", error);
            });
    });
}