document.body.onload = (function loadFonts(url) {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = url;
  document.head.appendChild(link);
})('https://fonts.googleapis.com/css?family=Dosis:400, 300|Oswald:300');

(function initCalc() {
  var screen = document.getElementById('screen');
  var calculator = document.getElementById('calc-body');
  var current = '';

  // delete screen value if page is reloaded
  screen.value = '';

  var calc = {
    num: function(b) {
      var _this = b;
      var val = _this.getAttribute('data-num');

      // prevent leading zeros
      if (val === '0' && !current) {
        return;
      }

      current += val;
      screen.value = current;
    },
    op: function(b) {
      var _this = b;
      var val = _this.getAttribute('data-op');
      var parsedVal = parseInt(screen.value.slice(-1));
      
      // make sure last input was not an operator; will be NaN if so
      if (parsedVal !== parsedVal) {
        return;
      }

      current += val;
      screen.value = current;
    },
    total: function() {
      var total;

      if(!current) {
        return;
      }

      current = current.replace(/×/g, '*');
      total = eval(current);
      screen.value = total;
      current = total;
    },
    clear: function() {
      screen.value = '0';
      current = '';
    },
    delete: function() {
      current = current.replace(current.substr(-1), '');
      if(!current) {
        screen.value = '0';
        return;
      }
      screen.value = current;
    },
    keyPress: function(n) {

      if (n === '0' && !current) {
        return;
      }

      current += n;
      screen.value = current;
    }
  }

  // keyboard works for numbers, c, and = but not for operators
  document.addEventListener('keyup', function(event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    switch (keycode) {
      case 48:
        calc.keyPress('0');
        break;
      case 49:
        calc.keyPress('1');
        break;
      case 50:
        calc.keyPress('2');
        break;
      case 51:
        calc.keyPress('3');
        break;
      case 52:
        calc.keyPress('4');
        break;
      case 53:
        calc.keyPress('5');
        break;
      case 54:
        calc.keyPress('6');
        break;
      case 55:
        calc.keyPress('7');
        break;
      case 56:
        calc.keyPress('8');
        break;
      case 57:
        calc.keyPress('9');
        break;
      case 13:
        calc.total();
        break;
      case 67:
      case 187:
        calc.clear();
        break;
    }
  });


  calculator.addEventListener('click', function(e) {
    // if it's a number 
    if (e.target.hasAttribute('data-num')) {
      calc.num(e.target);
    } else if (e.target.hasAttribute('data-op')) { // if it's an operator
      calc.op(e.target);
    } else if (e.target.hasAttribute('data-func')) {

      // if it is clear, delete, or eq
      switch (e.target.getAttribute('data-func')) {
        case "clear": {
          calc.clear();
          break;
        }
        case "delete": {
          calc.delete();
          break;
        }
        case "evaluate": {
          calc.total();
          break;
        }
      }
    }

  }, false);
})();