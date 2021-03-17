// 活动条件配置
export const ACTIVITY_CONDITION = [
  {
    checked: false,
    title: "统计人数数量",
    desc: "条件描述信息...",
    layout: 'row',
    conditionList: [
      {
        label: "基础参与人数",
        value: 0,
        desc: "",
        type: 1 //1:input; 2:select; 3:time; 4:upload; 5:table; 6:form
      },
      {
        label: "随机新增人数",
        value: 1,
        desc: "",
        type: 1 //1:input; 2:select; 3:time; 4:upload; 5:table; 6:form
      }
    ]
  },
  {
    checked: false,
    title: "参与次数配置",
    desc: "条件描述信息...",
    layout: 'row',
    conditionList: [
      {
        label: "单日上限",
        value: 0,
        desc: "",
        type: 1 //1:input; 2:select; 3:time; 4:upload; 5:table; 6:form
      },
      {
        label: "活动期间上限",
        value: 1,
        desc: "",
        type: 1 //1:input; 2:select; 3:time; 4:upload; 5:table; 6:form
      }
    ]
  },
  {
    checked: false,
    title: "登录",
    desc: "条件描述信息...",
    layout: 'column',
    conditionList: [
      {
        label: "时间范围",
        value: "",
        desc: "",
        type: 3 ,//1:input; 2:select; 3:time; 4:upload; 5:table; 6:form
      },
      {
        label: "登录平台",
        value: 1,
        desc: "",
        options: [
          {
            value: 1,
            label: "游戏"
          },
          {
            value: 2,
            label: "活动页"
          }
        ],
        type: 2, //1:input; 2:select; 3:time; 4:upload; 5:table; 6:form
      },
      {
        label: "登录类型",
        value: 1,
        desc: "",
        options: [
          {
            value: 1,
            label: "每日登陆"
          },
          {
            value: 2,
            label: "累计登录"
          },
          {
            value: 3,
            label: "不登录"
          },
          {
            value: 4,
            label: "连续登录"
          }
        ],
        type: 2 //1:input; 2:select; 3:time; 4:upload; 5:table; 6:form
      },
      {
        label: "累登天数",
        value: 0,
        desc: "",
        type: 1 //1:input; 2:select; 3:time; 4:upload; 5:table; 6:form
      }
    ]
  },
  {
    checked: false,
    title: "预注册",
    desc: "条件描述信息...",
    layout: 'column',
    conditionList: [
      {
        label: "注册类型",
        value: 1,
        desc: "",
        options: [
          {
            value: 1,
            label: "邮箱"
          },
          {
            value: 2,
            label: "手机号"
          }
        ],
        type: 2 //1:input; 2:select; 3:time; 4:upload; 5:table; 6:form
      }
    ]
  },
  {
    checked: false,
    title: "角色等级",
    desc: "条件描述信息...",
    layout: 'row',
    conditionList: [
      {
        label: "等级起始值",
        value: 0,
        desc: "",
        type: 1 //1:input; 2:select; 3:time; 4:upload; 5:table; 6:form
      },
      {
        label: "等级结尾值",
        value: 1,
        desc: "",
        type: 1 //1:input; 2:select; 3:time; 4:upload; 5:table; 6:form
      }
    ]
  },
  {
    checked: false,
    title: "VIP等级",
    desc: "条件描述信息...",
    layout: 'row',
    conditionList: [
      {
        label: "等级起始值",
        value: 0,
        desc: "",
        type: 1 //1:input; 2:select; 3:time; 4:upload; 5:table; 6:form
      },
      {
        label: "等级结尾值",
        value: 1,
        desc: "",
        type: 1 //1:input; 2:select; 3:time; 4:upload; 5:table; 6:form
      }
    ]
  },
  {
    checked: false,
    title: "充值条件",
    desc: "条件描述信息...",
    layout: 'row',
    conditionList: [
      {
        label: "充值类型",
        value: 1,
        desc: "",
        options: [
          {
            value: 1,
            label: "总充值达成"
          },
          {
            value: 2,
            label: "新增充值达成"
          },
          {
            value: 3,
            label: "单日新增充值达成"
          },
          {
            value: 4,
            label: "累计充值达成"
          },
          {
            value: 5,
            label: "单日累计新增充值达成"
          }
        ],
        type: 2 //1:input; 2:select; 3:time; 4:upload; 5:table; 6:form
      }, {
        label: "钻石数量",
        value: 0,
        desc: "",
        type: 1 //1:input; 2:select; 3:time; 4:upload; 5:table; 6:form
      },

    ]
  },
  {
    checked: false,
    title: "消费条件",
    desc: "条件描述信息...",
    layout: 'row',
    conditionList: [
      {
        label: "消费类型",
        value: 1,
        desc: "",
        options: [
          {
            value: 1,
            label: "总消费达成"
          },
          {
            value: 2,
            label: "新增消费达成"
          },
          {
            value: 3,
            label: "单日新增消费达成"
          },
          {
            value: 4,
            label: "累计消费达成"
          },
          {
            value: 5,
            label: "单日累计新增消费达成"
          }
        ],
        type: 2 //1:input; 2:select; 3:time; 4:upload; 5:table; 6:form
      },{
        label: "钻石数量",
        value: 0,
        desc: "",
        type: 1 //1:input; 2:select; 3:time; 4:upload; 5:table; 6:form
      },
    ]
  },
  {
    checked: false,
    title: "限制区服",
    desc: "条件描述信息...",
    layout: 'row',
    conditionList: [
      {
        label: "区服id起始值",
        value: 0,
        desc: "",
        type: 1 //1:input; 2:select; 3:time; 4:upload; 5:table; 6:form
      },
      {
        label: "区服id结束值",
        value: 1,
        desc: "",
        type: 1 //1:input; 2:select; 3:time; 4:upload; 5:table; 6:form
      }
    ]
  },
  {
    checked: false,
    title: "固定玩家资格配置",
    desc: "条件描述信息...",
    layout: 'column',
    conditionList: [
      {
        fileList: [
          {
            name: 'food.jpeg', 
            url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?i?imageMogr2/thumbnail/360x360/format/webp/quality/100'}
        ],
        type: 4 //1:input; 2:select; 3:time; 4:upload; 5:table; 6:form
      }
    ]
  },
  {
    checked: false,
    title: "投票",
    desc: "条件描述信息...",
    layout: 'column',
    conditionList: [
      {
        fileList: [
          {
            name: 'food.jpeg', 
            url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?i?imageMogr2/thumbnail/360x360/format/webp/quality/100'}
        ],
        type: 4 //1:input; 2:select; 3:time; 4:upload; 5:table; 6:form
      }
    ]
  },
  {
    checked: false,
    title: "竞猜",
    desc: "条件描述信息...",
    layout: 'column',
    conditionList: [
      {
        tableData: [
          {
            userSelect: 0,
            systemSelect: 0,
            beginTime: "2021-01-01 00:00:00",
            endTime: "2021-01-01 00:30:00",
            publisdTime: "2021-01-01 01:00:00",
          }
        ],
        type: 5 //1:input; 2:select; 3:time; 4:upload; 5:table; 6:form
      }
    ]
  }
];

// 礼包条件配置
export const REWARD_CONDITION = [
  {
    checked: false,
    title: "活动天数进行到指定天数可以领取配置",
    desc: "条件描述信息...",
    layout: 'row',
    conditionList: [
      {
        label: "天数",
        value: 0,
        desc: "",
        type: 1 //1:input; 2:select; 3:time; 4:upload; 5:table; 6:form
      },
    ]
  },{
    checked: false,
    title: "领取人数达到指定数量可以领取配置",
    desc: "条件描述信息...",
    layout: 'row',
    conditionList: [
      {
        label: "参与人数",
        value: 0,
        desc: "",
        type: 1 //1:input; 2:select; 3:time; 4:upload; 5:table; 6:form
      },
    ]
  },{
    checked: false,
    title: "参与次数配置",
    desc: "条件描述信息...",
    layout: 'row',
    conditionList: [
      {
        label: "单日上限",
        value: 0,
        desc: "",
        type: 1 //1:input; 2:select; 3:time; 4:upload; 5:table; 6:form
      },
      {
        label: "活动期间上限",
        value: 1,
        desc: "",
        type: 1 //1:input; 2:select; 3:time; 4:upload; 5:table; 6:form
      }
    ]
  },{
    checked: false,
    title: "登录",
    desc: "条件描述信息...",
    layout: 'column',
    conditionList: [
      {
        label: "时间范围",
        value: "",
        desc: "",
        type: 3 ,//1:input; 2:select; 3:time; 4:upload; 5:table; 6:form
      },
      {
        label: "登录平台",
        value: 1,
        desc: "",
        options: [
          {
            value: 1,
            label: "游戏"
          },
          {
            value: 2,
            label: "活动页"
          }
        ],
        type: 2, //1:input; 2:select; 3:time; 4:upload; 5:table; 6:form
      },
      {
        label: "登录类型",
        value: 1,
        desc: "",
        options: [
          {
            value: 1,
            label: "每日登陆"
          },
          {
            value: 2,
            label: "累计登录"
          },
          {
            value: 3,
            label: "不登录"
          },
          {
            value: 4,
            label: "连续登录"
          }
        ],
        type: 2 //1:input; 2:select; 3:time; 4:upload; 5:table; 6:form
      },
      {
        label: "累登天数",
        value: 0,
        desc: "",
        type: 1 //1:input; 2:select; 3:time; 4:upload; 5:table; 6:form
      }
    ]
  },{
    checked: false,
    title: "关联消耗品",
    desc: "条件描述信息...",
    layout: 'row',
    conditionList: [
      {
        label: "关联活动",
        value: 1,
        desc: "",
        options: [
          {
            value: 1,
            label: "活动"
          },
        ],
        type: 2 //1:input; 2:select; 3:time; 4:upload; 5:table; 6:form
      },{
        label: "积分类型",
        value: 1,
        desc: "",
        options: [
          {
            value: 1,
            label: "消耗"
          },{
            value: 2,
            label: "累计达到"
          },
        ],
        type: 2 //1:input; 2:select; 3:time; 4:upload; 5:table; 6:form
      },{
        label: "积分数量",
        value: 0,
        desc: "",
        type: 1 //1:input; 2:select; 3:time; 4:upload; 5:table; 6:form
      }
    ]
  },{
    checked: false,
    title: "内定玩家",
    desc: "条件描述信息...",
    layout: 'row',
    conditionList: [
      {
        label: "区服ID",
        value: 0,
        desc: "",
        type: 1 //1:input; 2:select; 3:time; 4:upload; 5:table; 6:form
      },{
        label: "用户ID",
        value: 0,
        desc: "",
        type: 1 //1:input; 2:select; 3:time; 4:upload; 5:table; 6:form
      },
    ]
  },{
    checked: false,
    title: "充值条件",
    desc: "条件描述信息...",
    layout: 'row',
    conditionList: [
      {
        label: "充值类型",
        value: 1,
        desc: "",
        options: [
          {
            value: 1,
            label: "总充值达成"
          },
          {
            value: 2,
            label: "新增充值达成"
          },
          {
            value: 3,
            label: "单日新增充值达成"
          },
          {
            value: 4,
            label: "累计充值达成"
          },
          {
            value: 5,
            label: "单日累计新增充值达成"
          }
        ],
        type: 2 //1:input; 2:select; 3:time; 4:upload; 5:table; 6:form
      }, {
        label: "钻石数量",
        value: 0,
        desc: "",
        type: 1 //1:input; 2:select; 3:time; 4:upload; 5:table; 6:form
      },

    ]
  },
  {
    checked: false,
    title: "消费条件",
    desc: "条件描述信息...",
    layout: 'row',
    conditionList: [
      {
        label: "消费类型",
        value: 1,
        desc: "",
        options: [
          {
            value: 1,
            label: "总消费达成"
          },
          {
            value: 2,
            label: "新增消费达成"
          },
          {
            value: 3,
            label: "单日新增消费达成"
          },
          {
            value: 4,
            label: "累计消费达成"
          },
          {
            value: 5,
            label: "单日累计新增消费达成"
          }
        ],
        type: 2 //1:input; 2:select; 3:time; 4:upload; 5:table; 6:form
      },{
        label: "钻石数量",
        value: 0,
        desc: "",
        type: 1 //1:input; 2:select; 3:time; 4:upload; 5:table; 6:form
      },
    ]
  },{
    checked: false,
    title: "角色等级",
    desc: "条件描述信息...",
    layout: 'row',
    conditionList: [
      {
        label: "等级起始值",
        value: 0,
        desc: "",
        type: 1 //1:input; 2:select; 3:time; 4:upload; 5:table; 6:form
      },
      {
        label: "等级结尾值",
        value: 1,
        desc: "",
        type: 1 //1:input; 2:select; 3:time; 4:upload; 5:table; 6:form
      }
    ]
  },
  {
    checked: false,
    title: "VIP等级",
    desc: "条件描述信息...",
    layout: 'row',
    conditionList: [
      {
        label: "等级起始值",
        value: 0,
        desc: "",
        type: 1 //1:input; 2:select; 3:time; 4:upload; 5:table; 6:form
      },
      {
        label: "等级结尾值",
        value: 1,
        desc: "",
        type: 1 //1:input; 2:select; 3:time; 4:upload; 5:table; 6:form
      }
    ]
  },{
    checked: false,
    title: "限制区服",
    desc: "条件描述信息...",
    layout: 'row',
    conditionList: [
      {
        label: "区服id起始值",
        value: 0,
        desc: "",
        type: 1 //1:input; 2:select; 3:time; 4:upload; 5:table; 6:form
      },
      {
        label: "区服id结束值",
        value: 1,
        desc: "",
        type: 1 //1:input; 2:select; 3:time; 4:upload; 5:table; 6:form
      }
    ]
  },{
    checked: false,
    title: "限制参与人数",
    desc: "条件描述信息...",
    layout: 'row',
    conditionList: [
      {
        label: "活动期间参与人数上限",
        value: 0,
        desc: "",
        type: 1 //1:input; 2:select; 3:time; 4:upload; 5:table; 6:form
      },
    ]
  },{
    checked: false,
    title: "在线时长配置",
    desc: "条件描述信息...",
    layout: 'row',
    conditionList: [
      {
        label: "在线时长(秒)",
        value: 0,
        desc: "",
        type: 1 //1:input; 2:select; 3:time; 4:upload; 5:table; 6:form
      },
    ]
  },{
    checked: false,
    title: "受邀数量达成",
    desc: "条件描述信息...",
    layout: 'row',
    conditionList: [
      {
        label: "受邀人数量(个)",
        value: 0,
        desc: "",
        type: 1 //1:input; 2:select; 3:time; 4:upload; 5:table; 6:form
      },
    ]
  },{
    checked: false,
    title: "竞猜数量达成",
    desc: "条件描述信息...",
    layout: 'row',
    conditionList: [
      {
        label: "猜中数量(个)",
        value: 0,
        desc: "",
        type: 1 //1:input; 2:select; 3:time; 4:upload; 5:table; 6:form
      },
    ]
  },{
    checked: false,
    title: "游戏人物积分条件",
    desc: "条件描述信息...",
    layout: 'row',
    conditionList: [
      {
        label: "操作ID",
        value: 0,
        desc: "",
        type: 1 //1:input; 2:select; 3:time; 4:upload; 5:table; 6:form
      },{
        label: "道具ID",
        value: 0,
        desc: "",
        type: 1 //1:input; 2:select; 3:time; 4:upload; 5:table; 6:form
      },{
        label: "类型",
        value: 0,
        desc: "",
        type: 1 //1:input; 2:select; 3:time; 4:upload; 5:table; 6:form
      },{
        label: "逻辑",
        value: 1,
        desc: "",
        options: [
          {
            value: 1,
            label: "空"
          },
          {
            value: 2,
            label: "="
          },
          {
            value: 3,
            label: ">"
          },
          {
            value: 4,
            label: "<"
          },
          {
            value: 5,
            label: ">="
          },
          {
            value: 6,
            label: "<="
          }
        ],
        type: 2, //1:input; 2:select; 3:time; 4:upload; 5:table; 6:form
      },{
        label: "变化值",
        value: 0,
        desc: "",
        type: 1 //1:input; 2:select; 3:time; 4:upload; 5:table; 6:form
      }, {
        label: "达成值",
        value: 0,
        desc: "",
        type: 1 //1:input; 2:select; 3:time; 4:upload; 5:table; 6:form
      },{
        label: "计算方式",
        value: 1,
        desc: "",
        options: [
          {
            value: 1,
            label: "累计变化值"
          },{
            value: 2,
            label: "日志记录条数"
          },
        ],
        type: 2, //1:input; 2:select; 3:time; 4:upload; 5:table; 6:form
      },{
        label: "任务类型",
        value: 1,
        desc: "",
        options: [
          {
            value: 1,
            label: "每日任务"
          },{
            value: 2,
            label: "循环任务"
          },
        ],
        type: 2, //1:input; 2:select; 3:time; 4:upload; 5:table; 6:form
      }
    ]
  },
]




