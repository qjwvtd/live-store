# live-store

#### With only one API, the mini state manager encapsulated by Redux and react hook can realize global / local state management
#### 只用redux和react hook封装的迷你状态管理器,只用一个api,就能实现全局/局部状态管理

## installation

To install the stable version:

```sh
npm install --save-dev live-store
```

That's it!
```js
import createHookStore from 'live-store';

const useStore = createHookStore({reducer1,reducer2,...});
```

### 注意:
useStore relies on react's effect subscription store, so it can't be used outside non hook components,
There is no Provider injected into the store from the top level, and there is no connection around people,
You have to accept using react hooks to develop your project

useStore依赖了react的effect订阅store,所以不能在非hook组件外使用,
没有从顶层注入store的Provider,也没有绕人的connect.使用这个工具,
你必须接受使用react hooks来开发你的项目


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

### store.js
```js
import createHookStore from 'live-store';
//import reducer
import project from './project';
import good from './goods';
//merge reducer
const reducer = { project, good };
const useStore = createHookStore(reducer);
//you can alias 
export const useCustomStore = useStore;

```

```js
import {getGoodsDataApi} from './api';
//app.js
function App(){
    const [state, dispatch] = useStore();
    //or
    const [, dispatch] = useStore();
    //or
    const [state] = useStore();
    //async
    useEffect(() => {
        dispatch.async(getGoodsDataApi());
    },[]);
    return <div>{state}</div>; 
}
ReactDOM.render(
    <App />,document.body
);
````