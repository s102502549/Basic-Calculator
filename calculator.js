function Calculator() {
    this.text = document.querySelector("#text");
    this.result = document.querySelector("#result");
    this.error = false;
    this.mem = "";
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
    [].forEach.call(document.querySelectorAll(".ex"), function (node) {
        node.addEventListener("click", function () {
            if (!this.error) {
                this.result.innerHTML = this.result.innerHTML + node.innerHTML;
            }
        }.bind(this));
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
        document.querySelector("#clear").style.color="black";
    }.bind(this));
    //add listener for mc
    document.querySelector("#mc").addEventListener("click", function () {
        if (!this.error) {
            this.mem = 0;
            [].forEach.call(document.querySelectorAll(".m"), function (node) {
                node.style.color = "black";
            });
        }
    }.bind(this));
    //add listener for mr
    document.querySelector("#mr").addEventListener("click", function () {
        if (!this.error) {
            this.result.innerHTML = this.mem.toString();
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
                document.querySelector("#clear").style.color="red";
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
                document.querySelector("#clear").style.color="red";
            }
        }
    }.bind(this));
    //add listener for +/-
    document.querySelector("#pm").addEventListener("click", function () {
        if (!this.error) {
            this.result.innerHTML = this.neg(this.result.innerHTML);
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
                }
            }
        }.bind(this));
    }
}

Calculator.prototype =
{
    isValidExpression: function (expression) {
        //operator must have digit follow them
        if (/[\.\+\-×÷][×÷%]/.test(expression))
            return false;
        //dot cannot have .+- follow them
        if (/\.[\.\+\-]/.test(expression))
            return false;
        //+- cannot repeat
        if (/[\+\-][\+\-]/.test(expression))
            return false;
        //% cannot have digit follow them
        if (/%\d/.test(expression))
            return false;
        //first char cannot be × ÷ %
        if (expression[0] == '×' || expression[0] == '÷' || expression[0] == '%')
            return false;
        //last char must be number or %
        if (expression[expression.length - 1] == '+' || expression[expression.length - 1] == '-' || expression[expression.length - 1] == '×' || expression[expression.length - 1] == '÷' || expression[expression.length - 1] == '.')
            return false;
        return true;
    },

    calculate: function (expression) {
        if (expression != "") {
            if (this.isValidExpression(expression)) {
                expression = expression.replace(/%/g, "*1/100").replace(/×/g, "*").replace(/÷/g, "/");
                var resolve = eval(expression);
                if (resolve.toString() == "NaN") {
                    this.error = true;
                    return "error";
                }
                if (!(resolve >= 1e100 || resolve <= -1e100)) {
                    resolve = resolve.toPrecision(10).replace(/(\.[0-9]*[1-9])0*|(\.0*)/, "$1");
                    if (resolve.length > 11)
                        return parseFloat(resolve).toExponential(9).replace(/(\.[0-9]*[1-9])0*|(\.0*)/, "$1");
                    else
                        return resolve;
                }
                else {
                    this.error = true;
                    return "error";
                }
            }
            else {
                this.error = true;
                return "error";
            }
        }
        else
            return "";
    },

    neg: function (numString) {
        if (numString[0] == '+')
            numString = "-" + numString.substr(1, numString.length - 1);
        else if (numString[0] == '-')
            numString = numString.substr(1, numString.length - 1);
        else
            numString = "-" + numString;
        return numString;
    }
}

module.exports.isValidExpression = Calculator.prototype.isValidExpression;
module.exports.calculate = Calculator.prototype.calculate;