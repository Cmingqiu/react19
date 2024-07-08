import { useNavigate } from 'react-router-dom';

export default function NOT_FOUND() {
  const navigate = useNavigate();
  function goHome() {
    navigate('/');
  }
  return (
    <>
      404
      <div>
        <button onClick={goHome}>回到首页</button>
      </div>
    </>
  );
}
