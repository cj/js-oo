
// OO - Class - Copyright TJ Holowaychuk <tj@vision-media.ca> (MIT Licensed)
// Based on http://ejohn.org/blog/simple-javascript-inheritance/
// which is based on implementations by Prototype / base2

;(function(){
  var global = this, initialize = true
  var referencesSuper = /xyz/.test(function(){ xyz }) ? /\b__super__\b/ : /.*/

  Class = function(props){
    if (this == global)
      return Class.extend(props)  
  }
  
  Class.extend = Class.include = function(props) {
    var __super__ = this.prototype
    
    initialize = false
    var prototype = new this
    initialize = true

    for (var name in props)
      prototype[name] = 
        typeof props[name] == 'function' &&
        typeof __super__[name] == 'function' &&
        referencesSuper.test(props[name]) ?
          (function(name, fn){
            return function() {
              this.__super__ = __super__[name]
              return fn.apply(this, arguments)
            }
          })(name, props[name])
        : props[name]
    
    function Class() {
      if (initialize && this.init)
        this.init.apply(this, arguments)
    }
    
    Class.prototype = prototype
    Class.constructor = Class
    Class.extend = arguments.callee
    
    return Class
  }
})()