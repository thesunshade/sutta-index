export const copyScriptsText = `

// copy heading to clipboard
document.addEventListener('DOMContentLoaded', () => {
    document.body.addEventListener('click', (event) => {
        if (event.target.tagName === 'IMG' && event.target.classList.contains('click-to-copy')) {
            event.preventDefault(); 
            const textToCopy = event.target.getAttribute('data-clipboard-text');
            if (textToCopy) {
                navigator.clipboard.writeText(textToCopy).then(() => {
                    toggleSnackBar()
                }).catch(err => {
                    console.error('Failed to copy text:', err);
                });
            }
        }
    });
});

  function toggleSnackBar() {
    const appElement = document.getElementById("app");
    appElement.classList.remove("hide-snack-bar");
    setTimeout(() => {
      appElement.classList.add("hide-snack-bar");
    }, 900);
  }



`;
