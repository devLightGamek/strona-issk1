import{load,save}from'./store.js';
const f=document.querySelector('#loginForm');
f.addEventListener('submit',e=>{
  e.preventDefault();
  const d=load(),login=document.querySelector('#login').value.trim(),password=document.querySelector('#password').value,error=document.querySelector('#loginError');
  const account=d.users.find(x=>x.login===login);
  if(account&&!account.active){error.textContent='To konto jest nieaktywne. Skontaktuj się z administratorem.';return}
  if(!account||account.password!==password){error.textContent='Nieprawidłowy login lub hasło.';return}
  d.session=account.id;save(d);location.href='app.html';
});
