(window.webpackJsonppuhelinluettelo=window.webpackJsonppuhelinluettelo||[]).push([[0],{14:function(e,n,t){e.exports=t(37)},36:function(e,n,t){},37:function(e,n,t){"use strict";t.r(n);var a=t(0),o=t.n(a),l=t(13),r=t.n(l),u=t(2),c=t(3),i=t.n(c),m="/api/persons",d=function(){return i.a.get(m)},f=function(e){return i.a.post(m,e)},s=function(e,n){return i.a.put("".concat(m,"/").concat(e),n)},h=function(e){return i.a.delete("".concat(m,"/").concat(e))},b=(t(36),function(e){var n=e.person,t=e.del;return o.a.createElement("p",null,n.name," ",n.number,o.a.createElement("button",{onClick:function(){return t(n.name,n.id)}},"delete"))}),g=function(e){return o.a.createElement("form",null,o.a.createElement("div",null,"filter shown with:"," ",o.a.createElement("input",{value:e.filter,onChange:e.handleFilterChange})))},p=function(e){return o.a.createElement("form",{onSubmit:e.addPerson},o.a.createElement("div",null,"name: ",o.a.createElement("input",{value:e.newName,onChange:e.handleNameChange})),o.a.createElement("div",null,"number:"," ",o.a.createElement("input",{value:e.newNumber,onChange:e.handleNumberChange})),o.a.createElement("div",null,o.a.createElement("button",{type:"submit"},"add")))},v=function(e){return o.a.createElement("div",null,e.filteredArray.map(function(n){return o.a.createElement(b,{key:n.name,person:n,del:e.del})}))},E=function(e){var n=e.message;return null===n?null:o.a.createElement("div",{className:"error"},n)},w=function(){var e=Object(a.useState)([]),n=Object(u.a)(e,2),t=n[0],l=n[1],r=Object(a.useState)(""),c=Object(u.a)(r,2),i=c[0],m=c[1],b=Object(a.useState)(""),w=Object(u.a)(b,2),C=w[0],j=w[1],O=Object(a.useState)(""),N=Object(u.a)(O,2),y=N[0],k=N[1],S=Object(a.useState)(null),T=Object(u.a)(S,2),A=T[0],D=T[1];Object(a.useEffect)(function(){d().then(function(e){l(e.data)})},[]);var P=t.filter(function(e){return e.name.toLowerCase().includes(y.toLowerCase())});return o.a.createElement("div",null,o.a.createElement("h2",null,"Phonebook"),o.a.createElement(E,{message:A}),o.a.createElement(g,{filter:y,handleFilterChange:function(e){console.log(e.target.value),k(e.target.value)}}),o.a.createElement("h3",null,"add a new"),o.a.createElement(p,{addPerson:function(e){e.preventDefault();var n={name:i,number:C,id:null};if(0===t.filter(function(e){return e.name===n.name}).length)f(n).then(function(e){console.log("the response",e.data.id),n.id=e.data.id,l(t.concat(n)),m(""),j(""),D("Added ".concat(n.name)),setTimeout(function(){D(null)},2e3)}).catch(function(e){console.log(e.response.data),D(e.response.data.error),setTimeout(function(){D(null)},1e4)});else{var a=t.find(function(e){return e.name===n.name});a.number=n.number,console.log(a),window.confirm("".concat(n.name," is already added to the phonebook,\n             replace the old number with a new one?"))&&s(a.id,a).then(function(e){console.log(e),m(""),j(""),D("Changed number of ".concat(n.name)),setTimeout(function(){D(null)},2e3)})}},newName:i,handleNameChange:function(e){console.log(e.target.value),m(e.target.value)},newNumber:C,handleNumberChange:function(e){j(e.target.value)}}),o.a.createElement("h3",null,"Numbers"),o.a.createElement(v,{filteredArray:P,del:function(e,n){console.log(t);var a=t.filter(function(n){return n.name!==e});window.confirm("Delete ".concat(e," ?"))&&(console.log(n),h(n).then(function(n){console.log(n),l(a),D("Deleted ".concat(e)),setTimeout(function(){D(null)},2e3)}).catch(function(n){console.log(n),D("Information of '".concat(e,"' has already been removed from server")),setTimeout(function(){D(null)},5e3),l(a)}))}}))};r.a.render(o.a.createElement(w,null),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.f1cce230.chunk.js.map