<div align='center'>
    <h1>Resonance UI</h1>
    <p>定制化的React UI组件库</p>
</div>

## 介绍
在尝试实现传统UI组件库的基础上，实现定制化组件，例如：更好的交互、更好的界面效果。

## 安装
```
npm install resonance-ui
```
or
```
yarn add resonance-ui
```

## 使用
```
import { Button, DatePicker } from 'resonance-ui';

const App = () => (
  <>
    <Button type="primary">PRESS ME</Button>
    <DatePicker placeholder="select date" />
  </>
);
```
## 并手动导入样式
```
import 'resonance-ui/style/index.css';
```