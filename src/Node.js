class Node {
    constructor(elem) {
        this.$el = elem;
    }

    addType(type) {
        this.$el.type = type;
        return this;
    }

    addListener(type, callback) {
        this.$el.addEventListener(type, callback);
        return this;
    }

    addClass(classname) {
        this.$el.classList.add(classname);
        return this;
    }

    setText(value) {
        this.$el.innerText = value;
        return this;
    }

    setValue(value) {
        this.$el.value = value;
        return this;
    }

    append(...args) {
        for (let arg of args) {
            this.$el.append(arg);
        }
    }

    setAttrb(name, value) {
        this.$el.setAttribute(name, value);
        return this;
    }
}
