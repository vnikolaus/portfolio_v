function loadPrototypes() {
    Document.prototype.setAttr = function(condition, attr, value) {
        this.querySelector(condition).setAttribute(attr, value)
    }

    Document.prototype.removeAttr = function(condition, attr) {
        this.querySelector(condition).removeAttribute(attr)
    }

    Document.prototype.setText = function(id, value) {
        this.getElementById(id).textContent = value
    }

    Document.prototype.getValue = function(id) {
        return this.getElementById(id).value
    }

    Document.prototype.addClass = function(condition, cls) {
        this.querySelector(condition).classList.add(cls)
    }

    Document.prototype.removeClass = function(condition, cls) {
        this.querySelector(condition).classList.remove(cls)
    }

    Document.prototype.style = function(condition, style) {
        this.querySelector(condition).style = style
    }
}