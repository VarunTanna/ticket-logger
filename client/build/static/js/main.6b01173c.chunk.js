(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{66:function(e,t,n){},69:function(e,t,n){"use strict";n.r(t);var c,a,s,i,r,l,o,j,b=n(2),d=n.n(b),m=n(53),u=n.n(m),h=(n(66),n(20)),O=n(58),x=n(80),p=n(82),g=n(79),k=n(56),f=n(12),v=n(5),y=n(84),w=n(3),N=function(e){var t=e.tickets,n=e.title;return t.length?Object(w.jsxs)("div",{children:[Object(w.jsx)("h3",{className:"text-primary",children:n}),Object(w.jsx)("div",{className:"flex-row justify-space-between my-4",children:t&&t.map((function(e){return Object(w.jsx)("div",{className:"col-12 col-xl-6",children:Object(w.jsxs)("div",{className:"card mb-3",children:[Object(w.jsxs)("h4",{className:"card-header bg-dark text-light p-2 m-0",children:[e.name," ",Object(w.jsx)("br",{}),Object(w.jsxs)("span",{className:"text-white",style:{fontSize:"1rem"},children:["currently has ",e.skills?e.skills.length:0," ","tickets",e.skills&&1===e.skills.length?"":"s"]})]}),Object(w.jsx)(f.b,{className:"btn btn-block btn-squared btn-light text-dark",to:"/tickets/".concat(e._id),children:"View and endorse your tickets."})]})},e._id)}))})]}):Object(w.jsx)("h3",{children:"No Tickets Yet"})},S=n(21),$=n(81),I=(Object($.a)(c||(c=Object(S.a)(["\n  query user($username: String!) {\n    user(username: $username) {\n      _id\n      email\n      password\n      github\n      \n    }\n  }\n"]))),Object($.a)(a||(a=Object(S.a)(["\n  query allTickets {\n    tickets {\n      _id\n      name\n      skills\n    }\n  }\n"])))),T=(Object($.a)(s||(s=Object(S.a)(["\n  query singleTicket($ticketId: ID!) {\n    ticket(ticketId: $ticketId) {\n      _id\n      name\n      skills\n    }\n  }\n"]))),Object($.a)(i||(i=Object(S.a)(["\n  query me {\n    me {\n      _id\n      name\n      tickets\n    }\n  }\n"]))),function(){var e=Object(y.a)(I),t=e.loading,n=e.data,c=(null===n||void 0===n?void 0:n.tickets)||[];return Object(w.jsx)("main",{children:Object(w.jsx)("div",{className:"flex-row justify-center",children:Object(w.jsx)("div",{className:"col-12 col-md-10 my-3",children:t?Object(w.jsx)("div",{children:"Loading..."}):Object(w.jsx)(N,{tickets:c,title:"Here are the current tickets..."})})})})}),_=n(28),C=n(38),D=n(26),Y=n(13),q=n(77),L=Object($.a)(r||(r=Object(S.a)(["\n  mutation addTicket($name: String!, $email: String!, $password: String!) {\n    addTicket(name: $name, email: $email, password: $password) {\n      token\n      ticket {\n        _id\n        name\n      }\n    }\n  }\n"]))),z=(Object($.a)(l||(l=Object(S.a)(["\n  mutation addTickets($ticketId: ID!, $tickets: String!) {\n    addSkill(ticketId: $ticketId, tickets: $tickets) {\n      _id\n      name\n      tickets\n    }\n  }\n"]))),Object($.a)(o||(o=Object(S.a)(["\n  mutation login($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      token\n      ticket {\n        _id\n        name\n      }\n    }\n  }\n"])))),V=(Object($.a)(j||(j=Object(S.a)(["\n  mutation removeTickets($tickets: String!) {\n    removeTickets(tickets: $tickets) {\n      _id\n      name\n      tickets\n    }\n  }\n"]))),n(54)),B=n(55),E=n(45),F=new(function(){function e(){Object(V.a)(this,e)}return Object(B.a)(e,[{key:"getProfile",value:function(){return Object(E.a)(this.getToken())}},{key:"loggedIn",value:function(){var e=this.getToken();return!(!e||this.isTokenExpired(e))}},{key:"isTokenExpired",value:function(e){return Object(E.a)(e).exp<Date.now()/1e3&&(localStorage.removeItem("id_token"),!0)}},{key:"getToken",value:function(){return localStorage.getItem("id_token")}},{key:"login",value:function(e){localStorage.setItem("id_token",e),window.location.assign("/")}},{key:"logout",value:function(){localStorage.removeItem("id_token"),window.location.reload()}}]),e}()),J=function(){var e=Object(b.useState)({name:"",email:"",password:""}),t=Object(Y.a)(e,2),n=t[0],c=t[1],a=Object(q.a)(L),s=Object(Y.a)(a,2),i=s[0],r=s[1],l=r.error,o=r.data,j=function(e){var t=e.target,a=t.name,s=t.value;c(Object(h.a)(Object(h.a)({},n),{},Object(D.a)({},a,s)))},d=function(){var e=Object(C.a)(Object(_.a)().mark((function e(t){var c,a;return Object(_.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),console.log(n),e.prev=2,e.next=5,i({variables:Object(h.a)({},n)});case 5:c=e.sent,a=c.data,F.login(a.addTicket.token),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(2),console.error(e.t0);case 13:case"end":return e.stop()}}),e,null,[[2,10]])})));return function(t){return e.apply(this,arguments)}}();return Object(w.jsx)("main",{className:"flex-row justify-center mb-4",children:Object(w.jsx)("div",{className:"col-12 col-lg-10",children:Object(w.jsxs)("div",{className:"card",children:[Object(w.jsx)("h4",{className:"card-header bg-dark text-light p-2",children:"Sign Up"}),Object(w.jsxs)("div",{className:"card-body",children:[o?Object(w.jsxs)("p",{children:["Success! You may now head"," ",Object(w.jsx)(f.b,{to:"/",children:"back to the homepage."})]}):Object(w.jsxs)("form",{onSubmit:d,children:[Object(w.jsx)("input",{className:"form-input",placeholder:"Your username",name:"name",type:"text",value:n.name,onChange:j}),Object(w.jsx)("input",{className:"form-input",placeholder:"Your email",name:"email",type:"email",value:n.email,onChange:j}),Object(w.jsx)("input",{className:"form-input",placeholder:"******",name:"password",type:"password",value:n.password,onChange:j}),Object(w.jsx)("button",{className:"btn btn-block btn-info",style:{cursor:"pointer"},type:"submit",children:"Submit"})]}),l&&Object(w.jsx)("div",{className:"my-3 p-3 bg-danger text-white",children:l.message})]})]})})})},M=function(e){var t=Object(b.useState)({email:"",password:""}),n=Object(Y.a)(t,2),c=n[0],a=n[1],s=Object(q.a)(z),i=Object(Y.a)(s,2),r=i[0],l=i[1],o=l.error,j=l.data,d=function(e){var t=e.target,n=t.name,s=t.value;a(Object(h.a)(Object(h.a)({},c),{},Object(D.a)({},n,s)))},m=function(){var e=Object(C.a)(Object(_.a)().mark((function e(t){var n,s;return Object(_.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),console.log(c),e.prev=2,e.next=5,r({variables:Object(h.a)({},c)});case 5:n=e.sent,s=n.data,F.login(s.login.token),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(2),console.error(e.t0);case 13:a({email:"",password:""});case 14:case"end":return e.stop()}}),e,null,[[2,10]])})));return function(t){return e.apply(this,arguments)}}();return Object(w.jsx)("main",{className:"flex-row justify-center mb-4",children:Object(w.jsx)("div",{className:"col-12 col-lg-10",children:Object(w.jsxs)("div",{className:"card",children:[Object(w.jsx)("h4",{className:"card-header bg-dark text-light p-2",children:"Login"}),Object(w.jsxs)("div",{className:"card-body",children:[j?Object(w.jsxs)("p",{children:["Success! You may now head"," ",Object(w.jsx)(f.b,{to:"/",children:"back to the homepage."})]}):Object(w.jsxs)("form",{onSubmit:m,children:[Object(w.jsx)("input",{className:"form-input",placeholder:"Your email",name:"email",type:"email",value:c.email,onChange:d}),Object(w.jsx)("input",{className:"form-input",placeholder:"******",name:"password",type:"password",value:c.password,onChange:d}),Object(w.jsx)("button",{className:"btn btn-block btn-info",style:{cursor:"pointer"},type:"submit",children:"Submit"})]}),o&&Object(w.jsx)("div",{className:"my-3 p-3 bg-danger text-white",children:o.message})]})]})})})},G=function(){return Object(w.jsx)("header",{className:"bg-info text-dark mb-4 py-3 display-flex align-center",children:Object(w.jsxs)("div",{className:"container flex-column justify-space-between-lg justify-center align-center text-center",children:[Object(w.jsx)(f.b,{className:"text-dark",to:"/",children:Object(w.jsx)("h1",{className:"m-0",style:{fontSize:"3rem"},children:"Ticket Logger"})}),Object(w.jsx)("p",{className:"m-0",style:{fontSize:"1.75rem",fontWeight:"700"},children:"Check your ticket status!"}),Object(w.jsx)("div",{children:F.loggedIn()?Object(w.jsxs)(w.Fragment,{children:[Object(w.jsx)(f.b,{className:"btn btn-lg btn-primary m-2",to:"/me",children:"View My Tickets"}),Object(w.jsx)("button",{className:"btn btn-lg btn-light m-2",onClick:function(e){e.preventDefault(),F.logout()},children:"Logout"})]}):Object(w.jsxs)(w.Fragment,{children:[Object(w.jsx)(f.b,{className:"btn btn-lg btn-primary m-2",to:"/login",children:"Login"}),Object(w.jsx)(f.b,{className:"btn btn-lg btn-light m-2",to:"/signup",children:"Signup"})]})})]})})},H=function(){var e=Object(v.e)(),t=Object(v.f)();return Object(w.jsx)("footer",{className:"w-100 mt-auto text-dark p-4",children:Object(w.jsxs)("div",{className:"container text-center mb-5",children:["/"!==e.pathname&&Object(w.jsx)("button",{className:"btn btn-dark mb-3",onClick:function(){return t(-1)},children:"\u2190 Go Back"}),Object(w.jsxs)("h4",{children:["\xa9 ",(new Date).getFullYear()," - Varun, Sila, Chris, Victoria."]})]})})},P=Object(O.a)({uri:"/graphql"}),U=Object(k.a)((function(e,t){var n=t.headers,c=localStorage.getItem("id_token");return{headers:Object(h.a)(Object(h.a)({},n),{},{authorization:c?"Bearer ".concat(c):""})}})),W=new x.a({link:U.concat(P),cache:new p.a});var A=function(){return Object(w.jsx)(g.a,{client:W,children:Object(w.jsx)(f.a,{children:Object(w.jsxs)("div",{className:"flex-column justify-flex-start min-100-vh",children:[Object(w.jsx)(G,{}),Object(w.jsx)("div",{className:"container",children:Object(w.jsxs)(v.c,{children:[Object(w.jsx)(v.a,{path:"/",element:Object(w.jsx)(T,{})}),Object(w.jsx)(v.a,{path:"/login",element:Object(w.jsx)(M,{})}),Object(w.jsx)(v.a,{path:"/signup",element:Object(w.jsx)(J,{})})]})}),Object(w.jsx)(H,{})]})})})};u.a.render(Object(w.jsx)(d.a.StrictMode,{children:Object(w.jsx)(A,{})}),document.getElementById("root"))}},[[69,1,2]]]);
//# sourceMappingURL=main.6b01173c.chunk.js.map