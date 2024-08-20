import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import * as tts from '@diffusionstudio/vits-web';
import styled from 'styled-components';
import { Button } from 'antd';
import { AtInput } from '@/components/AtInput';

// 通过 tts.stored() 方法查看已经存储在本地的模型列表，或者通过 tts.remove() 和 tts.flush() 方法删除不再需要的模型。
// await tts.voices()

export default function Home() {
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState([]);

  useEffect(() => {
    (async () => {
      const list = await tts.stored(); //['zh_CN-huayan-medium', 'en_US-hfc_female-medium']
      console.log(list);
      if (list.length === 0) {
        await tts.download('en_US-hfc_female-medium', progress => {
          console.log(
            `Downloading ${progress.url} - ${Math.round(
              (progress.loaded * 100) / progress.total
            )}%`
          );
        });
      }
    })();
  }, []);

  async function transform() {
    setLoading(true);
    try {
      const wav = await tts.predict({
        text: `锦里开芳宴，兰缸艳早年。
        缛彩遥分地，繁光远缀天。
        接汉疑星落，依楼似月悬。
        别有千金笑，来映九枝前。`,
        voiceId: 'zh_CN-huayan-medium' // zh_CN-huayan-x_low
      });

      const audio = new Audio();
      audio.src = URL.createObjectURL(wav);
      audio.play();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const fetchData = Promise.resolve([{ name: '1', id: 0 }]);

  return (
    <HomeWrap>
      <h1>Home</h1>
      <Button loading={loading} disabled={loading} onClick={transform}>
        文本到语音转换
      </Button>

      <hr />
      {user}
      <AtInput
        height={150}
        onRequest={async () => {
          const data = await fetchData;
          console.log(data);
          return data;
        }}
        onChange={(content, selected) => {
          setUser(selected);
        }}
      />

      <Outlet />
    </HomeWrap>
  );
}

const HomeWrap = styled.div``;
