/* eslint-disable */
import $ from 'axios';
import { isEmpty } from 'lodash';
import defaultData from '../resources/defaultData';

// 地址栏参数
export function parseURL(url) {
  let a =  document.createElement('a');
  a.href = url;
  return {
    source: url,
    protocol: a.protocol.replace(':',''),
    host: a.hostname,
    port: a.port,
    query: a.search,
    params: (function(){
      let ret = {},
        seg = a.search.replace(/^\?/,'').split('&'),
        len = seg.length, i = 0, s;
      for (;i<len;i++) {
        if (!seg[i]) { continue; }
        s = seg[i].split('=');
        ret[s[0]] = s[1];
      }
      return ret;
    })(),
    file: (a.pathname.match(/\/([^\/?#]+)$/i) || [,''])[1],
    hash: a.hash.replace('#',''),
    path: a.pathname.replace(/^([^\/])/,'/$1'),
    relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [,''])[1],
    segments: a.pathname.replace(/^\//,'').split('/'),
    getReq: function(){
      let url = a.search, strs;
      let theRequest = new Object();
      if(url.indexOf("?") != -1) {
        let str = url.substr(1) ;
        strs = str.split("&");
        for(let i = 0; i < strs.length; i ++) {
          theRequest[strs[i].split("=")[0]] = strs[i].split("=")[1];
        }
      }
      return theRequest;
    },
  };
}

// 拖拽
export function registerFileDrop(container, callback) {
  function handleFileSelect(e) {
    e.stopPropagation();
    e.preventDefault();

    const files = e.dataTransfer.files;

    const file = files[0];

    const reader = new FileReader();

    reader.onload = function(e) {
      // console.log('e: ', e);
      const xml = e.target.result;

      callback(xml);
    };

    reader.readAsText(file);
  }

  function handleDragOver(e) {
    e.stopPropagation();
    e.preventDefault();

    e.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
  }

  container.addEventListener('dragover', handleDragOver, false);
  container.addEventListener('drop', handleFileSelect, false);
}

export function getCustomJson() {
  return $.get('/service/editor/bpmn/custom/componentJson', {timeout: 1000});
}
export function getXml(modelId) {
  return $.get(`/web/flow/v1/openModelXml?modelId=${modelId}`, {timeout: 1000,});
}