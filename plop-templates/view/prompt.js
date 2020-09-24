const { notEmpty, flat } = require("../utils.js");

module.exports = {
  description: "generate a view",
  prompts: [
    {
      type: "input",
      name: "name",
      message: "请输入页面名称",
      validate: notEmpty("name"),
    },
    {
      type: "input",
      name: "desc",
      message: "请输入页面描述",
      validate: notEmpty("desc"),
    },
    {
      type: "checkbox",
      name: "blocks",
      message: "Blocks:",
      choices: [
        // {
        //   name: "<template>",
        //   value: "template",
        //   checked: true,
        // },
        // {
        //   name: "<script>",
        //   value: "script",
        //   checked: true,
        // },
        {
          name: "style",
          value: "style",
          checked: true,
        },
      ],
      // validate(value) {
      //   if (value.indexOf("script") === -1 && value.indexOf("template") === -1) {
      //     return "View require at least a <script> or <template> tag.";
      //   }
      //   return true;
      // },
    },
  ],
  actions: (data) => {
    const name = "{{name}}";
    const flatName = flat(data.name);
    const actions = [
      {
        type: "add",
        path: `src/views/${name}/index.vue`,
        templateFile: "plop-templates/view/index.hbs",
        data: {
          name: name,
          flatName: flatName,
          desc: data.desc,
          template: true,
          script: true,
          // style: true,
          // template: data.blocks.includes("template"),
          // script: data.blocks.includes("script"),
          style: data.blocks.includes("style"),
        },
      },
      {
        type: "add",
        path: `src/views/${name}/index.less`,
        templateFile: "plop-templates/view/style.hbs",
        data: {
          flatName: flatName,
        },
      },
    ];
    if (!data.blocks.includes("style")) actions.pop();
    return actions;
  },
};
