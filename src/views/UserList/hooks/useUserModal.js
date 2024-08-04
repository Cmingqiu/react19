import { useRef, useState } from 'react';

import { message } from '@/hooks/useAntdPop';
import { apiAddUser, apiUpdateUser, apiDeleteUser } from '@/api/user';

export default (currentRow, getUsers) => {
  const [modal, setModal] = useState({
    modalShow: false,
    modalType: 1 // 新增1  编辑2
  });
  const modalRef = useRef(null);

  // 编辑
  function editUser(data) {
    return () => {
      currentRow.current = data;
      setModal({ modalType: 2, modalShow: true });
    };
  }
  // 删除
  function deleteUser(data) {
    return async () => {
      await apiDeleteUser(data._id);
      message.success('删除成功');
      getUsers();
    };
  }

  function ok() {
    const form = modalRef.current.form;
    form.validateFields().then(async () => {
      const formData = form.getFieldsValue();
      if (modal.modalType === 2) {
        formData.id = currentRow.current._id;
      }
      const methods = {
        1: apiAddUser,
        2: apiUpdateUser
      };
      const res = await methods['' + modal.modalType](formData);
      console.log('ok： ', res);
      message.success(`${modal.modalType === 1 ? '添加' : '修改'}成功`);
      onCancel();
      getUsers();
    });
  }
  function onCancel() {
    setModal({ ...modal, modalShow: false });
  }

  function afterOpenChange(visible) {
    const form = modalRef.current.form;
    if (visible && modal.modalType === 2) {
      const { name, password, age, roles } = currentRow.current;
      form.setFieldsValue({ name, password, age, roles });
    } else {
      form.resetFields();
    }
  }

  return {
    modal,
    setModal,
    modalRef,
    ok,
    onCancel,
    afterOpenChange,
    editUser,
    deleteUser
  };
};
