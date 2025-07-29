export const listenClick = (elementId: string, callback: () => void): void => {
  const element = document.getElementById(elementId);
  
  if (element) {
    element.addEventListener("click", (event) => {
      event.preventDefault();
      callback();
    });
  }
};
