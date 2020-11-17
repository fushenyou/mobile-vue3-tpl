const delay = require("mocker-api/lib/delay");
const Mock = require("mockjs");

const proxy = {
  "POST /queryDemoList": (req, res) => {
    const { page, size } = req.body;
    const total = 30;
    const pages = Math.ceil(total / size);
    if (page > pages) {
      return res.send({
        code: 23300,
        msg: "错误信息",
        data: {
          ...Mock.mock({
            pages: pages,
            total: total,
            records: [],
          }),
        },
      });
    }
    res.send({
      code: 201,
      msg: "错误信息",
      data: {
        ...Mock.mock({
          pages: pages,
          total: total,
          [`records|${size}`]: [
            {
              "id|+1": 1,
              name: "@cname()",
              address: "@county(true)",
              "status|1": ["0", "1"],
              date: "@date('yyyy-MM-dd')",
              stature: "@natural(1, 150)",
              weight: "@natural(1, 50)",
              month: "@natural(0, 12)",
            },
          ],
        }),
      },
    });
  },
};
module.exports = delay(proxy, 2000);
