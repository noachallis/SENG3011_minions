/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/index";
exports.ids = ["pages/index"];
exports.modules = {

/***/ "./node_modules/next/dist/shared/lib/dynamic.js":
/*!******************************************************!*\
  !*** ./node_modules/next/dist/shared/lib/dynamic.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({\n    value: true\n}));\nexports[\"default\"] = dynamic;\nexports.noSSR = noSSR;\nvar _react = _interopRequireDefault(__webpack_require__(/*! react */ \"react\"));\nvar _loadable = _interopRequireDefault(__webpack_require__(/*! ./loadable */ \"./loadable\"));\nfunction dynamic(dynamicOptions, options) {\n    let loadableFn = _loadable.default;\n    let loadableOptions = {\n        // A loading component is not required, so we default it\n        loading: ({ error , isLoading , pastDelay  })=>{\n            if (!pastDelay) return null;\n            if (true) {\n                if (isLoading) {\n                    return null;\n                }\n                if (error) {\n                    return /*#__PURE__*/ _react.default.createElement(\"p\", null, error.message, /*#__PURE__*/ _react.default.createElement(\"br\", null), error.stack);\n                }\n            }\n            return null;\n        }\n    };\n    // Support for direct import(), eg: dynamic(import('../hello-world'))\n    // Note that this is only kept for the edge case where someone is passing in a promise as first argument\n    // The react-loadable babel plugin will turn dynamic(import('../hello-world')) into dynamic(() => import('../hello-world'))\n    // To make sure we don't execute the import without rendering first\n    if (dynamicOptions instanceof Promise) {\n        loadableOptions.loader = ()=>dynamicOptions\n        ;\n    // Support for having import as a function, eg: dynamic(() => import('../hello-world'))\n    } else if (typeof dynamicOptions === \"function\") {\n        loadableOptions.loader = dynamicOptions;\n    // Support for having first argument being options, eg: dynamic({loader: import('../hello-world')})\n    } else if (typeof dynamicOptions === \"object\") {\n        loadableOptions = {\n            ...loadableOptions,\n            ...dynamicOptions\n        };\n    }\n    // Support for passing options, eg: dynamic(import('../hello-world'), {loading: () => <p>Loading something</p>})\n    loadableOptions = {\n        ...loadableOptions,\n        ...options\n    };\n    const suspenseOptions = loadableOptions;\n    // Error if Fizz rendering is not enabled and `suspense` option is set to true\n    if (false) {}\n    if (suspenseOptions.suspense) {\n        return loadableFn(suspenseOptions);\n    }\n    // coming from build/babel/plugins/react-loadable-plugin.js\n    if (loadableOptions.loadableGenerated) {\n        loadableOptions = {\n            ...loadableOptions,\n            ...loadableOptions.loadableGenerated\n        };\n        delete loadableOptions.loadableGenerated;\n    }\n    // support for disabling server side rendering, eg: dynamic(import('../hello-world'), {ssr: false})\n    if (typeof loadableOptions.ssr === \"boolean\") {\n        if (!loadableOptions.ssr) {\n            delete loadableOptions.ssr;\n            return noSSR(loadableFn, loadableOptions);\n        }\n        delete loadableOptions.ssr;\n    }\n    return loadableFn(loadableOptions);\n}\nfunction _interopRequireDefault(obj) {\n    return obj && obj.__esModule ? obj : {\n        default: obj\n    };\n}\nconst isServerSide = \"undefined\" === \"undefined\";\nfunction noSSR(LoadableInitializer, loadableOptions) {\n    // Removing webpack and modules means react-loadable won't try preloading\n    delete loadableOptions.webpack;\n    delete loadableOptions.modules;\n    // This check is necessary to prevent react-loadable from initializing on the server\n    if (!isServerSide) {\n        return LoadableInitializer(loadableOptions);\n    }\n    const Loading = loadableOptions.loading;\n    // This will only be rendered on the server side\n    return ()=>/*#__PURE__*/ _react.default.createElement(Loading, {\n            error: null,\n            isLoading: true,\n            pastDelay: false,\n            timedOut: false\n        })\n    ;\n} //# sourceMappingURL=dynamic.js.map\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L3NoYXJlZC9saWIvZHluYW1pYy5qcy5qcyIsIm1hcHBpbmdzIjoiQUFBYTtBQUNiQSw4Q0FBNkM7SUFDekNHLEtBQUssRUFBRSxJQUFJO0NBQ2QsRUFBQyxDQUFDO0FBQ0hELGtCQUFlLEdBQUdHLE9BQU8sQ0FBQztBQUMxQkgsYUFBYSxHQUFHSSxLQUFLLENBQUM7QUFDdEIsSUFBSUMsTUFBTSxHQUFHQyxzQkFBc0IsQ0FBQ0MsbUJBQU8sQ0FBQyxvQkFBTyxDQUFDLENBQUM7QUFDckQsSUFBSUMsU0FBUyxHQUFHRixzQkFBc0IsQ0FBQ0MsbUJBQU8sQ0FBQyw4QkFBWSxDQUFDLENBQUM7QUFDN0QsU0FBU0osT0FBTyxDQUFDTSxjQUFjLEVBQUVDLE9BQU8sRUFBRTtJQUN0QyxJQUFJQyxVQUFVLEdBQUdILFNBQVMsQ0FBQ04sT0FBTztJQUNsQyxJQUFJVSxlQUFlLEdBQUc7UUFDbEIsd0RBQXdEO1FBQ3hEQyxPQUFPLEVBQUUsQ0FBQyxFQUFFQyxLQUFLLEdBQUdDLFNBQVMsR0FBR0MsU0FBUyxHQUFHLEdBQUc7WUFDM0MsSUFBSSxDQUFDQSxTQUFTLEVBQUUsT0FBTyxJQUFJLENBQUM7WUFDNUIsSUFBSUMsSUFBc0MsRUFBRTtnQkFDeEMsSUFBSUYsU0FBUyxFQUFFO29CQUNYLE9BQU8sSUFBSSxDQUFDO2lCQUNmO2dCQUNELElBQUlELEtBQUssRUFBRTtvQkFDUCxPQUFPLGFBQWEsQ0FBQ1QsTUFBTSxDQUFDSCxPQUFPLENBQUNnQixhQUFhLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRUosS0FBSyxDQUFDSyxPQUFPLEVBQUUsYUFBYSxDQUFDZCxNQUFNLENBQUNILE9BQU8sQ0FBQ2dCLGFBQWEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUVKLEtBQUssQ0FBQ00sS0FBSyxDQUFDLENBQUU7aUJBQ3JKO2FBQ0o7WUFDRCxPQUFPLElBQUksQ0FBQztTQUNmO0tBQ0o7SUFDRCxxRUFBcUU7SUFDckUsd0dBQXdHO0lBQ3hHLDJIQUEySDtJQUMzSCxtRUFBbUU7SUFDbkUsSUFBSVgsY0FBYyxZQUFZWSxPQUFPLEVBQUU7UUFDbkNULGVBQWUsQ0FBQ1UsTUFBTSxHQUFHLElBQUliLGNBQWM7UUFBQSxDQUMxQztJQUNMLHVGQUF1RjtLQUN0RixNQUFNLElBQUksT0FBT0EsY0FBYyxLQUFLLFVBQVUsRUFBRTtRQUM3Q0csZUFBZSxDQUFDVSxNQUFNLEdBQUdiLGNBQWMsQ0FBQztJQUM1QyxtR0FBbUc7S0FDbEcsTUFBTSxJQUFJLE9BQU9BLGNBQWMsS0FBSyxRQUFRLEVBQUU7UUFDM0NHLGVBQWUsR0FBRztZQUNkLEdBQUdBLGVBQWU7WUFDbEIsR0FBR0gsY0FBYztTQUNwQixDQUFDO0tBQ0w7SUFDRCxnSEFBZ0g7SUFDaEhHLGVBQWUsR0FBRztRQUNkLEdBQUdBLGVBQWU7UUFDbEIsR0FBR0YsT0FBTztLQUNiLENBQUM7SUFDRixNQUFNYSxlQUFlLEdBQUdYLGVBQWU7SUFDdkMsOEVBQThFO0lBQzlFLElBQUksS0FBbUUsRUFBRSxFQUV4RTtJQUNELElBQUlXLGVBQWUsQ0FBQ0csUUFBUSxFQUFFO1FBQzFCLE9BQU9mLFVBQVUsQ0FBQ1ksZUFBZSxDQUFDLENBQUM7S0FDdEM7SUFDRCwyREFBMkQ7SUFDM0QsSUFBSVgsZUFBZSxDQUFDZ0IsaUJBQWlCLEVBQUU7UUFDbkNoQixlQUFlLEdBQUc7WUFDZCxHQUFHQSxlQUFlO1lBQ2xCLEdBQUdBLGVBQWUsQ0FBQ2dCLGlCQUFpQjtTQUN2QyxDQUFDO1FBQ0YsT0FBT2hCLGVBQWUsQ0FBQ2dCLGlCQUFpQixDQUFDO0tBQzVDO0lBQ0QsbUdBQW1HO0lBQ25HLElBQUksT0FBT2hCLGVBQWUsQ0FBQ2lCLEdBQUcsS0FBSyxTQUFTLEVBQUU7UUFDMUMsSUFBSSxDQUFDakIsZUFBZSxDQUFDaUIsR0FBRyxFQUFFO1lBQ3RCLE9BQU9qQixlQUFlLENBQUNpQixHQUFHLENBQUM7WUFDM0IsT0FBT3pCLEtBQUssQ0FBQ08sVUFBVSxFQUFFQyxlQUFlLENBQUMsQ0FBQztTQUM3QztRQUNELE9BQU9BLGVBQWUsQ0FBQ2lCLEdBQUcsQ0FBQztLQUM5QjtJQUNELE9BQU9sQixVQUFVLENBQUNDLGVBQWUsQ0FBQyxDQUFDO0NBQ3RDO0FBQ0QsU0FBU04sc0JBQXNCLENBQUN3QixHQUFHLEVBQUU7SUFDakMsT0FBT0EsR0FBRyxJQUFJQSxHQUFHLENBQUNDLFVBQVUsR0FBR0QsR0FBRyxHQUFHO1FBQ2pDNUIsT0FBTyxFQUFFNEIsR0FBRztLQUNmLENBQUM7Q0FDTDtBQUNELE1BQU1FLFlBQVksR0FBRyxXQUFhLEtBQUssV0FBVztBQUNsRCxTQUFTNUIsS0FBSyxDQUFDNkIsbUJBQW1CLEVBQUVyQixlQUFlLEVBQUU7SUFDakQseUVBQXlFO0lBQ3pFLE9BQU9BLGVBQWUsQ0FBQ3NCLE9BQU8sQ0FBQztJQUMvQixPQUFPdEIsZUFBZSxDQUFDdUIsT0FBTyxDQUFDO0lBQy9CLG9GQUFvRjtJQUNwRixJQUFJLENBQUNILFlBQVksRUFBRTtRQUNmLE9BQU9DLG1CQUFtQixDQUFDckIsZUFBZSxDQUFDLENBQUM7S0FDL0M7SUFDRCxNQUFNd0IsT0FBTyxHQUFHeEIsZUFBZSxDQUFDQyxPQUFPO0lBQ3ZDLGdEQUFnRDtJQUNoRCxPQUFPLElBQUksYUFBYSxDQUFDUixNQUFNLENBQUNILE9BQU8sQ0FBQ2dCLGFBQWEsQ0FBQ2tCLE9BQU8sRUFBRTtZQUN2RHRCLEtBQUssRUFBRSxJQUFJO1lBQ1hDLFNBQVMsRUFBRSxJQUFJO1lBQ2ZDLFNBQVMsRUFBRSxLQUFLO1lBQ2hCcUIsUUFBUSxFQUFFLEtBQUs7U0FDbEIsQ0FBQztJQUFBLENBQ0w7Q0FDSixDQUVELG1DQUFtQyIsInNvdXJjZXMiOlsid2VicGFjazovL2FwcC8uL25vZGVfbW9kdWxlcy9uZXh0L2Rpc3Qvc2hhcmVkL2xpYi9keW5hbWljLmpzP2UyNWQiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBkeW5hbWljO1xuZXhwb3J0cy5ub1NTUiA9IG5vU1NSO1xudmFyIF9yZWFjdCA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcInJlYWN0XCIpKTtcbnZhciBfbG9hZGFibGUgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL2xvYWRhYmxlXCIpKTtcbmZ1bmN0aW9uIGR5bmFtaWMoZHluYW1pY09wdGlvbnMsIG9wdGlvbnMpIHtcbiAgICBsZXQgbG9hZGFibGVGbiA9IF9sb2FkYWJsZS5kZWZhdWx0O1xuICAgIGxldCBsb2FkYWJsZU9wdGlvbnMgPSB7XG4gICAgICAgIC8vIEEgbG9hZGluZyBjb21wb25lbnQgaXMgbm90IHJlcXVpcmVkLCBzbyB3ZSBkZWZhdWx0IGl0XG4gICAgICAgIGxvYWRpbmc6ICh7IGVycm9yICwgaXNMb2FkaW5nICwgcGFzdERlbGF5ICB9KT0+e1xuICAgICAgICAgICAgaWYgKCFwYXN0RGVsYXkpIHJldHVybiBudWxsO1xuICAgICAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnKSB7XG4gICAgICAgICAgICAgICAgaWYgKGlzTG9hZGluZykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybigvKiNfX1BVUkVfXyovIF9yZWFjdC5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJwXCIsIG51bGwsIGVycm9yLm1lc3NhZ2UsIC8qI19fUFVSRV9fKi8gX3JlYWN0LmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImJyXCIsIG51bGwpLCBlcnJvci5zdGFjaykpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvLyBTdXBwb3J0IGZvciBkaXJlY3QgaW1wb3J0KCksIGVnOiBkeW5hbWljKGltcG9ydCgnLi4vaGVsbG8td29ybGQnKSlcbiAgICAvLyBOb3RlIHRoYXQgdGhpcyBpcyBvbmx5IGtlcHQgZm9yIHRoZSBlZGdlIGNhc2Ugd2hlcmUgc29tZW9uZSBpcyBwYXNzaW5nIGluIGEgcHJvbWlzZSBhcyBmaXJzdCBhcmd1bWVudFxuICAgIC8vIFRoZSByZWFjdC1sb2FkYWJsZSBiYWJlbCBwbHVnaW4gd2lsbCB0dXJuIGR5bmFtaWMoaW1wb3J0KCcuLi9oZWxsby13b3JsZCcpKSBpbnRvIGR5bmFtaWMoKCkgPT4gaW1wb3J0KCcuLi9oZWxsby13b3JsZCcpKVxuICAgIC8vIFRvIG1ha2Ugc3VyZSB3ZSBkb24ndCBleGVjdXRlIHRoZSBpbXBvcnQgd2l0aG91dCByZW5kZXJpbmcgZmlyc3RcbiAgICBpZiAoZHluYW1pY09wdGlvbnMgaW5zdGFuY2VvZiBQcm9taXNlKSB7XG4gICAgICAgIGxvYWRhYmxlT3B0aW9ucy5sb2FkZXIgPSAoKT0+ZHluYW1pY09wdGlvbnNcbiAgICAgICAgO1xuICAgIC8vIFN1cHBvcnQgZm9yIGhhdmluZyBpbXBvcnQgYXMgYSBmdW5jdGlvbiwgZWc6IGR5bmFtaWMoKCkgPT4gaW1wb3J0KCcuLi9oZWxsby13b3JsZCcpKVxuICAgIH0gZWxzZSBpZiAodHlwZW9mIGR5bmFtaWNPcHRpb25zID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGxvYWRhYmxlT3B0aW9ucy5sb2FkZXIgPSBkeW5hbWljT3B0aW9ucztcbiAgICAvLyBTdXBwb3J0IGZvciBoYXZpbmcgZmlyc3QgYXJndW1lbnQgYmVpbmcgb3B0aW9ucywgZWc6IGR5bmFtaWMoe2xvYWRlcjogaW1wb3J0KCcuLi9oZWxsby13b3JsZCcpfSlcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBkeW5hbWljT3B0aW9ucyA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgbG9hZGFibGVPcHRpb25zID0ge1xuICAgICAgICAgICAgLi4ubG9hZGFibGVPcHRpb25zLFxuICAgICAgICAgICAgLi4uZHluYW1pY09wdGlvbnNcbiAgICAgICAgfTtcbiAgICB9XG4gICAgLy8gU3VwcG9ydCBmb3IgcGFzc2luZyBvcHRpb25zLCBlZzogZHluYW1pYyhpbXBvcnQoJy4uL2hlbGxvLXdvcmxkJyksIHtsb2FkaW5nOiAoKSA9PiA8cD5Mb2FkaW5nIHNvbWV0aGluZzwvcD59KVxuICAgIGxvYWRhYmxlT3B0aW9ucyA9IHtcbiAgICAgICAgLi4ubG9hZGFibGVPcHRpb25zLFxuICAgICAgICAuLi5vcHRpb25zXG4gICAgfTtcbiAgICBjb25zdCBzdXNwZW5zZU9wdGlvbnMgPSBsb2FkYWJsZU9wdGlvbnM7XG4gICAgLy8gRXJyb3IgaWYgRml6eiByZW5kZXJpbmcgaXMgbm90IGVuYWJsZWQgYW5kIGBzdXNwZW5zZWAgb3B0aW9uIGlzIHNldCB0byB0cnVlXG4gICAgaWYgKCFwcm9jZXNzLmVudi5fX05FWFRfQ09OQ1VSUkVOVF9GRUFUVVJFUyAmJiBzdXNwZW5zZU9wdGlvbnMuc3VzcGVuc2UpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIHN1c3BlbnNlIG9wdGlvbiB1c2FnZSBpbiBuZXh0L2R5bmFtaWMuIFJlYWQgbW9yZTogaHR0cHM6Ly9uZXh0anMub3JnL2RvY3MvbWVzc2FnZXMvaW52YWxpZC1keW5hbWljLXN1c3BlbnNlYCk7XG4gICAgfVxuICAgIGlmIChzdXNwZW5zZU9wdGlvbnMuc3VzcGVuc2UpIHtcbiAgICAgICAgcmV0dXJuIGxvYWRhYmxlRm4oc3VzcGVuc2VPcHRpb25zKTtcbiAgICB9XG4gICAgLy8gY29taW5nIGZyb20gYnVpbGQvYmFiZWwvcGx1Z2lucy9yZWFjdC1sb2FkYWJsZS1wbHVnaW4uanNcbiAgICBpZiAobG9hZGFibGVPcHRpb25zLmxvYWRhYmxlR2VuZXJhdGVkKSB7XG4gICAgICAgIGxvYWRhYmxlT3B0aW9ucyA9IHtcbiAgICAgICAgICAgIC4uLmxvYWRhYmxlT3B0aW9ucyxcbiAgICAgICAgICAgIC4uLmxvYWRhYmxlT3B0aW9ucy5sb2FkYWJsZUdlbmVyYXRlZFxuICAgICAgICB9O1xuICAgICAgICBkZWxldGUgbG9hZGFibGVPcHRpb25zLmxvYWRhYmxlR2VuZXJhdGVkO1xuICAgIH1cbiAgICAvLyBzdXBwb3J0IGZvciBkaXNhYmxpbmcgc2VydmVyIHNpZGUgcmVuZGVyaW5nLCBlZzogZHluYW1pYyhpbXBvcnQoJy4uL2hlbGxvLXdvcmxkJyksIHtzc3I6IGZhbHNlfSlcbiAgICBpZiAodHlwZW9mIGxvYWRhYmxlT3B0aW9ucy5zc3IgPT09ICdib29sZWFuJykge1xuICAgICAgICBpZiAoIWxvYWRhYmxlT3B0aW9ucy5zc3IpIHtcbiAgICAgICAgICAgIGRlbGV0ZSBsb2FkYWJsZU9wdGlvbnMuc3NyO1xuICAgICAgICAgICAgcmV0dXJuIG5vU1NSKGxvYWRhYmxlRm4sIGxvYWRhYmxlT3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICAgICAgZGVsZXRlIGxvYWRhYmxlT3B0aW9ucy5zc3I7XG4gICAgfVxuICAgIHJldHVybiBsb2FkYWJsZUZuKGxvYWRhYmxlT3B0aW9ucyk7XG59XG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikge1xuICAgIHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7XG4gICAgICAgIGRlZmF1bHQ6IG9ialxuICAgIH07XG59XG5jb25zdCBpc1NlcnZlclNpZGUgPSB0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJztcbmZ1bmN0aW9uIG5vU1NSKExvYWRhYmxlSW5pdGlhbGl6ZXIsIGxvYWRhYmxlT3B0aW9ucykge1xuICAgIC8vIFJlbW92aW5nIHdlYnBhY2sgYW5kIG1vZHVsZXMgbWVhbnMgcmVhY3QtbG9hZGFibGUgd29uJ3QgdHJ5IHByZWxvYWRpbmdcbiAgICBkZWxldGUgbG9hZGFibGVPcHRpb25zLndlYnBhY2s7XG4gICAgZGVsZXRlIGxvYWRhYmxlT3B0aW9ucy5tb2R1bGVzO1xuICAgIC8vIFRoaXMgY2hlY2sgaXMgbmVjZXNzYXJ5IHRvIHByZXZlbnQgcmVhY3QtbG9hZGFibGUgZnJvbSBpbml0aWFsaXppbmcgb24gdGhlIHNlcnZlclxuICAgIGlmICghaXNTZXJ2ZXJTaWRlKSB7XG4gICAgICAgIHJldHVybiBMb2FkYWJsZUluaXRpYWxpemVyKGxvYWRhYmxlT3B0aW9ucyk7XG4gICAgfVxuICAgIGNvbnN0IExvYWRpbmcgPSBsb2FkYWJsZU9wdGlvbnMubG9hZGluZztcbiAgICAvLyBUaGlzIHdpbGwgb25seSBiZSByZW5kZXJlZCBvbiB0aGUgc2VydmVyIHNpZGVcbiAgICByZXR1cm4gKCk9Pi8qI19fUFVSRV9fKi8gX3JlYWN0LmRlZmF1bHQuY3JlYXRlRWxlbWVudChMb2FkaW5nLCB7XG4gICAgICAgICAgICBlcnJvcjogbnVsbCxcbiAgICAgICAgICAgIGlzTG9hZGluZzogdHJ1ZSxcbiAgICAgICAgICAgIHBhc3REZWxheTogZmFsc2UsXG4gICAgICAgICAgICB0aW1lZE91dDogZmFsc2VcbiAgICAgICAgfSlcbiAgICA7XG59XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWR5bmFtaWMuanMubWFwIl0sIm5hbWVzIjpbIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiZXhwb3J0cyIsInZhbHVlIiwiZGVmYXVsdCIsImR5bmFtaWMiLCJub1NTUiIsIl9yZWFjdCIsIl9pbnRlcm9wUmVxdWlyZURlZmF1bHQiLCJyZXF1aXJlIiwiX2xvYWRhYmxlIiwiZHluYW1pY09wdGlvbnMiLCJvcHRpb25zIiwibG9hZGFibGVGbiIsImxvYWRhYmxlT3B0aW9ucyIsImxvYWRpbmciLCJlcnJvciIsImlzTG9hZGluZyIsInBhc3REZWxheSIsInByb2Nlc3MiLCJjcmVhdGVFbGVtZW50IiwibWVzc2FnZSIsInN0YWNrIiwiUHJvbWlzZSIsImxvYWRlciIsInN1c3BlbnNlT3B0aW9ucyIsImVudiIsIl9fTkVYVF9DT05DVVJSRU5UX0ZFQVRVUkVTIiwic3VzcGVuc2UiLCJFcnJvciIsImxvYWRhYmxlR2VuZXJhdGVkIiwic3NyIiwib2JqIiwiX19lc01vZHVsZSIsImlzU2VydmVyU2lkZSIsIkxvYWRhYmxlSW5pdGlhbGl6ZXIiLCJ3ZWJwYWNrIiwibW9kdWxlcyIsIkxvYWRpbmciLCJ0aW1lZE91dCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./node_modules/next/dist/shared/lib/dynamic.js\n");

/***/ }),

/***/ "./pages/Globe.tsx":
/*!*************************!*\
  !*** ./pages/Globe.tsx ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_dynamic__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dynamic */ \"./node_modules/next/dynamic.js\");\n/* harmony import */ var next_dynamic__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dynamic__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-dom/server */ \"react-dom/server\");\n/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_dom_server__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\nconst ReactGlobe = next_dynamic__WEBPACK_IMPORTED_MODULE_2___default()(null, {\n    loadableGenerated: {\n        modules: [\n            \"Globe.tsx -> \" + \"react-globe.gl\"\n        ]\n    },\n    ssr: false\n});\n\nconst _renderPopup = (index)=>{\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"Popup\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"Popup__title\",\n                children: \"Popup\"\n            }, void 0, false, {\n                fileName: \"/Users/noa/Desktop/SENG3011_minions/PHASE_2/app/pages/Globe.tsx\",\n                lineNumber: 10,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"Popup__content\",\n                children: [\n                    \"Item: \",\n                    index\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/noa/Desktop/SENG3011_minions/PHASE_2/app/pages/Globe.tsx\",\n                lineNumber: 11,\n                columnNumber: 7\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/noa/Desktop/SENG3011_minions/PHASE_2/app/pages/Globe.tsx\",\n        lineNumber: 9,\n        columnNumber: 5\n    }, undefined);\n};\nconst N = 20;\nconst arcsData = [\n    ...Array(N).keys()\n].map((_, index)=>({\n        startLat: (Math.random() - 0.5) * 180,\n        startLng: (Math.random() - 0.5) * 360,\n        endLat: (Math.random() - 0.5) * 180,\n        endLng: (Math.random() - 0.5) * 360,\n        name: (0,react_dom_server__WEBPACK_IMPORTED_MODULE_3__.renderToStaticMarkup)(_renderPopup(index)),\n        color: [\n            [\n                \"red\",\n                \"white\",\n                \"blue\",\n                \"green\"\n            ][Math.round(Math.random() * 3)],\n            [\n                \"red\",\n                \"white\",\n                \"blue\",\n                \"green\"\n            ][Math.round(Math.random() * 3)]\n        ],\n        endpoint: `https://google.com?q=${index}`\n    })\n);\nfunction Globe() {\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"Globe\",\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(ReactGlobe, {\n            globeImageUrl: \"//unpkg.com/three-globe/example/img/earth-night.jpg\",\n            arcsData: arcsData,\n            arcColor: \"color\",\n            arcStroke: 1.2,\n            arcDashLength: ()=>Math.random()\n            ,\n            arcDashGap: ()=>Math.random()\n            ,\n            arcDashAnimateTime: ()=>4000\n        }, void 0, false, {\n            fileName: \"/Users/noa/Desktop/SENG3011_minions/PHASE_2/app/pages/Globe.tsx\",\n            lineNumber: 30,\n            columnNumber: 7\n        }, this)\n    }, void 0, false, {\n        fileName: \"/Users/noa/Desktop/SENG3011_minions/PHASE_2/app/pages/Globe.tsx\",\n        lineNumber: 29,\n        columnNumber: 5\n    }, this);\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Globe);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9HbG9iZS50c3guanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUE7QUFBMEI7QUFDUztBQUVuQyxNQUFNRSxVQUFVLEdBQUdELG1EQUFPOzs7Ozs7SUFBbUNFLEdBQUcsRUFBRSxLQUFLO0VBQUc7QUFDbEI7QUFFeEQsTUFBTUUsWUFBWSxHQUFHLENBQUNDLEtBQWEsR0FBSztJQUN0QyxxQkFDRSw4REFBQ0MsS0FBRztRQUFDQyxTQUFTLEVBQUMsT0FBTzs7MEJBQ3BCLDhEQUFDRCxLQUFHO2dCQUFDQyxTQUFTLEVBQUMsY0FBYzswQkFBQyxPQUFLOzs7Ozt5QkFBTTswQkFDekMsOERBQUNELEtBQUc7Z0JBQUNDLFNBQVMsRUFBQyxnQkFBZ0I7O29CQUFDLFFBQU07b0JBQUNGLEtBQUs7Ozs7Ozt5QkFBTzs7Ozs7O2lCQUMvQyxDQUNOO0NBQ0g7QUFFRCxNQUFNRyxDQUFDLEdBQUcsRUFBRTtBQUNaLE1BQU1DLFFBQVEsR0FBRztPQUFJQyxLQUFLLENBQUNGLENBQUMsQ0FBQyxDQUFDRyxJQUFJLEVBQUU7Q0FBQyxDQUFDQyxHQUFHLENBQUMsQ0FBQ0MsQ0FBQyxFQUFFUixLQUFLLEdBQUssQ0FBQztRQUN2RFMsUUFBUSxFQUFFLENBQUNDLElBQUksQ0FBQ0MsTUFBTSxFQUFFLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRztRQUNyQ0MsUUFBUSxFQUFFLENBQUNGLElBQUksQ0FBQ0MsTUFBTSxFQUFFLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRztRQUNyQ0UsTUFBTSxFQUFFLENBQUNILElBQUksQ0FBQ0MsTUFBTSxFQUFFLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRztRQUNuQ0csTUFBTSxFQUFFLENBQUNKLElBQUksQ0FBQ0MsTUFBTSxFQUFFLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRztRQUNuQ0ksSUFBSSxFQUFFakIsc0VBQW9CLENBQUNDLFlBQVksQ0FBQ0MsS0FBSyxDQUFDLENBQUM7UUFDL0NnQixLQUFLLEVBQUU7WUFBQztnQkFBQyxLQUFLO2dCQUFFLE9BQU87Z0JBQUUsTUFBTTtnQkFBRSxPQUFPO2FBQUMsQ0FBQ04sSUFBSSxDQUFDTyxLQUFLLENBQUNQLElBQUksQ0FBQ0MsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFBRTtnQkFBQyxLQUFLO2dCQUFFLE9BQU87Z0JBQUUsTUFBTTtnQkFBRSxPQUFPO2FBQUMsQ0FBQ0QsSUFBSSxDQUFDTyxLQUFLLENBQUNQLElBQUksQ0FBQ0MsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FBQztRQUMzSU8sUUFBUSxFQUFFLENBQUMscUJBQXFCLEVBQUVsQixLQUFLLENBQUMsQ0FBQztLQUMxQyxDQUFDO0FBQUEsQ0FBQztBQUVILFNBQVNtQixLQUFLLEdBQUc7SUFDZixxQkFDRSw4REFBQ2xCLEtBQUc7UUFBQ0MsU0FBUyxFQUFDLE9BQU87a0JBQ3BCLDRFQUFDTixVQUFVO1lBQ1R3QixhQUFhLEVBQUMscURBQXFEO1lBQ25FaEIsUUFBUSxFQUFFQSxRQUFRO1lBQ2xCaUIsUUFBUSxFQUFFLE9BQU87WUFDakJDLFNBQVMsRUFBRSxHQUFHO1lBQ2RDLGFBQWEsRUFBRSxJQUFNYixJQUFJLENBQUNDLE1BQU0sRUFBRTtZQUFBO1lBQ2xDYSxVQUFVLEVBQUUsSUFBTWQsSUFBSSxDQUFDQyxNQUFNLEVBQUU7WUFBQTtZQUMvQmMsa0JBQWtCLEVBQUUsSUFBTSxJQUFJOzs7OztnQkFFOUI7Ozs7O1lBQ0UsQ0FDTjtDQUNIO0FBRUQsaUVBQWVOLEtBQUssRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2FwcC8uL3BhZ2VzL0dsb2JlLnRzeD9hNGQ5Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBkeW5hbWljIGZyb20gJ25leHQvZHluYW1pYyc7XG5cbmNvbnN0IFJlYWN0R2xvYmUgPSBkeW5hbWljKCgpID0+IGltcG9ydCgncmVhY3QtZ2xvYmUuZ2wnKSwgeyBzc3I6IGZhbHNlIH0pO1xuaW1wb3J0IHsgcmVuZGVyVG9TdGF0aWNNYXJrdXAgfSBmcm9tIFwicmVhY3QtZG9tL3NlcnZlclwiO1xuXG5jb25zdCBfcmVuZGVyUG9wdXAgPSAoaW5kZXg6IG51bWJlcikgPT4ge1xuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwiUG9wdXBcIj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiUG9wdXBfX3RpdGxlXCI+UG9wdXA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiUG9wdXBfX2NvbnRlbnRcIj5JdGVtOiB7aW5kZXh9PC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5jb25zdCBOID0gMjA7XG5jb25zdCBhcmNzRGF0YSA9IFsuLi5BcnJheShOKS5rZXlzKCldLm1hcCgoXywgaW5kZXgpID0+ICh7XG4gIHN0YXJ0TGF0OiAoTWF0aC5yYW5kb20oKSAtIDAuNSkgKiAxODAsXG4gIHN0YXJ0TG5nOiAoTWF0aC5yYW5kb20oKSAtIDAuNSkgKiAzNjAsXG4gIGVuZExhdDogKE1hdGgucmFuZG9tKCkgLSAwLjUpICogMTgwLFxuICBlbmRMbmc6IChNYXRoLnJhbmRvbSgpIC0gMC41KSAqIDM2MCxcbiAgbmFtZTogcmVuZGVyVG9TdGF0aWNNYXJrdXAoX3JlbmRlclBvcHVwKGluZGV4KSksXG4gIGNvbG9yOiBbW1wicmVkXCIsIFwid2hpdGVcIiwgXCJibHVlXCIsIFwiZ3JlZW5cIl1bTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogMyldLCBbXCJyZWRcIiwgXCJ3aGl0ZVwiLCBcImJsdWVcIiwgXCJncmVlblwiXVtNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiAzKV1dLFxuICBlbmRwb2ludDogYGh0dHBzOi8vZ29vZ2xlLmNvbT9xPSR7aW5kZXh9YFxufSkpO1xuXG5mdW5jdGlvbiBHbG9iZSgpIHtcbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cIkdsb2JlXCI+XG4gICAgICA8UmVhY3RHbG9iZVxuICAgICAgICBnbG9iZUltYWdlVXJsPVwiLy91bnBrZy5jb20vdGhyZWUtZ2xvYmUvZXhhbXBsZS9pbWcvZWFydGgtbmlnaHQuanBnXCJcbiAgICAgICAgYXJjc0RhdGE9e2FyY3NEYXRhfVxuICAgICAgICBhcmNDb2xvcj17XCJjb2xvclwifVxuICAgICAgICBhcmNTdHJva2U9ezEuMn1cbiAgICAgICAgYXJjRGFzaExlbmd0aD17KCkgPT4gTWF0aC5yYW5kb20oKX1cbiAgICAgICAgYXJjRGFzaEdhcD17KCkgPT4gTWF0aC5yYW5kb20oKX1cbiAgICAgICAgYXJjRGFzaEFuaW1hdGVUaW1lPXsoKSA9PiA0MDAwfVxuXG4gICAgICAvPlxuICAgIDwvZGl2PlxuICApO1xufVxuXG5leHBvcnQgZGVmYXVsdCBHbG9iZTtcbiJdLCJuYW1lcyI6WyJSZWFjdCIsImR5bmFtaWMiLCJSZWFjdEdsb2JlIiwic3NyIiwicmVuZGVyVG9TdGF0aWNNYXJrdXAiLCJfcmVuZGVyUG9wdXAiLCJpbmRleCIsImRpdiIsImNsYXNzTmFtZSIsIk4iLCJhcmNzRGF0YSIsIkFycmF5Iiwia2V5cyIsIm1hcCIsIl8iLCJzdGFydExhdCIsIk1hdGgiLCJyYW5kb20iLCJzdGFydExuZyIsImVuZExhdCIsImVuZExuZyIsIm5hbWUiLCJjb2xvciIsInJvdW5kIiwiZW5kcG9pbnQiLCJHbG9iZSIsImdsb2JlSW1hZ2VVcmwiLCJhcmNDb2xvciIsImFyY1N0cm9rZSIsImFyY0Rhc2hMZW5ndGgiLCJhcmNEYXNoR2FwIiwiYXJjRGFzaEFuaW1hdGVUaW1lIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./pages/Globe.tsx\n");

/***/ }),

/***/ "./pages/index.tsx":
/*!*************************!*\
  !*** ./pages/index.tsx ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _Globe__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Globe */ \"./pages/Globe.tsx\");\n\n\nconst Home = ()=>{\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Globe__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {}, void 0, false, {\n            fileName: \"/Users/noa/Desktop/SENG3011_minions/PHASE_2/app/pages/index.tsx\",\n            lineNumber: 7,\n            columnNumber: 7\n        }, undefined)\n    }, void 0, false);\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Home);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9pbmRleC50c3guanMiLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBO0FBQzRCO0FBRTVCLE1BQU1DLElBQUksR0FBYSxJQUFNO0lBQzNCLHFCQUNFO2tCQUNFLDRFQUFDRCw4Q0FBSzs7OztxQkFBRTtxQkFDUCxDQUNKO0NBQ0Y7QUFFRCxpRUFBZUMsSUFBSSIsInNvdXJjZXMiOlsid2VicGFjazovL2FwcC8uL3BhZ2VzL2luZGV4LnRzeD8wN2ZmIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0eXBlIHsgTmV4dFBhZ2UgfSBmcm9tICduZXh0J1xuaW1wb3J0IEdsb2JlIGZyb20gXCIuL0dsb2JlXCI7XG5cbmNvbnN0IEhvbWU6IE5leHRQYWdlID0gKCkgPT4ge1xuICByZXR1cm4gKFxuICAgIDw+XG4gICAgICA8R2xvYmUvPlxuICAgIDwvPlxuICApXG59XG5cbmV4cG9ydCBkZWZhdWx0IEhvbWVcbiJdLCJuYW1lcyI6WyJHbG9iZSIsIkhvbWUiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./pages/index.tsx\n");

/***/ }),

/***/ "./node_modules/next/dynamic.js":
/*!**************************************!*\
  !*** ./node_modules/next/dynamic.js ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__(/*! ./dist/shared/lib/dynamic */ \"./node_modules/next/dist/shared/lib/dynamic.js\")\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvbmV4dC9keW5hbWljLmpzLmpzIiwibWFwcGluZ3MiOiJBQUFBLHVIQUFxRCIsInNvdXJjZXMiOlsid2VicGFjazovL2FwcC8uL25vZGVfbW9kdWxlcy9uZXh0L2R5bmFtaWMuanM/NzNkNCJdLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vZGlzdC9zaGFyZWQvbGliL2R5bmFtaWMnKVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./node_modules/next/dynamic.js\n");

/***/ }),

/***/ "./loadable":
/*!***************************************************!*\
  !*** external "next/dist/shared/lib/loadable.js" ***!
  \***************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/loadable.js");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react-dom/server":
/*!***********************************!*\
  !*** external "react-dom/server" ***!
  \***********************************/
/***/ ((module) => {

"use strict";
module.exports = require("react-dom/server");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./pages/index.tsx"));
module.exports = __webpack_exports__;

})();