/**
 *
 *  Usage:
 *
 *   var transition = new Transition();
 *   transition.animate( $('.element'), 'css-animation-class').
 *       then(function () {
 *           console.log('animation complete!!');
 *       });
 *
 */
class transition {

    /**
     * Animation en transition end events.
     *
     * @type {string[]}
     */
    events = [
        'transitionend',
        'webkitTransitionEnd',
        'oTransitionEnd',

        'oAnimationEnd',
        'webkitAnimationEnd',
        'animationend'
    ];

    /**
     * Puts a className on an element and listens when the animation
     * is done.
     *
     * @param element
     * @param className
     * @returns {Promise}
     */
    animate(element, className) {

        return new Promise((resolve, reject) => {
            if (typeof element === 'undefined' || typeof className === 'undefined') {
                reject();
            }

            this.element = element;
            this.className = className;
            this.resolve = resolve;

            this.transitionEventListeners();

            window.requestAnimationFrame(() => {
                $(element).addClass(className);
            });
        });
    }

    /**
     * Set all the animationEnd and transitionEnd event handlers
     * on the element. if remove is true, delete the handlers
     *
     * @param remove
     */
    transitionEventListeners(remove) {
        this.events.forEach((event) => {
            if (!remove) {
                $(this.element).one(event, this.resolvePromise.bind(this));
            } else {
                $(this.element).off(event);
            }
        });
    }

    /**
     * clear event handlers, remove the class and then resolve
     * the promise
     *
     * @param resolve
     */
    resolvePromise() {
        this.transitionEventListeners(true);
        $(this.element).removeClass(this.className);
        this.resolve();
    }
}

export default transition;
