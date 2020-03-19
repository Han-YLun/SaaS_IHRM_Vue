<template>
  <div class="myInfo">
    <div class="myInfoTop">
      <div class="topLab">
        <span class="act">个人信息</span>
      </div>
    </div>
    <div class="myInfoCont">
      <div class="myInfoPic">
        <img src="./../../assets/img.jpeg" width="100" alt />
      </div>
      <div>
        <el-form ref="myInfo" :model="myInfo" label-width="80px">
          <el-form-item label="姓名" style="width: 300px;">
            <el-input v-model="myInfo.username"></el-input>
          </el-form-item>
          <el-form-item label="手机号" style="width: 300px;">
            <el-input v-model="myInfo.mobile"></el-input>
          </el-form-item>
          <el-form-item label="最高学历">
            <el-select v-model="myInfo.theHighestDegreeOfEducation" placeholder="请选择学历">
              <el-option label="本科" value="本科"></el-option>
              <el-option label="专科" value="专科"></el-option>
              <el-option label="中专" value="中专"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="性别">
            <el-select v-model="myInfo.sex" placeholder="请选择性别">
              <el-option label="男" value="男"></el-option>
              <el-option label="女" value="女"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="出生日期">
            <el-date-picker v-model="myInfo.dateOfBirth" type="date" format="yyyy-MM-dd" placeholder="选择日期"></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">保存</el-button>
            <el-button  @click="onCancel">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import {detail,updateSelf} from '@/api/base/users'
export default {
  name: "users-table-index",
  components: {},
  data() {
    return {
      myInfo: {},
      userId: ""
    };
  },
  methods: {
    onSubmit() {
      console.log("info",this.myInfo);
      this.saveUserInfo()
    },
    onCancel() {
      this.$router.back(-1)
    },
    async userInfo() {
      this.userId = this.$store.getters.userId;
      let id = this.userId;
      const { data: userInfoRes } = await detail({ id });
      if (userInfoRes.success == true) {
        this.myInfo = userInfoRes.data;
      }
    },
    async saveUserInfo() {
      let user = this.myInfo;
      const { data: saveUserRes } = await updateSelf(user);
      if (saveUserRes.success == true) {
        this.$message({
              message: '保存成功',
              type: 'success'
            })
      }
    }
  },
  created() {
    this.userId = this.$store.getters.userId
    this.userInfo()
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "./../../styles/variables";
.myInfo {
  padding: 15px;
  .myInfoTop {
    color: #666;
    background: #fff;
    border-bottom: solid 1px #ccc;
    line-height: 40px;
    span {
      display: inline-block;
      padding: 0 25px;
      font-size: 18px;
      cursor: pointer;
    }
    .act {
      color: $green;
      border-bottom: solid 2px $green;
    }
  }
  .myInfoCont {
    background: #fff;
    display: flex;
    padding: 20px;
    .myInfoPic {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      border: solid 1px #ccc;
      margin-right: 40px;
      img {
        width: 100px;
        height: 100px;
      }
    }
    div:last-child {
      flex: 1;
    }
  }
}
</style>
