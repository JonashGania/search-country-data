export const RenderCountryBorders = (
  borders: string[] | undefined,
  borderContainer: HTMLUListElement,
): void => {
  if (borders) {
    borders.forEach((border) => {
      const borderElement = document.createElement('li');
      borderElement.classList.add('country-borders');
      borderElement.textContent = `${border}`;
      borderContainer.appendChild(borderElement);
    });
  }
};
