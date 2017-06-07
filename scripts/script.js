$(function() {
    var controller = new ScrollMagic.Controller();
    var wipeAnimation = new TimelineLite()
        .to("#slideContainer", 1, { y: "-" + 1 / 3 * 100 + "%" })
        .to("#slideContainer", 1, { y: "-" + 2 / 3 * 100 + "%" });
    new ScrollMagic.Scene({
            triggerElement: "#pinContainer",
            triggerHook: "onLeave",
            duration: "300%"
        })
        .setPin("#pinContainer")
        .setTween(wipeAnimation)
        .addIndicators()
        .addTo(controller);
    var ticking = false,
        doOrNot = true,
        doOrNot2 = false,
        doOrNot3 = false,
        doOrNot4 = false,
        last_known_scroll_position = 0,
        triggerCord2 = $("#trigger2").offset().top,
        triggerCord3 = $("#trigger3").offset().top,
        triggerCord4 = $("#trigger4").offset().top;

    function doAnimation(scrollCoord) {
        var panelH = $(".panel.red").height();
        if (scrollCoord > triggerCord2 / 2 && scrollCoord < triggerCord3 / 2) {
            if (doOrNot) {
                var tween = TweenLite.fromTo("#slideContainer2", 3, { y: 0 }, { y: -panelH });

                doOrNot = false;
                doOrNot2 = true;
                doOrNot3 = true;
            }
        } else if (scrollCoord < triggerCord2) {
            if (doOrNot2) {
                var tween2 = TweenLite.fromTo("#slideContainer2", 3, { y: -panelH }, { y: 0 });
                doOrNot2 = false;
                doOrNot = true;
            }
        } else if (scrollCoord > triggerCord3 && scrollCoord < triggerCord4 - 330) {
            if (doOrNot3) {
                var tween3 = TweenLite.fromTo("#slideContainer2", 3, { y: -panelH }, { y: -2 * panelH });
                doOrNot3 = false;
                doOrNot4 = true;
            }
        } else if (scrollCoord < triggerCord4 - 330) {
            if (doOrNot4) {
                var tween4 = TweenLite.to("#slideContainer2", 3, { y: -panelH });
                doOrNot4 = false;
                doOrNot3 = true;
            }
        }
    }

    function doSomething(scroll_pos) {
        // console.log(scroll_pos);
        // console.log("cord 2 " + triggerCord2);
        // console.log("cord 2/2 " + triggerCord2 / 2);
        // console.log("cord 3 " + triggerCord3);
        // console.log("cord 3/2 " + triggerCord3 / 2);
        // console.log("cord 4 " + triggerCord4);
        // console.log("cord 4/2 " + triggerCord4 / 2);
        doAnimation(scroll_pos);
    }
    window.addEventListener('scroll', function(e) {
        last_known_scroll_position = window.scrollY;
        if (!ticking) {
            window.requestAnimationFrame(function() {
                doSomething(last_known_scroll_position);
                ticking = false;
            });
        }
        ticking = true;
    });
});
