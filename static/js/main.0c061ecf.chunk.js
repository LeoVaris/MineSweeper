(this.webpackJsonpminesweeper=this.webpackJsonpminesweeper||[]).push([[0],[,,,,,,,,,function(e,t,n){e.exports=n(17)},,,,,function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var r=n(0),i=n.n(r),a=n(7),o=n.n(a),s=(n(14),n(1)),l=n(2),u=n(4),c=n(3),f=n(5),h=n(8),m=(n(15),n(16),function(e){function t(){return Object(s.a)(this,t),Object(u.a)(this,Object(c.a)(t).apply(this,arguments))}return Object(f.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this.props,t=e.row,n=e.col,r=e.bombsAround,a=e.isHidden,o=e.isBomb,s=e.isFlag,l=e.onClick,u=e.onContextMenu,c=e.gameWon,f="";return f=e.gameLost?s&&!o?"Node-wrongflag":s?"Node-flag":o&&!a?"Node-bombhit":o?"Node-bomb":a?"Node-hidden":"Node-".concat(r):c?s?"Node-flag":o?"Node-bomb":a?"Node-flag":"Node-".concat(r):s?"Node-flag":a?"Node-hidden":o?"Node-bombhit":"Node-".concat(r),i.a.createElement("div",{className:"Node ".concat(f),onClick:function(){return l(t,n)},onContextMenu:function(e){return u(e,t,n)}})}}]),t}(r.Component));function d(e){!function(e){!function(e){for(var t=0;t<e.length;t++)for(var n=0;n<e[0].length;n++)e[t][n].linked=!1,e[t][n].links=[]}(e);for(var t=0;t<e.length;t++)for(var n=0;n<e[0].length;n++)e[t][n].bombsAround-g(e,t,n)!==1||1===p(e,t,n).filter((function(e){return!e.isFlag})).length||e[t][n].isHidden||e[t][n].isFlag||function(){var r=[],i=p(e,t,n).filter((function(e){return!e.isFlag}));i.forEach((function(e){return r.push(e)})),i.forEach((function(t){var n=t.row,i=t.col;(e[n][i].links.length>=r.length||!e[n][i].linked)&&(e[n][i].linked=!0,e[n][i].links=[].concat(r))}))}()}(e);for(var t=0;t<e.length;t++)for(var n=0;n<e[0].length;n++)if(!e[t][n].isHidden&&!e[t][n].isFlag&&100!==e[t][n].risk&&0!==e[t][n].risk){var r=function(){var r=e[t][n],i=p(e,t,n).filter((function(e){return!e.isFlag}));if(r.bombsAround>1&&r.bombsAround-g(e,r.row,r.col)>1)for(var a=0;a<i.length;a++)if(i[a].linked){var o=0,s=[];i[a].links.length===i.length-1&&function(){var t=[];if(i[a].links.every((function(e){return t.push(e),i.includes(e)})))for(var n=0;n<i.length;n++)if(!t.includes(i[n])){var r=i[n],o=r.row,s=r.col;e[o][s].risk=0;break}}();for(var l=0;l<i[a].links.length;l++)i.includes(i[a].links[l])&&(o++,s.push(i[a].links[l]));if(o>1&&i.length-(o-1)===r.bombsAround){for(var u=0;u<i.length;u++)if(!s.includes(i[u])){var c=i[u],f=c.row,h=c.col;e[f][h].risk=100}return{v:void 0}}}}();if("object"===typeof r)return r.v}}function g(e,t,n){return v(e,t,n).filter((function(e){return e.isFlag}))}function p(e,t,n){return v(e,t,n).filter((function(e){return e.isHidden}))}function v(e,t,n){var r=[],i=e.length-1,a=e[0].length-1;return t>0&&n>0&&r.push(e[t-1][n-1]),t>0&&r.push(e[t-1][n]),t>0&&n<a&&r.push(e[t-1][n+1]),n>0&&r.push(e[t][n-1]),n<a&&r.push(e[t][n+1]),t<i&&n>0&&r.push(e[t+1][n-1]),t<i&&r.push(e[t+1][n]),t<i&&n<a&&r.push(e[t+1][n+1]),r}function b(e,t,n){if(n)return{row:Math.floor(e.length/2),col:Math.floor(e[0].length/2),left:!0};var r=function(e){var t=[],n=!0,r=!1,i=void 0;try{for(var a,o=e[Symbol.iterator]();!(n=(a=o.next()).done);n=!0){var s=a.value,l=!0,u=!1,c=void 0;try{for(var f,h=s[Symbol.iterator]();!(l=(f=h.next()).done);l=!0){var m=f.value;t.push(m)}}catch(d){u=!0,c=d}finally{try{l||null==h.return||h.return()}finally{if(u)throw c}}}}catch(d){r=!0,i=d}finally{try{n||null==o.return||o.return()}finally{if(r)throw i}}return t}(e),i=r.filter((function(e){return e.isHidden&&!e.isFlag})),a=r.filter((function(e){return!e.isHidden&&!e.isFlag&&e.bombsAround>0}));d(e),a.forEach((function(t){var n=t.row,r=t.col;!function(e,t,n){e[t][n].bombsAround===p(e,t,n).length&&p(e,t,n).forEach((function(e){return e.risk=100}))}(e,n,r),function(e,t,n){e[t][n].bombsAround===g(e,t,n).length&&p(e,t,n).forEach((function(e){return e.risk=0}))}(e,n,r)}));var o=i.filter((function(e){return 0===e.risk}));if(o.length>0)return{row:o[0].row,col:o[0].col,left:!0};var s=i.filter((function(e){return 100===e.risk}));if(s.length>0)return{row:s[0].row,col:s[0].col,left:!1};a.forEach((function(t){!function(e,t,n){var r=e[t][n];if(0!==r.risk&&100!==r.risk){var i=p(e,t,n).filter((function(e){return!e.isFlag})),a=(r.bombsAround-g(e,t,n).length)/i.length;i.forEach((function(e){var t=Math.max(a,e.risk);e.risk=t}))}}(e,t.row,t.col)}));var l=i.filter((function(e){return null!==e.risk}));if("undefined"!==typeof(l=function(e){return e.sort((function(e,t){return e.risk-t.risk}))}(l))[0])return{row:l[0].row,col:l[0].col,left:!0};var u=a.filter((function(e){return 1===e.bombsAround})),c=[];return u.forEach((function(t){c=c.concat(p(e,t.row,t.col).filter((function(e){return!e.isFlag})))})),c.length>0?{row:c[0].row,col:c[0].col,left:!0}:{row:i[0].row,col:i[0].col,left:!0}}function k(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function C(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?k(n,!0).forEach((function(t){Object(h.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):k(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var y=function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(u.a)(this,Object(c.a)(t).call(this,e)))._isMounted=!1,n.handleContextMenu=function(e,t,r){if(n._isMounted){void 0!==e&&e.preventDefault();var i=O(n.state.grid,t,r);n.setState({grid:i});var a=H(n.state.grid);n.sendMineCountCallback(a)}},n.playAI=function(){var e=n.state,t=e.aiSpeed,r=e.alive,i=e.hasWon;n._isMounted&&r&&!i&&setTimeout((function(){var e=n.state,t=e.grid,r=(e.mineCount,b(t,0,e.firstClick)),i=r.row,a=r.col;r.left?n.handleOnClick(i,a):n.handleContextMenu(void 0,i,a);var o=n.state,s=o.alive,l=o.hasWon;s&&!l&&n.playAI()}),t)},n.state={grid:[],grid_width:n.props.width,grid_height:n.props.height,loading:!0,firstClick:!0,mineCount:n.props.mineCount,alive:!0,hasWon:!1,time:0,aiSpeed:n.props.aiSpeed},n}return Object(f.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){var e=this.state,t=e.grid_width,n=e.grid_height,r=E(t,n);this.setState({grid:r,loading:!1}),this._isMounted=!0}},{key:"componentWillUnmount",value:function(){this.stopTimer(),this._isMounted=!1}},{key:"sendWinCallback",value:function(){this.setState({hasWon:!0});this.props.parentCallback({from:"grid-win"})}},{key:"sendMineCountCallback",value:function(e){var t={from:"grid-minecount",minesLeft:this.state.mineCount-e};this.props.parentCallback(t)}},{key:"sendLossCallback",value:function(){this.props.parentCallback({from:"grid-loss"})}},{key:"startTimer",value:function(){var e=this;this.timer=setInterval((function(){return e.setState({time:e.state.time+1})}),1e3)}},{key:"stopTimer",value:function(){clearInterval(this.timer)}},{key:"resetTimer",value:function(){this.setState({time:0})}},{key:"handleOnClick",value:function(e,t){var n=this.state,r=n.firstClick,i=n.grid,a=n.mineCount;if(n.alive&&this._isMounted){if(r){var o=w(i,e,t,a);this.resetTimer(),this.startTimer(),this.setState({grid:o,firstClick:!1})}else{var s=i,l=S(s,e,t);l||(this.stopTimer(),this.sendLossCallback()),this.setState({grid:s,alive:l})}0===D(i)&&(this.sendWinCallback(),this.stopTimer())}}},{key:"render",value:function(){var e=this,t=this.state,n=t.grid,r=t.loading,a=t.time,o=t.mineCount,s=t.hasWon,l=t.alive;return r?"Loading...":i.a.createElement(i.a.Fragment,null,i.a.createElement("div",{className:"aibtn"},i.a.createElement("button",{className:"newgame",onClick:function(){return e.playAI()}},"Play AI")),i.a.createElement("div",{className:"timer"},"Mines left: ",o-H(n),i.a.createElement("br",null)," Time: ",a),i.a.createElement("div",{className:"grid"},n.map((function(t,n){return i.a.createElement("div",{key:n},t.map((function(t,n){var r=t.row,a=t.col,o=t.bombsAround,u=t.isHidden,c=t.isFlag,f=t.isBomb;return i.a.createElement(m,{key:n,col:a,row:r,bombsAround:o,isHidden:u,isBomb:f,isFlag:c,gameWon:s,gameLost:!l,onContextMenu:function(t,n,r){return e.handleContextMenu(t,n,r)},onClick:function(t,n){return e.handleOnClick(t,n)}})})))}))))}}]),t}(r.Component),w=function(e,t,n,r){return A(e,r,e[t][n]),B(e),S(e,t,n),e},E=function(e,t){for(var n=[],r=0;r<t;r++){for(var i=[],a=0;a<e;a++)i.push(N(r,a));n.push(i)}return n},N=function(e,t){return{row:e,col:t,bombsAround:0,isHidden:!0,isBomb:!1,isFlag:!1,isClear:!1,linked:!1,risk:null,links:[]}},O=function(e,t,n){var r=e.slice(),i=r[t][n];if(!i.isHidden)return e;var a=C({},i,{isFlag:!i.isFlag});return r[t][n]=a,r},S=function e(t,n,r){var i=t[n][r];if(i.isFlag)return!0;if(i.isBomb)return M(t,n,r),!1;if(0===i.bombsAround&&i.isHidden){j(t,n,r);var a=I(t,n,r);(a=a.filter((function(e){return e.isHidden&&!e.isFlag}))).forEach((function(n){e(t,n.row,n.col)}))}else j(t,n,r);return!0},M=function(e,t,n){var r=C({},e[t][n],{isHidden:!1});e[t][n]=r},j=function(e,t,n){var r=e.slice(),i=C({},r[t][n],{isHidden:!1});return r[t][n]=i,r},x=function(e,t,n){var r=e.slice(),i=C({},r[t][n],{isBomb:!0});return r[t][n]=i,r},L=function(e,t,n){return e[t][n].isBomb},A=function(e,t,n){var r=e,i=0,a=2;for(e.length*e[0].length-9<t&&(a=1);i<t;){var o=F(e.length,e[0].length);L(r,o.row,o.col)||(Math.abs(n.row-o.row)<a&&Math.abs(n.col-o.col)<a||(r=x(r,o.row,o.col),i++))}return r},F=function(e,t){return{row:Math.floor(Math.random()*e),col:Math.floor(Math.random()*t)}},B=function(e){e.forEach((function(t){t.forEach((function(t){t.bombsAround=W(e,t.row,t.col)}))}))},H=function(e){var t=0;return e.forEach((function(e){e.forEach((function(e){e.isFlag&&t++}))})),t},W=function(e,t,n){return I(e,t,n).filter((function(e){return e.isBomb})).length},I=function(e,t,n){var r=[],i=e.length-1,a=e[0].length-1;return t>0&&n>0&&r.push(e[t-1][n-1]),t>0&&r.push(e[t-1][n]),t>0&&n<a&&r.push(e[t-1][n+1]),n>0&&r.push(e[t][n-1]),n<a&&r.push(e[t][n+1]),t<i&&n>0&&r.push(e[t+1][n-1]),t<i&&r.push(e[t+1][n]),t<i&&n<a&&r.push(e[t+1][n+1]),r},D=function(e){for(var t=0,n=0;n<e.length;n++)for(var r=0;r<e[0].length;r++)e[n][r].isHidden&&!e[n][r].isBomb&&t++;return t},T=function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(u.a)(this,Object(c.a)(t).call(this,e))).Callback=function(e){var t=e.from;if("grid-win"===t)n.setState({hasWon:!0});else if("grid-minecount"===t){var r=e.minesLeft;n.setState({minesLeft:r})}else"grid-loss"===t&&n.setState({hasLost:!0})},n.handleOptionChange=function(e){n.setState({option:e.target.value})},n.handleCustomGame=function(e,t){var r=n.state.customData;r[t]=parseInt(e.target.value),n.setState({customData:r})},n.changeAISpeed=function(e){e.preventDefault(),n.setState({aiSpeed:1e3-e.target.value}),n.Restart()},n.handleNewGame=function(e){e.preventDefault();var t=n.state,r=t.option,i=t.customData;if("beginner"===r)n.setState({width:9,height:9,mineCount:10,minesLeft:n.state.mineCount});else if("intermediate"===r)n.setState({width:16,height:16,mineCount:40,minesLeft:n.state.mineCount});else if("expert"===r)n.setState({width:30,height:16,mineCount:99,minesLeft:n.state.mineCount});else if("custom"===r){if(!i.every((function(e){return!isNaN(e)})))return;var a=n.Verifybomb(i);n.setState({width:i[0],height:i[1],mineCount:a,minesLeft:n.state.mineCount})}n.Restart()},n.Restart=function(){var e=n.state.key;e++,n.setState({key:e,hasWon:!1,hasLost:!1,minesLeft:n.state.mineCount})},n.state={loading:!0,width:9,height:9,mineCount:10,key:0,hasWon:!1,hasLost:!1,option:"beginner",minesLeft:0,customData:[],aiSpeed:500},n}return Object(f.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){var e=this.state.mineCount;this.setState({loading:!1,minesLeft:e,customData:[9,9,10]})}},{key:"Verifybomb",value:function(e){return e[0]*e[1]<2?0:e[0]*e[1]-1>=e[2]?e[2]:e[0]*e[1]-1}},{key:"ButtonClassName",value:function(e){return this.state.option===e?"regularbtn checked":"regularbtn"}},{key:"customInput",value:function(){var e=this;return"custom"!==this.state.option?null:i.a.createElement("div",{className:"regularbtn buttons"},i.a.createElement("label",null,"Width:\xa0\xa0",i.a.createElement("input",{className:"custom-input",type:"number",name:"width",autoComplete:"off",min:1,max:25,onChange:function(t){return e.handleCustomGame(t,0)}})),i.a.createElement("label",null,i.a.createElement("br",null),"Height:\xa0",i.a.createElement("input",{className:"custom-input",type:"number",name:"height",autoComplete:"off",min:1,max:25,onChange:function(t){return e.handleCustomGame(t,1)}})),i.a.createElement("label",null,i.a.createElement("br",null),"Bombs:",i.a.createElement("input",{className:"custom-input",type:"number",name:"bombs",autoComplete:"off",min:0,max:1e3,onChange:function(t){return e.handleCustomGame(t,2)}})))}},{key:"winText",value:function(){if(this.state.hasWon)return"You Win!"}},{key:"LossText",value:function(){if(this.state.hasLost)return"You Lost!"}},{key:"render",value:function(){var e=this.state,t=e.key,n=e.loading,r=e.option,a=e.width,o=e.height,s=e.mineCount,l=e.aiSpeed;return n?"Loading...":i.a.createElement(i.a.Fragment,null,i.a.createElement("div",{className:"IO"},i.a.createElement("form",{onSubmit:this.handleNewGame},i.a.createElement("div",{className:"buttons"},i.a.createElement("label",{className:this.ButtonClassName("custom")},i.a.createElement("input",{type:"radio",value:"custom",checked:"custom"===r,onChange:this.handleOptionChange}),"Custom"),i.a.createElement("label",{className:this.ButtonClassName("beginner")}," Beginner",i.a.createElement("input",{type:"radio",value:"beginner",checked:"beginner"===r,onChange:this.handleOptionChange})),i.a.createElement("label",{className:this.ButtonClassName("intermediate")}," Intermediate",i.a.createElement("input",{type:"radio",value:"intermediate",checked:"intermediate"===r,onChange:this.handleOptionChange})),i.a.createElement("label",{className:this.ButtonClassName("expert")},i.a.createElement("input",{type:"radio",value:"expert",checked:"expert"===r,onChange:this.handleOptionChange}),"Expert\xa0",i.a.createElement("br",null))),this.customInput(),i.a.createElement("button",{className:"newgame",type:"submit"},"New Game"),i.a.createElement("div",{className:"ai"},"AI speed",i.a.createElement("br",null),i.a.createElement("input",{className:"slider",type:"range",name:"points",min:"100",max:"990",step:"10",defaultValue:"550",onChange:this.changeAISpeed})))),i.a.createElement("div",{className:"win"},this.winText()),i.a.createElement("div",{className:"loss"},this.LossText()),i.a.createElement("div",{key:t},i.a.createElement(y,{onContextMenu:this.handleClick,parentCallback:this.Callback,width:a,height:o,mineCount:s,aiSpeed:l})))}}]),t}(r.Component);var _=function(){return i.a.createElement(T,null)};o.a.render(i.a.createElement(_,null),document.getElementById("root"))}],[[9,1,2]]]);
//# sourceMappingURL=main.0c061ecf.chunk.js.map