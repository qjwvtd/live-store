'use strict';
import { useState, useEffect } from 'react';
import { createStore, combineReducers } from 'redux';
/**
 * main function
 * @param {*} reducersMap
 * 如: {reducer1,reducer2,...}
 * 关于return []和return {}的区别,返回数组在命名时可以别名,map对象则不能
 */
export default function createLiveStore(reducersMap) {
    //create reducer
    const reducer = combineReducers(reducersMap);
    const store = createStore(reducer, {});
    function useStore() {
        /**
        * use hook,在组件内调用
        * const [state, dispatch] = useStore();
        */
        const [state, updateState] = useState(store.getState());
        //dispatch
        const dispatch = store.dispatch;
        let subscribe = null;
        useEffect(() => {
            subscribe = store.subscribe(() => {
                updateState(store.getState());
            });
            //cancel subscribe
            return () => subscribe();
        }, []);
        return [state, dispatch];
    }
    function applyStore() {
        /**
         * 外部函数调用,如封装的异步请求等
         * 外部函数不能使用useStore(),因其内部使用了effect和subscribe订阅
         * const [state, dispatch] = applyStore();
         * 用于异步更新数据: dispatch({type: 'xxx',...});
         */
        return [store.getState(), store.dispatch];
    }
    return [useStore, applyStore];
}