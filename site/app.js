(() => {
  const cards=[...document.querySelectorAll('.collection-grid .project-card')];
  const filters=[...document.querySelectorAll('[data-filter]')];
  const input=document.querySelector('#project-search');
  if(cards.length && input){
    const params=new URLSearchParams(location.search);
    let active=filters.some(b=>b.dataset.filter===params.get('filter'))?params.get('filter'):'All';
    input.value=params.get('q')||'';
    function update(){
      const query=input.value.toLowerCase().trim();let count=0;
      cards.forEach(card=>{const show=(active==='All'||card.dataset.categories.split('|').includes(active))&&card.dataset.search.includes(query);card.hidden=!show;if(show)count++;});
      document.querySelectorAll('[data-category-group]').forEach(group=>{group.hidden=![...group.querySelectorAll('.project-card')].some(c=>!c.hidden);});
      filters.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.filter===active)));
      document.querySelector('#results-count').textContent=`${count} ${count===1?'project':'projects'}`;
      document.querySelector('#no-results').hidden=count!==0;
      const next=new URLSearchParams();if(active!=='All')next.set('filter',active);if(input.value)next.set('q',input.value);
      try{history.replaceState(null,'',location.pathname+(next.size?'?'+next.toString():''));}catch(_){ }
    }
    filters.forEach(b=>b.addEventListener('click',()=>{active=b.dataset.filter;update();}));input.addEventListener('input',update);update();
  }
  const dialog=document.querySelector('#lightbox');
  if(dialog){
    let trigger;
    document.querySelectorAll('[data-full]').forEach(b=>b.addEventListener('click',()=>{trigger=b;const im=dialog.querySelector('img');im.src=b.dataset.full;im.alt=b.dataset.caption;dialog.querySelector('p').textContent=b.dataset.caption;dialog.showModal();document.body.classList.add('modal-open');}));
    dialog.querySelector('button').addEventListener('click',()=>dialog.close());
    dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close();});
    dialog.addEventListener('close',()=>{document.body.classList.remove('modal-open');if(trigger)trigger.focus();});
  }
})();
