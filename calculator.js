function Calculator() {
    this.text = document.querySelector("#text");
    this.result = document.querySelector("#result");
    this.error = false;
    this.mem = "0";
    //add listener for every button click style
    [].forEach.call(document.querySelectorAll("button"), function (node) {
        node.addEventListener("touchstart", function (e) {
            e.target.style.background = "linear-gradient(to bottom, white, deepskyblue)";
        });
    });
    [].forEach.call(document.querySelectorAll("button"), function (node) {
        node.addEventListener("touchend", function (e) {
            e.target.style.background = "linear-gradient(to bottom, white, lightgray)";
        });
    });
    //add listener for every number button
    [].forEach.call(document.querySelectorAll(".num"), function (node) {
        node.addEventListener("click", function () {
            if (!this.error) {
                this.result.innerHTML = this.result.innerHTML + node.innerHTML;
                this.result.scrollLeft += 40;
            }
        }.bind(this));
    }.bind(this));
    //add listener for dot
    document.querySelector("#dot").addEventListener("click", function () {
        if (!this.error) {
            var tmp = this.result.innerHTML.split(/[\+\-×÷]/);
            if (tmp[tmp.length - 1].search(/\./) == -1) {
                this.result.innerHTML = this.result.innerHTML + ".";
            }
        }
    }.bind(this));
    //add listener for back
    document.querySelector("#back").addEventListener("click", function () {
        if (!this.error) {
            if (this.result.innerHTML != "") {
                this.result.innerHTML = this.result.innerHTML.substr(0, this.result.innerHTML.length - 1);
            }
        }
    }.bind(this));
    document.querySelector("#back").addEventListener("touchstart", function () {
        if (!this.error) {
            this.timeout = setTimeout(function () {
                this.result.innerHTML = "";
                this.timeout = undefined;
            }, 500);
        }
    }.bind(this));
    document.querySelector("#back").addEventListener("touchend", function () {
        if (!this.error) {
            clearTimeout(this.timeout);
        }
    }.bind(this));
    //add listener for clear
    document.querySelector("#clear").addEventListener("click", function () {
        this.result.innerHTML = "";
        this.text.innerHTML = "";
        this.error = false;
        document.querySelector("#clear").style.color = "black";
    }.bind(this));
    //add listener for mc
    document.querySelector("#mc").addEventListener("click", function () {
        if (!this.error) {
            this.mem = "0";
            [].forEach.call(document.querySelectorAll(".m"), function (node) {
                node.style.color = "black";
            });
        }
    }.bind(this));
    //add listener for mr
    document.querySelector("#mr").addEventListener("click", function () {
        if (!this.error) {
            this.result.innerHTML = this.mem;
            this.text.innerHTML = "M=";
        }
    }.bind(this));
    //add listener for mp
    document.querySelector("#mp").addEventListener("click", function () {
        if (!this.error) {
            var resolve = this.calculate(this.result.innerHTML);
            if (resolve != "" && resolve != "error") {
                this.mem = this.calculate(this.mem + "+" + resolve);
                [].forEach.call(document.querySelectorAll(".m"), function (node) {
                    node.style.color = "red";
                });
                this.text.innerHTML = this.result.innerHTML + " M+";
            }
            if (resolve == "error") {
                this.result.innerHTML = "error";
                this.text.innerHTML = "error";
                document.querySelector("#clear").style.color = "red";
            }
        }
    }.bind(this));
    //add listener for mm
    document.querySelector("#mm").addEventListener("click", function () {
        if (!this.error) {
            var resolve = this.calculate(this.result.innerHTML);
            if (resolve != "" && resolve != "error") {
                this.mem = this.mem = this.calculate(this.mem + "-" + resolve);
                [].forEach.call(document.querySelectorAll(".m"), function (node) {
                    node.style.color = "red";
                });
                this.text.innerHTML = this.result.innerHTML + " M-";
            }
            if (resolve == "error") {
                this.result.innerHTML = "error";
                this.text.innerHTML = "error";
                document.querySelector("#clear").style.color = "red";
            }
        }
    }.bind(this));
    //add listener for +/-
    document.querySelector("#pm").addEventListener("click", function () {
        if (!this.error) {
            if (this.result.innerHTML != "") {
                var start, isStart = false;
                //find last number start
                for (var i = this.result.innerHTML.length - 1; i >= 0; i--) {
                    if (this.isPmNum(this.result.innerHTML.charAt(i))) {
                        isStart = true;
                        start = i;
                    }
                    else if (isStart && !this.isPmNum(this.result.innerHTML.charAt(i)) && this.result.innerHTML.charAt(i - 1) != 'e') {
                        break;
                    }
                }
                if (start == 0) {
                    this.result.innerHTML = "-" + this.result.innerHTML;
                    this.result.scrollLeft += 40;
                }
                else if (start == 1 && this.result.innerHTML.charAt(0) != '%') {
                    this.result.innerHTML = this.result.innerHTML.substring(1);
                    this.result.scrollLeft += 40;
                }
                else if ((this.result.innerHTML.charAt(start - 1) == '+' || this.result.innerHTML.charAt(start - 1) == '-') && (this.result.innerHTML.charAt(start - 2) != '×' && this.result.innerHTML.charAt(start - 2) != '÷')) {
                    if (this.result.innerHTML.charAt(start - 1) == '+') {
                        this.result.innerHTML = this.result.innerHTML.substring(0, start - 1) + "-" + this.result.innerHTML.substring(start);
                        this.result.scrollLeft += 40;
                    } else {
                        this.result.innerHTML = this.result.innerHTML.substring(0, start - 1) + "+" + this.result.innerHTML.substring(start);
                        this.result.scrollLeft += 40;
                    }
                }
                else if ((this.result.innerHTML.charAt(start - 1) == '+' || this.result.innerHTML.charAt(start - 1) == '-')) {
                    this.result.innerHTML = this.result.innerHTML.substring(0, start - 1) + this.result.innerHTML.substring(start);
                    this.result.scrollLeft += 40;
                }
                else if (this.result.innerHTML.charAt(start - 1) == '%' || this.result.innerHTML.charAt(start - 1) == '×' || this.result.innerHTML.charAt(start - 1) == '÷') {
                    this.result.innerHTML = this.result.innerHTML.substring(0, start) + "-" + this.result.innerHTML.substring(start);
                    this.result.scrollLeft += 40;
                }
            }
        }
    }.bind(this));
    //add listener for ×
    document.querySelector("#mul").addEventListener("click", function () {
        if (!this.error) {
            if (this.result.innerHTML != "") {
                if (!this.isOperator(this.result.innerHTML.charAt(this.result.innerHTML.length - 1))) {
                    this.result.innerHTML = this.result.innerHTML + "×";
                    this.result.scrollLeft += 40;
                }
                else if (this.result.innerHTML.length == 1 && this.result.innerHTML.charAt(0) == '-') {
                    this.result.innerHTML = "";
                }
                else if (!this.isOperator(this.result.innerHTML.charAt(this.result.innerHTML.length - 2))) {
                    this.result.innerHTML = this.result.innerHTML.substr(0, this.result.innerHTML.length - 1) + "×";
                    this.result.scrollLeft += 40;
                }
                else if (this.result.innerHTML.charAt(this.result.innerHTML.length - 1) == '-') {
                    this.result.innerHTML = this.result.innerHTML.substr(0, this.result.innerHTML.length - 2) + "×";
                    this.result.scrollLeft += 40;
                }
            }
        }
    }.bind(this));
    //add listener for ÷
    document.querySelector("#div").addEventListener("click", function () {
        if (!this.error) {
            if (this.result.innerHTML != "") {
                if (!this.isOperator(this.result.innerHTML.charAt(this.result.innerHTML.length - 1))) {
                    this.result.innerHTML = this.result.innerHTML + "÷";
                    this.result.scrollLeft += 40;
                }
                else if (this.result.innerHTML.length == 1 && this.result.innerHTML.charAt(0) == '-') {
                    this.result.innerHTML = "";
                }
                else if (!this.isOperator(this.result.innerHTML.charAt(this.result.innerHTML.length - 2))) {
                    this.result.innerHTML = this.result.innerHTML.substr(0, this.result.innerHTML.length - 1) + "÷";
                    this.result.scrollLeft += 40;
                }
                else if (this.result.innerHTML.charAt(this.result.innerHTML.length - 1) == '-') {
                    this.result.innerHTML = this.result.innerHTML.substr(0, this.result.innerHTML.length - 2) + "÷";
                    this.result.scrollLeft += 40;
                }
            }
        }
    }.bind(this));
    //add listener for +
    document.querySelector("#add").addEventListener("click", function () {
        if (!this.error) {
            if (this.result.innerHTML != "") {
                if (!this.isOperator(this.result.innerHTML.charAt(this.result.innerHTML.length - 1))) {
                    this.result.innerHTML = this.result.innerHTML + "+";
                    this.result.scrollLeft += 40;
                }
                else if (this.result.innerHTML.length == 1 && this.result.innerHTML.charAt(0) == '-') {
                    this.result.innerHTML = "";
                }
                else if (!this.isOperator(this.result.innerHTML.charAt(this.result.innerHTML.length - 2))) {
                    this.result.innerHTML = this.result.innerHTML.substr(0, this.result.innerHTML.length - 1) + "+";
                    this.result.scrollLeft += 40;
                }
                else if (this.result.innerHTML.charAt(this.result.innerHTML.length - 1) == '-') {
                    this.result.innerHTML = this.result.innerHTML.substr(0, this.result.innerHTML.length - 2) + "+";
                    this.result.scrollLeft += 40;
                }
            }
        }
    }.bind(this));
    //add listener for -
    document.querySelector("#sub").addEventListener("click", function () {
        if (!this.error) {
            if (this.result.innerHTML == "" || (this.result.innerHTML.charAt(this.result.innerHTML.length - 1) == '×' || this.result.innerHTML.charAt(this.result.innerHTML.length - 1) == '÷') || !this.isOperator(this.result.innerHTML.charAt(this.result.innerHTML.length - 1)))
                this.result.innerHTML = this.result.innerHTML + "-";
            else if (this.result.innerHTML.charAt(this.result.innerHTML.length - 1) == '+') {
                this.result.innerHTML = this.result.innerHTML.substr(0, this.result.innerHTML.length - 1) + "-";
                this.result.scrollLeft += 40;
            }
        }
    }.bind(this));
    //add listener for =
    {
        document.querySelector("#eq").addEventListener("click", function () {
            if (!this.error) {
                var resolve = this.calculate(this.result.innerHTML);
                if (resolve != "" && resolve != "error") {
                    this.text.innerHTML = this.result.innerHTML + " =";
                    this.result.innerHTML = resolve.toString();
                }
                if (resolve == "error") {
                    this.result.innerHTML = "error";
                    this.text.innerHTML = "error";
                    document.querySelector("#clear").style.color = "red";
                }
            }
        }.bind(this));
    }
}

Calculator.prototype =
{
    calculate: function (expression) {
        if (expression != "") {
            try {
                //solve %, leading/trailing zero, and ×÷ problems
                expression = expression.replace(/(\d+\.?\d*(?:e\+\d+)?(?:e\-\d+)?|\d*\.?\d+(?:e\+\d+)?(?:e\-\d+)?)(?=%)/g, "($1").replace(/%(?=%)/g, "*1/100").replace(/%/g, "*1/100)").replace(/×/g, "*").replace(/÷/g, "/").replace(/0+\./g, ".").replace(/0+(?=\d+\.)/g, "");
                var resolve = eval(expression);
                if (resolve.toString() == "NaN") {
                    this.error = true;
                    return "error";
                }
                if (!(resolve >= 1e100 || resolve <= -1e100)) {
                    //trim zero
                    resolve = resolve.toPrecision(10).replace(/(\.[0-9]*[1-9])0*|(\.0*)/, "$1");
                    if (resolve.length > 11)
                    //trim zero
                        return parseFloat(resolve).toExponential(9).replace(/(\.[0-9]*[1-9])0*|(\.0*)/, "$1");
                    else
                        return resolve;
                }
                else {
                    this.error = true;
                    return "error";
                }
            } catch (e) {
                this.error = true;
                return "error";
            }
        }
        else
            return "";
    },

    isOperator: function (c) {
        return c == '+' || c == '-' || c == '×' || c == '÷';
    },

    isPmNum: function (c) {
        return c == '0' || c == '1' || c == '2' || c == '3' || c == '4' || c == '5' || c == '6' || c == '7' || c == '8' || c == '9' || c == '.' || c == 'e';
    }
};

module.exports.calculate = Calculator.prototype.calculate;