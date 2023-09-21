const babel = require('@babel/core');

const code = `
function add(a, b) {
    return a + b;
}
`;

// 解析代码并生成 AST
const ast = babel.parse(code, {
sourceType: 'script',
});

console.log(ast);

// 遍历 AST
babel.traverse(ast, {
//  访问入参节点
    Identifier(path) {
        const node = path.node;
        // 修改入参名称a
        if (node.name === 'a') {
            node.name = 'x';
        }
        // 修改入参名称b
        if (node.name === 'b') {
            node.name = 'y';
        }
    },

// 访问函数声明节点
    FunctionDeclaration(path) {
        const node = path.node;   
        // 修改函数名称  
        node.id.name = 'multiply';   
        // 修改函数体
        node.body.body = [
            babel.template.statement.ast('x*y'),
        ];
    },
});

// 生成修改后的代码
const { code: modifiedCode } = babel.transformFromAst(ast, null, {
    presets: ['@babel/preset-env'],
});

console.log(modifiedCode);