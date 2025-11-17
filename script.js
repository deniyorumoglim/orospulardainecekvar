window.Bots = [];
window.started = false;

window.start = ()=>{
    window.started = true;
    window.count = 1;
    class Bot {
        constructor(url, token) {
            this.token = token;
            this.connect(url)
        }

        connect(url) {
            this.startedBots = true;
            this.serverUrl = url;
            this.ws = new WebSocket(url);
            this.ws.binaryType = 'arraybuffer';
            this.ws.onmessage = this.onMessage.bind(this);
            this.ws.onopen = this.onOpen.bind(this);
            this.ws.onclose = this.onClose.bind(this);
            this.ws.onerror = this.onError.bind(this);
        }

        onMessage(message) {

            var packet = new DataView(message.data);

            var buff = 0;

            240 == packet.getUint8(buff) && (buff += 5);
            var read = packet.getUint8(buff++)
            switch (read) {
            case 16:
                window.test(packet, buff);
                break;

            }

        }

        spec() {
            var packet = this.Buffer(1);
            packet.setUint8(0, 1);
            this.send(packet);
        }

        sleep(ms) {
            return new Promise(resolve=>setTimeout(resolve, ms));
        }
        cap(_0x12d854) {
            var _0x50689c = this.Buffer(1 + 2 * _0x12d854.length);
            _0x50689c.setUint8(0, 50);
            for (var _0x590986 = 0; _0x590986 < _0x12d854.length; ++_0x590986) {
                _0x50689c.setUint16(1 + 2 * _0x590986, _0x12d854.charCodeAt(_0x590986), true);
            }
            this.send(_0x50689c);
        }
        onOpen() {
            var _0xe6a2x9e = this.Buffer(5);
            _0xe6a2x9e.setUint8(0, 254);
            _0xe6a2x9e.setUint32(1, 4, true);
            this.send(_0xe6a2x9e);
            var _0xe6a2x9e;
            _0xe6a2x9e = this.Buffer(5);
            _0xe6a2x9e.setUint8(0, 255);
            _0xe6a2x9e.setUint32(1, 1332175218, true);
            this.send(_0xe6a2x9e);
            this.cap(this.token);

            this.pingInterval = setInterval(()=>{
                var msg = this.Buffer(5);
                msg.setUint8(0, 90);
                msg.setUint32(1, 123456789, true);
                this.send(msg);
            }
            , 1e3);

            setTimeout(async()=>{

                for (let i = 0; i < window.count; i++) {
                    this.spec();
                    await this.sleep(100)
                }

                console.log(window.count + ". izleniyor!")

                window.count++;
            }
            , 2000);
        }

        onClose(e) {
            this.ws.close();
            clearInterval(this.pingInterval);

            clearTimeout(this.spawnTimeout);
            console.log("CLOSED!!!! " + e);
           // alert("OYUN BUGA GİRDİ F5 AT KANKA");
        }

        onError() {}

        sendUint8(offset) {
            let onebyte = this.Buffer(1);
            onebyte.setUint8(0, offset)
            this.send(onebyte);
        }

        get wsOPEN() {
            return this.ws && this.ws.readyState === WebSocket.OPEN;
        }

        Buffer(buf) {
            return new DataView(new ArrayBuffer(!buf ? 1 : buf))
        }

        send(data) {
            if (this.wsOPEN) {
                this.ws.send(data.buffer);
            }
        }
    }
    var server = document.getElementById("gamemode").value;
localStorage.setItem("gameMode", server); // seçimi kaydet

    for (let index = 0; index < 4; index++) {
        setTimeout(()=>{
            //     window.Bots.push(new Bot('wss://' + server))

            grecaptcha.ready(function() {
                grecaptcha.execute('6LcnrKQUAAAAADohV5Cksikz89WSP-ZPHNA7ViZm', {
                    'action': 'play_game'
                }).then(function(_0x1e5238) {
                    window.Bots.push(new Bot('wss://' + server,_0x1e5238))
                });
            });

        }
        , 500 * index);
    }
}

document.addEventListener('keydown', function(event) {
    if (event.key === `"`) {
        if (window.started === true)
            return;
        window.start();
    }
    if (event.key === `b`) {
        document.querySelector('#main-login-section').style.display = 'none'
        window.xa();
    }
    if (event.key === `Escape`) {
        document.querySelector('#main-login-section').style.display = ''
    }
});
var Vector2 = function($, x) {
    this.x = $ || 0,
    this.y = x || 0
};
Vector2.prototype = {
    reset: function($, x) {
        return this.x = $,
        this.y = x,
        this
    },
    toString: function($) {
        var x = Math.pow(10, $ = $ || 3);
        return "[" + Math.round(this.x * x) / x + ", " + Math.round(this.y * x) / x + "]"
    },
    clone: function() {
        return new Vector2(this.x,this.y)
    },
    copyTo: function($) {
        $.x = this.x,
        $.y = this.y
    },
    copyFrom: function($) {
        this.x = $.x,
        this.y = $.y
    },
    magnitude: function() {
        return Math.sqrt(this.x * this.x + this.y * this.y)
    },
    magnitudeSquared: function() {
        return this.x * this.x + this.y * this.y
    },
    normalise: function() {
        var $ = this.magnitude();
        return this.x = this.x / $,
        this.y = this.y / $,
        this
    },
    reverse: function() {
        return this.x = -this.x,
        this.y = -this.y,
        this
    },
    plusEq: function($) {
        return this.x += $.x,
        this.y += $.y,
        this
    },
    plusNew: function($) {
        return new Vector2(this.x + $.x,this.y + $.y)
    },
    minusEq: function($) {
        return this.x -= $.x,
        this.y -= $.y,
        this
    },
    minusNew: function($) {
        return new Vector2(this.x - $.x,this.y - $.y)
    },
    multiplyEq: function($) {
        return this.x *= $,
        this.y *= $,
        this
    },
    multiplyNew: function($) {
        return this.clone().multiplyEq($)
    },
    divideEq: function($) {
        return this.x /= $,
        this.y /= $,
        this
    },
    divideNew: function($) {
        return this.clone().divideEq($)
    },
    dot: function($) {
        return this.x * $.x + this.y * $.y
    },
    angle: function($) {
        return Math.atan2(this.y, this.x) * ($ ? 1 : Vector2Const.TO_DEGREES)
    },
    rotate: function($, x) {
        var e = Math.cos($ * (x ? 1 : Vector2Const.TO_RADIANS))
          , _ = Math.sin($ * (x ? 1 : Vector2Const.TO_RADIANS));
        return Vector2Const.temp.copyFrom(this),
        this.x = Vector2Const.temp.x * e - Vector2Const.temp.y * _,
        this.y = Vector2Const.temp.x * _ + Vector2Const.temp.y * e,
        this
    },
    equals: function($) {
        return this.x == $.x && this.y == $.x
    },
    isCloseTo: function($, x) {
        return !!this.equals($) || (Vector2Const.temp.copyFrom(this),
        Vector2Const.temp.minusEq($),
        Vector2Const.temp.magnitudeSquared() < x * x)
    },
    rotateAroundPoint: function($, x, e) {
        Vector2Const.temp.copyFrom(this),
        Vector2Const.temp.minusEq($),
        Vector2Const.temp.rotate(x, e),
        Vector2Const.temp.plusEq($),
        this.copyFrom(Vector2Const.temp)
    },
    isMagLessThan: function($) {
        return this.magnitudeSquared() < $ * $
    },
    isMagGreaterThan: function($) {
        return this.magnitudeSquared() > $ * $
    }
},
Vector2Const = {
    TO_DEGREES: 180 / Math.PI,
    TO_RADIANS: Math.PI / 180,
    temp: new Vector2
};
var _0x1f6e83 = _0x392b;
!function($, x) {
    for (var e = _0x392b, _ = $(); ; )
        try {
            if (-parseInt(e(544)) / 1 * (parseInt(e(198)) / 2) + parseInt(e(176)) / 3 + parseInt(e(444)) / 4 * (parseInt(e(309)) / 5) + parseInt(e(424)) / 6 * (-parseInt(e(310)) / 7) + parseInt(e(178)) / 8 * (-parseInt(e(193)) / 9) + -parseInt(e(377)) / 10 * (parseInt(e(233)) / 11) + -parseInt(e(245)) / 12 * (-parseInt(e(224)) / 13) == 446351)
                break;
            _.push(_.shift())
        } catch (t) {
            _.push(_.shift())
        }
}(_0x15ca, 446351);
var Uping, Uuptime, Uplayers, selectSkinModalAjax = 0, selectSkinName = "", port = 443, CONNECTION_URL = _0x1f6e83(554) + port, playGameClickEvent = 0, Sfreeze = !1;
function appendHtmlChild() {
    var $ = _0x1f6e83;
    localStorage.gameMode && void 0 != localStorage[$(219)] && null != localStorage[$(219)] && (document[$(420)]($(539) + localStorage[$(219)] + '"]').selected = !0),
    localStorage[$(566)] && void 0 != localStorage[$(566)] && null != localStorage[$(566)] ? document[$(493)]($(474))[$(172)] = localStorage.playerNick : document[$(493)]($(474))[$(172)] = location[$(572)],
    localStorage[$(559)] && void 0 != localStorage[$(559)] && null != localStorage[$(559)] ? (document[$(493)]($(396)).src = $(205) + localStorage[$(559)] + $(229),
    selectSkinName = localStorage[$(559)]) : document.getElementById($(396))[$(375)] = "https://agar.live/skins/noskin.png"
}
function _0x15ca() {
    var $ = ["18QXRZsC", "showDarkTheme", "gameName", "measureText", "random", "psx2psx2", "ğ\x9d“•ğ\x9d“\xa4ğ\x9d“’ğ\x9d“šğ\x9d“\xa8ğ\x9d“\x9eğ\x9d“\xa4", "none", " ***", "stats_topposition", "S1KER", "playGame", "clientY", "height", "splice", "_stroke", "simpleGreen", "onkeydown", "muslim", "Connection closed", "4524skOtvm", "oSize", "kurt", "insert", " : ", "setValue", "_canvas'blob", "penis", "isSpectating", "porn", "ANANIZI", "getFloat64", "isVirus", "Connected to the game", "15px Ubuntu", "#ccff00", "opacity ", "minY", "PART\xc4\xb0", "innerWidth", "ilah", "iken", "p-k-k", "setUint32", "love", "k\xc3\xbcrdistan", "createElement", "prepareData", "destroy", "setHideNames", "nick", "Vagina", "stats_timealive", "lineWidth", "OPEN", "binaryType", "anneni", "restore", "strokestyle", "log", "updateCode", "18px Arial", "location", "anas\xc4\xb1n\xc4\xb1", "YARRAK", "nodes", "globalAlpha", "findOverlappingNodes", "retrieve", "getElementById", "o.\xc3\xa7ocu\xc4Ÿu", "Game resumed.", "now", "checked", "turkey", "\xc4\xb0KEN", " , ", "min", "protocol2", "mobile_settingsModal", "protocol1", "s1k", "GULER", "clientX", "_strokeColor", "rgba(255,255,255,.2)", "color", " ms;", "discord", "S1KEN", "jQuery", "fillRect", "skym", "Players ", "closePath", "block", "onload", "visible", "keyCode", "name", "position", "P-K-K", "***", "name_y", "beginPath", "noColor", "Agar.io", "Party", "wss://", "lineTo", "skmek", "setSize", "16px Ubuntu", "requestAnimationFrame", "pointsAcc", '#gamemode [value="', "getUint8", "setserver", "onclose", "width", "305KtlkfM", "nameCache", "S\xc4\xb0KEN", "RTE", "scale", "#FF0000", "pi\xc3\xa7", "FUCK", "#FFF", "#111111", "ffa4.agariodns.cyou:", "amc1", "exists", "onmousemove", "lastWinner", "skin", "true", "ğ\x9d“•ğ\x9d“\xa4ğ\x9d“’ğ\x9d“š", "moveTo", "addEventListener", "_dirty", "size", "playerNick", "slow", "FCK", "drawTime", "fast", "_scale", "hostname", "lineCap", "darkTheme", "RECEP", "g\xc3\xb6t", "!!!", "SEX", "fromCodePoint", "Enter a nick", "k\xc3\xbcrt", "smoothRender", "Game stopped.", "Score: ", "s1keyim", "kurd", "updateTime", "zoom", "show", "noSkin", "touchstart", "arc", "setHideChat", "onmousedown", ":teams", "HTTP", "REC", "visibility", "updatePos", "setShowScore", "wasSimpleDrawing", "#DDDDDD", "BENGAVATIM", "gamemode", "ready", "showScore", "name_x", "onkeyup", "value", "Game is ready", "K\xc3œRD\xc4\xb0STAN", "_canvas", "40074ewivKY", "destroyed", "216gbzSWu", "font", "amc\xc4\xb1k", "main-login-section", "p_k_k", "7em", "getZoom", "prty", "#0000FF", "bok", "points", "getUint32", "spectate", "recep", "msg_x", "218763KVANxg", "length", "px Ubuntu", "readyState", "center", "1982qWTLcm", "detail", "prototype", "vagina", "wheelDelta", "annen\xc4\xb1z\xc4\xb1n", "pk k", "https://agar.live/skins/", "ors", "clear", "https:", "getFloat32", "pow", "fillText", "POSITIVE_INFINITY", "getScore", "hidden", "clip", "canvas", "noNames", "./skins.js?=v1", "gameMode", "strokeText", "Siken", "DOMContentLoaded", "name_h", "235937irIwWM", "Restart ", "fillStyle", "devide", "sokam", ".png", "floor", "#3333FF", "findInsertNode", "3817wJHZCI", "transition", "innerHTML", "_size", "#AAAAAA", "#FFAAAA", "blur", "stroke", "hideChat", "sik", "k\xc3\xbcrd", "BOK", "1140OIHLzs", "#33E660", "onblur", "transparentRender", "slice", "rec", "#5959eb", "infoOverlays", "documentElement", "www.agario.su", "sKr", "buffer", "KURDISTAN", "UnnamedCell", "SkR", "selectSkinPage", "textAlign", "drawImage", "root", "msg_y", "onmousewheel", "#chat_textbox", "nSize", "yellow", "skinName", "2000", "#000000", "toString", "100%", "getTime", "shouldRender", "setSimpleGreen", "trim", "sex", "Sucker", "red", "sikeyim", "s\xc4\xb1kt\xc4\xb1g\xc4\xb1m", "24px Ubuntu", "black", "chat_textbox", "init", "tayy\xc4\xb1p", "flag", " sec;", "abs", "ATAT\xc3œRK", "appendChild", "createPoints", "MUSLIM", "getContext", "mobile_OpenSettings", "scrollTo", "focus", "#FFFFFF", "getNameSize", "sikerler", "siker", "mobile_OpenSelectSkinPage", "top", "Unnamed Cell", "fuck", "orospu", "#0002fe", "3095maBVgi", "1381373dkyDVs", "body", "createTouch", "paste", "minX", "party", "PKK", "ISLAM", "_value", "msg_h", "#FF3333", "onmessage", "maxDepth", "hide", "setTransparent", "userAgent", "message", "play_game", "msg_w", "movePoints", "touchend", "getUint16", "Ws Message could not be sent", "*** ", "s\xc4\xb1k\xc4\xb1y\xc4\xb1m", "close", "complete", "countdown", "Ass", "lineJoin", "textBaseline", "name_w", "setUint8", "fill", "o.\xc3\xa7", "PORN", "O.\xc3‡", "style", "p kk", "rgba(0,0,0,.25)", "https://www.google.com/recaptcha/api.js?render=6LcnrKQUAAAAADohV5Cksikz89WSP-ZPHNA7ViZm", "round", "getInt16", "6LcnrKQUAAAAADohV5Cksikz89WSP-ZPHNA7ViZm", "zIndex", "sikem", "arraybuffer", "setNoColor", "split", "skr", "test", "PARTY", "setFloat64", "NEGATIVE_INFINITY", "P_K_K", "bold ", "setSkinListClick", "anan\xc4\xb1z\xc4\xb1", "/imgs/lbfirst.png", "items", "getNumPoints", "#333333", "ADM\xc4\xb0N", "yarak", "display", "src", "Connection not closed", "12700NykDxG", "rte", "ALLAH", "P K K", "max", "opacity", "drawOneCell", "SKR", "fromCharCode", "sikerim", "push", "TAYY\xc4\xb0P", "protocol", "depth", "Latency ", "maxX", "setUint16", "translate", "pussy", "defaultSkin", "#F2FBFF", "script", "700 18px ubuntu", "Max: ", "isAgitated", "touchmove", "K\xc3œRT", "hasOwnProperty", "_ctx", "save", "keydown", "s\xc4\xb1kmek", "clearChat", "meme", "anan\xc4\xb1", "guler", "kiss", "charCodeAt", "_color", "#33FF33", "admin", "strokeStyle", "replace", "querySelector", "indexOf", "onfocus", "allah"];
    return (_0x15ca = function() {
        return $
    }
    )()
}
function _0x392b($, x) {
    var e = _0x15ca();
    return (_0x392b = function($, x) {
        return e[$ -= 159]
    }
    )($, x)
}
function getScript($, x) {
    var e = _0x1f6e83;
    let _ = document[e(470)](e(398));
    _[e(375)] = $,
    _[e(520)] = x,
    document[e(311)][e(292)](_)
}
document.addEventListener(_0x1f6e83(222), $=>{
    var x = _0x1f6e83;
    getScript(x(350)),
    console.log(x(173)),
    appendHtmlChild(),
    setserver(CONNECTION_URL)
}
),
function($, x) {
    var e = _0x1f6e83;
    function _($, x, e, _, t, i) {
        return !!($ <= t) && !!(t <= e) && !!(x <= i) && !!(i <= _)
    }
    $[e(541)] = function() {
        window.started = !1;
        for (var $ = 0; $ < window.Bots.length; $++)
            window.Bots[$].onClose();
        var x = e
          , _ = document[x(493)](x(167))[x(172)];
        _ != $i && (CONNECTION_URL = _,
        $i = _,
        $k(CONNECTION_URL),
        localStorage.gameMode = _)
    }
    ,
    $[e(296)] = function() {
        var $ = e;
        document[$(493)]($(503))[$(347)].display = "block"
    }
    ,
    $.mobile_CloseSettings = function() {
        var $ = e;
        document[$(493)]("mobile_settingsModal")[$(347)][$(374)] = "none"
    }
    ,
    $[e(303)] = function() {
        0 == selectSkinModalAjax && getScript(e(218), ()=>selectSkinModalAjax = 1)
    }
    ,
    $[e(260)] = function() {
        0 == selectSkinModalAjax && 0 == selectSkinModalAjax && getScript(e(218), ()=>selectSkinModalAjax = 1)
    }
    ,
    $.closeSkinPage = function() {
        selectskinmodalclose()
    }
    ,
    $[e(366)] = function($) {
        var x = e;
        document[x(493)](x(396))[x(375)] = "https://agar.live/skins/" + $ + ".png",
        closeSkinPage(),
        localStorage.skin = $,
        selectSkinName = $,
        console[x(483)]($ + " 'skin update'")
    }
    ,
    Element[e(200)][e(323)] = function() {
        var $ = e;
        this.style[$(161)] = $(214),
        1 == this[$(347)].opacity && (this[$(347)][$(382)] = 0)
    }
    ,
    Element.prototype[e(589)] = function($) {
        var x = e;
        this[x(347)][x(161)] = x(521);
        var _ = this;
        $ && (this[x(347)][x(234)] = x(460) + $ + "s ease 0s",
        setTimeout(function() {
            var $ = x;
            _.style[$(382)] = 1
        }, 20))
    }
    ,
    e(205);
    var t, i, a, n, s, r, o, f = e(312)in document, h = (new Vector2(0,0),
    new Vector2(0,0),
    new Vector2(0,0),
    100), l = 20, d = "!", u = 0, b = ($[e(486)][e(389)],
    e(208),
    null), v = null, m = 0, y = 0, p = [], k = [], g = {}, S = [], w = [], A = [], F = "RESTART", C = [], N = 0, T = 0, E = -1, I = -1, P = 0, U = Date.now(), z = 0, R = 0, O = 0, D = 0, K = 0, q = 1e4, M = 1e4, L = 1, V = !1, B = !1, G = !1, H = !1, W = 0, j = 0, Y = !1, Z = !1, Q = !1, X = .4, J = !1, $$ = !1, $x = !1, $e = m = ~~((D + q) / 2), $_ = y = ~~((K + M) / 2), $t = 1, $i = "", $a = null, $n = !0, $s = !1, $0 = 0, $r = 0, $o = 0, $c = 0, $f = [e(371), e(320), e(416), e(231)], $h = .4, $l = ("ontouchstart"in $ && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i[e(360)](navigator[e(325)]),
    !1);
    document.createElement(e(216)),
    $[e(452)] = !1;
    var $d, $u = Date[e(496)]();
    function $1($) {
        var x = e;
        let _ = "";
        "" == _ && (_ = $);
        let t = document.getElementById("nn");
        t[x(347)][x(524)] = "absolute",
        t[x(347)][x(374)] = x(519),
        t[x(347)][x(304)] = "200px",
        t[x(347)].fontSize = "20px",
        t[x(347)].color = x(280),
        t[x(347)][x(354)] = x(270),
        t[x(347)].textAlign = x(197),
        t[x(347)][x(543)] = x(273),
        t[x(235)] = _,
        t[x(347)].opacity = 1,
        t.style.fontSize = x(183),
        setTimeout(function() {
            var $ = x;
            t[$(347)][$(374)] = $(431)
        }, 500)
    }
    function $b($) {
        var x = e
          , _ = $;
        return (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = (_ = _.replace(x(550), "***")).replace(x(395), String[x(579)](128513)))[x(419)](":)", String[x(579)](128513)))[x(419)](":d", String[x(579)](128513))).replace(":D", String[x(579)](128513))).replace(":(", String.fromCodePoint(128577)))[x(419)](":p", String[x(579)](128541)))[x(419)](":o", String.fromCodePoint(128562)))[x(419)](";)", String[x(579)](128521)))[x(419)](":>", String.fromCodePoint(128535))).replace(":$", String[x(579)](129324)))[x(419)](x(468), String.fromCodePoint(128149)))[x(419)]("okay", String[x(579)](128077))).replace(x(413), String[x(579)](128139)))[x(419)](x(453), String[x(579)](128139))).replace(x(278), String[x(579)](128139)))[x(419)](x(345), String[x(579)](128139)))[x(419)](x(578), String[x(579)](128139)))[x(419)](x(513), String.fromCodePoint(128139)))[x(419)](x(488), String.fromCodePoint(128139)))[x(419)]("yarak", x(526)))[x(419)](x(315), x(526)))[x(419)](x(185), x(526)))[x(419)](x(361), x(526))).replace(x(531), x(526))).replace("S\xc4\xb0KER", "GULER"))[x(419)]("islam", x(526))).replace(x(317), x(526)))[x(419)](x(294), x(526)))[x(419)](x(442), "***"))[x(419)](x(302), x(412)))[x(419)]("\xea\xa7…", x(526))).replace(x(498), x(506)))[x(419)](x(417), "***"))[x(419)](x(372), x(526)))[x(419)]("ADMIN", x(526)))[x(419)](x(346), x(526)))[x(419)](x(344), "***"))[x(419)](x(180), "***"))[x(419)](x(555), "***"))[x(419)](x(386), x(526)))[x(419)](x(254), x(526)))[x(419)]("siken", "***")).replace(x(546), "***"))[x(419)](x(301), "***"))[x(419)](x(512), x(526)))[x(419)]("http", "***"))[x(419)](x(159), "***"))[x(419)](x(307), x(526)))[x(419)]("yarrak", x(526))).replace(x(359), x(526))).replace(x(384), x(526)))[x(419)](x(434), x(526)))[x(419)](x(255), x(526)))[x(419)](x(259), x(526))).replace(x(585), x(526)))[x(419)](x(505), x(526)))[x(419)](x(206), "***"))[x(419)]("yarra\xc4Ÿ\xc4\xb1", x(526)))[x(419)](x(576), x(526)))[x(419)](x(306), x(526)))[x(419)](x(291), x(526))).replace("parti", x(526)))[x(419)](x(462), x(526)))[x(419)]("atat\xc3\xbcrk", "***")).replace(x(306), x(526)))[x(419)](x(568), x(526)))[x(419)](x(551), x(526)))[x(419)](x(423), "***")).replace(x(379), x(526)))[x(419)]("HZ", x(526)))[x(419)]("hz", x(526))).replace(x(388), "***")).replace(x(547), x(526)))[x(419)](x(575), "***"))[x(419)](x(378), x(526)))[x(419)](x(551), x(526)))[x(419)](x(561), "***"))[x(419)](x(430), "***"))[x(419)]("tayyip", x(526))).replace(x(287), x(526))).replace(x(191), "***"))[x(419)](x(534), x(526)))[x(419)]("agario", x(526))).replace("AGARIO", x(526)))[x(419)](x(367), x(526))).replace(x(408), "***"))[x(419)](x(250), "***"))[x(419)](x(160), "***")).replace(x(244), "***"))[x(419)](x(187), "***"))[x(419)](x(338), "***"))[x(419)](x(475), x(526)))[x(419)]("Bitch", x(526))).replace(x(279), x(526)))[x(419)](x(410), x(526)))[x(419)](x(373), x(526))).replace("yara\xc4Ÿ\xc4\xb1", x(526)))[x(419)](x(228), x(526)))[x(419)](x(355), x(526))).replace(x(242), x(526)))[x(419)](x(454), x(526))).replace("gay", x(526)))[x(419)]("o\xc3\xa7", x(526)))[x(419)](x(344), "***"))[x(419)]("pkk", "!!!"))[x(419)](x(316), "!!!"))[x(419)](x(257), x(166)))[x(419)](x(174), x(577)))[x(419)]("kurd\xc4\xb1stan", x(577)))[x(419)](x(469), x(577)))[x(419)](x(243), x(577)))[x(419)](x(581), x(577)))[x(419)](x(446), x(577)))[x(419)](x(403), "!!!")).replace("KURT", "!!!"))[x(419)](x(586), x(577)))[x(419)](x(380), x(577)))[x(419)](x(364), x(577)))[x(419)](x(525), x(577)))[x(419)](x(348), x(577))).replace(x(204), "!!!"))[x(419)](x(182), x(577)))[x(419)](x(466), "!!!"))[x(419)](x(494), x(526)))[x(419)](x(451), x(526)))[x(419)](x(411), x(526)))[x(419)](x(487), x(526)))[x(419)]("am\xc4\xb1na", "***")).replace(x(221), "***")).replace(x(465), x(526)))[x(419)](x(499), x(526)))[x(419)](x(282), x(526)))[x(419)](x(334), "***"))[x(419)]("orspu", "***"))[x(419)](x(203), x(526))).replace(x(480), x(526)))[x(419)](x(516), "***"))[x(419)]("sikeyim", x(526))).replace("S\xc4\xb0KEN", x(526)))[x(419)](x(281), x(526))).replace(x(281), "***"))[x(419)](x(201), x(526)))[x(419)]("ILAH", x(526))).replace(x(464), "***")).replace("LAILAH", x(526)))[x(419)]("lailah", x(526))).replace("vagina", "***")
    }
    function $v($) {}
    function $m($) {}
    function $y($) {}
    function $6($) {
        var x = e;
        $x ? (.4 > ($h *= Math.pow(.9, -($[x(202)] / 120) || $[x(199)] || 0)) && ($h = .4),
        $h > 10 / L && ($h = 10 / L)) : (.01 > ($h *= Math[x(210)](.9, -($.wheelDelta / 120) || $[x(199)] || 0)) && ($h = .01),
        $h > 4 / L && ($h = 4 / L))
    }
    function $p() {
        E = (N - r / 2) / L + m,
        I = (T - o / 2) / L + y
    }
    function $3() {
        $n = !1,
        document.getElementById("main-login-section").hide(1)
    }
    function $2($) {
        var x = e;
        $n = !0,
        $ == x(570) ? document[x(493)]("main-login-section")[x(589)](.2) : document[x(493)](x(181)).show(.5)
    }
    function $7($, x) {
        var _ = e;
        if (-1 == $[_(421)]("{") || -1 == $[_(421)]("}"))
            return ["", $];
        var t = $.indexOf("{")
          , i = $.indexOf("}")
          , a = $[_(249)](i + 1);
        return x && (a = "" == a ? _(258) : $[_(249)](i + 1)),
        [$[_(249)](t + 1, i), a]
    }
    function $k($) {
        var x = e;
        if (v) {
            v.onopen = null,
            v.onmessage = null,
            v[x(542)] = null;
            try {
                v[x(335)]()
            } catch (_) {
                console[x(483)](x(376))
            }
            v = null
        }
        var t = CONNECTION_URL;
        $ = x(532) + t,
        p = [],
        k = [],
        g = {},
        S = [],
        w = [],
        A = [],
        F = "RESTART",
        this.countdown = 3599,
        a = $a = null,
        j = 0,
        W = 0,
        R = 0,
        (v = new WebSocket($,[x(504), x(502)]))[x(479)] = x(356),
        v.onopen = $S,
        v[x(321)] = $A,
        v.onclose = $w,
        v.onerror = function($) {
            console[x(483)]($)
        }
    }
    function $g($) {
        return new DataView(new ArrayBuffer($))
    }
    function $5($) {
        v.send($[e(256)])
    }
    function $4() {
        (function $() {
            var x = e
              , _ = document[x(493)](x(474))[x(172)];
            if (localStorage[x(566)] = _,
            _ = $b(_),
            "" != selectSkinName && (_ = "{" + selectSkinName + "}" + _),
            $N()) {
                var t = $g(1 + 2 * _[x(194)]);
                t[x(342)](0, 107);
                for (var i = 0; i < _.length; ++i)
                    t[x(393)](1 + 2 * i, _[x(414)](i), !0);
                $5(t)
            }
        }
        )(),
        function $() {
            if ($N()) {
                var x = $g(1);
                x.setUint8(0, 27),
                $5(x)
            }
        }()
    }
    function $S() {
        var $, x = e;
        console[x(483)](x(457));
        var $ = $g(5);
        $[x(342)](0, 254),
        $[x(467)](1, 4, !0),
        $5($),
        ($ = $g(5))[x(342)](0, 255),
        $.setUint32(1, 1332175218, !0),
        $5($),
        grecaptcha[x(168)](function() {
            var $ = x;
            grecaptcha.execute($(353), {
                action: $(327)
            }).then(function($) {
                (function $(x) {
                    var _ = e
                      , t = $g(1 + 2 * x.length);
                    t[_(342)](0, 50);
                    for (var i = 0; i < x[_(194)]; ++i)
                        t[_(393)](1 + 2 * i, x.charCodeAt(i), !0);
                    $5(t)
                }
                )($)
            })
        }),
        1 == playGameClickEvent && $4()
    }
    function $w() {
        var x = e;
        playGameClickEvent = 0,
        console.log(x(443)),
        v = null,
        $2("fast"),
        $[x(452)] = !1
    }
    function $A($) {
        try {
            (function $(x) {
                var _, t = e;
                function i() {
                    for (var $, e = _0x392b, _ = ""; 0 != ($ = x[e(331)](a, !0)); )
                        a += 2,
                        _ += String[e(385)]($);
                    return a += 2,
                    _
                }
                var a = 0
                  , n = !1;
                switch (240 == x[t(540)](a) && (a += 5),
                x.getUint8(a++)) {
                case 16:
                    $8(x, a);
                    break;
                case 17:
                    $e = x[t(209)](a, !0),
                    a += 4,
                    $_ = x[t(209)](a, !0),
                    a += 4,
                    $t = x[t(209)](a, !0),
                    a += 4;
                    break;
                case 20:
                    k = [],
                    p = [];
                    break;
                case 21:
                    $0 = x.getInt16(a, !0),
                    a += 2,
                    $r = x[t(352)](a, !0),
                    a += 2,
                    $s || ($s = !0,
                    $o = $0,
                    $c = $r);
                    break;
                case 32:
                    p[t(387)](x[t(189)](a, !0)),
                    a += 4;
                    break;
                case 48:
                    n = !0,
                    $l = !0;
                    break;
                case 49:
                    n || ($l = !1),
                    $a = null;
                    var s = x[t(189)](a, !0);
                    for (a += 4,
                    A = [],
                    f = 0; f < s; ++f) {
                        var r = x.getUint32(a, !0);
                        a += 4,
                        A.push({
                            id: r,
                            name: i()
                        })
                    }
                    $R();
                    break;
                case 50:
                    $a = [];
                    var o = x[t(189)](a, !0);
                    a += 4;
                    for (var f = 0; f < o; ++f)
                        $a[t(387)](x[t(209)](a, !0)),
                        a += 4;
                    $R();
                    break;
                case 64:
                    D = x[t(455)](a, !0),
                    a += 8,
                    K = x[t(455)](a, !0),
                    a += 8,
                    q = x[t(455)](a, !0),
                    a += 8,
                    M = x[t(455)](a, !0),
                    a += 8,
                    $e = (q + D) / 2,
                    $_ = (M + K) / 2,
                    $t = 1,
                    0 == k[t(194)] && (m = $e,
                    y = $_,
                    L = $t);
                    break;
                case 90:
                    Uping = new Date - latency,
                    Uuptime = x[t(455)](a, !0),
                    a += 8,
                    Uplayers = x.getFloat64(a, !0),
                    a += 8;
                    break;
                case 92:
                    for (this[t(426)] = ""; 0 != (_ = x[t(331)](a, !0)); )
                        a += 2,
                        this[t(426)] += String[t(385)](_);
                    break;
                case 96:
                    this[t(337)] = x[t(331)](a, !0);
                    break;
                case 97:
                    for (F = ""; 0 != (_ = x[t(331)](a, !0)); )
                        a += 2,
                        F += String[t(385)](_);
                    break;
                case 109:
                    (function $(x, _) {
                        var t = e;
                        function i() {
                            for (var $, e = _0x392b, t = ""; 0 != ($ = x[e(331)](_, !0)); )
                                _ += 2,
                                t += String[e(385)]($);
                            return _ += 2,
                            t
                        }
                        var a = x[t(540)](_++);
                        2 & a && (_ += 4),
                        4 & a && (_ += 8),
                        8 & a && (_ += 16);
                        for (var n = x[t(540)](_++), s = x[t(540)](_++), r = x[t(540)](_++), o = (n << 16 | s << 8 | r)[t(272)](16); o[t(194)] > 6; )
                            o = "0" + o;
                        o = "#" + o,
                        C.push({
                            name: $7(i())[1],
                            color: o,
                            message: i(),
                            time: Date[t(496)]()
                        })
                    }
                    )(x, a)
                }
            }
            )(new DataView($.data))
        } catch (x) {
            console.log(e(332))
        }
    }
    function $8($, x) {
        var _, t, i, a = e;
        O = +new Date;
        var n = Math.random();
        H = !1;
        var s = $[a(331)](x, !0);
        for (x += 2,
        f = 0; f < s; ++f) {
            var r = g[$[a(189)](x, !0)]
              , o = g[$.getUint32(x + 4, !0)];
            x += 8,
            r && o && (o[a(472)](),
            o.ox = o.x,
            o.oy = o.y,
            o[a(445)] = o[a(565)],
            o.nx = r.x,
            o.ny = r.y,
            o[a(267)] = o[a(565)],
            o.updateTime = O)
        }
        for (var f = 0; ; ) {
            var h = $[a(189)](x, !0);
            if (x += 4,
            0 == h)
                break;
            ++f;
            var l, d, u = $[a(352)](x, !0);
            x += 2,
            d = $[a(352)](x, !0),
            x += 2,
            l = $.getInt16(x, !0),
            x += 2;
            for (var b = $[a(540)](x++), v = $[a(540)](x++), w = $[a(540)](x++), A = (b << 16 | v << 8 | w)[a(272)](16); 6 > A.length; )
                A = "0" + A;
            var F = "#" + A
              , C = $[a(540)](x++)
              , N = !!(1 & C)
              , T = !!(16 & C);
            2 & C && (x += 4),
            4 & C && (x += 8),
            8 & C && (x += 16);
            for (var E, I = ""; E = $.getUint16(x, !0),
            x += 2,
            0 != E; )
                I += String[a(385)](E);
            var P = null;
            g[a(404)](h) ? ((P = g[h])[a(162)](),
            P.ox = P.x,
            P.oy = P.y,
            P[a(445)] = P.size,
            P[a(510)] = F) : (P = new $O(h,u,d,l,F,I),
            S.push(P),
            g[h] = P,
            P.ka = u,
            P.la = d),
            P[a(456)] = N,
            P[a(401)] = T,
            P.nx = u,
            P.ny = d,
            P[a(267)] = l,
            P[a(484)] = n,
            P[a(587)] = O,
            P[a(288)] = C,
            I && P.setName(I),
            -1 != p[a(421)](h) && -1 == k[a(421)](P) && (document.getElementById(a(181))[a(347)][a(161)] = a(214),
            k[a(387)](P),
            1 == k.length && (m = P.x,
            y = P.y))
        }
        for (s = $[a(189)](x, !0),
        x += 4,
        f = 0; f < s; f++) {
            var R = $.getUint32(x, !0);
            x += 4,
            null != (P = g[R]) && P[a(472)]()
        }
        H && 0 == k[a(194)] && (a(567),
        document[(i = e)(493)]("stats_hightesmass")[i(235)] = j,
        document.getElementById(i(476))[i(235)] = (_ = (Date.now() - U) / 1e3,
        t = ((_ = ~~_) % 60).toString(),
        _ = (~~(_ / 60))[e(272)](),
        2 > t.length && (t = "0" + t),
        _ + ":" + t),
        document.getElementById(i(433))[i(235)] = 0 == z ? ":(" : z,
        document[i(493)](i(252))[i(589)](.5)),
        k[a(194)]
    }
    function $F() {
        var $, x = e;
        if ($N() && !0 != Sfreeze) {
            var _ = T - o / 2;
            64 <= ($ = N - r / 2) * $ + _ * _ && !(.01 > Math[x(290)]($K - E) && .01 > Math.abs($q - I)) && ($K = E,
            $q = I,
            ($ = $g(21))[x(342)](0, 16),
            $[x(362)](1, E, !0),
            $[x(362)](9, I, !0),
            $.setUint32(17, 0, !0),
            $5($))
        }
    }
    function $C($) {
        var x = e;
        if ($N() && $[x(194)] < 200 && $[x(194)] > 0) {
            var _ = $g(2 + 2 * $[x(194)])
              , t = 0;
            _.setUint8(t++, 109),
            _[x(342)](t++, 0);
            for (var i = 0; i < $.length; ++i)
                _.setUint16(t, $[x(414)](i), !0),
                t += 2;
            $5(_)
        }
    }
    function $N() {
        return null != v && v.readyState == v[e(478)]
    }
    function $T($) {
        if ($N()) {
            var x = $g(1);
            x[e(342)](0, $),
            $5(x)
        }
    }
    function $E() {
        $U(),
        $[e(537)]($E)
    }
    function $I() {
        var x = e;
        window[x(297)](0, 0),
        r = $[x(463)],
        o = $.innerHeight,
        t[x(543)] = r,
        t[x(437)] = o,
        $U()
    }
    function $P() {
        var $;
        return ($ = Math[e(381)](o / 1080, r / 1920)) * $h
    }
    function $U() {
        var $, x = e, t = Date[x(496)]();
        if (++P,
        Date.now() - $u > 50 && ($u = Date[x(496)](),
        $F()),
        O = t,
        0 < k[x(194)]) {
            (function $() {
                var x = e;
                if (0 != k.length) {
                    for (var _ = 0, t = 0; t < k[x(194)]; t++)
                        _ += k[t][x(565)];
                    _ = Math[x(210)](Math[x(501)](64 / _, 1), .4) * $P(),
                    L = (9 * L + _) / 10
                }
            }
            )();
            for (var a = $ = 0, f = 0; f < k[x(194)]; f++)
                k[f][x(162)](),
                $ += k[f].x / k.length,
                a += k[f].y / k[x(194)];
            $e = $,
            $_ = a,
            $t = L,
            m = (m + $) / 2,
            y = (y + a) / 2
        } else
            m = (29 * m + $e) / 30,
            y = (29 * y + $_) / 30,
            L = (9 * L + $t * $P()) / 10;
        for (function $() {
            var x = e;
            if (.4 > L)
                b = null;
            else {
                for (var _ = Number[x(212)], t = Number.POSITIVE_INFINITY, i = Number[x(363)], a = Number[x(363)], n = 0, s = 0; s < S[x(194)]; s++) {
                    var f = S[s];
                    f.shouldRender() && !f[x(471)] && 20 < f.size * L && (n = Math.max(f[x(565)], n),
                    _ = Math[x(501)](f.x, _),
                    t = Math.min(f.y, t),
                    i = Math[x(381)](f.x, i),
                    a = Math[x(381)](f.y, a))
                }
                for (s = 0,
                b = $G[x(286)]({
                    minX: _ - (n + 100),
                    minY: t - (n + 100),
                    maxX: i + (n + 100),
                    maxY: a + (n + 100),
                    maxChildren: 2,
                    maxDepth: 4
                }); s < S[x(194)]; s++)
                    if ((f = S[s])[x(275)]() && !(20 >= f[x(565)] * L))
                        for (_ = 0; _ < f[x(188)].length; ++_)
                            t = f[x(188)][_].x,
                            i = f[x(188)][_].y,
                            t < m - r / 2 / L || i < y - o / 2 / L || t > m + r / 2 / L || i > y + o / 2 / L || b[x(447)](f[x(188)][_])
            }
        }(),
        $p(),
        i[x(226)] = Y ? x(553) : x(397),
        i[x(515)](0, 0, r, o),
        S.sort(function($, e) {
            var _ = x;
            return $[_(565)] == e[_(565)] ? $.id - e.id : $.size - e[_(565)]
        }),
        i[x(406)](),
        i[x(394)](r / 2, o / 2),
        i[x(548)](L, L),
        i.translate(-m, -y),
        i[x(418)] = x(549),
        i.lineWidth = 50,
        i[x(573)] = x(351),
        i[x(339)] = x(351),
        i.beginPath(),
        i.moveTo(D, K),
        i[x(533)](q, K),
        i[x(533)](q, M),
        i[x(533)](D, M),
        i[x(518)](),
        i[x(240)](),
        !0 == J ? i.globalAlpha = .6 : i[x(490)] = 1,
        f = 0; f < S[x(194)]; f++)
            S[f][x(383)](i);
        if ($s) {
            for ($o = (3 * $o + $0) / 4,
            $c = (3 * $c + $r) / 4,
            i.save(),
            i.strokeStyle = "#FFAAAA",
            i[x(477)] = 10,
            i.lineCap = x(351),
            i.lineJoin = "round",
            i[x(490)] = .5,
            i[x(528)](),
            f = 0; f < k[x(194)]; f++)
                i[x(562)](k[f].x, k[f].y),
                i.lineTo($o, $c);
            i.stroke(),
            i[x(481)]()
        }
        if (i[x(481)](),
        n && n[x(543)] && i.drawImage(n, r - n[x(543)] - 10, 10),
        !$$ && null != s && s.width > 0 && i[x(262)](s, 0, o - s[x(437)] - 50),
        W = function $() {
            for (var x = e, _ = 0, t = 0; t < k[x(194)]; t++)
                _ += k[t][x(213)]();
            return _
        }(),
        j = Math.max(j, W),
        i[x(490)] = .8,
        !0 == Y ? i[x(226)] = x(299) : i[x(226)] = x(271),
        i[x(179)] = x(283),
        i[x(211)](x(584) + W, 10, 34),
        i[x(211)](x(400) + j, 10, 60),
        this.countdown < 3600) {
            var u = ""
              , v = Math[x(230)](this.countdown / 60);
            v < 10 && (u += "0"),
            u += v + ":";
            var p = this[x(337)] % 60;
            p < 10 && (u += "0"),
            u += p,
            i[x(490)] = .4,
            !1 == Y ? i[x(226)] = x(271) : i[x(226)] = x(165),
            i[x(490)] = 1,
            !0 == Y ? i.fillStyle = x(251) : i[x(226)] = x(186),
            i[x(179)] = x(458),
            i.fillText(x(391) + Uping + x(511), 10, 90),
            i.fillText("Uptime " + Uuptime + x(289), 10, 110),
            i.fillText(x(225) + u, 10, 130),
            i[x(211)](x(517) + Uplayers + ";", 10, 150)
        }
        if ($N()) {
            i[x(490)] = 1,
            i[x(179)] = x(536);
            var g = Math[x(351)](m / 1e3) + x(500) + Math[x(351)](y / 1e3) + " share";
            h = i[x(427)](g)[x(543)],
            l = 16,
            d = x(333) + Math[x(351)](m / 1e3) + x(500) + Math[x(351)](y / 1e3) + x(432),
            !0 == Y ? i.fillStyle = x(299) : i[x(226)] = x(271),
            i.fillText(g, 0, -15)
        }
        if (!1 == $$)
            for (var w = 0, A = C[x(194)] - 1; A >= 0 && !(++w > 15); A--) {
                var F = C[A][x(523)][x(277)]();
                "" == F && (F = x(530));
                var N = C[A][x(326)][x(277)]()
                  , T = x(448) + N
                  , E = T.toLowerCase()[x(419)](/[^a-zA-ZÄŸÃ¼ÅŸÄ±Ã¶Ã§ÄÃœÅÄ°Ã–Ã‡@)(!,?:^0-9 ]/g, "");
                i[x(179)] = x(485),
                C[A][x(170)] = 15,
                C[A][x(527)] = o - 30 - 20 * w,
                C[A][x(341)] = i.measureText(F)[x(543)],
                C[A][x(223)] = 18,
                C[A][x(192)] = 15 + C[A][x(341)],
                C[A][x(264)] = C[A][x(527)],
                C[A][x(328)] = i.measureText(T)[x(543)],
                C[A][x(319)] = C[A][x(223)],
                i.fillStyle = C[A][x(510)],
                i[x(211)](F, C[A][x(170)], C[A][x(527)]),
                !0 == Y ? i[x(226)] = "#FFFFFF" : i.fillStyle = x(271),
                i[x(211)](E, C[A].msg_x, C[A][x(264)])
            }
        var I = Date[x(496)]() - t;
        I > 1e3 / 60 ? $M -= .01 : I < 1e3 / 65 && ($M += .01),
        .4 > $M && ($M = .4),
        1 < $M && ($M = 1),
        function $() {
            var x = e;
            if (0 != k[x(194)]) {
                i[x(406)](),
                i.beginPath(),
                i[x(226)] = x(349),
                i[x(477)] = 1.5;
                var t = r - 200 - 10
                  , a = o - 200 - 5;
                i.rect(t, a, 200, 200),
                i[x(477)] = 1.25;
                for (var n = m / (q - D) * 200 + t + 100 - 100, s = y / (M - K) * 200 + a + 100 - 100, f = bh = 200, h = -1, l = -1, d = 0; d <= f; d += 40) {
                    if (d != f) {
                        var u = .5 + d + t
                          , b = a;
                        if (_(u, b, u + 40, b + bh, n, s) && (h = u),
                        0 == d)
                            continue;
                        i[x(562)](.5 + d + t, a),
                        i[x(533)](.5 + d + t, bh + a)
                    }
                    !0 == Y ? i.fillStyle = x(299) : i[x(226)] = x(271),
                    i.font = x(399),
                    i[x(261)] = x(197),
                    i[x(418)] = "white",
                    i.lineWidth = 1,
                    i.globalAlpha = .35;
                    for (var v = 0; v < 5; v++)
                        i[x(211)](String.fromCharCode(v + 65) + d / 40, .5 + d + t - 20, a + 25.5 + 40 * v)
                }
                for (var p = 0; p <= bh; p += 40)
                    if (p != bh) {
                        var u = t
                          , b = .5 + p + a;
                        if (_(u, b, u + f, b + 40, n, s) && (l = b),
                        0 == p)
                            continue;
                        i[x(562)](t, .5 + p + a),
                        i[x(533)](f + t, .5 + p + a)
                    }
                k[x(194)] > 0 && h > -1 && l > -1 && (i[x(226)] = x(459),
                i[x(490)] = .3,
                i[x(515)](h, l, 40, 40)),
                i.globalAlpha = 1,
                i[x(418)] = x(509),
                i[x(240)](),
                i[x(518)]();
                for (var v = 0; v < k[x(194)]; v++) {
                    var g = k[v]
                      , S = g.ox / (q - D)
                      , w = g.oy / (M - K)
                      , d = 200 * S + t + 100 - 100
                      , p = 200 * w + a + 100 - 100
                      , A = Math[x(381)](2, g[x(565)] / 100);
                    i.fillStyle = g[x(510)],
                    0 == v && (i[x(179)] = x(365) + (14 + A) + "px Ubuntu",
                    i[x(427)](g[x(523)]),
                    i[x(482)] = x(284)),
                    i.beginPath(),
                    i[x(418)] = x(284),
                    i.lineWidth = 1,
                    i[x(490)] = 1,
                    i[x(592)](d, p, A, 0, 2 * Math.PI),
                    i[x(240)](),
                    i[x(343)](),
                    i[x(518)]()
                }
                i.restore()
            }
            function F($, x) {
                return x ? F(x, $ % x) : $
            }
        }()
    }
    function $z() {
        var $ = e;
        i.fillStyle = $(Y ? 553 : 397),
        i.fillRect(0, 0, r, o),
        i[$(406)](),
        i.strokeStyle = Y ? $(237) : "#000000",
        i[$(490)] = .2,
        i[$(548)](L, L);
        for (var x = r / L, _ = o / L, t = -.5 + (-m + x / 2) % 50; t < x; t += 50)
            i.beginPath(),
            i.moveTo(t, 0),
            i[$(533)](t, _),
            i[$(240)]();
        for (t = -.5 + (-y + _ / 2) % 50; t < _; t += 50)
            i.beginPath(),
            i.moveTo(0, t),
            i[$(533)](x, t),
            i.stroke();
        i[$(481)]()
    }
    function $R() {
        var $ = e
          , x = 110;
        n = null;
        var _ = 200;
        null != $a && (_ = 200),
        (null != $a || 0 != A.length) && (n = document[$(470)]("canvas"));
        var t = n[$(295)]("2d")
          , i = x;
        i = null == $a ? i + 24 * A.length : i + 180;
        var a = Math[$(501)](.22 * o, Math[$(501)](200, .3 * r)) / 200;
        n[$(543)] = _ * a,
        n[$(437)] = i * a,
        t[$(548)](a, a),
        t.globalAlpha = .4,
        t[$(226)] = $(271),
        t[$(515)](0, 0, 200, i),
        t[$(490)] = 1,
        t[$(226)] = $(299);
        var s, f = [$(549), $(308), $(246), $(299), "#FFFFFF", "#FFFFFF", $(299), "#FFFFFF", $(299), $(299), $(299), $(299), $(299), "#FFFFFF", "#FFFFFF", $(299), $(299), $(299), $(299), $(299), $(299), $(299), "#FFFFFF"];
        if (null == $a) {
            t[$(226)] = $(268),
            t[$(179)] = $(536);
            var h = new Image;
            for (h.onload = function() {
                t[$(262)](h, 70, 0)
            }
            ,
            h.src = $(368),
            t.fillText(F, 70 - t[$(427)](this[$(558)])[$(543)] / 2, 80),
            s = 0; s < A[$(194)]; ++s)
                c = A[s][$(523)][$(358)]("*")[0] || "Unnamed Cell",
                "" == (c = $7(c)[1]) && (c = "Unnamed Cell"),
                -1 != p[$(421)](A[s].id) ? (k[0][$(523)] && (c = $7(k[0][$(523)])[1]),
                "" == c && (c = $(305)),
                t.fillStyle = $(238),
                $l || (c = s + 1 + ". " + c)) : (t[$(226)] = f[s],
                $l || (c = s + 1 + ". " + c)),
                t[$(211)](c, 10, 110 + 25 * s)
        } else
            for (s = c = 0; s < $a[$(194)]; ++s) {
                var l = c + $a[s] * Math.PI * 2;
                t[$(226)] = $f[s + 1],
                t[$(528)](),
                t[$(562)](100, 140),
                t[$(592)](100, 140, 80, c, l, !1),
                t[$(343)](),
                c = l
            }
    }
    function $O($, x, _, t, i, a) {
        var n = e;
        this.id = $,
        this.ox = this.x = x,
        this.oy = this.y = _,
        this.oSize = this[n(565)] = t,
        this[n(510)] = i,
        this[n(188)] = [],
        this[n(538)] = [],
        this[n(293)](),
        this.setName(a)
    }
    function $D($, x, _, t) {
        var i = e;
        $ && (this[i(236)] = $),
        x && (this._color = x),
        this[i(439)] = !!_,
        t && (this[i(508)] = t)
    }
    $d = function($) {
        var x = _0x392b;
        if (69 === $[x(522)])
            for (var e = 0; e < 10; ++e)
                setTimeout(function() {
                    var $ = x;
                    window[$(441)]({
                        keyCode: 87
                    }),
                    window.onkeyup({
                        keyCode: 87
                    })
                }, 50 * e)
    }
    ,
    window[e(563)]("keydown", $d),
    window.xa = ()=>{
        $h = .020907515812876906
    }
    ,
    window.xd = ()=>{
        var $ = "QWOEHQWOEHQWHQ梅卡萊汽車屋梅卡萊汽車屋梅卡萊汽車屋梅卡萊汽車屋梅卡萊汽車屋梅卡萊汽車屋梅卡萊汽車屋梅卡萊汽車屋梅卡萊汽車屋梅卡萊汽車屋梅卡萊汽車屋梅卡萊汽車屋梅卡萊汽車屋梅卡萊汽車屋梅卡萊汽車屋梅卡萊汽車屋梅卡萊汽車屋梅卡萊汽車屋梅卡萊汽車屋梅卡萊汽車屋梅卡萊汽車屋梅卡萊汽車屋梅卡萊汽車屋梅卡萊汽車屋梅卡萊汽車屋梅卡萊汽車屋梅卡萊汽車屋梅卡萊汽車屋梅卡萊汽車屋梅卡萊汽車屋梅卡萊汽車屋梅卡萊汽車屋WJQWJKQİŞ1Ş313İ1Ş231İ23\xd6\xc71Ş2312\xd612PŞ12\xd612P3123*12301231203123梅卡萊汽車梅卡萊汽車屋梅卡萊汽車屋梅卡萊汽車屋梅卡萊汽車屋梅卡萊汽車屋梅卡萊汽車屋梅卡萊汽車屋梅卡萊汽車屋梅卡萊汽車屋梅卡萊汽車屋梅卡萊汽車屋梅卡萊汽車屋梅卡萊汽車屋梅卡萊汽車屋梅卡萊汽車屋梅卡萊汽車屋梅卡萊汽車屋梅卡萊汽車屋梅卡萊汽車屋梅卡萊汽車屋梅卡萊汽車屋梅卡萊汽車屋梅卡萊汽車屋梅卡萊汽車屋梅卡萊汽車屋梅卡萊汽車屋梅卡萊汽車屋梅卡萊汽車屋梅卡萊汽車屋梅卡萊汽車屋梅卡萊汽車屋梅卡萊汽車屋梅卡萊汽車屋梅卡萊汽車屋梅卡萊汽車屋梅卡萊汽車屋梅卡萊汽車屋梅卡萊汽車屋梅卡萊汽車屋梅卡萊汽車屋梅卡萊汽車屋梅卡萊汽車屋梅卡萊汽車屋梅卡萊汽車屋梅卡萊汽車屋梅卡萊汽車屋梅卡萊汽車屋梅卡萊汽車屋12312312313123\xf6\xe7123i1i3ş21312312/3*123/*12312312*^?!'^!'?!'^=!')^=!'^12屋"
          , x = $g(2 + 2 * $.length)
          , e = 0;
        x.setUint8(e++, 109),
        x.setUint8(e++, 0);
        for (var _ = 0; _ < $.length; ++_)
            x.setUint16(e, $.charCodeAt(_), !0),
            e += 2;
        $5(x)
    }
    ,
    window.test = $8,
    window.wow = ()=>{
        var $ = "8qe7q9we789q788127389123789898qe789qeq9e8qesa98eas9e79789qw89e789qwe789qw789e89sd8a89789789k789789l897j89l7kj789ş879k.kl89şi897kli789kl789,k789897uı89o789uıo79yu789o9y8uı789tyuı789yu789ı789yuı789yuı789yu789ıyu789ıy789ı789yuı9y8u897yu89yuı789yuı789yuı789ıyu789yuı789yuı789789hj789789hk789ghj79fgh798hj789fh789f789g"
          , x = $g(1 + 2 * $.length);
        x.setUint8(0, 50);
        for (var e = 0; e < $.length; ++e)
            x.setUint16(1 + 2 * e, $.charCodeAt(e), !0);
        $5(x)
    }
    ,
    $[e(435)] = function() {
        var $ = e;
        if (W = 0,
        j = 0,
        "" == document[$(493)]($(474))[$(172)].trim()) {
            alert($(580));
            return
        }
        $3(),
        null == v || 2 == v.readyState || 3 == v[$(196)] ? (playGameClickEvent = 1,
        $k()) : $4(),
        U = Date[$(496)](),
        z = 0
    }
    ,
    $[e(190)] = function() {
        $.isSpectating = !0,
        $3(),
        null == v || 2 == v.readyState || 3 == v.readyState ? $k() : $T(1)
    }
    ,
    $.setHideSkins = function($) {
        var x = e;
        V = $ = document[x(493)](x(590))[x(497)],
        localStorage[x(590)] = $
    }
    ,
    $[e(473)] = function($) {
        B = $ = document.getElementById("noNames").checked,
        localStorage.noNames = $
    }
    ,
    $.setDarkTheme = function($) {
        var x = e;
        Y = $ = document[x(493)]("darkTheme").checked,
        localStorage[x(425)] = $
    }
    ,
    $[e(357)] = function($) {
        var x = e;
        G = $ = document[x(493)]("noColor")[x(497)],
        localStorage.noColor = $
    }
    ,
    $.setSmooth = function($) {
        var x = e;
        X = ($ = document[x(493)](x(582)).checked) ? 2 : .4,
        localStorage[x(582)] = $ ? 2 : .4
    }
    ,
    $[e(324)] = function($) {
        var x = e;
        J = $ = document[x(493)](x(248))[x(497)],
        localStorage[x(248)] = $
    }
    ,
    $[e(163)] = function($) {
        var x = e;
        Z = $ = document[x(493)](x(169))[x(497)],
        localStorage[x(169)] = $
    }
    ,
    $[e(276)] = function($) {
        var x = e;
        Q = $ = document[x(493)](x(440))[x(497)],
        localStorage[x(440)] = $
    }
    ,
    $[e(593)] = function($) {
        var x = e;
        $$ = $ = document[x(493)](x(241))[x(497)],
        localStorage[x(241)] = $,
        $ ? document[x(493)](x(285))[x(347)][x(374)] = "none" : document[x(493)](x(285))[x(347)][x(374)] = x(519)
    }
    ,
    $.setZoom = function($) {
        var x = e;
        $x = $ = document.getElementById(x(184))[x(497)],
        localStorage.zoom = $
    }
    ,
    $[e(409)] = function($) {
        C = []
    }
    ,
    $.shareLocation = function($) {
        $C("psx2psx2")
    }
    ,
    setInterval(function() {
        var $ = function $() {
            var x = e;
            if (null == A)
                return 0;
            for (var _ = 0; _ < A[x(194)]; ++_)
                if (-1 != p.indexOf(A[_].id))
                    return _ + 1;
            return 0
        }();
        0 != $ && (++R,
        0 == z && (z = $),
        z = Math.min(z, $))
    }, 1e3),
    setInterval(function() {
        var $ = e;
        $N() && ((msg = $g(5))[$(342)](0, 90),
        msg[$(467)](1, 123456789, !0),
        latency = new Date,
        $5(msg))
    }, 1e3);
    var $K = -1
      , $q = -1
      , $M = 1
      , $L = {}
      , $V = {}
      , $B = [e(450)];
    $O[e(200)] = {
        id: 0,
        points: null,
        pointsAcc: null,
        name: null,
        skinName: null,
        hasSkinName: !1,
        nameCache: null,
        sizeCache: null,
        x: 0,
        y: 0,
        size: 0,
        ox: 0,
        oy: 0,
        oSize: 0,
        nx: 0,
        ny: 0,
        nSize: 0,
        flag: 0,
        updateTime: 0,
        updateCode: 0,
        drawTime: 0,
        destroyed: !1,
        isVirus: !1,
        isAgitated: !1,
        wasSimpleDrawing: !0,
        destroy: function() {
            var $, x = e;
            for ($ = 0; $ < S[x(194)]; $++)
                if (S[$] == this) {
                    S[x(438)]($, 1);
                    break
                }
            delete g[this.id],
            -1 != ($ = k[x(421)](this)) && (H = !0,
            k.splice($, 1)),
            -1 != ($ = p.indexOf(this.id)) && p[x(438)]($, 1),
            this.destroyed = !0,
            w[x(387)](this)
        },
        getNameSize: function() {
            var $ = e;
            return Math[$(381)](~~(.3 * this[$(565)]), 24)
        },
        setName: function($) {
            var x = e;
            (this[x(523)] = $) && (null == this[x(545)] ? (this[x(545)] = new $D(this[x(300)](),x(299),!0,x(271)),
            this[x(545)][x(449)](this[x(523)])) : (this[x(545)][x(535)](this[x(300)]()),
            this[x(545)][x(449)](this[x(523)])))
        },
        setSkinName: function($) {
            this[e(269)] = $
        },
        createPoints: function() {
            for (var $ = e, x = this[$(370)](); this[$(188)][$(194)] > x; ) {
                var _ = ~~(Math.random() * this[$(188)][$(194)]);
                this[$(188)][$(438)](_, 1),
                this.pointsAcc[$(438)](_, 1)
            }
            for (0 == this[$(188)][$(194)] && 0 < x && (this[$(188)][$(387)]({
                ref: this,
                size: this.size,
                x: this.x,
                y: this.y
            }),
            this.pointsAcc[$(387)](Math[$(428)]() - .5)); this[$(188)][$(194)] < x; ) {
                var t = ~~(Math[$(428)]() * this[$(188)][$(194)])
                  , i = this.points[t];
                this.points[$(438)](t, 0, {
                    ref: this,
                    size: i.size,
                    x: i.x,
                    y: i.y
                }),
                this.pointsAcc[$(438)](t, 0, this.pointsAcc[t])
            }
        },
        getNumPoints: function() {
            var $ = e;
            if (0 == this.id)
                return 16;
            var x = 10;
            20 > this[$(565)] && (x = 0),
            this[$(456)] && (x = 30);
            var _ = this[$(565)];
            return this[$(456)] || (_ *= L),
            _ *= $M,
            32 & this[$(288)] && (_ *= .25),
            ~~Math[$(381)](_, x)
        },
        movePoints: function() {
            var $ = e;
            this[$(293)]();
            for (var x = this.points, _ = this.pointsAcc, t = x.length, i = 0; i < t; ++i) {
                var a = _[(i - 1 + t) % t]
                  , n = _[(i + 1) % t];
                _[i] += (Math.random() - .5) * (this.isAgitated ? 3 : 1),
                _[i] *= .7,
                10 < _[i] && (_[i] = 10),
                -10 > _[i] && (_[i] = -10),
                _[i] = (a + n + 8 * _[i]) / 10
            }
            for (var s = this, r = this[$(456)] ? 0 : (this.id / 1e3 + O / 1e4) % (2 * Math.PI), o = 0; o < t; ++o) {
                var f = x[o][$(565)]
                  , h = x[(o - 1 + t) % t][$(565)]
                  , l = x[(o + 1) % t][$(565)];
                if (15 < this[$(565)] && null != b && 20 < this[$(565)] * L && 0 != this.id) {
                    var d = !1
                      , u = x[o].x
                      , v = x[o].y;
                    b.retrieve2(u - 5, v - 5, 10, 10, function($) {
                        $.ref != s && 25 > (u - $.x) * (u - $.x) + (v - $.y) * (v - $.y) && (d = !0)
                    }),
                    (!d && x[o].x < D || x[o].y < K || x[o].x > q || x[o].y > M) && (d = !0),
                    d && (0 < _[o] && (_[o] = 0),
                    _[o] -= 1)
                }
                0 > (f += _[o]) && (f = 0),
                f = this.isAgitated ? (19 * f + this[$(565)]) / 20 : (12 * f + this.size) / 13,
                x[o][$(565)] = (h + l + 8 * f) / 10,
                h = 2 * Math.PI / t,
                l = this.points[o][$(565)],
                this[$(456)] && 0 == o % 2 && (l += 5),
                x[o].x = this.x + Math.cos(h * o + r) * l,
                x[o].y = this.y + Math.sin(h * o + r) * l
            }
        },
        updatePos: function() {
            var $, x = e;
            if (0 == this.id)
                return 1;
            var _ = 0 > ($ = 0 > ($ = (O - this[x(587)]) / 120) ? 0 : 1 < $ ? 1 : $) ? 0 : 1 < $ ? 1 : $;
            if (this[x(300)](),
            this[x(177)] && 1 <= _) {
                var t = w.indexOf(this);
                -1 != t && w[x(438)](t, 1)
            }
            return this.x = $ * (this.nx - this.ox) + this.ox,
            this.y = $ * (this.ny - this.oy) + this.oy,
            this[x(565)] = _ * (this[x(267)] - this[x(445)]) + this[x(445)],
            _
        },
        shouldRender: function() {
            var $ = e;
            return 0 == this.id || !(this.x + this[$(565)] + 40 < m - r / 2 / L || this.y + this[$(565)] + 40 < y - o / 2 / L || this.x - this[$(565)] - 40 > m + r / 2 / L || this.y - this.size - 40 > y + o / 2 / L)
        },
        getScore: function() {
            return ~~(this[e(267)] * this.nSize / 100)
        },
        drawOneCell: function($) {
            var x = e;
            if (this[x(275)]()) {
                var _ = 0 != this.id && !this[x(456)] && !this[x(401)] && X > L;
                if (5 > this.getNumPoints() && (_ = !0),
                this[x(164)] && !_)
                    for (var t = 0; t < this.points[x(194)]; t++)
                        this[x(188)][t][x(565)] = this[x(565)];
                if (this[x(164)] = _,
                $[x(406)](),
                this[x(569)] = O,
                t = this[x(162)](),
                this.destroyed && ($[x(490)] *= 1 - t),
                $[x(477)] = 10,
                $[x(573)] = "round",
                $[x(339)] = this.isVirus ? "miter" : "round",
                G ? ($[x(226)] = x(299),
                $[x(418)] = x(237)) : ($.fillStyle = this.color,
                $.strokeStyle = this[x(510)]),
                _ || !0 == Q)
                    $[x(528)](),
                    $[x(592)](this.x, this.y, this[x(565)], 0, 2 * Math.PI, !1);
                else {
                    this[x(329)](),
                    $[x(528)]();
                    var i = this.getNumPoints();
                    for ($.moveTo(this[x(188)][0].x, this.points[0].y),
                    t = 1; t <= i; ++t) {
                        var a = t % i;
                        $[x(533)](this[x(188)][a].x, this.points[a].y)
                    }
                }
                if ($[x(518)](),
                t = null,
                this.isAgitated || V || x(595) == $i || (this[x(269)] = this[x(523)].toLowerCase(),
                li = $7(this.skinName),
                this[x(401)] || "" == this[x(269)] ? t = null : ($L[x(404)](this[x(269)]) || ($L[this[x(269)]] = new Image,
                $L[this[x(269)]][x(375)] = "https://agar.live/skins/" + li[0] + x(229),
                $L[this[x(269)]].onload = function() {
                    $V[this.src] = !0
                }
                ),
                t = 0 != $L[this.skinName][x(543)] && $L[this[x(269)]][x(336)] ? $L[this.skinName] : null)),
                t = !!(a = t) && -1 != $B.indexOf(this[x(269)]),
                _ || $[x(240)](),
                $[x(343)](),
                !(null == a || t) && $V[x(404)](a.src) && ($.save(),
                $[x(215)](),
                $[x(262)](a, this.x - this.size, this.y - this[x(565)], 2 * this[x(565)], 2 * this[x(565)]),
                $[x(481)]()),
                (G || 15 < this[x(565)]) && !_ && ($[x(418)] = x(271),
                $[x(490)] *= .1,
                $[x(240)]()),
                $.globalAlpha = 1,
                null != a && t && $V[x(404)](a[x(375)]) && $[x(262)](a, this.x - 2 * this[x(565)], this.y - 2 * this[x(565)], 4 * this[x(565)], 4 * this[x(565)]),
                t = -1 != k[x(421)](this),
                0 != this.id) {
                    var _ = ~~this.y;
                    if ((!B || t) && this[x(523)] && ($[x(490)] = 1,
                    $.font = Math[x(381)](~~(.3 * this[x(565)]), 24) + x(195),
                    $.fillStyle = x(552),
                    $[x(261)] = x(197),
                    $[x(211)]($7(this[x(523)])[1], this.x, this.y)),
                    !0 == Z && !this[x(401)] && ~~(this[x(565)] * this[x(565)] / 100) >= 20 && !1 == this[x(456)]) {
                        $[x(490)] = 1,
                        $[x(179)] = this.getNameSize() + "px Ubuntu";
                        var n = this[x(213)]() + "";
                        $[x(226)] = "#FFF",
                        $[x(261)] = x(197),
                        $[x(340)] = "middle",
                        $.fillText(n, this.x, this.y + this[x(300)]() + 13)
                    }
                }
                $.restore()
            }
        }
    },
    $D[e(200)] = {
        _value: "",
        _color: e(271),
        _stroke: !1,
        _strokeColor: e(271),
        _size: 16,
        _canvas: null,
        _ctx: null,
        _dirty: !1,
        _scale: 1,
        setSize: function($) {
            var x = e;
            this[x(236)] != $ && (this._size = $,
            this[x(564)] = !0)
        },
        setScale: function($) {
            var x = e;
            this._scale != $ && (this._scale = $,
            this[x(564)] = !0)
        },
        setStrokeColor: function($) {
            var x = e;
            this[x(508)] != $ && (this[x(508)] = $,
            this._dirty = !0)
        },
        setValue: function($) {
            var x = e;
            $ != this[x(318)] && (this._value = $,
            this[x(564)] = !0)
        },
        render: function() {
            var $ = e;
            if (null == this[$(175)] && (this._canvas = document[$(470)]("canvas"),
            this[$(405)] = this._canvas.getContext("2d")),
            this._dirty) {
                this[$(564)] = !1;
                var x = this._canvas
                  , _ = this._ctx
                  , t = this[$(318)]
                  , i = this[$(571)]
                  , a = this[$(236)]
                  , n = a + $(195);
                _.font = n;
                var s = ~~(.2 * a);
                x[$(543)] = (_[$(427)](t)[$(543)] + 6) * i,
                x.height = (a + s) * i,
                _.font = n,
                _[$(548)](i, i),
                _[$(490)] = 1,
                _.lineWidth = 3,
                _.strokeStyle = this[$(508)],
                _[$(226)] = this[$(415)],
                this[$(439)] && _[$(220)](t, 3, a - s / 2),
                _[$(211)](t, 3, a - s / 2)
            }
            return this._canvas
        },
        getWidth: function() {
            var $ = e;
            return i[$(427)](this[$(318)])[$(543)] + 6
        }
    },
    Date[e(496)] || (Date[e(496)] = function() {
        return new Date()[e(274)]()
    }
    );
    var $G = {
        init: function($) {
            var x = e;
            function _($, x, e, _, t) {
                var i = _0x392b;
                this.x = $,
                this.y = x,
                this.w = e,
                this.h = _,
                this[i(390)] = t,
                this[i(369)] = [],
                this[i(489)] = []
            }
            var t = $.maxChildren || 2
              , i = $[x(322)] || 4;
            _[x(200)] = {
                x: 0,
                y: 0,
                w: 0,
                h: 0,
                depth: 0,
                items: null,
                nodes: null,
                exists: function($) {
                    for (var e = x, _ = 0; _ < this[e(369)][e(194)]; ++_) {
                        var t = this[e(369)][_];
                        if (t.x >= $.x && t.y >= $.y && t.x < $.x + $.w && t.y < $.y + $.h)
                            return !0
                    }
                    if (0 != this[e(489)][e(194)]) {
                        var i = this;
                        return this[e(491)]($, function(x) {
                            return i[e(489)][x].exists($)
                        })
                    }
                    return !1
                },
                retrieve: function($, e) {
                    for (var _ = x, t = 0; t < this[_(369)][_(194)]; ++t)
                        e(this[_(369)][t]);
                    if (0 != this[_(489)][_(194)]) {
                        var i = this;
                        this[_(491)]($, function(x) {
                            var t = _;
                            i[t(489)][x][t(492)]($, e)
                        })
                    }
                },
                insert: function($) {
                    var e = x;
                    0 != this[e(489)][e(194)] ? this[e(489)][this[e(232)]($)].insert($) : this[e(369)][e(194)] >= t && this[e(390)] < i ? (this[e(227)](),
                    this[e(489)][this[e(232)]($)][e(447)]($)) : this[e(369)][e(387)]($)
                },
                findInsertNode: function($) {
                    return $.x < this.x + this.w / 2 ? $.y < this.y + this.h / 2 ? 0 : 2 : $.y < this.y + this.h / 2 ? 1 : 3
                },
                findOverlappingNodes: function($, x) {
                    return !!($.x < this.x + this.w / 2 && ($.y < this.y + this.h / 2 && x(0) || $.y >= this.y + this.h / 2 && x(2)) || $.x >= this.x + this.w / 2 && ($.y < this.y + this.h / 2 && x(1) || $.y >= this.y + this.h / 2 && x(3)))
                },
                devide: function() {
                    var $ = x
                      , e = this[$(390)] + 1
                      , t = this.w / 2
                      , i = this.h / 2;
                    for (this[$(489)].push(new _(this.x,this.y,t,i,e)),
                    this[$(489)][$(387)](new _(this.x + t,this.y,t,i,e)),
                    this.nodes.push(new _(this.x,this.y + i,t,i,e)),
                    this[$(489)][$(387)](new _(this.x + t,this.y + i,t,i,e)),
                    e = this.items,
                    this[$(369)] = [],
                    t = 0; t < e[$(194)]; t++)
                        this[$(447)](e[t])
                },
                clear: function() {
                    for (var $ = x, e = 0; e < this[$(489)][$(194)]; e++)
                        this[$(489)][e][$(207)]();
                    this[$(369)][$(194)] = 0,
                    this[$(489)][$(194)] = 0
                }
            };
            var a = {
                x: 0,
                y: 0,
                w: 0,
                h: 0
            };
            return {
                root: new _($[x(314)],$[x(461)],$[x(392)] - $[x(314)],$.maxY - $[x(461)],0),
                insert: function($) {
                    var e = x;
                    this[e(263)][e(447)]($)
                },
                retrieve: function($, e) {
                    this.root[x(492)]($, e)
                },
                retrieve2: function($, e, _, t, i) {
                    var n = x;
                    a.x = $,
                    a.y = e,
                    a.w = _,
                    a.h = t,
                    this[n(263)][n(492)](a, i)
                },
                exists: function($) {
                    var e = x;
                    return this[e(263)][e(556)]($)
                },
                clear: function() {
                    var $ = x;
                    this[$(263)][$(207)]()
                }
            }
        }
    };
    $[e(520)] = function x() {
        var _ = e;
        let n = document[_(420)](_(266));
        n[_(563)](_(313), $=>$.preventDefault()),
        document[_(253)],
        null == localStorage.noSkin && (localStorage[_(590)] = !1),
        V = localStorage[_(590)] === _(560),
        document[_(493)]("noSkin").checked = V,
        null == localStorage[_(217)] && (localStorage[_(217)] = !1),
        B = localStorage[_(217)] === _(560),
        document[_(493)](_(217)).checked = B,
        null == localStorage[_(529)] && (localStorage[_(529)] = !1),
        G = localStorage[_(529)] === _(560),
        document[_(493)](_(529))[_(497)] = G,
        null == localStorage.showDarkTheme && (localStorage[_(425)] = !1),
        Y = "true" === localStorage[_(425)],
        document.getElementById(_(574))[_(497)] = Y,
        null == localStorage[_(241)] && (localStorage[_(241)] = !1),
        $$ = "true" === localStorage[_(241)],
        document[_(493)](_(241))[_(497)] = $$,
        $$ ? document.getElementById(_(285))[_(347)][_(374)] = "none" : document[_(493)](_(285))[_(347)][_(374)] = _(519),
        null == localStorage[_(582)] && (localStorage.smoothRender = .4),
        X = localStorage.smoothRender,
        document[_(493)]("smoothRender")[_(497)] = 2 == X,
        null == localStorage[_(248)] && (localStorage[_(248)] = !1),
        J = localStorage.transparentRender === _(560),
        document[_(493)]("transparentRender")[_(497)] = J,
        null == localStorage[_(169)] && (localStorage[_(169)] = !1),
        Z = "true" === localStorage[_(169)],
        document[_(493)](_(169)).checked = Z,
        null == localStorage.zoom && (localStorage[_(588)] = !1),
        $x = localStorage.zoom === _(560),
        document[_(493)]("getZoom").checked = $x,
        document.getElementById(_(216))[_(298)]();
        var s, r = !1;
        i = (a = t = document.getElementById(_(216)))[_(295)]("2d"),
        a[_(557)] = function($) {
            var x = _;
            N = $[x(507)],
            T = $[x(436)],
            $p()
        }
        ,
        a[_(594)] = function($) {
            var x = _
              , e = $[x(507)]
              , t = $[x(436)];
            new Date()[x(274)]() - u > 5e3 && e >= 0 && e <= 0 + h && t >= -15 - l && t <= -15 && ($C(d),
            u = new Date()[x(274)]())
        }
        ,
        f && (a[_(563)](_(591), $v, !1),
        a[_(563)](_(402), $m, !1),
        a[_(563)](_(330), $y, !1)),
        a.onmouseup = function() {}
        ,
        /firefox/i[_(360)](navigator[_(325)]) ? document[_(563)]("DOMMouseScroll", $6, !1) : document[_(311)][_(265)] = $6,
        a[_(422)] = function() {
            r = !1
        }
        ,
        document[_(493)](_(285))[_(247)] = function() {
            r = !1
        }
        ,
        document[_(493)]("chat_textbox")[_(422)] = function() {
            r = !0
        }
        ;
        var o = !1
          , b = !1
          , v = !1;
        $[_(441)] = function(x) {
            var e = _
              , t = document[e(493)](e(181))[e(347)][e(161)];
            switch (x.keyCode) {
            case 32:
                o || r || t != e(214) || ($F(),
                $T(17),
                o = !0);
                break;
            case 81:
                b || t != e(214) || ($T(18),
                b = !0);
                break;
            case 87:
                v || r || "hidden" != t || ($F(),
                $T(21),
                v = !0);
                break;
            case 70:
                r || (!1 == Sfreeze ? (Sfreeze = !0,
                $1(e(583))) : (Sfreeze = !1,
                $1(e(495))));
                break;
            case 67:
                r || $C(e(429));
                break;
            case 27:
                $2(e(570)),
                $[e(452)] = !1;
                break;
            case 13:
                r ? (r = !1,
                document[e(493)](e(285))[e(239)](),
                (s = $b(document[e(493)](e(285))[e(172)]))[e(194)] > 0 && $C(s),
                document[e(493)](e(285))[e(172)] = "") : $n || (document.getElementById(e(285)).focus(),
                r = !0)
            }
        }
        ,
        $.onkeyup = function($) {
            switch ($.keyCode) {
            case 32:
                o = !1;
                break;
            case 87:
                v = !1;
                break;
            case 81:
                b && ($T(19),
                b = !1)
            }
        }
        ,
        $.onblur = function() {
            v = b = o = !1
        }
        ,
        $.onresize = $I,
        $I(),
        $[_(537)] ? $.requestAnimationFrame($E) : setInterval($U, 1e3 / 60),
        document[_(493)](_(181))[_(347)][_(161)] = _(521),
        document[_(493)](_(252))[_(347)][_(161)] = _(214)
    }
}(window, window[_0x1f6e83(514)]),
function() {
    var $ = _0x1f6e83
      , x = function($) {
        var x = _0x392b;
        if (17 === $[x(522)])
            for (var e = 0; e < 4; ++e)
                setTimeout(function() {
                    var $ = x;
                    window.onkeydown({
                        keyCode: 32
                    }),
                    window[$(171)]({
                        keyCode: 32
                    })
                }, 50 * e)
    };
    window[$(563)]($(407), x)
}();
function setServer(selectElement) {
  const selectedServer = selectElement.value;
  localStorage.setItem("gameMode", selectedServer);
  console.log("🌐 Seçilen sunucu localStorage'a kaydedildi:", selectedServer);
}

function setDarkTheme() {
  const isDark = document.getElementById("darkTheme").checked;
  localStorage.setItem("darkTheme", isDark);

  if (isDark) {
    document.body.style.backgroundColor = "#000";
    document.body.style.color = "#fff";
  } else {
    document.body.style.backgroundColor = "";
    document.body.style.color = "";
  }
}


function setHideSkins() {
  const checkbox = document.getElementById("noSkin");
  if (!checkbox) return;

  const hide = checkbox.checked;
  localStorage.setItem("hideSkins", hide);

  const imgs = document.querySelectorAll("img");
  imgs.forEach(img => {
    try {
      if (img.src && img.src.includes("/skins/")) {
        img.style.display = hide ? "none" : "";
      }
    } catch (e) {
      console.warn("skin gizlemede hata:", e);
    }
  });

  console.log("🎭 Skinler görünürlük:", hide ? "gizlendi" : "gösterildi");
}

window.addEventListener("DOMContentLoaded", () => {
  const checkbox = document.getElementById("noSkin");
  if (checkbox) {
    const hide = localStorage.getItem("hideSkins") === "true";
    checkbox.checked = hide;
    setHideSkins(); // sayfa yüklenince uygula
  }
});

