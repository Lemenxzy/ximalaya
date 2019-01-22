const elementReady = require('element-ready');
const fs = require('fs');
const path = require('path');

const addStyle = () => {
  const fileName = path.resolve(__dirname, 'style/index.css');
  fs.readFile(fileName, (err, data) => {
    const style = document.createElement('style');
    style.innerHTML = data.toString().trim().replace(/\n/g, '');
    document.head.appendChild(style);
  });
};


function addDraggable() {
  const div = document.createElement('div');
  div.className = 'draggable';
  div.style = 'position: fixed;left: 0px;width: 25px;z-index: 9999;top: 0px;height: 25px;background: #000;';
  document.body.appendChild(div);
}


document.addEventListener('DOMContentLoaded', () => {
  elementReady('#rootFooter').then(() => {
    addStyle();
    addDraggable();
  });
});
