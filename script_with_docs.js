function Minesweeper(A, Q, s) {
    var E = this;
    var gti;
    var rows;
    var cols;
    var mines;
    var zoomlvl;
    /**
     * @inner
     * Grid Obj
     */
    var o;
    /**
     * @inner
     * if "ae" in newGame exists, is true. Otherwise, is false
     */
    var p;
    /**
     * @inner
     * Number of mines for the newGame function
     */
    var K;
    /**
     * @inner
     * Number of non-mines for the newGame function
     */
    var G;
    /**
     * @inner
     * Grid Management Varible
     */
    var I;
    /**
     * @inner
     * Array containing the square pressed/hovered
     */
    var c;
    /**
     * @inner
     * Time Varible
     */
    var U = new F();
    /**
     * @inner
     * Game Over Varible
     */
    var L;
    /**
     * @inner
     * Playing Varible
     */
    var g;
    /**
     * @inner
     * Backup Grid Managment
     */
    var M;
    /**
     * @inner
     * Game ID
     */
    var r;
    /**
     * tests if the browser is compatable
     */
    var k;
    /**
     * @inner
     * Mouse Press Tracker
     */
    var D;
    /**
     * @inner
     * Mouse Press Tracker
     */
    var e;
    /**
     * @inner
     * Mouse Press Tracker
     */
    var v;
    /**
     * @inner
     * Unknown, set to Null in newGame, called by ae(), but not changed, and not needed
     */
    var d;
    /**
     * @inner
     * Gusture Tracker
     */
    var C;
    /**
     * @inner
     * Likely First-Press protection
     */
    var y;
    P();
    this.newGame = function (ae, Y) {
        var af, ab;
        var ad;
        var aa, ac;
        var Z;
        aa = S();
        Z = Q();
        gti = Z.gameTypeId;
        rows = Z.numRows;
        cols = Z.numCols;
        mines = Z.numMines;
        zoomlvl = Z.zoom;
        if (Y) {
            if (typeof Y.gameTypeId !== "undefined") {
                gti = Y.gameTypeId
            }
            if (typeof Y.numRows !== "undefined") {
                rows = Y.numRows
            }
            if (typeof Y.numCols !== "undefined") {
                cols = Y.numCols
            }
            if (typeof Y.numMines !== "undefined") {
                mines = Y.numMines
            }
        }
        ac = (S() != aa);
        w(zoomlvl);
        if (ac) {
            V()
        }
        l(ae);
        q();
        p = !!ae;
        K = mines;
        G = rows * cols - mines;
        for (af = 1; af <= rows; af++) {
            for (ab = 1; ab <= cols; ab++) {
                ad = I[af][ab];
                if (ad.isFlagged()) {
                    ad.setClass("square bombflagged");
                    K--
                } else {
                    if (ad.isMarked()) {
                        ad.setClass("square question")
                    } else {
                        if (ad.isRevealed()) {
                            ad.setClass("square open" + ad.getValue());
                            if (!ad.isHidden()) {
                                G--
                            }
                        } else {
                            ad.setClass("square blank")
                        }
                    }
                }
            }
        }
        U.stop();
        if (!p) {
            U.setTime(0)
        } else {
            if (Y && typeof Y.time !== "undefined") {
                U.setTime(Y.time)
            } else { }
        }
        W();
        L = false;
        g = false;
        D = false;
        e = false;
        v = false;
        isMouseDownForCtrlClick = false;
        d = null;
        C = false;
        y = false;
        $("#face")[0].className = "facesmile";
        hoveredSquareId = ""
    };
    this.resize = function (Y) {
        var Z = n(Y);
        w(Y);
        $("#game-container").removeClass("z" + zoomlvl * 100).addClass("z" + Y * 100);
        $("#face").css({
            "margin-left": Math.floor(Z) + "px",
            "margin-right": Math.ceil(Z) + "px"
        });
        zoomlvl = Y
    };
    this.hasStartedPlaying = function () {
        return g
    };
    this.export_ = function () {
        var aa = z(true);
        var Z = U.getTime();
        var Y = {
            version: 1,
            gameTypeId: gti,
            numRows: rows,
            numCols: cols,
            numMines: mines,
            gridObj: aa,
            time: Z
        };
        y = true;
        return btoa(JSON.stringify(Y))
    };
    this.isImportable = function (aa) {
        try {
            var Y = JSON.parse(atob(aa));
            return Y.version === 1
        } catch (Z) {
            return false
        }
    };
    this.import_ = function (ae) {
        var aa = JSON.parse(atob(ae));
        var ag, Z;
        var af, ad;
        var ac = [];
        for (ag = 0; ag <= aa.numRows + 1; ag++) {
            ac[ag] = [];
            for (Z = 0; Z <= aa.numCols + 1; Z++) {
                af = aa.gridObj[ag][Z];
                if (typeof af === "number") {
                    ad = {
                        value: af,
                        isRevealed: false,
                        isFlagged: false,
                        isMarked: false
                    }
                } else {
                    ad = {
                        value: af[0],
                        isRevealed: af[1] === 1,
                        isFlagged: af[2] === 1,
                        isMarked: af[3] === 1
                    }
                }
                ac[ag][Z] = ad
            }
        }
        var Y = {
            gridObj: ac
        };
        var ab = {
            gameTypeId: aa.gameTypeId,
            numRows: aa.numRows,
            numCols: aa.numCols,
            numMines: aa.numMines,
            time: aa.time
        };
        s({
            gameTypeId: aa.gameTypeId,
            numRows: aa.numRows,
            numCols: aa.numCols,
            numMines: aa.numMines
        });
        E.newGame(Y, ab)
    };

    /**
     * 
     * @param {number} Y Zoom Level (1 <= Y >= 2)
     * @description
     * Sets the zoom values for the game
     */
    function w(Y) {
        $("#game-container, #game").width(Y * (cols * 16 + 20));
        $("#game").height(Y * (rows * 16 + 30 + 26 + 6))
    }

    /**
     * 
     * @param {number} Y Zoom Level
     * @description
     * Returns a special margin value for use in the V function as the margins of the smile
     */
    function n(Y) {
        return (Y * cols * 16 - 6 * Math.ceil(Y * 13) - Y * 2 * 6 - Y * 26) / 2
    }

    /**
     * Returns a string with a "ROW_COL_MINES" format
     */
    function S() {
        return rows + "_" + cols + "_" + mines
    }
    /**
     * Makes a new minesweeper grid for the site
     */
    function V() {
        var ab, Y;
        var Z = [];
        var aa = n(zoomlvl);
        Z.push('<div class="bordertl"></div>');
        for (Y = 0; Y < cols; Y++) {
            Z.push('<div class="bordertb"></div>')
        }
        Z.push('<div class="bordertr"></div>');
        Z.push('<div class="borderlrlong"></div>', '<div class="time0" id="mines_hundreds"></div>', '<div class="time0" id="mines_tens"></div>', '<div class="time0" id="mines_ones"></div>', '<div class="facesmile" style="margin-left:', Math.floor(aa), "px; margin-right: ", Math.ceil(aa), 'px;" id="face"></div>', '<div class="time0" id="seconds_hundreds"></div>', '<div class="time0" id="seconds_tens"></div>', '<div class="time0" id="seconds_ones"></div>', '<div class="borderlrlong"></div>');
        Z.push('<div class="borderjointl"></div>');
        for (Y = 0; Y < cols; Y++) {
            Z.push('<div class="bordertb"></div>')
        }
        Z.push('<div class="borderjointr"></div>');
        for (ab = 1; ab <= rows; ab++) {
            Z.push('<div class="borderlr"></div>');
            for (Y = 1; Y <= cols; Y++) {
                Z.push('<div class="square blank" id="', ab, "_", Y, '"></div>')
            }
            Z.push('<div class="borderlr"></div>')
        }
        Z.push('<div class="borderbl"></div>');
        for (Y = 0; Y < cols; Y++) {
            Z.push('<div class="bordertb"></div>')
        }
        Z.push('<div class="borderbr"></div>');
        for (Y = 0; Y <= cols + 1; Y++) {
            Z.push('<div class="square blank" style="display: none;" id="', 0, "_", Y, '"></div>')
        }
        for (Y = 0; Y <= cols + 1; Y++) {
            Z.push('<div class="square blank" style="display: none;" id="', rows + 1, "_", Y, '"></div>')
        }
        for (ab = 1; ab <= rows; ab++) {
            Z.push('<div class="square blank" style="display: none;" id="', ab, "_", 0, '"></div>');
            Z.push('<div class="square blank" style="display: none;" id="', ab, "_", cols + 1, '"></div>')
        }
        $("#game").html(Z.join(""))
    }

    /**
     * Sub-function holder
     * 
     * Values:
     * - addToValue 
     * - isMine
     * - isFlagged
     * - isMarked
     * - isRevealed
     * - isHidden
     * - getRow
     * - getCol
     * - getValue
     * - setRevealed
     * - plantMine
     * - unplantMine
     * - getClass
     * - reveal1
     * - flag
     * - _showFlagAnimation
     * - serializeToObj
     * - deserializeFromObj
     */
    function u(ad, Z) {
        var ab = 0;
        var aa = false;
        var Y = false;
        var ac = false;
        this.addToValue = function (ae) {
            ab += ae
        };
        this.isMine = function () {
            return ab < 0
        };
        this.isFlagged = function () {
            return aa
        };
        this.isMarked = function () {
            return Y
        };
        this.isRevealed = function () {
            return ac
        };
        this.isHidden = function () {
            return ad < 1 || ad > rows || Z < 1 || Z > cols
        };
        this.getRow = function () {
            return ad
        };
        this.getCol = function () {
            return Z
        };
        this.getValue = function () {
            return ab
        };
        this.setRevealed = function (ae) {
            ac = ae
        };
        this.plantMine = function () {
            ab -= 10;
            I[ad - 1][Z - 1].addToValue(1);
            I[ad - 1][Z].addToValue(1);
            I[ad - 1][Z + 1].addToValue(1);
            I[ad][Z - 1].addToValue(1);
            I[ad][Z + 1].addToValue(1);
            I[ad + 1][Z - 1].addToValue(1);
            I[ad + 1][Z].addToValue(1);
            I[ad + 1][Z + 1].addToValue(1)
        };
        this.unplantMine = function () {
            ab += 10;
            I[ad - 1][Z - 1].addToValue(-1);
            I[ad - 1][Z].addToValue(-1);
            I[ad - 1][Z + 1].addToValue(-1);
            I[ad][Z - 1].addToValue(-1);
            I[ad][Z + 1].addToValue(-1);
            I[ad + 1][Z - 1].addToValue(-1);
            I[ad + 1][Z].addToValue(-1);
            I[ad + 1][Z + 1].addToValue(-1)
        };
        this.setClass = function (ae) {
            document.getElementById(ad + "_" + Z).className = ae
        };
        this.reveal1 = function () {
            var ae, af;
            var ag, ah;
            var ai = [];
            ai.push(this);
            this.pushed = true;
            while (ai.length > 0) {
                ag = ai.pop();
                if (!ag.isRevealed() && !ag.isFlagged()) {
                    if (ag.isMine()) {
                        return false
                    } else {
                        if (!ag.isFlagged()) {
                            ag.setClass("square open" + ag.getValue());
                            ag.setRevealed(true);
                            if (!ag.isHidden() && --G == 0) {
                                J();
                                return true
                            }
                            if (ag.getValue() == 0 && !ag.isHidden()) {
                                for (ae = -1; ae <= 1; ae++) {
                                    for (af = -1; af <= 1; af++) {
                                        ah = I[ag.getRow() + ae][ag.getCol() + af];
                                        if (!ah.pushed && !ah.isHidden() && !ah.isRevealed()) {
                                            ai.push(ah);
                                            ah.pushed = true
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            q();
            return true
        };
        this.flag = function (ae) {
            if (!ac) {
                if (aa) {
                    if ($("#marks").attr("checked")) {
                        this.setClass("square question");
                        Y = true
                    } else {
                        this.setClass("square blank");
                        if (ae) {
                            this._showFlagAnimation(true)
                        }
                    }
                    aa = false;
                    K++;
                    W()
                } else {
                    if (Y) {
                        this.setClass("square blank");
                        Y = false
                    } else {
                        this.setClass("square bombflagged");
                        aa = true;
                        K--;
                        W();
                        if (ae) {
                            this._showFlagAnimation()
                        }
                    }
                }
                q()
            }
        };
        this._showFlagAnimation = function (af) {
            var al = $("#" + ad + "_" + Z);
            var ag = al.offset();
            var aj = ag.left + al.width() / 2;
            var ai = ag.top + al.height() / 2;
            var ao = 57 * zoomlvl * 1.75;
            var ah = 79 * zoomlvl * 1.75;
            var ae = {
                left: aj - ao / 2,
                top: ai - ah / 2,
                width: ao + "px",
                height: ah + "px",
                opacity: 0
            };
            var am = {
                left: aj,
                top: ai,
                width: 0,
                height: 0,
                opacity: 1
            };
            if (af) {
                var an = ae;
                ae = am;
                am = an
            }
            var ak = $('<img src="flag.png" class="flag-animation"></div>').css(ae);
            $("body").append(ak);
            setTimeout(function () {
                ak.css(am)
            }, 0);
            setTimeout(function () {
                ak.remove()
            }, 500)
        };
        this.serializeToObj = function (ae) {
            if (ae) {
                if (!ac && !aa && !Y) {
                    return ab
                } else {
                    return [ab, ac ? 1 : 0, aa ? 1 : 0, Y ? 1 : 0]
                }
            } else {
                return {
                    value: ab,
                    isRevealed: ac,
                    isFlagged: aa,
                    isMarked: Y
                }
            }
        };
        this.deserializeFromObj = function (ae) {
            ab = ae.value;
            aa = ae.isFlagged;
            Y = ae.isMarked;
            ac = ae.isRevealed
        }
    }
    /**
     * 
     * @description This is the main function used to lay the mines
     * @param {Object?} ab
     */
    function l(ab) {
        var ad, Y, Z;
        var aa;
        I = [];
        c = [];
        M = [];
        Z = 0;
        for (ad = 0; ad <= rows + 1; ad++) {
            I[ad] = [];
            for (Y = 0; Y <= cols + 1; Y++) {
                aa = new u(ad, Y);
                I[ad][Y] = aa;
                c[ad + "_" + Y] = aa;
                if (!aa.isHidden()) {
                    M[Z++] = aa
                }
            }
        }
        if (ab) {
            var ac = ab.gridObj;
            for (ad = 0; ad <= rows + 1; ad++) {
                for (Y = 0; Y <= cols + 1; Y++) {
                    I[ad][Y].deserializeFromObj(ac[ad][Y])
                }
            }
            M = [];
            for (ad = 0; ad <= rows + 1; ad++) {
                for (Y = 0; Y <= cols + 1; Y++) {
                    aa = I[ad][Y];
                    if (!aa.isHidden() && !aa.isMine()) {
                        M.push(aa)
                    }
                }
            }
        } else {
            for (Z = 0; Z < mines; Z++) {
                M.splice(Math.floor(Math.random() * M.length), 1)[0].plantMine() //#f00
            }
        }
    }

    /**
     * 
     * @param {Boolean} Z
     * @returns {Object} Grid Object
     * @decription
     * Pull the current grid state
     */
    function z(Z) {
        var aa = [];
        var ab, Y;
        for (ab = 0; ab <= rows + 1; ab++) {
            aa[ab] = [];
            for (Y = 0; Y <= cols + 1; Y++) {
                aa[ab][Y] = I[ab][Y].serializeToObj(Z)
            }
        }
        return aa
    }

    /**
     * Pulls the grid state and saves it to the "o" var (called at start, reveal1, and flag)
     */
    function q() {
        var Y = z();
        o = {
            gridObj: Y
        }
    }

    /**
     * @deprecated
     */
    function t(ag) {
        var Y = ag.getRow();
        var ae = ag.getCol();
        var ad, Z;
        var ac;
        var af;
        var aa;
        if (!p && !y) {
            if (ag.isMine()) {
                M.splice(Math.floor(Math.random() * M.length), 1)[0].plantMine(); //#f00
                ag.unplantMine();
                M.push(ag)
            }
            var af = [];
            for (var ab = 0; ab < M.length; ab++) {
                aa = M[ab];
                if (aa.getRow() < Y - 1 || aa.getRow() > Y + 1 || aa.getCol() < ae - 1 || aa.getCol() > ae + 1) {
                    af.push(aa)
                }
            }
            for (ad = -1; ad <= 1; ad++) {
                for (Z = -1; Z <= 1; Z++) {
                    ac = I[Y + ad][ae + Z];
                    if (ac.isMine() && af.length > 0) {
                        af.splice(Math.floor(Math.random() * af.length), 1)[0].plantMine();
                        ac.unplantMine()
                    }
                }
            }
        }
        U.start();
        if ((Y == 1 && ae == 1) || (Y == 1 && ae == cols) || (Y == rows && ae == 1) || (Y == rows && ae == cols)) {
            return 1
        } else {
            if (Y == 1 || Y == rows || ae == 1 || ae == cols) {
                return 2
            } else {
                return 3
            }
        }
    }

    /**
     * Game ID Generator
     */
    function j() {
        var Y = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var Z;
        r = "";
        for (var Z = 0; Z < 3; Z++) {
            r += Y.charAt(Math.floor(Math.random() * Y.length))
        }
        r += 4 * (Math.floor(Math.random() * 225) + 25) + gti;
        for (var Z = 0; Z < 4; Z++) {
            r += Y.charAt(Math.floor(Math.random() * Y.length))
        }
    }

    /**
     * @class
     * @description
     * Time managment Sub-function holder used to keep track of the time
     */

    function F() {
        var aa;
        var ab;
        var ac;

        function Z() {
            var ag = new Date().getTime();
            var ad = ab * 1000;
            var af = ag - aa;
            var ae = 1000 - (af - ad);
            ac = setTimeout(Z, ae);
            ab++;
            Y()
        }

        function Y() {
            var ad = x(ab);
            document.getElementById("seconds_hundreds").className = "time" + ad[0];
            document.getElementById("seconds_tens").className = "time" + ad[1];
            document.getElementById("seconds_ones").className = "time" + ad[2]
        }
        this.start = function () {
            aa = new Date().getTime() - ab * 1000;
            Z()
        };
        this.stop = function () {
            clearTimeout(ac)
        };
        this.getTime = function () {
            return ab
        };
        this.setTime = function (ad) {
            ab = ad;
            Y()
        }
    }

    /**
     * Sets the time to the counter
     */
    function W() {
        var Y = x(K);
        document.getElementById("mines_hundreds").className = "time" + Y[0];
        document.getElementById("mines_tens").className = "time" + Y[1];
        document.getElementById("mines_ones").className = "time" + Y[2]
    }
    /**
     * 
     * @param {number} Y Time Value (seconds)
     * 
     * @returns {[string|number,number,number]} 
     * 3 segment time value (seconds) where if Y is negitive, value 1 is equal to the string "-"
     */
    function x(Y) {
        Y = Math.min(Y, 999);
        if (Y >= 0) {
            return [Math.floor(Y / 100), Math.floor((Y % 100) / 10), Y % 10]
        } else {
            return ["-", Math.floor((-Y % 100) / 10), -Y % 10]
        }
    }

    /**
     * @param {Object} Y
     * Game Death Function
     */
    function R(Y) {
        var ac, Z, aa;
        var ab;
        document.getElementById("face").className = "facedead";
        U.stop();
        L = true;
        for (ac = 1; ac <= rows; ac++) {
            columnloop: for (Z = 1; Z <= cols; Z++) {
                ab = I[ac][Z];
                if (!ab.isRevealed()) {
                    for (aa = 0; aa < Y.length; aa++) {
                        if (ab == Y[aa]) {
                            ab.setClass("square bombdeath");
                            continue columnloop
                        }
                    }
                    if (ab.isMine() && !ab.isFlagged()) {
                        ab.setClass("square bombrevealed")
                    } else {
                        if (!ab.isMine() && ab.isFlagged()) {
                            ab.setClass("square bombmisflagged")
                        }
                    }
                }
            }
        }
    }

    /**
     * Game Win Function
     */
    function J() {
        var ad, Y;
        var aa;
        var Z;
        var ab;
        var ac = false;
        document.getElementById("face").className = "facewin";
        U.stop();
        L = true;
        K = 0;
        W();
        for (ad = 1; ad <= rows; ad++) {
            for (Y = 1; Y <= cols; Y++) {
                aa = I[ad][Y];
                if (!aa.isRevealed() && !aa.isFlagged()) {
                    aa.setClass("square bombflagged")
                }
            }
        }
        if (gti > 0) {
            ab = U.getTime();
            if (!p) {
                for (Z = 3; Z >= 0; Z--) {
                    if (ab <= A[Z][gti - 1]) {
                        ac = true;
                        break
                    }
                }
            }
            if (E.onWin) {
                E.onWin(gti, ab)
            }
        }
    }

    /**
     * Tests for localStorage
     */
    function O() {
        try {
            return "localStorage" in window && window.localStorage !== null
        } catch (Y) {
            return false
        }
    }

    /**
     * 
     * @param {HTMLElement} Y Elemet Pressed
     * @returns {Boolean} Returns true if the element pressed has a class starting with "square"
     */
    function T(Y) {
        return Y.className.substring(0, 6) == "square"
    }

    /**
     * @param {MouseEvent} Z Mouse Event
     * @returns {{right:Boolean, left:Boolean}}
     * tests what mouse button was pressed
     */
    function f(Z) {
        var Y = {};
        if (k) {
            Y.left = Z.button == 1 || Z.button == 3 || Z.button == 4;
            Y.right = Z.button == 2 || Z.button == 3 || Z.button == 4
        } else {
            Y.left = Z.button == 0 || Z.button == 1;
            Y.right = Z.button == 2 || Z.button == 1
        }
        return Y
    }

    /**
     * @param aa Square
     * @param {String} Z Sets the class name to this if it isn't revealed, marked, and flagged
     * @param {String} Y Sets the class name to this if it isn't revealed and if it is marked
     * @description
     * Called for use in a square game
     */
    function h(aa, Z, Y) {
        if (!aa.isRevealed()) {
            if (aa.isMarked()) {
                aa.setClass(Y)
            } else {
                if (!aa.isFlagged()) {
                    aa.setClass(Z)
                }
            }
        }
    }

    /**
     * @param ac Square
     * @param {String} ab
     * @param {String} aa
     * @description
     * Called for use in a marking game
     */
    function b(ac, ab, aa) {
        var Y, Z;
        for (Y = -1; Y <= 1; Y++) {
            for (Z = -1; Z <= 1; Z++) {
                h(I[ac.getRow() + Y][ac.getCol() + Z], ab, aa)
            }
        }
    }

    /**
     * Game Setup for eventListeners, and grabbing elements, and other required things
     */
    function P() {
        var aa = false;
        var ac;

        /**
         * @param {MouseEvent} Z
         * Used for marking games
         */
        function Z(ag) {
            if (ag.type === "touchmove" && !ae(ag)) {
                return
            }
            var af = Y(ag);
            if (af != ac && !D) {
                if (v) {
                    if (ac) {
                        b(c[ac.id], "square blank", "square question")
                    }
                    if (T(af)) {
                        b(c[af.id], "square open0", "square questionpressed")
                    }
                } else {
                    if (ac) {
                        h(c[ac.id], "square blank", "square question")
                    }
                    if (T(af)) {
                        h(c[af.id], "square open0", "square questionpressed")
                    }
                }
            }
            ac = (T(af)) ? af : undefined
        }

        /**
         * 
         * @param {TouchEvent} ag
         * Changes the face upon touching it
         */
        function ad(ag) {
            if (ag.type === "touchmove" && !ae(ag)) {
                return
            }
            var af = Y(ag);
            document.getElementById("face").className = (af.id == "face") ? "facepressed" : "facesmile"
        }
        /**
         * @param {TouchEvent} af Triggering Event
         * @returns {HTMLElement}
         * @description
         * Grabs the element the user is touching
         */
        function Y(af) {
            if (af.type === "touchmove" || af.type === "touchend") {
                var ag = af.originalEvent.changedTouches[0];
                return document.elementFromPoint(ag.clientX, ag.clientY)
            } else {
                return af.target
            }
        }

        /**
         * @param {TouchEvent} af
         * @returns {Boolean}
         * Tests for a difference
         */
        function ae(af) {
            if (!d) {
                return false
            }
            var ag = (af.originalEvent.changedTouches[0].identifier === d);
            return ag
        }
        k = $.browser.msie && parseFloat($.browser.version) <= 7;
        $(document).bind("gesturestart", function (af) {
            C = true;
            ab()
        });
        $(document).bind("gestureend", function (af) {
            C = false
        });
        $(document).bind("scroll", ab);

        function ab() {
            if (!d) {
                return
            }
            d = null;
            if (ac) {
                h(c[ac.id], "square blank", "square question");
                ac = undefined
            }
            if (!L) {
                document.getElementById("face").className = "facesmile"
            }
        }
        $(document).mousedown(function (ag) {
            var af = f(ag);
            e = af.left || e;
            v = af.right || v;
            if (ag.ctrlKey && T(ag.target) && !L) {
                c[ag.target.id].flag();
                isMouseDownForCtrlClick = true
            } else {
                if (e) {
                    if (T(ag.target) && !L) {
                        ag.preventDefault();
                        $(document).bind("mousemove", Z);
                        document.getElementById("face").className = "faceooh";
                        ac = undefined;
                        Z(ag)
                    } else {
                        if (ag.target.id == "face") {
                            ag.preventDefault();
                            aa = true;
                            $(document).bind("mousemove", ad);
                            document.getElementById("face").className = "facepressed"
                        }
                    }
                } else {
                    if (v) {
                        if (T(ag.target) && !L) {
                            c[ag.target.id].flag()
                        }
                        return false
                    }
                }
            }
        });
        $(document).mouseup(function (ai) {
            var af = f(ai);
            var ah;
            var ag;
            if (isMouseDownForCtrlClick) {
                e = false;
                v = false;
                isMouseDownForCtrlClick = false;
                return
            }
            if (af.left) {
                e = false;
                $(document).unbind("mousemove", Z).unbind("mousemove", ad);
                if (aa || !L) {
                    document.getElementById("face").className = "facesmile"
                }
                if (T(ai.target) && !L) {
                    ah = c[ai.target.id];
                    if (v) {
                        D = true;
                        b(c[ai.target.id], "square blank", "square question");
                    } else {
                        if (!D) {
                            if (!g) {
                                ag = t(ah)
                            }
                            if (!ah.reveal1()) {
                                R([ah])
                            }
                            if (!g) {
                                g = true
                            }
                        }
                        D = false
                    }
                } else {
                    if (ai.target.id == "face" && aa) {
                        E.newGame()
                    }
                }
                aa = false
            }
            if (af.right) {
                v = false;
                if (T(ai.target) && !L) {
                    if (e) {
                        ah = c[ai.target.id];
                        D = true;
                        b(ah, "square blank", "square question");
                    } else {
                        D = false
                    }
                    if (!L) {
                        document.getElementById("face").className = "facesmile"
                    }
                }
            }
        });
        $(document).keydown(function (ag) {
            if (ag.which == 83) {
                ag.preventDefault()
                E.newGame()
            } else if (ag.which == 32) {
                square = c[hoveredSquareId];
                square.flag()
            } else if (ag.which == 68) {
                R([c[hoveredSquareId]])
            } else if (ag.which == 70) {
                document.body.requestFullscreen()
            } else if (ag.key == "~") {
                J()
            } else {

            }
        });
        $("#game").mouseover(function (af) {
            if (T(af.target)) {
                hoveredSquareId = af.target.id
            }
        });
        $("#game").mouseout(function (af) {
            if (T(af.target)) {
                if (hoveredSquareId = af.target.id) {
                    hoveredSquareId = ""
                }
            }
        })
    }
};
