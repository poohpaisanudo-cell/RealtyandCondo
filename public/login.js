(function(){
  const LS_USERS = 'hc_users';
  const LS_AUTH = 'hc_auth';

  // Create modals HTML (if not present) and wire events
  function createModals() {
    if (!document.getElementById('loginModal')) {
      const html = `
<div id="loginModal" class="login-modal" aria-hidden="true" role="dialog">
  <div class="login-panel" role="document">
    <button class="login-close" id="loginClose" aria-label="ปิด">✕</button>
    <h3 id="loginTitle">เข้าสู่ระบบ</h3>
    <p class="help">เข้าสู่ระบบเพื่อดูรายละเอียดประกาศ</p>
    <form id="loginForm" class="login-form" autocomplete="on" novalidate>
      <div class="input-group">
        <label for="loginEmail">อีเมล</label>
        <input id="loginEmail" name="email" type="email" required placeholder="you@example.com" />
      </div>
      <div class="input-group">
        <label for="loginPassword">รหัสผ่าน</label>
        <input id="loginPassword" name="password" type="password" required placeholder="รหัสผ่าน" />
      </div>
      <div class="login-actions">
        <label style="display:flex;align-items:center;gap:8px;font-size:0.9rem;color:var(--muted)"><input type="checkbox" id="rememberMe"> จดจำฉัน</label>
        <div style="display:flex;gap:8px">
          <button type="button" class="btn-ghost" id="openRegister">สมัครสมาชิก</button>
          <button type="submit" class="btn-login">เข้าสู่ระบบ</button>
        </div>
      </div>
      <div class="form-error" id="loginError" role="alert"></div>
    </form>
  </div>
</div>

<div id="registerModal" class="login-modal" aria-hidden="true" role="dialog">
  <div class="login-panel" role="document">
    <button class="login-close" id="registerClose" aria-label="ปิด">✕</button>
    <h3>สมัครสมาชิก</h3>
    <p class="help">ลงทะเบียนเพื่อใช้งาน (demo)</p>
    <form id="registerForm" class="login-form" autocomplete="on" novalidate>
      <div class="input-group">
        <label for="regName">ชื่อ</label>
        <input id="regName" name="name" type="text" required placeholder="ชื่อของคุณ" />
      </div>
      <div class="input-group">
        <label for="regEmail">อีเมล</label>
        <input id="regEmail" name="email" type="email" required placeholder="you@example.com" />
      </div>
      <div class="input-group">
        <label for="regPassword">รหัสผ่าน</label>
        <input id="regPassword" name="password" type="password" required placeholder="รหัสผ่าน" />
      </div>
      <div style="display:flex;justify-content:space-between;align-items:center;margin-top:6px">
        <button type="button" class="btn-ghost" id="openLoginFromReg">กลับไปล็อกอิน</button>
        <button type="submit" class="btn-login">สมัคร</button>
      </div>
      <div class="form-error" id="registerError" role="alert"></div>
    </form>
  </div>
</div>
`;
      document.body.insertAdjacentHTML('beforeend', html);
    }
  }

  function $(id){ return document.getElementById(id); }

  // Users helpers (mock)
  function loadUsers(){
    try { return JSON.parse(localStorage.getItem(LS_USERS) || '[]') || []; } catch(e){ return []; }
  }
  function saveUsers(users){ localStorage.setItem(LS_USERS, JSON.stringify(users)); }
  function findUserByEmail(email){ return loadUsers().find(u=>u.email && u.email.toLowerCase()===email.toLowerCase()); }

  // Session helpers
  function saveSession(obj, remember){
    const s = JSON.stringify(obj);
    if (remember) localStorage.setItem(LS_AUTH, s);
    else sessionStorage.setItem(LS_AUTH, s);
  }
  function clearSession(){ localStorage.removeItem(LS_AUTH); sessionStorage.removeItem(LS_AUTH); }
  function loadSession(){
    try { return JSON.parse(sessionStorage.getItem(LS_AUTH) || localStorage.getItem(LS_AUTH) || 'null'); } catch(e){ return null; }
  }

  // UI show/hide
  function openModal(id){ const el=$(id); if(!el) return; el.classList.add('active'); el.setAttribute('aria-hidden','false'); }
  function closeModal(id){ const el=$(id); if(!el) return; el.classList.remove('active'); el.setAttribute('aria-hidden','true'); }

  // Render header auth area
  function renderAuthArea(){
    const authArea = $('auth-area');
    if(!authArea) return;
    const session = loadSession();
    if(session && session.user){
      authArea.innerHTML = `
        <div class="user-dropdown" id="userDropdown">
          <div class="user-badge" id="userBadge">
            <div class="avatar">${(session.user.name||session.user.email||'U').slice(0,1).toUpperCase()}</div>
            <div class="user-name" style="font-weight:600">${session.user.name||session.user.email}</div>
          </div>
          <div class="user-menu" id="userMenu">
            <a href="#profile">โปรไฟล์</a>
            <a href="#my-listings">ประกาศของฉัน</a>
            <button id="btn-logout">ออกจากระบบ</button>
          </div>
        </div>
      `;
      const dropdown = $('userDropdown');
      const badge = $('userBadge');
      if(badge) badge.addEventListener('click', ()=> dropdown.classList.toggle('open'));
      const logoutBtn = $('btn-logout');
      if(logoutBtn) logoutBtn.addEventListener('click', ()=>{ clearSession(); renderAuthArea(); if(typeof Auth.onLogout==='function') Auth.onLogout(); });
    } else {
      authArea.innerHTML = `<button id="btn-open-login" class="Signin menu-toggle" aria-label="login">Sign in</button>`;
      const btn = $('btn-open-login'); if(btn) btn.addEventListener('click', ()=> openModal('loginModal'));
    }
  }

  // Public Auth object
  const Auth = {
    isLoggedIn(){ return !!loadSession(); },
    getUser(){ const s = loadSession(); return s && s.user ? s.user : null; },
    requireAuth(cb){
      if (this.isLoggedIn()) { cb && cb(); return; }
      // store pending callback and open login modal
      pendingCallback = cb;
      openModal('loginModal');
    },
    logout(){ clearSession(); renderAuthArea(); if(typeof Auth.onLogout==='function') Auth.onLogout(); }
  };

  // pending callback invoked after successful login/register
  let pendingCallback = null;

  // wire up forms and events
  function wire() {
    createModals();

    // open/close
    const openLoginBtn = $('btn-open-login'); if(openLoginBtn) openLoginBtn.addEventListener('click', ()=> openModal('loginModal'));
    const loginClose = $('loginClose'); if(loginClose) loginClose.addEventListener('click', ()=> closeModal('loginModal'));
    const regClose = $('registerClose'); if(regClose) regClose.addEventListener('click', ()=> closeModal('registerModal'));

    // switch to register
    const openRegister = $('openRegister'); if(openRegister) openRegister.addEventListener('click', ()=>{ closeModal('loginModal'); openModal('registerModal'); });
    const openLoginFromReg = $('openLoginFromReg'); if(openLoginFromReg) openLoginFromReg.addEventListener('click', ()=>{ closeModal('registerModal'); openModal('loginModal'); });

    // login submit
    const loginForm = $('loginForm');
    if(loginForm) loginForm.addEventListener('submit', (ev)=>{
      ev.preventDefault();
      const email = (loginForm.email.value || '').trim();
      const password = (loginForm.password.value || '');
      const remember = !!$('rememberMe') && $('rememberMe').checked;
      const err = $('loginError'); if(err){ err.classList.remove('active'); err.textContent=''; }

      if(!email || !password){ if(err){ err.textContent='กรุณากรอกอีเมลและรหัสผ่าน'; err.classList.add('active'); } return; }

      // Mock auth: check users list
      const user = findUserByEmail(email);
      if(user && user.password === password){
        const session = { user: { email: user.email, name: user.name }, token: 'demo-token' };
        saveSession(session, remember);
        renderAuthArea();
        closeModal('loginModal');
        if(pendingCallback){ pendingCallback(); pendingCallback = null; }
        return;
      }

      // fallback: allow special hardcoded test account
      if(email === 'user@example.com' && password === 'password'){
        const session = { user: { email: email, name: 'ผู้ใช้' }, token: 'demo-token' };
        saveSession(session, remember);
        renderAuthArea();
        closeModal('loginModal');
        if(pendingCallback){ pendingCallback(); pendingCallback = null; }
        return;
      }

      if(err){ err.textContent='อีเมลหรือรหัสผ่านไม่ถูกต้อง'; err.classList.add('active'); }
    });

    // register submit
    const regForm = $('registerForm');
    if(regForm) regForm.addEventListener('submit', (ev)=>{
      ev.preventDefault();
      const name = (regForm.name.value || regForm.regName && regForm.regName.value || '').trim() || (regForm.regName ? regForm.regName.value.trim() : '');
      const email = (regForm.email.value || regForm.regEmail && regForm.regEmail.value || '').trim();
      const password = (regForm.password.value || regForm.regPassword && regForm.regPassword.value || '');
      const err = $('registerError'); if(err){ err.classList.remove('active'); err.textContent=''; }

      if(!email || !password || !name){ if(err){ err.textContent='กรุณากรอกข้อมูลให้ครบ'; err.classList.add('active'); } return; }
      if(findUserByEmail(email)){ if(err){ err.textContent='อีเมลนี้มีผู้ใช้งานแล้ว'; err.classList.add('active'); } return; }

      const users = loadUsers();
      users.push({ email, password, name });
      saveUsers(users);

      // auto-login after registration
      const session = { user: { email, name }, token: 'demo-token' };
      saveSession(session, true);
      renderAuthArea();
      closeModal('registerModal');
      if(pendingCallback){ pendingCallback(); pendingCallback = null; }
    });

    // click outside to close modals
    document.addEventListener('click', (e)=>{
      const lm = $('loginModal'); if(lm && lm.classList.contains('active')){ if(e.target === lm) closeModal('loginModal'); }
      const rm = $('registerModal'); if(rm && rm.classList.contains('active')){ if(e.target === rm) closeModal('registerModal'); }
    });

    // esc to close
    document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape'){ closeModal('loginModal'); closeModal('registerModal'); } });

    // initial hook for existing button
    const btn = $('btn-open-login'); if(btn) btn.addEventListener('click', ()=> openModal('loginModal'));
  }

  // Social login configurations
  const config = {
      google: {
          client_id: 'YOUR_GOOGLE_CLIENT_ID',
          redirect_uri: 'YOUR_REDIRECT_URI'
      },
      facebook: {
          app_id: 'YOUR_FACEBOOK_APP_ID',
          redirect_uri: 'YOUR_REDIRECT_URI'
      },
      line: {
          channel_id: 'YOUR_LINE_CHANNEL_ID',
          redirect_uri: 'YOUR_REDIRECT_URI'
      }
  };

  // Handle Google Login
  function loginWithGoogle() {
      const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?
          client_id=${config.google.client_id}&
          redirect_uri=${config.google.redirect_uri}&
          response_type=code&
          scope=email profile`;
      
      window.location.href = googleAuthUrl;
  }

  // Handle Facebook Login
  function loginWithFacebook() {
      FB.init({
          appId: config.facebook.app_id,
          cookie: true,
          xfbml: true,
          version: 'v12.0'
      });

      FB.login((response) => {
          if (response.authResponse) {
              console.log('Facebook login successful');
              // Handle successful login
          }
      }, {scope: 'email'});
  }

  // Handle LINE Login
  function loginWithLine() {
      const lineAuthUrl = `https://access.line.me/oauth2/v2.1/authorize?
          response_type=code&
          client_id=${config.line.channel_id}&
          redirect_uri=${config.line.redirect_uri}&
          state=YOUR_STATE&
          scope=profile openid email`;
      
      window.location.href = lineAuthUrl;
  }

  // Handle form login
  async function handleFormLogin(email, password) {
      try {
          const response = await fetch('/api/login', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({ email, password })
          });

          if (response.ok) {
              const data = await response.json();
              // Store auth token
              localStorage.setItem('auth_token', data.token);
              window.location.href = '/condo.html';
          } else {
              throw new Error('Login failed');
          }
      } catch (error) {
          console.error('Login error:', error);
          alert('เข้าสู่ระบบไม่สำเร็จ กรุณาลองใหม่อีกครั้ง');
      }
  }

  // Initialize
  createModals();
  wire();
  renderAuthArea();

  // expose Auth globally
  window.Auth = Auth;

})();
