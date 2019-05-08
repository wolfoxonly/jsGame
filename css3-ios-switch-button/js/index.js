var _extends = Object.assign || function (target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i];for (var key in source) {if (Object.prototype.hasOwnProperty.call(source, key)) {target[key] = source[key];}}}return target;};function _toConsumableArray(arr) {if (Array.isArray(arr)) {for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {arr2[i] = arr[i];}return arr2;} else {return Array.from(arr);}}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}var _window = window,React = _window.React,ReactDOM = _window.ReactDOM,PropTypes = _window.PropTypes;var
Component = React.Component,Fragment = React.Fragment;var
render = ReactDOM.render;
var rootNode = document.getElementById('app');var

MultiRadio = function (_Component) {_inherits(MultiRadio, _Component);function MultiRadio() {var _ref;var _temp, _this, _ret;_classCallCheck(this, MultiRadio);for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {args[_key] = arguments[_key];}return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = MultiRadio.__proto__ || Object.getPrototypeOf(MultiRadio)).call.apply(_ref, [this].concat(args))), _this), _this.





















    state = {
      options: _this.props.options }, _this.

    onChange = function (e) {
      var invert =
      _this.state.options.filter(function (o) {return o.checked && o.label !== e.target.id;}).
      length === _this.props.limit;

      _this.setState({
        options: _this.state.options.reduce(
        function (arr, opt) {return [].concat(_toConsumableArray(
          arr), [_extends({},

          opt, {
            checked:
            e.target.id === opt.label ?
            e.target.checked :
            invert ?
            !opt.checked :
            opt.checked })]);},


        []) });


    }, _this.
    render = function () {
      return (
        React.createElement('form', null,
          React.createElement('h1', null, 'Services on Offer'),
          _this.state.options.map(function (o) {return (
              React.createElement(Fragment, { key: 'option--' + o.label },
                React.createElement('label', { htmlFor: o.label }, o.label),
                React.createElement('div', { className: 'check' },
                  React.createElement('input', {
                    onChange: _this.onChange,
                    type: 'checkbox',
                    className: 'check__check',
                    checked: o.checked,
                    value: o.label,
                    id: o.label }),

                  React.createElement('div', { className: 'check__indicator' }))));})));





    }, _temp), _possibleConstructorReturn(_this, _ret);}return MultiRadio;}(Component);MultiRadio.defaultProps = { limit: 2, options: [{ label: 'Cheap', checked: false }, { label: 'Good', checked: false }, { label: 'Fast', checked: true }] };MultiRadio.propTypes = { options: PropTypes.array, limit: PropTypes.number };


render(React.createElement(MultiRadio, null), rootNode);