const taxRate = 0.18;
const shipping = 15.0;

window.onload = () => {
  localStorage.setItem('taxRate', taxRate);
  localStorage.setItem('shipping', shipping);
};

//Capturing Methode Erismek istenilen elementlere en yakin paret elemente event atayip onun tüm childlarina ayni eventi atamadan kaynak tketimi en aza indermyi performasyonu arttirmayi ve clean code yazmayi saglar.

let productsDiv = document.querySelector('.products');

productsDiv.onclick = (e) => {
  let selectedProductInfoDiv =
    e.target.parentElement.parentElement.parentElement;
  console.log();
  if (e.target.classList.contains('fa-minus')) {
    let quantityP = e.target.parentElement.nextElementSibling;
    if (quantityP.innerText > 1) {
      quantityP.innerText--;
      calculateProductAndCartTotal(selectedProductInfoDiv);
    } else {
      if (confirm('Product wird gelöscht')) {
        quantityP.parentElement.parentElement.parentElement.remove();
        calculateCartTotal();
      }
    }
  } else if (e.target.classList.contains('fa-plus')) {
    e.target.parentElement.previousElementSibling.innerText++;
    calculateProductAndCartTotal(selectedProductInfoDiv);
  } else if (e.target.classList.contains('remove-product')) {
    e.target.parentElement.parentElement.parentElement.remove();
    calculateCartTotal();
  }
};

const calculateProductAndCartTotal = (productInfo) => {
  let productPrice = productInfo
    .querySelector('.product-price')
    .innerText.slice(0, 5);
  let quantityP = productInfo.querySelector('#product-quantity').innerText;
  let productTotal = (productPrice * quantityP).toFixed(2);
  let productLinePrice = productInfo.querySelector('.product-line-price');
  productLinePrice.innerText = productTotal;

  calculateCartTotal();
};

const calculateCartTotal = () => {
  let productsTable = document.querySelectorAll('.product-line-price');
  const subTotal =
    productsTable.length > 0
      ? [...productsTable]
          .map((price) => price.innerText)
          .reduce((a, b) => (parseFloat(a) + parseFloat(b)).toFixed(2))
      : 0;
  document.querySelector('#cart-subtotal').children[1].innerText = subTotal;
  document.querySelector('#cart-tax').children[1].innerText = (
    subTotal * localStorage.getItem('taxRate')
  ).toFixed(2);
  document.querySelector('#cart-shipping').children[1].innerText =
    productsTable.length > 0 ? localStorage.getItem('shipping') : 0;
  document.querySelector('#cart-total').children[1].innerText = (
    parseFloat(document.querySelector('#cart-subtotal').children[1].innerText) +
    parseFloat(document.querySelector('#cart-tax').children[1].innerText) +
    parseFloat(document.querySelector('#cart-shipping').children[1].innerText)
  ).toFixed(2);
};
