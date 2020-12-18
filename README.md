# @qjwvtd/think-store

### 仅用redux和react hook封装的迷你状态管理器

## Installation

To install the stable version:

```sh
npm install --save-dev @qjwvtd/think-store
```

That's it!
```js
import createThinkStore from '@qjwvtd/think-store';

const [useStore, applyStore] = createThinkStore({reducer1,reducer2,...});
```

### 注意:
### useStore依赖了react的effect订阅store,所以不能在非hook组件外面使用
### 没有从项层注入store的Provider,也没有绕人的connect
### 使用这个工具,你必须接受使用react hook来开发你的项目

```js
//useStore在组件内部使用 
function App(){
    const [state,dispatch] = useStore();
    return <div></div>;
}
//applyStore在外部使用,比如在封装的请求函数或其它工具函数中使用
function asyncRequest(){
    const [state,dispatch] = applyStore();
    setimeout(() => {
        dispatch({type:'xxx',data: xxx});
    },2000);
}
```
## Example
### project.js
```js
//initstate
const initState = {
    name: '华商金融城中心项目'
};
//actions
const actions = {
    update_project_name: 'update_project_name'
};
//reducer
export default (state = initState, action) => {
    switch (action.type) {
        case actions.update_project_name:
            state.name = action.name;
            break;
    }
    return Object.assign({}, state);
};
```

### goods.js
```js
//initstate
const initState = { name: '苹果手机', num: 20 };
//actions
const actions = {
    update_good_num: 'update_good_num'
};
//reducer
export default (state = initState, action) => {
    switch (action.type) {
        case actions.update_good_num:
            state.num = action.value;
            break;
    }
    return Object.assign({}, state);
};
```
### 通过createThinkStore,你可以创建不同的状态管理器,既可以是全局的,也可以是局部的

### store.js
```js
import createThinkStore from '@qjwvtd/think-store'
//import reducer
import project from './project';
import good from './goods';
//merge reducer
const reducer = { project, good };
const [useStore, applyStore] = createThinkStore(reducer);
//or
export { useStore, applyStore };
//你还可以别名
export const useCustomStore = useStore;
export const useCustomApplyStore = applyStore;

```

```js
function anyncRequest(){
    //异步调用
    const [, dispatch] = applyStore();
    const action = {type: 'xxx',data: {}};
    dispatch(action);
}
//app.js
function App(){
    const [state, dispatch] = useStore();
    //or
    const [, dispatch] = useStore();
    //or
    const [state] = useStore();
    //async
    useEffect(() => {
        anyncRequest();
    },[]);
    return <div>{state}</div>; 
}
ReactDOM.render(
    <App />,document.body
);
````