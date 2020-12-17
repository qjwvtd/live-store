'use strict';
Object.defineProperty(exports, "__esModule", {
    value: true
});
var useState = require('react').useState;
var useEffect = require('react').useEffect;
var createStore = require('redux').createStore;
var combineReducers = require('redux').combineReducers;
/**
 * main function
 * @param {*} reducersMap 
 * 如: {reducer1,reducer2,...}
 */
exports.default = function ThinkStore(reducersMap) {
    //reducer
    var reducer = combineReducers(reducersMap);
    //store
    var store = createStore(reducer, {});
    return {
        useStore: function () {
            /**
             * use hook,在组件内调用
             * const { state, dispatch } = useStore();
             */
            try {
                var [state, updateState] = useState(store.getState());
                //dispatch
                var dispatch = store.dispatch;
                let subscribe = null;
                useEffect(() => {
                    subscribe = store.subscribe(() => {
                        updateState(store.getState());
                    });
                    //cancel subscribe
                    return () => subscribe();
                }, []);
                return { state, dispatch };
            } catch (e) {
                console.error(e.name + ' :' + e.message);
            }
        },
        applyStore: function () {
            /**
             * 外部函数调用,如封装的异步请求等
             * 外部函数不能使用useStore(),因其内部使用了effect和subscribe订阅
             * const { state, dispatch } = applyStore();
             * 用于异步更新数据: dispatch({type: 'xxx',...});
             */
            return {
                state: store.getState(),
                dispatch: store.dispatch
            };
        }
    }
}
