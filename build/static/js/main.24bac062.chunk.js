(this.webpackJsonpthephonebook=this.webpackJsonpthephonebook||[]).push([[0],{14:function(e,n,t){e.exports=t(38)},19:function(e,n,t){},37:function(e,n,t){},38:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),o=t(13),u=t.n(o),l=t(2),c=function(e){var n=e.name,t=e.phoneNumber,a=e.remove,o=e.id;return r.a.createElement("li",null," ",n," ",t," ",r.a.createElement("button",{onClick:function(){return a(o)}},"delete"))},i=(t(19),function(e){var n=e.newName,t=e.newNumber,a=e.addName,o=e.handleNumberChange,u=e.handleNameChange;return r.a.createElement("div",{class:"form"},r.a.createElement("h2",null,"Add New Number"),r.a.createElement("form",{onSubmit:a},r.a.createElement("ul",null,r.a.createElement("li",null,r.a.createElement("label",{forms:"name"},"Name:"),r.a.createElement("input",{value:n,onChange:u})),r.a.createElement("li",null,r.a.createElement("label",{forms:"phonenumber"},"Phone number:"),r.a.createElement("input",{value:t,onChange:o})),r.a.createElement("li",null,r.a.createElement("button",{type:"submit"}," add ")))))}),m=function(e){var n=e.searchString,t=e.handleSearchChange,a=e.searchResults,o=e.remove;return r.a.createElement("ul",null,r.a.createElement("input",{placeholder:"search",value:n,onChange:t}),a.map((function(e){return r.a.createElement(c,{style:{"margin-top":50},key:e.id,id:e.id,name:e.name,phoneNumber:e.phoneNumber,remove:o})})))},s=t(3),d=t.n(s),h="api/persons",f=function(){return d.a.get(h).then((function(e){return e.data}))},b=function(e){var n=d.a.post(h,e);return console.log(n.then((function(e){return e.data}))),n.then((function(e){return e.data}))},g=function(e){var n=d.a.delete(h+e);return console.log("next"),console.log(n.then((function(e){return e.data}))),n.then((function(e){return e.data}))},p=function(e,n){console.log(n);var t=d.a.put(h+e,n);return console.log(t),t.then((function(e){return e.data}))},v=function(e){var n=e.message,t=e.styleType;return null===n?null:r.a.createElement("div",{style:t},n)},E=(t(37),function(){var e=Object(a.useState)([]),n=Object(l.a)(e,2),t=n[0],o=n[1],u=Object(a.useState)(""),c=Object(l.a)(u,2),s=c[0],d=c[1],h=Object(a.useState)(""),E=Object(l.a)(h,2),y=E[0],N=E[1],j=Object(a.useState)(""),w=Object(l.a)(j,2),O=w[0],S=w[1],k=Object(a.useState)(null),C=Object(l.a)(k,2),T=C[0],x=C[1],z=Object(a.useState)(null),A=Object(l.a)(z,2),I=A[0],J=A[1],P=t.filter((function(e){return e.name.includes(O)}));Object(a.useEffect)((function(){f().then((function(e){o(e),console.log(e)}))}),[]);return r.a.createElement("div",{id:"homeImg",style:{margin:"0-auto"}},r.a.createElement("h1",{class:"title"},"Phonebook"),r.a.createElement(v,{message:T,styleType:{color:"red",background:"lightgrey",fontsize:20,borderstyle:"solid",borderradius:5,padding:10,marginbottom:10}}),r.a.createElement(v,{message:I,styleType:{color:"green",background:"lightgrey",fontsize:20,borderstyle:"solid",borderradius:5,padding:10,marginbottom:10}}),r.a.createElement(i,{newName:s,newNumber:y,persons:t,handleNameChange:function(e){d(e.target.value)},handleNumberChange:function(e){N(e.target.value)},addName:function(e){e.preventDefault();var n=t.find((function(e){return e.name==s}));if(n){if(window.confirm(" Update ".concat(s,"'s number? "))){var a={id:n.id,name:n.name,phoneNumber:y};p(n.id,a).then((function(e){o(t.map((function(n){return n.id==e.id?e:n})))})).then.catch((function(e){x("".concat(a.name," has been removed from the database")),setTimeout((function(){J(null)}),5e3)})),J("".concat(a.name,"'s phonenumber has been update to ").concat(a.phoneNumber)),setTimeout((function(){J(null)}),5e3),N(""),d("")}}else{console.log("working");var r={name:s,number:y};b(r).then((function(e){o(t.concat(e)),S(""),console.log(e)})).catch((function(e){console.log(e)})),J("".concat(r.name," has been added to the database!")),setTimeout((function(){J(null)}),5e3)}}}),r.a.createElement(m,{searchString:O,handleSearchChange:function(e){console.log(e.target.value),S(e.target.value)},persons:t,searchResults:P,remove:function(e){window.confirm("Are you sure you want to delete this user?")&&(g(e).then((function(n){return o(t.filter((function(n){return n.id!==e})))})).catch((function(e){x("This person has already been removed")})),J("Succesfully removed from the database!"),setTimeout((function(){J(null)}),5e3))}}))});u.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(E,null)),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.24bac062.chunk.js.map