window.onload = function(){
    
    // 메뉴 슬라이드 버튼
    const menu_slide_btn = document.querySelector('.menu_slide_btn');
    if(menu_slide_btn){
        menu_slide_btn.addEventListener('click', function(e) {
            e.preventDefault();
            this.parentNode.parentNode.parentNode.classList.toggle('on');
        });
    }

    // nav
    const buttons = document.querySelectorAll('.acc_btn');
    buttons.forEach(function(button, index) {
        button.addEventListener('click', function() {
            this.parentNode.classList.toggle('on');
            buttons.forEach(function(button2, index2) {
                if ( index !== index2 ) {
                    button2.parentNode.classList.remove('on');
                }
            });
        });
    });

    // 팝업
    const body = document.querySelector('body');
    let target = document.querySelectorAll('.pop_open');
    let btnPopClose = document.querySelectorAll('.pop_close');
    let targetID;

    // 팝업 열기
    for(let i = 0; i < target.length; i++){
        target[i].addEventListener('click', function(){
            targetID = this.getAttribute('data-target');
            document.querySelector(targetID).style.display = 'flex';
            body.style.overflow = 'hidden';
        });
    }
    
    // 팝업 닫기
    for(let j = 0; j < btnPopClose.length; j++){
        btnPopClose[j].addEventListener('click', function(){
            this.parentNode.parentNode.parentNode.parentNode.parentNode.style.display = 'none';
            body.style.overflow = '';
        });
    }

    // 커스텀 select
    const label = document.querySelectorAll('.label');
    let sel;
    label.forEach(function(lb){
        lb.addEventListener('click', e => {
            let optionList = lb.nextElementSibling;
            let optionItems = optionList.querySelectorAll('.opt_item');
            clickLabel(lb, optionItems);
        })
    });
    const clickLabel = (lb, optionItems) => {
        if(lb.parentNode.classList.contains('on')) {
            lb.parentNode.classList.remove('on');
            optionItems.forEach((opt) => {
                opt.removeEventListener('click', () => {
                    handleSelect(lb, opt)
                })
            })
        } else {
            lb.parentNode.classList.add('on');
            optionItems.forEach((opt) => {
                opt.addEventListener('click', () => {
                    handleSelect(lb, opt)
                })
            })
            return sel = true;
        }
    }
    const handleSelect = (label, item) => {
        label.firstChild.innerHTML = item.textContent;
        label.parentNode.classList.remove('on');
    }

    // 로그인 패스워드 보기
    const login_pw_eyebtn = document.querySelectorAll('.ico_eye');
    if(login_pw_eyebtn){
        for(i = 0; i < login_pw_eyebtn.length; i++){
            login_pw_eyebtn[i].addEventListener('click', function() {
                const previnp = this.previousSibling.previousSibling;
                console.log(previnp);
                if(previnp.getAttribute('type') === 'password'){
                    previnp.setAttribute('type', 'text');
                    this.classList.add('on')
                } else {
                    previnp.setAttribute('type', 'password');
                    this.classList.remove('on')
                }
            });
        }
        
    }
    
    // 파일업로드
    const file_inp_g = document.querySelectorAll('.file_inp');
    for(i = 0; i < file_inp_g.length; i++){
        // const file_inp = document.querySelector('.file_inp');
        const file_inp = file_inp_g[i];
        file_inp.addEventListener('change', function(){
            let fileList;
            for(i = 0; i < file_inp.files.length; i++){
                fileList = file_inp.files[i].name;
            }
            const file_txt = file_inp.nextSibling.nextSibling;
            file_txt.value = fileList;
        });
    }
    
}

// 로딩 open
function loading_open(){
    const loading_g = document.querySelector('body').insertAdjacentHTML('afterend',
        `<div class="loading_box">
            <div class="loading"></div>
            <div class="loading-text">loading</div>
        </div>`
    );
}
// 로딩 close
function loading_close(){
    const close_true = document.querySelector('.loading_box');
    if(close_true){
        close_true.remove();
    }
}


// 셀렉박스
$(closeIcon).on('click', function() {
    this.toggleClass('active');
    $list.toggle();
});

$(closeIcon).hover(function() {
  $container.addClass('hover');
}, function() {
  $container.removeClass('hover');
});


$links.on('click', function() {
  $links.removeClass('active');
  
    $(this).addClass('active');
  $text.text($(this).text()).addClass('fade');
  
  setTimeout(function(){
    $text.removeClass('fade');
  }, 800);
  
  $list.toggle();
  closeIcon.toggleClass('active');
});


var xmlns = "http://www.w3.org/2000/svg",
  xlinkns = "http://www.w3.org/1999/xlink",
  select = function(s) {
    return document.querySelector(s);
  },
  selectAll = function(s) {
    return document.querySelectorAll(s);
  },
  dotPos = {
    x: 0,
    y: 304
  },
  allMenus = selectAll('.menuItem'),
  allMenuHits = selectAll('.menuHit'),
  allMenuPosArray = [],
  oldId = 0,
  currentId = 1,
  iconObj = []

TweenMax.set('svg', {
  visibility: 'visible'
})

function setUI() {
  for (var i = 0; i < allMenus.length; i++) {
    var menu = allMenus[i];
    menu.setAttribute('menuId', i);
    menu.onclick = onMenuClick;
    allMenuPosArray.push({
      x: Number(select('#menuDot' + i).getAttribute('cx')),
      y: Number(select('#menuDot' + i).getAttribute('cy'))
    })
    var icon = selectAll('#dimIconGroup path')[i];
    var fill = selectAll('.selectionDot')[i].getAttribute('fill');
    console.log(fill)
    iconObj.push({
      icon: icon,
      fill: fill
    })
  }

  onMenuClick({
    currentTarget: allMenus[0]
  })
}

function onMenuClick(e) {

  oldId = currentId;

  if (oldId == Number(e.currentTarget.getAttribute('menuId'))) {
    return
  }
  currentId = (e) ? Number(e.currentTarget.getAttribute('menuId')) : currentId;

  if (e) {
    TweenMax.from(e.currentTarget, 1, {
      //scale:0.39,
      transformOrigin: '50% 50%'
    })
    TweenMax.fromTo(allMenuHits[currentId], 1, {
        alpha: 0.3,
        scale: 1
      }, {
        alpha: 0,
        scale: 0.85,
        transformOrigin: '50% 50%'
      })
      /*     TweenMax.fromTo(iconObj[oldId].icon, 1, {
            fill:iconObj[oldId].fill
          },{
            fill:'#9387A9',
            ease:Power2.easeIn
          })  */
  }

  //animates the masked, coloured selection dots
  var tl = new TimelineMax();
  tl.to('.selectionDot', 0.5, {
      scale: 0.6,
      transformOrigin: '50% 50%',
      ease: Power2.easeIn
    })
    .to('.selectionDot', 0.5, {
      x: allMenuPosArray[currentId].x,
      //ease:Elastic.easeOut.config(0.6, 0.8)
      ease: Circ.easeInOut
    }, '-=0.25')
    .to('.selectionDot', 0.9, {
      scale: 1,
      transformOrigin: '50% 50%',
      ease: Elastic.easeOut.config(0.6, 0.8)
    }, '-=0.25')

  //turns the pointer on and off
  TweenMax.staggerTo(allMenus, 0, {
    cycle: {

      cursor: function(i) {

        return (i == currentId) ? 'auto' : 'pointer'
      }
    }
  }, 0)

  TweenMax.staggerTo(selectAll('#dimIconGroup path'), 0.6, {
    cycle: {
      fill: function(i) {

        return (i == currentId) ? '#FFF' : '#9387A9'
      },
      scale: function(i) {

        return (i == currentId) ? 1.2 : 0.8
      },
      duration: function(i) {

        return (i == currentId) ? 1.4 : 0.2
      },
      ease: function(i) {

        return (i == currentId) ? Power4.easeInOut : Linear.easeNone
      }
    },
    transformOrigin: '50% 50%'
  }, 0)
}

setUI();
TweenMax.globalTimeScale(1.2)