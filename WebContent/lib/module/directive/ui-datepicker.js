/**
 * @author yelloxing
 * 2018-03-05
 *
 * 日期显示格式：yyyy-MM-dd
 * 日期数据格式：yyyyMMdd
 */
(function(window, angular, $$, undefined) {
    'use strict';
    var directive = {};
    directive.uiDatepicker = [
        '$compile', '$parse', '$filter',
        function($compile, $parse, $filter) {
            return {
                restrict: 'A',
                require: "?ngModel",
                link: function($scope, element, attrs, ctrl) {
                    element = $$(element[0]);
                    //显示样式
                    function showFormat(input) {
                        input = input || " ";
                        if (/^\d{4}-\d{2}-\d{2}$/.test(input)) {
                            //todo
                        } else if (/^\d{4}-\d{1}-\d{2}$/.test(input)) {
                            input = input.replace(/(\d{4})-(\d{1})-(\d{2})/, '$1-0$2-$3');
                        } else if (/^\d{4}-\d{2}-\d{1}$/.test(input)) {
                            input = input.replace(/(\d{4})-(\d{2})-(\d{1})/, '$1-$2-$3');
                        } else if (/^\d{4}-\d{1}-\d{1}$/.test(input)) {
                            input = input.replace(/(\d{4})-(\d{1})-(\d{1})/, '$1-$2-$3');
                        } else if (/\d{8}/) {
                            input = input.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3');
                        } else {
                            input = "";
                        }
                        return input;
                    }

                    //数据样式
                    function dataFormat(input) {
                        input = input || " ";
                        if (/^\d{4}-\d{2}-\d{2}$/.test(input)) {
                            //todo
                        } else if (/^\d{4}-\d{1}-\d{2}$/.test(input)) {
                            input = input.replace(/(\d{4})-(\d{1})-(\d{2})/, '$1-0$2-$3');
                        } else if (/^\d{4}-\d{2}-\d{1}$/.test(input)) {
                            input = input.replace(/(\d{4})-(\d{2})-(\d{1})/, '$1-$2-$3');
                        } else if (/^\d{4}-\d{1}-\d{1}$/.test(input)) {
                            input = input.replace(/(\d{4})-(\d{1})-(\d{1})/, '$1-$2-$3');
                        } else if (/\d{8}/) {
                            input = input.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3');
                        } else {
                            input = "";
                        }
                        return input;
                    }

                    //数据到试图的数据格式化
                    ctrl.$formatters.unshift(function(input) {
                        //判断错误问题
                        if (!input || /^\d{8}$/.test(input) || /^\d{4}-\d{2}-\d{2}$/.test(input)) {
                            //todo
                            ctrl.$setValidity('datepicker', true);
                        } else {
                            ctrl.$setValidity('datepicker', false);
                        }

                        //数据格式化部分
                        if (!input)
                            return input;
                        return showFormat(input);
                    });

                    //试图到数据的数据格式化
                    ctrl.$parsers.push(function(input) {
                        //判断错误问题
                        if (!input || /^\d{8}$/.test(input) || /^\d{4}-\d{2}-\d{2}$/.test(input)) {
                            //todo
                            ctrl.$setValidity('datepicker', true);
                        } else {
                            ctrl.$setValidity('datepicker', false);
                        }

                        //数据格式化部分
                        if (!input)
                            return input;
                        //View-model
                        return dataFormat(input);
                    });

                    /**
                     * 提前准备的工具方法
                     */
                    //获取元素位置
                    function getElementPosition(elem) {
                        var left = 0;
                        var top = 0;
                        top = elem.offsetTop;
                        left = elem.offsetLeft;
                        elem = elem.offsetParent;
                        while (elem) {
                            top += elem.offsetTop;
                            left += elem.offsetLeft;
                            elem = elem.offsetParent;
                        }
                        return {
                            "left": left,
                            "top": top
                        };
                    }
                    //获取十年的开始那一年
                    function goDecadeBegin(year) {
                        return (year + "").replace(/(\d{3})\d/, "$10");
                    }
                    //获取元素的高
                    function getElemHeight(node) {
                        return node.offsetHeight;
                    }
                    //获取元素的宽
                    function getElemWidth(node) {
                        return node.offsetWidth;
                    }
                    //计算二月多少天
                    function getFebruaryDay(yearNum) {
                        if ((yearNum % 4 == 0) && (yearNum % 100 != 0 || yearNum % 400 == 0)) {
                            return 29;
                        } else {
                            return 28;
                        }
                    }
                    //计算本月多少天
                    function getMonthDay(yearNum, month) {
                        var dayNum = monthDay[month];
                        if (dayNum == -1) {
                            dayNum = getFebruaryDay(yearNum);
                        }
                        return dayNum;
                    }
                    //计算本月第一天是星期几
                    function getBeginMonth(yearNum, month) {
                        var beginMonth = new Date(yearNum + "/" + (month - (-1)) + "/1").getDay();
                        if (beginMonth == 0) {
                            return 7;
                        }
                        return beginMonth;
                    }
                    /**
                     * 进入不同页面的方法
                     */
                    //十年界面选择年
                    function goDecadeView(year) {
                        year = goDecadeBegin(year);

                        var resultDate = '<div class="cursor">' +
                            '<div class="pre">Pre</div>' +
                            '<div class="title noclick">' + year + '年 - ' + (year - (-9)) + '年</div>' +
                            '<div class="next">Next</div>' +
                            '</div>';
                        resultDate += "<div class='monthlist'>" +
                            "<div class='nouse'>" + (year - 1) + "</div>" +
                            "<div  class='yearlist' val='" + year + "'>" + year + "</div>" +
                            "<div  class='yearlist' val='" + (year - (-1)) + "'>" + (year - (-1)) + "</div>" +
                            "<div  class='yearlist' val='" + (year - (-2)) + "'>" + (year - (-2)) + "</div>" +
                            "<div  class='yearlist' val='" + (year - (-3)) + "'>" + (year - (-3)) + "</div>" +
                            "<div  class='yearlist' val='" + (year - (-4)) + "'>" + (year - (-4)) + "</div>" +
                            "<div  class='yearlist' val='" + (year - (-5)) + "'>" + (year - (-5)) + "</div>" +
                            "<div  class='yearlist' val='" + (year - (-6)) + "'>" + (year - (-6)) + "</div>" +
                            "<div  class='yearlist' val='" + (year - (-7)) + "'>" + (year - (-7)) + "</div>" +
                            "<div  class='yearlist' val='" + (year - (-8)) + "'>" + (year - (-8)) + "</div>" +
                            "<div  class='yearlist' val='" + (year - (-9)) + "'>" + (year - (-9)) + "</div>" +
                            "<div class='nouse'>" + (year - (-10)) + "</div>" +
                            "</div>";
                        $$("#calendar-" + uniqueFlag).find(".view").html(resultDate);
                        $$("#calendar-" + uniqueFlag).find(".view").find('.pre').bind('click', function() {
                            element.focus();
                            goDecadeView(year - 10);
                        });
                        $$("#calendar-" + uniqueFlag).find(".view").find('.next').bind('click', function() {
                            element.focus();
                            goDecadeView(year - (-10));
                        });
                        var days = $$("#calendar-" + uniqueFlag).find(".view").find('.monthlist .yearlist');
                        var flag;
                        for (flag = 0; flag < days.length; flag++) {
                            (function(flag) {
                                $$(days[flag]).bind('click', function() {
                                    element.focus();
                                    var d = $$(days[flag]).attr("val");
                                    goYearView($$(days[flag]).attr("val"), -1);
                                });
                            })(flag);
                        }
                        //处理今天
                        $$("#calendar-" + uniqueFlag).find(".monthlist div[val='" + todayDateObj.year + "']").addClass('istoday');
                        if (hadPreDate) {
                            $$("#calendar-" + uniqueFlag).find(".monthlist div[val='" + preSelectDateObj.year + "']").addClass('isCheckDay');
                        }

                    }
                    //选择月份
                    function goYearView(year, month) {
                        var resultDate = "<div class='cursor'>" +
                            "<div class='pre'  val='" + (year - 1) + ")'>Pre</div>" +
                            "<div class='title'>" + year + "年" + "</div>" +
                            "<div class='next'  val='" + (year - (-1)) + ")'>Next</div>" +
                            "</div>";
                        resultDate += "<div class='monthlist'>" +
                            "<div val='1'>" + monthLan[0] + "</div>" +
                            "<div val='2'>" + monthLan[1] + "</div>" +
                            "<div val='3'>" + monthLan[2] + "</div>" +
                            "<div val='4'>" + monthLan[3] + "</div>" +
                            "<div val='5'>" + monthLan[4] + "</div>" +
                            "<div val='6'>" + monthLan[5] + "</div>" +
                            "<div val='7'>" + monthLan[6] + "</div>" +
                            "<div val='8'>" + monthLan[7] + "</div>" +
                            "<div val='9'>" + monthLan[8] + "</div>" +
                            "<div val='10'>" + monthLan[9] + "</div>" +
                            "<div val='11'>" + monthLan[10] + "</div>" +
                            "<div val='12'>" + monthLan[11] + "</div>" +
                            "</div>";
                        $$("#calendar-" + uniqueFlag).find(".view").html(resultDate);
                        $$("#calendar-" + uniqueFlag).find(".view").find('.pre').bind('click', function() {
                            element.focus();
                            goYearView(year - 1);
                        });
                        $$("#calendar-" + uniqueFlag).find(".view").find('.next').bind('click', function() {
                            element.focus();
                            goYearView(year - (-1));
                        });
                        $$("#calendar-" + uniqueFlag).find(".view").find('.title').bind('click', function() {
                            element.focus();
                            goDecadeView(year);
                        });
                        var days = $$("#calendar-" + uniqueFlag).find(".view").find('.monthlist>div');
                        var flag;
                        for (flag = 0; flag < days.length; flag++) {
                            (function(flag) {
                                $$(days[flag]).bind('click', function() {
                                    element.focus();
                                    goMonthView(year, $$(days[flag]).attr("val"), -1);
                                });
                            })(flag);
                        }
                        //处理今天
                        if (year == todayDateObj.year) {
                            $$("#calendar-" + uniqueFlag).find(".monthlist div[val='" + todayDateObj.month + "']").addClass('istoday');
                        }
                        if (hadPreDate && year == preSelectDateObj.year) {
                            $$("#calendar-" + uniqueFlag).find(".monthlist div[val='" + preSelectDateObj.month + "']").addClass('isCheckDay');
                        }
                    }
                    //选择天
                    function goMonthView(year, month, day) {
                        if (month > 12) {
                            month = 1;
                            year += 1;
                        } else if (month < 1) {
                            month = 12;
                            year -= 1;
                        }
                        //头部修改
                        var resultDate = '<div class="cursor">' +
                            '<div class="pre">Pre</div>' +
                            '<div class="title">' + monthLan[month - 1] + ' ' + year + '年</div>' +
                            '<div class="next">Next</div>' +
                            '</div>';
                        //日期修改
                        var dayNum = getMonthDay(year, month - 1);
                        var beginMonth = getBeginMonth(year, month - 1);
                        resultDate += "<div class='selectDay'>";
                        //头部
                        resultDate += "<div class='header'>" + weekLan[0] + "</div>";
                        resultDate += "<div class='header'>" + weekLan[1] + "</div>";
                        resultDate += "<div class='header'>" + weekLan[2] + "</div>";
                        resultDate += "<div class='header'>" + weekLan[3] + "</div>";
                        resultDate += "<div class='header'>" + weekLan[4] + "</div>";
                        resultDate += "<div class='header'>" + weekLan[5] + "</div>";
                        resultDate += "<div class='header'>" + weekLan[6] + "</div>";
                        var preMonthDays;
                        if (month == 1) {
                            preMonthDays = getMonthDay(year - 1, 11);
                        } else {
                            preMonthDays = getMonthDay(year, month - 2);
                        }
                        //前置空白
                        var preNum = 0;
                        for (; beginMonth > 1; beginMonth--) {
                            preNum = preNum + 1;
                            resultDate += "<div class='item nouse'>" + (preMonthDays - beginMonth - (-2)) + "</div>";
                        }

                        //选择条目
                        var flag = 1;
                        for (; flag <= dayNum; flag++) {
                            resultDate += "<div class='item day' val=" + flag + ">" + flag + "</div>";
                        }

                        //后置空白
                        var needNum = 42 - dayNum - preNum;
                        for (flag = 1; flag <= needNum; flag++) {
                            resultDate += "<div class='item nouse' val=" + flag + ">" + flag + "</div>";
                        }

                        resultDate += "</div>";
                        $$("#calendar-" + uniqueFlag).find(".view").html(resultDate);
                        $$("#calendar-" + uniqueFlag).find(".view").find('.pre').bind('click', function() {
                            element.focus();
                            goMonthView(year, month - 1);
                        });
                        $$("#calendar-" + uniqueFlag).find(".view").find('.next').bind('click', function() {
                            element.focus();
                            goMonthView(year, month - (-1));
                        });
                        $$("#calendar-" + uniqueFlag).find(".view").find('.title').bind('click', function() {
                            element.focus();
                            goYearView(year);
                        });
                        var days = $$("#calendar-" + uniqueFlag).find(".view").find('.item.day');
                        for (flag = 0; flag < days.length; flag++) {
                            (function(flag) {
                                $$(days[flag]).bind('click', function() {
                                    element.focus();
                                    doSelectDay(year, month, $$(days[flag]).text());
                                });
                            })(flag);
                        }
                        //处理今天
                        if (year == todayDateObj.year && month == todayDateObj.month) {
                            $$("#calendar-" + uniqueFlag).find(".selectDay .day[val='" + todayDateObj.day + "']").addClass('istoday');
                        }
                        if (hadPreDate && year == preSelectDateObj.year && month == preSelectDateObj.month) {
                            $$("#calendar-" + uniqueFlag).find(".selectDay .day[val='" + preSelectDateObj.day + "']").addClass('isCheckDay');
                        }

                    }
                    //确定选择日期
                    function doSelectDay(year, month, day) {
                        if (/^\d$/.test(month)) {
                            month = "0" + month;
                        }
                        if (/^\d$/.test(day)) {
                            day = "0" + day;
                        }
                        element.val(year + "-" + month + "-" + day);
                        element.trigger('change');
                        doCancel();
                    }
                    //隐藏日历控件
                    function doCancel() {
                        hadClick = false;
                        element.attr('readonly', false);
                        $$("#calendar-" + uniqueFlag).remove();
                        $$("#btn-calendar-" + uniqueFlag).removeClass("btn-calendar-active");
                    }

                    //由于数据格式可能输入有错，这里判断
                    function formatMayErrorCode(input) {
                        if (!input) {
                            return input;
                        } else if (/^\d{4}-\d{2}-\d{2}$/.test(input)) {
                            return input;
                        } else if (/^\d{8}$/.test(input)) {
                            return input.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3');
                        } else {
                            input = input.replace(/[^\d]/g, '');
                            if (/^\d{8}$/.test(input)) {
                                return input.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3');
                            } else if (/^\d{4}$/.test(input)) {
                                return input + "-01-01";
                            } else if (/^\d{6}$/.test(input)) {
                                input = input + "01";
                                return input.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3');
                            } else {
                                var nowDate = new Date();
                                return nowDate.getFullYear() + "-" + (nowDate.getMonth() - (-1)) + "-" + nowDate.getDate();
                            }
                        }
                    }

                    /**
                     * 钩子数据和全局数据
                     */
                    var monthDay = [31, -1, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
                    var monthLan = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
                    var weekLan = ['一', '二', '三', '四', '五', '六', '日'];
                    var currentDate; //当前日期
                    var inputWidth; //日期输入宽
                    var hadClick = false; //记录日历是否弹出来了
                    var uniqueFlag = new Date().valueOf() + "-" + (Math.floor(Math.random() * 100 - (-1)));
                    var isClickCalendar = false;
                    var preSelectDateObj = {};
                    var hadPreDate = false;
                    var todayDate = new Date();
                    var todayDateObj = {
                        "year": todayDate.getFullYear(),
                        "month": todayDate.getMonth() - (-1),
                        "day": todayDate.getDate()
                    };

                    //添加点击按钮，负责弹出日历控件
                    element.parent().prepend('<div id="btn-calendar-' + uniqueFlag + '" class="btn-calendar"><!--按钮--></div>');

                    //对按钮添加处理事件
                    var btnflag = $$("#btn-calendar-" + uniqueFlag);

                    function btnAddClick(btnflag) {
                        if (!btnflag.length || btnflag.length < 0) {
                            window.setTimeout(function() {
                                btnflag = $$("#btn-calendar-" + uniqueFlag);
                                btnAddClick(btnflag);
                            }, 50);
                        } else {
                            btnflag.bind('click', function() {
                                if (hadClick) {
                                    doCancel();
                                    element.attr('readonly', false);
                                    return;
                                }
                                $$("#btn-calendar-" + uniqueFlag).addClass("btn-calendar-active");
                                element.attr('readonly', true);
                                element.focus();
                                hadClick = true;
                                var postionInput = getElementPosition(element[0]);
                                var targetElem = $$('body');//具体可以修改这里获得更好的定位
                                var addNum = 0;
                                var postionTarget = getElementPosition(targetElem[0]);
                                var topScroll = postionTarget.top;
                                var leftScroll = postionTarget.left;
                                targetElem.prepend("<div id='calendar-" + uniqueFlag + "' class='calendar'><div class='help'></div><div class='view'></div><div class='today'>今天</div></div>");
                                $$("#calendar-" + uniqueFlag).css({
                                    "position": "absolute",
                                    "background-color": "rgb(255, 255, 255)",
                                    "top": (postionInput.top - (-getElemHeight(element[0]))) - topScroll - (-10) - (-addNum) + "px",
                                    "left": postionInput.left - leftScroll - (-addNum) + "px",
                                    "box-shadow": "rgb(130, 122, 118) 0px .14rem .24rem",
                                    "z-index": "7",
                                    "width": "3rem",
                                    "min-height": "1.00rem",
                                    "border": "1px solid #bebec8",
                                    "border-radius": ".07rem"
                                });

                                //初始化启动
                                var val = (element.val() + "").trim();
                                if (val) {
                                    hadPreDate = true;
                                    val = formatMayErrorCode(val);
                                }
                                //当前选择的数据，和下面的前一次不一样，这个会在点击过程被修改
                                currentDate = !val ? new Date() : new Date(val);

                                //前一次选择的日期记录，后面显示需要调用
                                preSelectDateObj = {
                                    "year": currentDate.getFullYear(),
                                    "month": currentDate.getMonth() - (-1),
                                    "day": currentDate.getDate()
                                };
                                //初始化试图
                                goMonthView(currentDate.getFullYear(), currentDate.getMonth() - (-1), currentDate.getDate());
                                //今天添加点击事件
                                $$("#calendar-" + uniqueFlag).find('.today').bind('click', function() {
                                    doSelectDay(todayDate.getFullYear(), todayDate.getMonth() - (-1), todayDate.getDate());
                                });
                                //保证在点击日历多余地方不会隐藏
                                $$("#calendar-" + uniqueFlag).bind('click', function() {
                                    element.focus();
                                });
                            });
                        }
                    }


                    //处理自动关闭功能，延迟是为了多余的处理，防止错误的关闭
                    element.bind('blur', function() {
                        element.val(showFormat(element.val()));
                        setTimeout(function() {
                            if (element.isFocus()) {
                                //todo
                            } else {
                                doCancel();
                            }
                        }, 100);
                    });

                    //点击开启编辑模式
                    element.bind('click', function() {
                        if (hadClick) return;
                        if (!/-/.test(element.val())) return;
                        element.val(dataFormat(element.val()));
                        $$("#btn-calendar-" + uniqueFlag).addClass("btn-calendar-active");
                    });

                    btnAddClick(btnflag);
                }
            };
        }
    ];
    libapp.directive(directive);
})(window, window.angular, window.Luna);
