const $ = (s) => document.querySelector(s);

const menuBtn = $('#menuBtn'), mmenu = $('#mmenu');
menuBtn?.addEventListener('click', () => mmenu.classList.toggle('open'));
mmenu?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mmenu.classList.remove('open')));

const io = new IntersectionObserver((es) => {
  es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Quiz minimalista -> WhatsApp
const WA = 'https://wa.me/5500090000002?text=';
const steps = [
  { q: 'Qual seu objetivo principal?', opts: ['Engrossar pernas', 'Aumentar glúteos', 'Definir o corpo', 'Tudo isso'] },
  { q: 'Como está sua rotina hoje?', opts: ['Nunca treinei', 'Treino em outro lugar', 'Parei e quero voltar', 'Treino em casa'] },
  { q: 'Quantos dias pode treinar?', opts: ['2 dias', '3 dias', '4 dias', '5 ou mais'] },
];
let qi = 0; const ans = [];
const qQ = $('#qQ'), qO = $('#qOpts'), qS = $('#qStep');
function render() {
  if (qi >= steps.length) {
    const [obj, rot, freq] = ans;
    const plano = (freq === '5 ou mais' || obj === 'Tudo isso') ? 'Semestral (R$130/mês)' : freq === '2 dias' ? 'Mensal (R$150)' : 'Trimestral (R$140/mês)';
    const msg = `Olá! Fiz o teste do site. Objetivo: ${obj} | Rotina: ${rot} | Dias: ${freq}. Recomendação: ${plano}. Quero agendar minha aula experimental. Meu nome: `;
    qS.textContent = 'Resultado';
    qQ.textContent = `Recomendado: ${plano}`;
    qO.innerHTML = `<p class="muted" style="font-size:.92rem">Protocolo de pernas e glúteos + acompanhamento, com aula experimental gratuita.</p><a class="btn btn-dark" style="width:100%" href="${WA + encodeURIComponent(msg)}" target="_blank" rel="noopener">Agendar no WhatsApp</a><button id="rq" style="background:none;border:0;text-decoration:underline;color:var(--muted);cursor:pointer;font-size:.82rem">refazer</button>`;
    $('#rq').onclick = () => { qi = 0; ans.length = 0; render(); };
    return;
  }
  qS.textContent = `${qi + 1} / 3`;
  qQ.textContent = steps[qi].q;
  qO.innerHTML = '';
  steps[qi].opts.forEach(o => {
    const b = document.createElement('button');
    b.textContent = o;
    b.onclick = () => { ans[qi] = o; qi++; render(); };
    qO.appendChild(b);
  });
}
render();
