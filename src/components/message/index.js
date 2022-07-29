const defaults = {
    top: 24,
    duration: 1.5,
    background: false
};
function notice(content = "", duration = defaults.duration, type, background = defaults.background) {
    
}
export default {
    info (options) {
        return this.message('info', options);
    },
    success (options) {
        return this.message('success', options);
    },
    warning (options) {
        return this.message('warning', options);
    },
    error (options) {
        return this.message('error', options);
    },
    loading (options) {
        return this.message('loading', options);
    },
    message(type, options){
        if (typeof options === 'string') {
            options = {
                content: options
            };
        }
        return notice(options.content, options.duration, type, options.closable, options.background);
    },
}