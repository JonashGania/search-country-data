"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RenderCountryBorders = void 0;
const RenderCountryBorders = (borders, borderContainer) => {
    if (borders) {
        borders.forEach((border) => {
            const borderElement = document.createElement('li');
            borderElement.classList.add('country-borders');
            borderElement.textContent = `${border}`;
            borderContainer.appendChild(borderElement);
        });
    }
};
exports.RenderCountryBorders = RenderCountryBorders;
