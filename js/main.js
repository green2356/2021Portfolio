$(function() {
    var winWidth = $(window).width();
    if(winWidth >= 1024) {
        // fullpage
        $('#fullpage').fullpage({
            menu: '#menu',
            anchors: ['Intro', 'About', 'Portfolio', 'Design', 'Contact'],
            navigation: true,
            navigationPosition: 'left',
            navigationTooltips: ['Intro', 'About', 'Portfolio', 'Design', 'Contact'],
            showActiveTooltip: true,
            afterLoad:function(anchorLink, index, direction) {
                // 2번째 세션에 자식 콘텐츠에 액티브 설정
                if (index == 1) {
                    $('.s2 .box > div').removeClass('active');
                    setTimeout(barStop, 100);
                    $('.s3 .box .swiper').removeClass('active');
                    $('.s4 .box .design ul li').removeClass('active');
                }
                if (index == 2) {
                    $('.s2 .box > div').addClass('active');
                    // 1초 후 barAnimation 함수 호출 (1번 실행)
                    setTimeout(barAnimation, 1500);
                    $('.s3 .box .swiper').removeClass('active');
                    $('.s4 .box .design ul li').removeClass('active');
                }
                if (index == 3) {
                    $('.s2 .box > div').removeClass('active');
                    setTimeout(barStop, 100);
                    $('.s3 .box .swiper').addClass('active');
                    $('.s4 .box .design ul li').removeClass('active');
                }
                if (index == 4) {
                    $('.s2 .box > div').removeClass('active');
                    setTimeout(barStop, 100);
                    $('.s3 .box .swiper').removeClass('active');
                    $('.s4 .box .design ul li').addClass('active');
                    $('.s4 .box .design ul li').each(function() {
                        var second = $(this).index()*0.1; // 0 ~ 2 사이의 실수
                        $(this).css('transition-delay', second + 's');
                    });
                }
                if (index == 5) {
                    $('.s2 .box > div').removeClass('active');
                    setTimeout(barStop, 100);
                    $('.s3 .box .swiper').removeClass('active');
                    $('.s4 .box .design ul li').removeClass('active');
                }
            }
        })
    }

    // intro
    var typingBool = false; 
var typingIdx=0; 
var liIndex = 0;
var liLength = $(".typing-mid-txt>ul>li").length;
var del = -1;
var repeatInt= null;
var tyInt = null;


// 타이핑될 텍스트를 가져온다 
var typingTxt = $(".typing-mid-txt>ul>li").eq(liIndex).text(); 

typingTxt=typingTxt.split(""); // 한글자씩 자른다. 

if(typingBool==false){ 
    // 타이핑이 진행되지 않았다면 
    typingBool=true; 
    tyInt = setInterval(typing,200); // 첫번재 반복동작 
} 
     
function typing(){ 
  if(typingIdx<typingTxt.length){ 
    // 타이핑될 텍스트 길이만큼 반복 
   $(".typing").append(typingTxt[typingIdx]); 
    // 한글자씩 이어준다. 
     typingIdx++; 
    if(typingIdx == typingTxt.length){
      //첫번째 단어가 써지면 1분쉰다.
        clearInterval(tyInt);
         setTimeout(function(){
           tyInt = setInterval(typing,200);
         },1000);
       }
   } else{ 
     
     //한문장이끝나면
       if(-typingTxt.length-1 < del ){
         //한글자씩 지운다.
          $(".typing").html(typingTxt.slice(0, del))
          del--;
       }else{
         if(liIndex >= liLength-1){
              liIndex=0;
         }else{
           liIndex++;
         }
         
         //변수초기화 
         typingIdx=0;
         del= -1;
         typingTxt = $(".typing-mid-txt>ul>li").eq(liIndex).text(); 
         
         //1분후 다음분장 타이핑 
         clearInterval(tyInt);
         setTimeout(function(){
           tyInt = setInterval(typing,200);
         },1000);
       }
     

    } 
}  

    
    // skill bar
    function barAnimation() {
        $(".bar").each(function(){
            $(this).find(".bar-inner").animate({
                width: $(this).attr("data-width")
            },2000)
        });
    }

    function barStop() {
        $(".bar").each(function(){
            $(this).find(".bar-inner").animate({
                width: 0
            },2000)
        });
    }

    // swiper (Portpolio)
    var swiper = new Swiper(".mySwiper", {
        loop: true,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });


    $(function(){
        var gall=$('.line_gallery');
        var gallBox=$('.line_gallery .line_gallery_box');
        var gallHeight=gallBox.find('.item').height();
        var item=gallBox.find('.item');
        var gallNum=0;
        var gallTotal=item.length;
        var timer=null;
        //console.log(gallTotal);
        //gallBox.css('top',-gallHeight);
        gallBox.find('.line:nth-child(2) .item').css('opacity',1);
    
        setTimeout(timerfn,5000);
        function timerfn(){
            gallMove();
            timer=setTimeout(timerfn,5000);
        }
        function gallMove(){       
            gallBox.animate({'top':'-='+gallHeight}, 700, function(){
                gallBox.find('.line').first().appendTo(gallBox);
                gallBox.css('top',0);
                gallBox.find('.line .item').css('opacity',0.3);
                gallBox.find('.line:nth-child(2) .item').css('opacity',1);
            });        
        }
        gall.mouseover(function(){
            clearTimeout(timer);
        });
        gall.mouseout(function(){
            timer=setTimeout(timerfn,1000);
        });
        item.click(function(){
            var itemData=$(this).attr('data');
            gallNum=itemData;
            console.log(itemData);
            $('.popup .container').append('<img src="img/gallery'+itemData+'.jpg">');
            $('.popup').show();
            $('.popup .container').fadeIn();
        });
        $('.popup_prev').click(function(){
            gallNum--;
            if(gallNum<1){
                gallNum=gallTotal;
            }
            $('.popup .container').empty();
            $('.popup .container').append('<img src="img/gallery'+gallNum+'.jpg">');
            $('.popup').show();
            $('.popup .container').fadeIn();
        });
        $('.popup_next').click(function(){
            gallNum++;
            if(gallNum>gallTotal){
                gallNum=1;
            }
            $('.popup .container').empty();
            $('.popup .container').append('<img src="img/gallery'+gallNum+'.jpg">');
            $('.popup').show();
        });
        $('.popup_close').click(function(){
            $('.popup .container').empty();
            $('.popup').hide();
        });
    });
    
});
