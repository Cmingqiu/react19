import { App } from 'antd';

let message, modal, notification;

export default function () {
  const staticFunction = App.useApp();
  message = staticFunction.message;
  modal = staticFunction.modal;
  notification = staticFunction.notification;
}

export { message, modal, notification };
