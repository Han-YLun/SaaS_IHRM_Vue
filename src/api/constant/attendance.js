// 员工端
export default {
  // 假期类型
  holidayType: [{
      id: '1',
      value: '正常',
      isEnable: false
    },
    {
      id: '2',
      value: '旷工',
      isEnable: false
    },
    {
      id: '3',
      value: '事假',
      isEnable: false
    },
    {
      id: '4',
      value: '调休',
      isEnable: false
    },
    {
      id: '5',
      value: '迟到',
      isEnable: false
    },
    {
      id: '6',
      value: '早退',
      isEnable: false
    }
  ],
  vacationtype: [{
      id: '1',
      name: '正常'
    }, {
      id: '2',
      name: '旷工'
    }, {
      id: '3',
      name: '迟到'
    }, {
      id: '4',
      name: '早退'
    }, {
      id: '5',
      name: '外出'
    }, {
      id: '6',
      name: '出差'
    }, {
      id: '7',
      name: '年假'
    }, {
      id: '8',
      name: '事假'
    }, {
      id: '9',
      name: '病假'
    }, {
      id: '10',
      name: '婚假'
    }, {
      id: '11',
      name: '丧假'
    }, {
      id: '12',
      name: '产假'
    }, {
      id: '13',
      name: '奖励产假'
    }, {
      id: '14',
      name: '陪产假'
    }, {
      id: '15',
      name: '探亲假'
    }, {
      id: '16',
      name: '工伤假'
    }, {
      id: '17',
      name: '调休'
    }, {
      id: '18',
      name: '产检假'
    }, {
      id: '19',
      name: '流产假'
    }, {
      id: '20',
      name: '长期病假'
    }, {
      id: '21',
      name: '测试假'
    }, {
      id: '22',
      name: '补签'
    }

  ],
  type: [{
      leaveType: '60000',
      name: '年假',
      isEnable: false
    },
    {
      leaveType: '60100',
      name: '事假',
      isEnable: false
    },
    {
      leaveType: '60200',
      name: '病假',
      isEnable: false
    },
    {
      leaveType: '60300',
      name: '婚假',
      isEnable: false
    },
    {
      leaveType: '60400',
      name: '丧假',
      isEnable: false
    },
    {
      leaveType: '60500',
      name: '产假',
      isEnable: false
    },
    {
      leaveType: '60600',
      name: '奖励产假',
      isEnable: false
    },
    {
      leaveType: '60700',
      name: '陪产假',
      isEnable: false
    },
    {
      leaveType: '60800',
      name: '探亲假',
      isEnable: false
    },
    {
      leaveType: '60900',
      name: '工伤假',
      isEnable: false
    },
    {
      leaveType: '61000',
      name: '调休假',
      isEnable: false
    },
    {
      leaveType: '61100',
      name: '产检假',
      isEnable: false
    },
    {
      leaveType: '61200',
      name: '流产假',
      isEnable: false
    },
    {
      leaveType: '61300',
      name: '长期病假',
      isEnable: false
    },
    {
      leaveType: '61400',
      name: '测试假',
      isEnable: false
    }
  ],
  departmentType: [{
      dedTypeCode: '51000',
      name: '迟到扣款',
      isEnable: false,
      departmentId: '',
      periodLowerLimit: '30', // 时间段下限
      periodUpperLimit: '30', // 时间段上限
      timesLowerLimit: '2', // 次数下限
      timesUpperLimit: '2', // 次数上限
      dedAmonutLowerLimit: '30', // 扣款金额下限
      dedAmonutUpperLimit: '0', // 扣款金额上限
      absenceDays: '0.5', // 旷工天数
      fineSalaryMultiples: '2', // 罚款工资倍数
      absenceTimesUpperLimt: '0' // 旷工次数上限
    },
    {
      dedTypeCode: '52000',
      name: '早退扣款',
      isEnable: false,
      departmentId: '',
      periodLowerLimit: '30', // 时间段下限
      periodUpperLimit: '30', // 时间段上限
      timesLowerLimit: '2', // 次数下限
      timesUpperLimit: '2', // 次数上限
      dedAmonutLowerLimit: '30', // 扣款金额下限
      dedAmonutUpperLimit: '0', // 扣款金额上限
      absenceDays: '0.5', // 旷工天数
      fineSalaryMultiples: '2', // 罚款工资倍数
      absenceTimesUpperLimt: '0' // 旷工次数上限
    },
    {
      dedTypeCode: '53000',
      name: '旷工扣款',
      isEnable: false,
      departmentId: '',
      periodLowerLimit: '30', // 时间段下限
      periodUpperLimit: '30', // 时间段上限
      timesLowerLimit: '2', // 次数下限
      timesUpperLimit: '2', // 次数上限
      dedAmonutLowerLimit: '30', // 扣款金额下限
      dedAmonutUpperLimit: '0', // 扣款金额上限
      absenceDays: '0.5', // 旷工天数
      fineSalaryMultiples: '2', // 罚款工资倍数
      absenceTimesUpperLimt: '0' // 旷工次数上限
    }
  ],
  overtimeType: [{
      // id: '1',
      departmentId: '', // 部门ID
      rule: '工作日可申请加班', // 规则内容
      ruleStartTime: '', // 规则生效每日开始时间
      ruleEndTime: '', // 规则生效每日结束时间
      isTimeOff: false, // 是否调休
      isEnable: false // 是否可用
    },
    {
      // id: '2',
      departmentId: '', // 部门ID
      rule: '休息日可申请加班', // 规则内容
      ruleStartTime: '', // 规则生效每日开始时间
      ruleEndTime: '', // 规则生效每日结束时间
      isTimeOff: false, // 是否调休
      isEnable: false // 是否可用
    },
    {
      // id: '3',
      departmentId: '', // 部门ID
      rule: '法定节假日可申请加班', // 规则内容
      ruleStartTime: '', // 规则生效每日开始时间
      ruleEndTime: '', // 规则生效每日结束时间
      isTimeOff: false, // 是否调休
      isEnable: false // 是否可用
    }
  ]
}
