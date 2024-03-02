const webview = document.getElementById('webview');
const addressBar = document.getElementById('address-bar');

webview.src = 'pages/welcome.html';

function loadPage() {
  const url = addressBar.value.trim();

  if (url !== '') {
    saveToLocalStorage(url);
    webview.src = url;
  }
}

function goBack() {
  const previousUrl = getFromLocalStorage();

  if (previousUrl) {
    webview.src = previousUrl;

    addressBar.value = previousUrl;
  }
}

webview.addEventListener('did-stop-loading', () => {
  if (webview.src === '') {
    webview.src = 'pages/welcome.html';
  }
});

function saveToLocalStorage(url) {
  const storedUrls = JSON.parse(localStorage.getItem('previousUrls')) || [];

  storedUrls.push(url);

  localStorage.setItem('previousUrls', JSON.stringify(storedUrls));
}

function getFromLocalStorage() {
  const storedUrls = JSON.parse(localStorage.getItem('previousUrls')) || [];

  const previousUrl = storedUrls.pop();
  localStorage.setItem('previousUrls', JSON.stringify(storedUrls));

  return previousUrl;
}
