import { Suspense } from 'react';

import { Spin } from 'antd';

const lazyLoad = Comp => (
  <>
    <Suspense fallback={<Spin fullscreen>拼命加载中...</Spin>}>
      <Comp />
    </Suspense>
  </>
);

export default lazyLoad;
