import { useState, useRef, useEffect } from 'react';

import SelectUser from './SelectUser';
import styled from 'styled-components';

let timer = null;

export const AtInput = props => {
  const { height = 300, onRequest, onChange, value, onBlur } = props;
  // 输入框的内容=innerText
  const [content, setContent] = useState('');
  // 选择用户弹框
  const [visible, setVisible] = useState(false);
  // 用户数据
  const [options, setOptions] = useState([]);
  // @的索引
  const [currentAtIdx, setCurrentAtIdx] = useState();
  // 输入@之前的字符串
  const [focusNode, setFocusNode] = useState();
  // @后关键字 @郑 = 郑
  const [searchStr, setSearchStr] = useState('');
  // 弹框的x,y轴的坐标
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  // 选择的用户
  const [selected, setSelected] = useState([]);
  const atRef = useRef();

  /** 获取选择器弹框坐标 */
  const getCursorPosition = () => {
    // 坐标相对浏览器的坐标
    const { x, y } = window
      .getSelection()
      ?.getRangeAt(0)
      .getBoundingClientRect();
    // 获取编辑器的坐标
    const editorDom = window.document.querySelector('#atInput');
    const { x: eX, y: eY } = editorDom?.getBoundingClientRect();
    // 光标所在位置
    setCursorPosition({ x: x - eX, y: y - eY });
  };

  /**获取用户下拉列表 */
  const fetchOptions = key => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    timer = setTimeout(async () => {
      const _options = await onRequest(key);
      setOptions(_options);
    }, 500);
  };

  useEffect(() => {
    fetchOptions();
    // if (value) {
    //     /** 判断value中是否有at用户 */
    //     const atUsers: any = StringTools.filterUsers(value);
    //     setSelected(atUsers);
    //     atRef.current.innerHTML = value;
    //     setContent(value.replace(/<\/?.+?\/?>/g, '')); //全局匹配内html标签)
    // }
  }, []);

  const onObserveInput = () => {
    let cursorBeforeStr = '';
    const selection = window.getSelection();
    if (selection?.focusNode?.data) {
      cursorBeforeStr = selection.focusNode?.data.slice(
        0,
        selection.focusOffset
      );
    }
    setFocusNode(selection.focusNode);
    const lastAtIndex = cursorBeforeStr?.lastIndexOf('@');
    setCurrentAtIdx(lastAtIndex);
    if (lastAtIndex !== -1) {
      getCursorPosition();
      const searchStr = cursorBeforeStr.slice(lastAtIndex + 1);
      if (!StringTools.isIncludeSpacesOrLineBreak(searchStr)) {
        setSearchStr(searchStr);
        fetchOptions(searchStr);
        setVisible(true);
      } else {
        setVisible(false);
        setSearchStr('');
      }
    } else {
      setVisible(false);
    }
  };

  const selectAtSpanTag = target => {
    window.getSelection()?.getRangeAt(0).selectNode(target);
  };

  const editorClick = async e => {
    onObserveInput();
    // 判断当前标签名是否为span 是的话选中当做一个整体
    if (e.target.localName === 'span') {
      selectAtSpanTag(e.target);
    }
  };

  const editorChange = event => {
    const { innerText } = event.target;
    setContent(innerText);
    onObserveInput();
  };

  /**
   * @param id 唯一的id 可以uid
   * @param name 用户姓名
   * @param color 回显颜色
   * @returns
   */
  const createAtSpanTag = (id, name, color = 'blue') => {
    const ele = document.createElement('span');
    ele.className = 'at-span';
    ele.style.color = color;
    ele.id = id.toString();
    ele.contentEditable = 'false';
    ele.innerText = `@${name}`;
    return ele;
  };

  /**
   * 选择用户时回调
   */
  const onSelect = item => {
    const selection = window.getSelection();
    const range = selection?.getRangeAt(0);
    // 选中输入的 @关键字  -> @郑
    range.setStart(focusNode, currentAtIdx);
    range.setEnd(focusNode, currentAtIdx + 1 + searchStr.length);
    // 删除输入的 @关键字
    range.deleteContents();
    // 创建元素节点
    const atEle = createAtSpanTag(item.id, item.name);
    // 插入元素节点
    range.insertNode(atEle);
    // 光标移动到末尾
    range.collapse();
    // 缓存已选中的用户
    setSelected([...selected, item]);
    // 选择用户后重新计算content
    setContent(document.getElementById('atInput')?.innerText);
    // 关闭弹框
    setVisible(false);
    // 输入框聚焦
    atRef.current.focus();
  };

  const getAttrIds = () => {
    const spans = document.querySelectorAll('.at-span');
    let ids = new Set();
    spans.forEach(span => ids.add(span.id));
    return selected.filter(s => ids.has(s.id));
  };

  /**  @的用户列表发生改变时，将最新值暴露给父组件 */
  useEffect(() => {
    const selectUsers = getAttrIds();
    onChange(content, selectUsers);
  }, [selected, content]);

  return (
    <AtInputWrap style={{ height, position: 'relative' }}>
      <div
        id='atInput'
        ref={atRef}
        className='editorDiv'
        contentEditable
        onInput={editorChange}
        onClick={editorClick}
      />
      {/* 选择用户框 */}
      <SelectUser
        options={options}
        visible={visible}
        cursorPosition={cursorPosition}
        onSelect={onSelect}
      />
    </AtInputWrap>
  );
};

const AtInputWrap = styled.div`
  .editorDiv {
    border: 1px solid #ccc;
    padding: 10px;
  }
`;
