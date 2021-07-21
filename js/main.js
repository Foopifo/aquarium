$(document).ready(function(){
    //접속한 기기의 가로크기가 480초과면 .menu영역이 보이고, 480이하면 .menu영역을 숨김
   var winWidth=$(window).width();
   if (winWidth>480){
       //pc.ver
       $('header nav').show();
       $('.mo_menu').hide();
   }else{
       //모바일.ver
       $('header nav').hide();
       $('.mo_menu').hide();
   }


    // sitemap
    $('.sitemap').hide();
    $('.M_btn').click(function(){
        $('.sitemap').fadeIn();
    });
    $('.site_close').click(function(){
        $('.sitemap').fadeOut();
    });

    // main slide
    var num=0;
    // ieft img의 갯수를 읽어 변수total에 저장
    var total=$('.photo').length;
    // 이미지높이를 읽어서 변수imgHight에 저장
    var imgHeight=$('.photo').height();
    console.log(imgHeight);
    // left img 1번 보이기
    $('.photo').css('z-index',1);
    $('.p1').css('z-index',5);
    // center img 1번 보이기
    $('.small').hide();
    $('.small:first').show();
    // right txt 1번 보이기
    $('.txt').removeClass('active').hide();
    $('.txt:first').show().addClass('active');
    // number
    $('.number a').hide();
    $('.number a:first').show();

    // next.click > 왼쪽 이미지 위로 올라가기
    $('.next_btn').click(function(){
        // 145번 함수auto 소환. next_btn click => slide_bar 초기화
        clearInterval(auto);
        auto=setInterval(movefn,7000);
        barfn();

        num++;
        if(num>=total) {num=0;}
        console.log(num);
        // 왼쪽이미지 갯수만큼 반복
        $('.photo').each(function(){
            // 왼쪽 이미지의 index를 변수imgNum에 저장
            var imgNum=$(this).index();
            if(num==imgNum){
                // 모든 이미지 순서를 뒤로
                $('.photo').css('z-index',1);
                // imgNum의 index가 해당하는 이미지로 이동
                $(this).css({'top':imgHeight, 'z-index':5});
                $(this).animate({'top':0},700,"easeInOutExpo");
                $(this).prev().css('z-index',3);
            }
        });
        // center img 개수만큼 반복
        $('.small').each(function(){
            var centerNum=$(this).index();
            if(num==centerNum){
                // 모든 가운데 이미지 안보임
                $('.small').fadeOut();
                $(this).fadeIn();
            }
        });
        // txt animat
        $('.txt').each(function(){
            var txtNum=$(this).index();
            if(num==txtNum){
                $('.txt').removeClass('active').hide();
                $(this).show().addClass('active');
            }
        });
        // number 반복
        $('.number a').each(function(){
            var aNum=$(this).index();
            if(num==aNum){
                $('.number a').hide();
                $(this).show();
            }
        });
        
    });
    // prev.click
    $('.prev_btn').click(function(){
        // prev_btn > click => slide_bar 초기화
        clearInterval(auto);
        auto=setInterval(movefn,7000);
        barfn();

        num--;
        if(num<0) {num=total-1;}
        console.log(num);
        // 왼쪽이미지 갯수만큼 반복
        $('.photo').each(function(){
            // 왼쪽 이미지의 index를 변수imgNum에 저장
            var imgNum=$(this).index();
            if(num==imgNum){
                // 모든 이미지 순서를 뒤로
                $('.photo').css('z-index',2);
                // imgNum의 index가 해당하는 이미지로 이동
                $(this).css({'top':-imgHeight, 'z-index':5});
                $(this).animate({'top':0},700,"easeInOutExpo");
                $(this).next().css('z-index',3);
                $(this).prev().css('z-index',1);
            }
        });
        // center img 개수만큼 반복
        $('.small').each(function(){
            var centerNum=$(this).index();
            if(num==centerNum){
                // 모든 가운데 이미지 안보임
                $('.small').fadeOut();
                $(this).fadeIn();
            }
        });
         // txt animat
         $('.txt').each(function(){
            var txtNum=$(this).index();
            if(num==txtNum){
                $('.txt').removeClass('active').hide();
                $(this).show().addClass('active');
            }
        });
         // number 반복
         $('.number a').each(function(){
            var aNum=$(this).index();
            if(num==aNum){
                $('.number a').hide();
                $(this).show();
            }
        });
        
    });
    // slide auto play - 7s 
    var auto=setInterval(movefn, 7000);
    function movefn(){
        $('.next_btn').trigger('click');
        barfn();
    }
    // slide_bar > bar 가로길이 증가
   function barfn(){
       $('.bar').stop();
       $('.bar').css('width',0);
    //    slide_bar<bar의 가로길이가 길어짐
       $('.bar').animate({'width':'100%'},6500);
   }
    barfn();

    // .box 
    // .box_hover에 마우스오버시 box_move 이동
   $('.box ul li').mouseover(function(){
       // 0~50사이 무작위 수 발생
       var x=Math.ceil(Math.random()*50);
       var y=Math.ceil(Math.random()*50);
       $(this).find('.box_move').stop().animate({'left':x, 'top':y},1000);
   });

   // .box_btn click > 오른쪽 이미지가 이동
   var sw=0;
   //.box ul 길이/2의 값을 변수ulMove에 저장 Math.ceil로 소수점없앰
   var ulMove=Math.ceil($('.box ul').width()/2);
   $('.box_btn').click(function(e){
       e.preventDefault();
       if(sw==0){
        sw=1;
        $('.box_btn').css('background-position','left center');
        $('.box ul').stop().animate({left:-ulMove});
       }else{
        sw=0;
        $('.box_btn').css('background-position','right center');
        $('.box ul').stop().animate({left:0});
       }
   });

   // fullpage
   $('#fullpage').fullpage({
       //fullpage 사이드 동그라미 메뉴 사용
       navigation:true,
       navigationPosition:'left',
       navigationTooltips:['MAIN','FRIENDS','PLACE','EVENT'],
       showActiveTooltip:true,
       afterLoad:function(anchorLink, index, direction){
           //fullpage의 내용을 불러운 다음 function안의 명령어를 실행
           //매개변수 [anchorLink: 메뉴와 section연동 / index:section인덱스 번호, direction: 화면이 이동하는 방향]

           if(index==2 || index==4){
               $('header nav>ul>li').addClass('active');
           }
           if(index==1 || index==3){
               $('header nav>ul>li').removeClass('active');
           }
       },
       onLeave:function(index, nextIndex, direction){
           
        // section4에서 아래로 이동하면
           if(index==4 && nextIndex==5){
               $('header .menu').fadeOut();
               //header안의 menu가 사라짐
           }else{
               $('header .menu').fadeIn();
           }
       }
   });
   
   




















    
});