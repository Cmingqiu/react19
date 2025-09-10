import { useContext, useState } from 'react';
import { TestCtx } from './context';

export default function TestProviderParent({}) {
  return (
    <>
      <ThemeProvider>
        <PureComp />
        <TestProviderChild />
      </ThemeProvider>
    </>
  );
}

function PureComp({}) {
  console.log('PureComp: ');
  return <div>PureComp</div>;
}
function TestProviderChild() {
  const ctx = useContext(TestCtx);
  console.log('TestProviderChild ');
  return (
    <div>
      TestProviderChild - {ctx.theme}
      <div>
        <button onClick={ctx.changeTheme}>change</button>
      </div>
    </div>
  );
}

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('dark');
  const changeTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');
  return (
    <TestCtx.Provider value={{ theme, changeTheme }}>
      {children}
    </TestCtx.Provider>
  );
}
