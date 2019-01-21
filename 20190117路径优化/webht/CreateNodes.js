var createNodes = function(dataModel){
    var group = createNode(dataModel, 'Group', 'RootGroup');
    group.setExpanded(true);

    var nestGroup1 = createNode(dataModel, 'Group', 'sailing8036@gmail.com', group);

    var nn1 = createNode(dataModel, 'Node', 'nn1', nestGroup1),
        nn = null, i = 0;
    for (; i < 3; i++) {
        nn = createNode(dataModel, 'Node', 'nn' + (i + 2), nestGroup1);
        createEdge(dataModel, nn, nn1);
    }

    var nestGroup2 = createNode(dataModel, 'Group', 'Empty Group', group);
    nestGroup2.setExpanded(true);

    createEdge(dataModel, nestGroup1, nestGroup2);

    var node = null;
    for(i = 0; i < 10; i++){
        node = createNode(dataModel, 'Node', null, group);
        createEdge(dataModel, node, nestGroup2);
    }

    var nestGroup3 = createNode(dataModel, 'Group', 'ABCDEFG-123456789', group);
    nestGroup3.setExpanded(true);

    var char = '', nodeList = [];
    for (var code = 65, c = 0; c < 8; c++, code++) {
        char = String.fromCharCode(code);
        nodeList.push(createNode(dataModel, 'Node', char, nestGroup3));
    }

    var loopFunc = function(node) {
        return function(n) {
            createEdge(dataModel, n, node, 3, 'red');
        };
    };
    for (i = 0; i < 10; i++) {
        node = createNode(dataModel, 'Node', 'AB-' + i, nestGroup3);
        nodeList.forEach(loopFunc(node));
    }

    for (var k = 0; k < 2; k++) {
        var ip = "192.168." + k + ".";
        var count = 0;
        var root = createNode(dataModel, 'Node', ip + count++);
        for (i = 0; i < 3; i++) {
            var iNode = createNode(dataModel, 'Node', ip + count++);
            createEdge(dataModel, root, iNode, 2, '#00FF00');

            for (var j = 0; j < 2; j++) {
                var jNode = createNode(dataModel, 'Node', ip + count++);
                createEdge(dataModel, iNode, jNode, 2, '#00FF00');

                for (var z = 0; z < 12; z++) {
                    var zNode = createNode(dataModel, 'Node', ip + count++);
                    createEdge(dataModel, jNode, zNode, 2, '#00FF00');
                }
            }
        }
    }
};

var createNode = function(dm, type, name, parent) {
    var node = null;
    if (type === 'Node')
        node = new ht.Node();
    else if (type === 'Group')
        node = new ht.Group();
    if (name) node.setName(name);
    if (parent) node.setParent(parent);
    dm.add(node);
    return node;
};

var createEdge = function(dm, from, to, width, color) {
    var edge = new ht.Edge(from, to);
    if (width) edge.s('edge.width', width);
    if (color) edge.s('edge.color', color);
    dm.add(edge);
    return edge;
};
