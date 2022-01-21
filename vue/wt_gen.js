let template = {
  framework: 'vue',
  name: 'VUI UI',
  version: '0.0.1',
  'js-types-syntax': 'typescript',
  'description-markup': 'markdown',
  'framework-config': {
    'enable-when': {
      'file-extensions': ['vue'],
    },
  },
  contributions: {
    html: {
      elements: [],
      icons: [],
    },
  },
};

/*
* {
  "name": "ui-button",
  "description": "Vue UI Component Button",
  "attributes": [
      {
          "name": "icon",
          "description": "Icon Name",
          "value": {
              "type": "enum",
              "kind": "plain"
          },
          "values": {
              "pattern": {
                  "items": "html/icons"
              }
          }
      }
  ]
}
* */

const fs = require('fs');
const ts = require('typescript');

const files = fs.readdirSync('./component');
for (let i = 0; i < files.length; i++) {
  try {
    let file = fs.readFileSync(`./component/${files[i]}`, 'utf-8');
    let name = files[i].replace('.vue', '').replace(/\./g, '-');
    /*file = file.replace(/<script lang="ts">(.*?)<\/script>/gs, function (x, y) {
      const ttt = ts.transpileModule(y, {
        compilerOptions: { module: ts.ModuleKind.CommonJS },
      });
      console.log(ttt.outputText);

      return x;
    });*/

    const attributes = [];
    if (name === 'ui-button') {
      attributes.push({
        name: 'icon',
        description: 'Icon Name',
        value: {
          type: 'enum',
          kind: 'plain',
        },
        values: {
          pattern: {
            items: 'html/icons',
          },
        },
      });
    }
    if (name === 'ui-icon') {
      attributes.push({
        name: 'name',
        description: 'Icon Name',
        value: {
          type: 'enum',
          kind: 'plain',
        },
        values: {
          pattern: {
            items: 'html/icons',
          },
        },
      });
    }

    template.contributions.html.elements.push({
      name,
      description: `Vue UI Component ${name}`,
      attributes,
    });
  } catch (e) {
    //
  }
}

const icons = fs.readdirSync('./asset/icon');
for (let i = 0; i < icons.length; i++) {
  template.contributions.html.icons.push({
    name: icons[i].replace('.svg', ''),
    icon: `./asset/icon/${icons[i]}`,
  });
}

fs.writeFileSync(`./component.web-types.json`, JSON.stringify(template, null, 4));
