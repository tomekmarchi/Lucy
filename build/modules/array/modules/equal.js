  /*
   Determines if the arrays are equal by doing a shallow comparison of their elements using strict equality.
  */
  $.isEqualArray = function(item,array) {
      if (array === item) {
          return true;
      }

      if (!array || array.length !== item.length) {
          return false;
      }

      for (var i = 0; i < array.length; i++) {
          if (array[i] !== item[i]) {
              return false;
          }
      }

      return true;
  };
