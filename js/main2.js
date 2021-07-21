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
        if(winWidth>=1600){
            $('.sitemap').show();
        }else{
            $('.mo_menu').show();
        }
    });
    $('.site_close').click(function(){
        $('.sitemap').fadeOut();
    });
    // .mo_close click > .mo_menu 사라짐
    $('.mo_close').click(function(){
        $('.mo_menu').hide();
    });

    // .mo_nav 아코디언메뉴
    $('.mo_nav .sub').hide();
    $('.mo_nav>ul>li').click(function(){
        // 클릭한 메뉴에 active가 설정되어 있지 않으면 !=같지않다
        if($(this).attr('class') != 'active'){
            $('.mo_nav>ul>li').removeClass('active');
            $(this).addClass('active');
            // 모든 서브메뉴 숨김
            $('.mo_nav .sub').slideUp();
            // 클릭한 메뉴의 서브메뉴만 나타남
            $(this).find('.sub').slideToggle();

        // 클릭한 메뉴에 active가 설정되어 있으면
        }else{
            $(this).removeClass('active');
            $(this).find('.sub').slideUp();
        }
    });

    // main slide
    var num=0;
    // ieft img의 갯수를 읽어 변수total에 저장
    var total=$('.photo').length;
    // 이미지높이를 읽어서 변수imgHight에 저장
    var imgHeight=$('.photo').height();
    console.log(imgHeight);
    
    // 접속한 기기의 가로길이가 1600이상이면 양쪽 슬라이드 적용, 1600미만이면 모바일 슬라이드 적용
    
    if(winWidth>=1600){
        // pc.ver
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
            // 174번 함수auto 소환. next_btn click => slide_bar 초기화
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
        
    }else{
        // 모바일, 태블릿.ver

        var mo_num=0;
        var mo_total=$('.photo').length;
        var imgWidth=$('.photo').width();
        $('.photo').show();
        $('.small').show();

        //마지막 .photo이미지를 첫번째 이미지의 왼쪽에 배치
        $('.photo:last-child').prependTo('.left_img');

        //마지막 .small이미지를 첫번째 이미지의 왼쪽에 배치
        $('.small:last-child').prependTo('.center_img');

        //.left_img의 left값을 photo의 가로길이 만큼 왼쪽으로 이동
        $('.left_img').css('left',-imgWidth);

        //.center_img의 left값을 photo의 가로길이만큼 왼쪽으로 이동
        $('.center_img').css('left',-imgWidth);

        //.number a중 첫번째 a에 active설정
        $('.number a:first-child').addClass('active');

        //.right_txt의 txt중 첫번째 txt.active설정
        $('.right_txt .txt:first-child').addClass('active');

        // next_btn click
        $('.next_btn').click(function(){
            
            mo_num++;
            if(mo_num>=mo_total) {mo_num=0;}
            // mo_num에 해당하지 않는 number a의 active 제거
            $('.number a').eq(mo_num-1).removeClass('active');
            // mo_num에 해당되는 number a에 active 적용
            $('.number a').eq(mo_num).addClass('active');
            // mo_num에 해당안되는 .txt에 active 제거
            $('.txt').eq(mo_num-1).removeClass('active');
            // mo_num에 해당되는 .txt에 active 적용
            $('.txt').eq(mo_num).addClass('active');

            // '-='+imgWidth => 왼쪽으로 photo의 가로길이만큼 이동
            $('.left_img').animate({left:'-='+imgWidth},700,'easeOutExpo',
                function(){
                //.left_img가 이동하고 첫번째 photo가 .left_img영역 맨뒤로 추가
                $('.photo:first-child').appendTo('.left_img')
                $('.left_img').css('left',-imgWidth);
            });
            $('.center_img').animate({left:'-='+imgWidth},700,'easeOutExpo',
            function(){
                //.center_img 이동하고 첫번째 small이 .center_img 맨뒤로 추가
                $('.small:first-child').appendTo('.center_img')
                $('.center_img').css('left',-imgWidth);
            });
        });
        // prev_btn click
        $('.prev_btn').click(function(){
            
            mo_num--;
            if(mo_num<0) {mo_num=mo_total-1;}
            // :not()매서드는 ()안의 조건의 반대가 되는 객체 선택자
            $('.number a:not(:eq(mo_num))').removeClass('active');
            // mo_num에 해당되는 number a에 active 적용
            $('.number a').eq(mo_num).addClass('active');

            // :not()매서드는 ()안의 조건의 반대가 되는 객체 선택자
            $('.txt:not(:eq(mo_num))').removeClass('active');
            // mo_num에 해당되는 .txt에 active 적용
            $('.txt').eq(mo_num).addClass('active');

            // '-='+imgWidth => 왼쪽으로 photo의 가로길이만큼 이동 * -= 는 왼쪽 += 는 오른쪽
            $('.left_img').animate({left:'+='+imgWidth},700,'easeOutExpo',
                function(){
                //.left_img가 이동하고 마지막 photo가 .left_img영역 맨앞으로 추가
                $('.photo:last-child').prependTo('.left_img')
                $('.left_img').css('left',-imgWidth);
            });
            $('.center_img').animate({left:'+='+imgWidth},700,'easeOutExpo',
            function(){
                //.center_img 이동하고 마지막 small이 .center_img 맨앞으로 추가
                $('.small:last-child').prependTo('.center_img')
                $('.center_img').css('left',-imgWidth);
            });
        }); // prev btn

        // mo_box slide
        var moWidth = $('.mo_box ul li').outerWidth();  
        // outerWidth() : padding, margin값 포함해서 width값 계산
        
        $('.mo_box ul li:last-child').prependTo('.mo_box ul');
        $('.mo_box ul').css('left',-moWidth);

        // 배열선언
        var startX={};
        var endX={};
        $('.mo_box ul').on({ // on/off * on('이벤트',function(){ 이벤트 연동 off는 끔 * on은 이벤트를 2개이상 설정가능
            // .mo_box ul에 touchstart 설정
            'touchstart':function(e){
                // e.touches[0] 터치이벤트가 발생한 객체
                // pageX 가로스크롤을 포함한 브라우저 화면을 기준으로한 x좌표
                startX=e.touches[0].pageX;
            },
            'touchmove':function(e){
                // touch가 끝난 지점 좌표X값을 endX에 저장
                endX=e.touches[0].pageX;
                // touch한 startX좌표에서 움직임이 끝난 endX좌표값을 빼서 fnX에 저장
                var fnX=startX-endX;

                if(fnX>0){
                    // left
                    $('.mo_box ul').stop().animate({'left':'-='+moWidth},700,'easeInExpo',function(){
                        $('.mo_box ul li:first-child').appendTo('.mo_box ul');
                        $('.mo_box ul').css('left',-moWidth);
                    });
                }else{
                    // right
                    $('.mo_box ul').stop().animate({'left':'+='+moWidth},700,'easeInExpo',function(){
                        $('.mo_box ul li:last-child').prependTo('.mo_box ul');
                        $('.mo_box ul').css('left',-moWidth);
                    });
                }
            }
        });
        var winHeight=$(document).height();
        $('.top').click(function(){
            $('html,body').animate({scrollTop:0});
        });
        
    
    
    }//if




        




    
});