import Mock from 'mockjs'
import { param2Obj } from '@/utils'



const List = []
const count = 100

for (let i = 0; i < 3; i++) {
    let data = {
        id: "1"+i,
        name: "企业"+i,
        managerId: "string",
        version: "试用版v1.0",
        renewalDate: "2018-01-01",
        expirationDate: "2019-01-01",
        companyArea: "string",
        companyAddress: "string",
        businessLicenseId: "string",
        legalRepresentative: "string",
        companyPhone: "13800138000",
        mailbox: "string",
        companySize: "string",
        industry: "string",
        remarks: "string",
        auditState: "string",
        state: "1",
        balance: "string",
        createTime: "string"
    }
  List.push(data)
}

export default {
  list: () => {
    return {
        code: 10000,
        success: true,
        message: "查询成功",
        data:List
    }
  },
  sassDetail:() => {
    return {
      code: 10000,
      success: true,
      message: "查询成功",
      data:{
        id: "10001",
        name: "测试企业",
        managerId: "string",
        version: "试用版v1.0",
        renewalDate: "2018-01-01",
        expirationDate: "2019-01-01",
        companyArea: "string",
        companyAddress: "string",
        businessLicenseId: "string",
        legalRepresentative: "string",
        companyPhone: "13800138000",
        mailbox: "string",
        companySize: "string",
        industry: "string",
        remarks: "string",
        auditState: "string",
        state: "1",
        balance: "string",
        createTime: "string"
      }
    }
  }
}
