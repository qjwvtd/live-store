# @qjwvtd/think-store

## Installation

To install the stable version:

```sh
npm install --save-dev @qjwvtd/think-store
```

That's it!

```js

import ThinkStore from '@qjwvtd/think-store'

const { useStore, applyStore } = ThinkStore({reducer1,reducer2,...});

/**
 * useStore在组件内部使用
 * const [state,dispatch] = useStore();
 * 
 * applyStore在外部使用,比如在封装的请求函数或其它工具函数中使用
 * const [state,dispatch] = applyStore();
 * 
 * useStore因其依赖了react的effect订阅store,所以不能在使用在非hook组件外面
 * 
 * store不需要从顶层组件注入
 * 
 * 注:使用这个包,你必须接受使用react hook来开发你的项目
 */

```


## Example

```js
//project.js
//initstate
const initState = {
    name: '华商金融城中心项目',
    address: '成都市高新区金融城地铁站'
};
//actions
const actions = {
    update_project_info: 'update_project_info',
    update_project_address: 'update_project_address'
};
//reducer
export default (state = initState, action) => {
    switch (action.type) {
        case actions.update_project_address:
            state.address = action.value;
            break;
        case actions.update_project_info:
            state.name = action.name;
            state.address = action.address;
            break;
    }
    return Object.assign({}, state);
};
```

```js
//goods.js
//initstate
const initState = {
    list: [
        { id: 0, name: '苹果手机', type: '电子产品', num: 20 },
        { id: 1, name: '加热奶茶', type: '饮品食物', num: 35 }
    ]
};
//actions
const actions = {
    update_good_num: 'update_good_num'
};
//reducer
export default (state = initState, action) => {
    switch (action.type) {
        case actions.update_good_num:
            state.list.filter((item) => {
                if (item.id === action.id) {
                    item.num = action.value;
                }
            });
            break;
    }
    return Object.assign({}, state);
};
```

```js
//store.js
import createThinkStore from '@qjwvtd/think-store'

//import reducer
import project from './project';
import good from './good';
//merge reducer
const reducer = { project, good };
const [useStore, applyStore] = createThinkStore(reducer);
export { useStore, applyStore };
```

```js
function otherFN(){
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
    otherFN();
    return <div>{JSN.strinfy(state)}</div>; 
}
ReactDOM.render(
    <App />,document.body
);
````