const elementReady = require('element-ready');
const fs = require('fs');
const path = require('path');

const hiddenLoading = () => {
  const loading = document.getElementById('loadingWrap');
  document.body.removeChild(loading);
};

const addStyle = () => {
  const fileName = path.resolve(__dirname, 'style/index.css');
  fs.readFile(fileName, (err, data) => {
    const style = document.createElement('style');
    style.innerHTML = data.toString().trim().replace(/\n/g, '');
    document.head.appendChild(style);
    setTimeout(() => {
      hiddenLoading();
    }, 1000);
  });
};


const addDraggable = () => {
  const div = document.createElement('div');
  div.className = 'draggable';
  document.querySelector('nav').appendChild(div);
};

const showLoading = () => {
  const div = document.createElement('div');
  div.className = 'loadingWrap';
  div.id = 'loadingWrap';
  document.body.appendChild(div);
};


document.addEventListener('DOMContentLoaded', () => {
  showLoading();
  elementReady('#rootFooter').then(() => {
    addStyle();
    addDraggable();
  });
});
