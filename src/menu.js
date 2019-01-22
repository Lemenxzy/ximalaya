import { Menu, shell, dialog } from 'electron';

const template = [
  {
    label: '视图',
    role: 'View',
    submenu: [
      {
        label: '刷新',
        role: 'reload',
      },
      {
        label: '强制刷新',
        role: 'forcereload',
      },
    ],
  },
  {
    label: '窗口',
    role: 'window',
    submenu: [
      {
        label: '最小化',
        role: 'minimize',
      },
      {
        label: '关闭',
        role: 'close',
      },
    ],
  },
  {
    label: '帮助',
    role: 'help',
    submenu: [
      {
        label: '了解更多',
        click() { shell.openExternal('https://github.com/Lemenxzy/ximalaya'); },
      },
      {
        label: '关于',
        click() {
          dialog.showMessageBox(null, {
            type: 'info',
            buttons: ['好'],
            defaultId: 0,
            title: '喜马拉雅FM for Mac',
            message: '喜马拉雅FM for Mac. \n\n Author: 智源',
            detail: '\n WeChart: xzyzmai',
          });
        },
      },
    ],
  },
];

const menu = Menu.buildFromTemplate(template);

export default menu;
