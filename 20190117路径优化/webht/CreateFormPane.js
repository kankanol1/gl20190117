var createFormPane = function(g2d, autoLayout, state) {
    state = state || {};
    var formPane = new ht.widget.FormPane(),
        view = formPane.getView();
    view.style.right = view.style.top = '10px';
    view.style.background = 'rgba(200, 200, 200, 0.4)';
    document.body.appendChild(view);
    formPane.setWidth(200);
    formPane.setHeight(220);
    var inputNames = [
            { name: 'Interval', value: 1 },
            { name: 'Frames', value: 30 },
            { name: 'Duration', value: 0 }
        ], timer = null;
    formPane.addRow(['LayoutModel', {
        id: 'LayoutModel',
        comboBox: {
            value: 'symmetric',
            values: [
                'circular', 'symmetric', 'towardnorth', 'towardsouth',
                'towardeast', 'towardwest', 'hierarchical'
            ],
            onValueChanged: function(oldV, newV) {
                state.autoLayout = true;
                inputNames.forEach(function(obj) {
                    autoLayout['set' + obj.name](formPane.v(obj.name) * 1);
                });
                autoLayout.setEasing(Easing[formPane.v('Easing')]);
                autoLayout.layout(newV, function() {
                    if (timer) clearTimeout(timer);
                    timer = setTimeout(function() {
                        timer = null;
                        state.zooming = true;
                        g2d.fitContent(true);
                    }, 300);
                });
            }
        }
    }], [70, 0.1]);
    var easingValues = Object.keys(Easing);
    formPane.addRow(['Easing', {
        id: 'Easing',
        comboBox: {
            value: easingValues[0],
            values: easingValues
        }
    }], [70, 0.1]);
    inputNames.forEach(function(obj) {
        formPane.addRow([obj.name, {
            id: obj.name,
            textField: {
                type: 'number',
                text: obj.value
            }
        }], [70, 0.1]);
    });
    var zoomBtnClicked = function(e) {
            g2d[this]({
                frames: formPane.v('Frames') * 1,
                interval: formPane.v('Interval') * 1,
                easing: Easing[formPane.v('Easing')]
            });
        },
        zoomBtns = ['zoomIn', 'zoomOut', 'zoomReset'].map(function(name) {
            return {
                button: {
                    label: name.charAt(0).toUpperCase() + name.substr(1),
                    onClicked: zoomBtnClicked.bind(name)
                }
            };
        }),
        zoomReset = zoomBtns.splice(2, 1)[0];
    formPane.addRow(zoomBtns, [0.1, 0.1]);
    formPane.addRow([zoomReset, {
        button: {
            label: 'TranslateReset',
            onClicked: function(e) {
                g2d.setTranslate(0, 0);
            }
        }
    }],[0.1, 0.1]);
    formPane.addRow([{
        button: {
            label: 'FitContent',
            onClicked: function(e) {
                g2d.fitContent({
                    frames: formPane.v('Frames') * 1,
                    interval: formPane.v('Interval') * 1,
                    easing: Easing[formPane.v('Easing')]
                });
            }
        }
    }], [0.1]);
};
