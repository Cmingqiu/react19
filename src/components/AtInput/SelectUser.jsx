import { memo } from 'react';
import styled from 'styled-components';

const SelectUser = memo(props => {
  const { options, visible, cursorPosition, onSelect } = props;
  const { x, y } = cursorPosition;

  return (
    <SelectUserWrap
      className='selectWrap'
      style={{
        display: `${visible ? 'block' : 'none'}`,
        position: 'absolute',
        left: x,
        top: y + 20
      }}>
      <ul>
        {options.map(item => {
          return (
            <li
              key={item.id}
              onClick={() => {
                onSelect(item);
              }}>
              <img src={item.wechatAvatarUrl} alt='' />
              <span>{item.name}</span>
            </li>
          );
        })}
      </ul>
    </SelectUserWrap>
  );
});
export default SelectUser;

const SelectUserWrap = styled.div`
  box-shadow: 0 0 4px 2px rgba(0 0, 0, 0, 0.3);
`;
