import styled from 'styled-components';

export default function LayoutContent({ children }) {
  return <ContentWrap className='content'>{children}</ContentWrap>;
}

const ContentWrap = styled.div`
  flex: 1;
  padding: 10px;
`;
