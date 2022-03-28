import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// 引入全局变量
import "./globle"
// import reportWebVitals from './reportWebVitals';
// 封装一个render方法
function render() {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  );
}

// 如果是父应用调用
if (window.__POWERED_BY_QIANKUN__) {

}
// 本项目独立运行调用
if (!window.__POWERED_BY_QIANKUN__) {
  render();
}
async function bootstrap() { }
async function mount(props) {
  render();

  // 在这里面可以拿到父应用传递的props
  // console.log(props.name1);
}
async function unmount() {
  // ReactDOM.unmountComponentAtNode(document.getElementById('root'));
}
export {
  bootstrap,
  mount,
  unmount
}