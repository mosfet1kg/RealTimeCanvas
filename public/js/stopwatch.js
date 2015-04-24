
var __slice = Array.prototype.slice;
(function($){

    var Stopwatch;

    $.fn.stopwatch = function(){
        var stopwatch,
            key = arguments[0],
            args = arguments.length <=2 ? __slice.call(arguments, 1) : [];

        //console.log(this.get(0)); //현재 선택된 selector를 가지고 온다.
        if(this.length > 1){
            $.error("하나의 객체에만 적용이 가능합니다.");
            //$('#stopwatch, #stopwatch1').stopwatch(); 이런 방식으로 Multiple selector를 사용하는 경우를 방지한다.
        }

        stopwatch = this.data('stopwatch');

        if (typeof key === 'string' &&  stopwatch) {
            if ( stopwatch[key]) {
                if (typeof stopwatch[key] === 'function') {
                    console.log('case 1');
                    return stopwatch[key].apply(stopwatch, args);
                } else if (args.length === 0) {
                    console.log('case 2');
                    return stopwatch[key];
                } else if (args.length === 1) {
                    console.log('case 3');
                   return stopwatch[key] = args[0];
                }
            } else {
                return $.error('존재하지 않는 명렁어 입니다');
            }
        } else if (stopwatch) {
            return stopwatch;
        } else {
            this.data('stopwatch', new Stopwatch(this.get(0), key));
            console.log(key);
            return this;
            //stopwatch = this.data('stopwatch');
            //if( typeof stopwatch[key] === 'function' ){
            //    return stopwatch[key].apply(stopwatch, args);
            //}
            //else return $.error('존재하지 않는 명렁어 입니다');
        }


    };

    Stopwatch = (function() {
        var Stopwatch = function (element, options){
            this.s;
            this.settings = {
                stop: 0,
                sw: $(element),//$('#stopwatch'),
                mills: 0,
                secs: 0,
                mins: 0,
                times: ["00:00:00"]
            };
        };

        Stopwatch.prototype.init = function () {
            s = this.settings;
            s.sw.html(("0" + s.mins).slice(-2) + ":"
                + ("0" + s.secs).slice(-2) + ":"
                + ("0" + s.mills).slice(-2));
            s.stop = 1;
        };

        Stopwatch.prototype.restart = function () {
            console.log('shit');
        };

        Stopwatch.prototype.start = function () {
            s.stop = 0;
            this.timer();
        };

        Stopwatch.prototype.stop = function () {
            s.stop = 1;
        };

        Stopwatch.prototype.timer = function () {
            var start = new Date().getTime(),
                time = 0;

            function instance()
            {
                time += 10;

                if (s.stop === 0) {
                    if (s.mills === 100) {
                        s.secs++;
                        s.mills = 0;
                    }
                    if (s.secs === 60) {
                        s.mins++;
                        s.secs = 0;
                    }
                    s.mills++;
                    s.time++;

                    s.sw.html(("0" + s.mins).slice(-2) + ":"
                        + ("0" + s.secs).slice(-2) + ":"
                        + ("0" + s.mills).slice(-2));

                }

                var diff = (new Date().getTime() - start) - time;
                window.setTimeout(instance, (10 - diff));
            }
            window.setTimeout(instance, 10);

        };

        return Stopwatch;
    })();


    //Stopwatch.init();
})(jQuery);