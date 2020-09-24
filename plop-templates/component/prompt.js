const { notEmpty, flat } = require("../utils.js");

module.exports = {
  description: "创建组件",
  prompts: [
    {
      type: "input",
      name: "name",
      message: "请输入组件名称",
      validate: notEmpty("name"),
    },
    {
      type: "input",
      name: "desc",
      message: "请输入组件描述",
      validate: notEmpty("desc"),
    },
    // {
    //   type: "checkbox",
    //   name: "blocks",
    //   message: "Blocks:",
    //   choices: [
    //     {
    //       name: "<template>",
    //       value: "template",
    //       checked: true,
    //     },
    //     {
    //       name: "<script>",
    //       value: "script",
    //       checked: true,
    //     },
    //     {
    //       name: "style",
    //       value: "style",
    //       checked: false,
    //     },
    //   ],
    //   validate(value) {
    //     if (value.indexOf("script") === -1 && value.indexOf("template") === -1) {
    //       return "Components require at least a <script> or <template> tag.";
    //     }
    //     return true;
    //   },
    // },
  ],
  actions: (data) => {
    const name = "{{properCase name}}";
    const flatName = flat(data.name);
    const actions = [
      {
        type: "add",
        path: `src/components/${data.name}/src/index.vue`,
        templateFile: "plop-templates/component/index.hbs",
        data: {
          name: name,
          flatName: flatName,
          desc: data.desc,
          template: true,
          script: true,
          style: true,
          // template: data.blocks.includes("template"),
          // script: data.blocks.includes("script"),
          // style: data.blocks.includes("style"),
        },
      },
      {
        type: "add",
        path: `src/components/${data.name}/style/index.less`,
        templateFile: "plop-templates/component/style.hbs",
        data: {
          flatName: flatName,
        },
      },
      {
        type: "add",
        path: `src/components/${data.name}/index.ts`,
        templateFile: "plop-templates/component/main.hbs",
        data: {
          flatName: flatName,
        },
      },
    ];

    return actions;
  },
};
