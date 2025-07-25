export const listenClick = (elementId, callback) => {
  const element = document.getElementById(elementId);

  element.addEventListener("click", (event) => {
    event.preventDefault();
    callback();
  });
};
