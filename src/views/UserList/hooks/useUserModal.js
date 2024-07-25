import { useRef, useState } from 'react';

import { message } from '@/hooks/useAntdPop';
import { apiAddUser, apiUpdateUser, apiDeleteUser } from '@/api/user';

export default getUsers => {
  const [modal, setModal] = useState({
    modalShow: false,
    modalType: 'add'
  });
  const modalRef = useRef(null);

  async function ok() {
    const formData = modalRef.current.form.getFieldsValue();
    const res = await apiAddUser(formData);
    console.log('ok： ', res, getUsers);
    message.success('添加成功');
    onCancel();
    getUsers();
  }
  function onCancel() {
    setModal({ ...modal, modalShow: false });
  }

  return { modal, setModal, modalRef, ok, onCancel };
};
