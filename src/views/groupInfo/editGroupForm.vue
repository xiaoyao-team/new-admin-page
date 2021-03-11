<template>
  <div>
    <el-row :gutter="20" style="border-bottom:1px dashed #DCDFE6">
      <el-button
        size="small"
        type="primary"
        plain
        class="change_group_btn el-icon-edit"
        @click="editGrop"
      >修改活动组</el-button>
      <!-- left -->
      <el-col :span="10">
        <div class="grid-content bg-purple">
          <el-form ref="groupForm" :rules="groupRules" :model="groupForm" label-width="100px">
            <el-form-item label="活动组ID :">
              <span>{{$route.params.groupId}}</span>
            </el-form-item>
            <el-form-item label="活动组名称 :" prop="groupName">
              <el-input v-model="groupForm.groupName" style="width:95%;min-width:150px"></el-input>
            </el-form-item>
            <el-form-item label="所属游戏 :" prop="appId">
              <el-select
                v-model="groupForm.appId"
                placeholder="请选择游戏"
                style="width:95%;min-width:150px"
              >
                <el-option
                  v-for="(item, index) in appList"
                  :key="index"
                  :label="item.appName"
                  :value="item.appId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
      <!-- right -->
      <el-col :span="14" style="border-left:1px dashed #DCDFE6;">
        <div class="grid-content bg-purple">
          <el-form ref="groupForm2" :rules="groupRules" :model="groupForm" label-width="100px">
            <el-form-item label="白名单配置"></el-form-item>
            <el-form-item label="正式地址 :" prop="activityUrl">
              <div>
                <el-input v-model="groupForm.activityUrl" style="width:70%;min-width:150px">
                  <template slot="append" v-if="groupForm.activityUrl">
                    <el-link target="_blank" type="success" :href="groupForm.activityUrl">前往</el-link>
                  </template>
                </el-input>
              </div>
            </el-form-item>
            <el-form-item label="放行IP列表 :" prop="whiteList">
              <el-input v-model="groupForm.whiteList" style="width:70%;min-width:150px"></el-input>
            </el-form-item>
          </el-form>
          <div class="form-item-tip">
            列表为空，则表示完全对外开放；
            <br />附：公司内部出口IP如下：
            <br />39.109.124.40
            <br />202.83.194.92
            <br />39.109.120.94
            <br />45.116.80.213
            <br />42.200.41.60
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { groupInfoModule } from "@/store/modules/groupInfo";
import { LoginModule } from "@/store/modules/login";

export default Vue.extend({
  name: "editGroupForm",
  data() {
    return {
      groupForm: {
        groupId: "",
        groupName: "",
        appId: "",
        activityUrl: "",
        whiteList: "",
        createUser: "",
        createTime: "",
        activityList: ""
      },
      groupRules: {
        groupName: [
          { required: true, message: "请输入活动组名称", trigger: "blur" }
        ],
        appId: [
          { required: true, message: "请选择所属游戏", trigger: "change" }
        ]
        // activityUrl: [
        //   { required: true, message: '请输入活动地址', trigger: 'blur' }
        // ],
        // whiteList: [
        //   { required: true, message: '请输入放行IP列表', trigger: 'blur' }
        // ],
      }
    };
  },
  computed: {
    appList() {
      return LoginModule.appList;
    }
  },
  mounted() {
    this.initGroupForm();
  },
  methods: {
    editGrop() {
      (this.$refs.groupForm as any).validate((valid: any) => {
        if (valid) {
          groupInfoModule.editGroupInfo(this.groupForm).then(() => {
            this.$message({
              message: "活动组修改成功",
              type: "success"
            });
          });
        } else {
          return console.log("error submit!!");
        }
      });
      // (this.$refs.groupForm2 as any).validate((valid: any) => {
      //   if (!valid) {
      //     return console.log('error submit!!');
      //   }
      // });
      //
    },
    initGroupForm() {
      Object.keys(this.groupForm).map((item: any) => {
        const params = (groupInfoModule.groupInfoData as any).activityGroupBase
          .activityGroup[item];
        (this.groupForm as any)[item] = params;
      });
    }
  }
});
</script>
<style lang="scss" scoped>
.form-item-tip {
  padding: 0 20px 20px 20px;
  font-size: 14px;
  font-size: 12px;
  color: #8391a5;
  line-height: 20px;
  white-space: normal;
}
.change_group_btn {
  position: absolute;
  right: 10px;
  top: -20px;
}
</style>