<template>
  <div>
    <el-row :gutter="20" style="border-bottom:1px dashed #DCDFE6">
      <el-button
        size="small"
        type="warning"
        plain
        class="change_group_btn el-icon-edit"
        @click="editReward"
      >修改礼包</el-button>
      <!-- left -->
      <el-col :span="10" style="border-right:1px dashed #DCDFE6;">
        <div class="grid-content bg-purple">
          <el-form
            ref="rewardInfoForm"
            :rules="rewardInfoRules"
            :model="rewardInfoForm"
            label-width="100px"
          >
            <el-form-item label="礼包ID :">
              <span>{{rewardInfoForm.giftPackageId}}</span>
            </el-form-item>
            <el-form-item label="礼包排序 :" prop="sort">
              <el-input v-model="rewardInfoForm.sort" style="width:95%;min-width:120px"></el-input>
            </el-form-item>
            <el-form-item label="礼包数量 :" prop="num">
              <el-input v-model="rewardInfoForm.num" style="width:95%;min-width:120px"></el-input>
            </el-form-item>

            <el-form-item label="礼包名称 :" prop="giftPackageName">
              <el-input v-model="rewardInfoForm.giftPackageName" style="width:95%;min-width:120px"></el-input>
            </el-form-item>
            <el-form-item label="礼包概率 :" prop="rate" v-show="activityData.activityType===1">
              <el-input v-model="rewardInfoForm.rate" style="width:95%;min-width:120px">
                <template slot="append">%</template>
              </el-input>
            </el-form-item>
            <el-form-item label="礼包ICON :" prop="sort">
              <el-upload action="#" list-type="picture-card" :auto-upload="false">
                <i slot="default" class="el-icon-plus"></i>
                <div slot="file" slot-scope="{file}">
                  <img class="el-upload-list__item-thumbnail" :src="file.url" alt />
                  <span class="el-upload-list__item-actions">
                    <span
                      class="el-upload-list__item-preview"
                      @click="handlePictureCardPreview(file)"
                    >
                      <i class="el-icon-zoom-in"></i>
                    </span>
                    <span
                      v-if="!disabled"
                      class="el-upload-list__item-delete"
                      @click="handleDownload(file)"
                    >
                      <i class="el-icon-download"></i>
                    </span>
                    <span
                      v-if="!disabled"
                      class="el-upload-list__item-delete"
                      @click="handleRemove(file)"
                    >
                      <i class="el-icon-delete"></i>
                    </span>
                  </span>
                </div>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt />
              </el-dialog>
            </el-form-item>
            <el-form-item label="礼包类型 :" prop="giftPackageType">
              <el-radio-group v-model="rewardInfoForm.giftPackageType">
                <el-radio :label="1">cdkeys</el-radio>
                <el-radio :label="2">消耗品</el-radio>
                <el-radio :label="3">邮件</el-radio>
                <el-radio :label="4">实物</el-radio>
                <el-radio :label="5">奖池钻石</el-radio>
              </el-radio-group>
            </el-form-item>
            <!-- 根据礼包类型展示的礼包配置 -->
            <section v-show="rewardInfoForm.giftPackageType == 1">
              <el-form-item label="激活码上传 :" prop="cdkeys">
                <el-input v-model="rewardInfoForm.cdkeys" style="width:95%;min-width:120px"></el-input>
              </el-form-item>
            </section>
            <section v-show="rewardInfoForm.giftPackageType == 2">
              <el-form-item label="消耗品数量 :" prop="itemNum">
                <el-input v-model="rewardInfoForm.itemNum" style="width:95%;min-width:120px"></el-input>
              </el-form-item>
            </section>
            <section v-show="rewardInfoForm.giftPackageType == 3">
              <el-form-item label="礼包内容 :" prop="giftDesc">
                <el-input v-model="rewardInfoForm.giftDesc" style="width:95%;min-width:120px"></el-input>
              </el-form-item>
              <el-form-item label="邮件内容 :" prop="mailContentList">
                <el-input
                  v-model="rewardInfoForm.mailContentList"
                  style="width:95%;min-width:120px"
                ></el-input>
              </el-form-item>
            </section>
            <section v-show="rewardInfoForm.giftPackageType == 4">
              <!-- 实物 -->
            </section>
            <section v-show="rewardInfoForm.giftPackageType == 5">
              <el-col :span="10">
                <el-form-item label="钻石比例 :" prop="diamondRate">
                  <el-input v-model="rewardInfoForm.diamondRate" style="width:95%;min-width:120px">
                    <template slot="append">%</template>
                  </el-input>
                </el-form-item>
                <el-form-item label="奖池初始值 :" prop="diamondInit">
                  <el-input v-model="rewardInfoForm.diamondInit" style="width:95%;min-width:120px"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="14">
                <el-form-item label="奖池增长 :" prop="diamondInc">
                  <el-input v-model="rewardInfoForm.diamondInc" style="width:95%;min-width:120px"></el-input>
                </el-form-item>
                <el-form-item label="奖池上限 :" prop="diamondUpper">
                  <el-input v-model="rewardInfoForm.diamondUpper" style="width:95%;min-width:120px"></el-input>
                </el-form-item>
              </el-col>
            </section>
          </el-form>
        </div>
      </el-col>
      <!-- right -->
      <el-col :span="14"  style="border-left:1px dashed #DCDFE6;">
        <div class="grid-content bg-purple">
          <contation-form :contationData='contationData' @setCondition='setRewardCondition'></contation-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { groupInfoModule } from "@/store/modules/groupInfo";
import { handleConfirm } from "@/utils/common";
import {REWARD_CONDITION} from '../index';
import ContationForm from '@/components/ContationForm.vue'

export default Vue.extend({
  name: "rewardInfoForm",
  components: {
    ContationForm
  },
  data() {
    return {
      contationData:[],
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      rewardInfoForm: {
        giftPackageId: "",
        giftPackageName: "",
        activityId: "",
        giftPackageType: 0,
        rate: 0,
        num: 0,
        icon: "",
        itemNum: 0,
        diamondRate: 0,
        diamondInit: 0,
        diamondInc: 0,
        diamondUpper: 0,
        giftDesc: "",
        cdkeys: "",
        sort: 0,
        receiveNum: 0,
        mailContentList: "",
        conditionList: ""
      },
      rewardInfoRules: {
        giftPackageName: [
          { required: true, message: "请输入礼包名称", trigger: "blur" }
        ],
        sort: [{ required: true, message: "请输入礼包排序", trigger: "blur" }],
        num: [{ required: true, message: "请输入礼包数量", trigger: "blur" }],
        giftPackageType: [
          { required: true, message: "请选中礼包类型", trigger: "change" }
        ]
      }
    };
  },
  mounted() {
    this.initRewardInfoForm();
    (this.contationData as any) = JSON.parse(JSON.stringify(REWARD_CONDITION));

  },
  watch: {
    rewardData(newValue) {
      this.initRewardInfoForm();
    }
  },
  computed: {
    activityData(){
      return groupInfoModule.activityData;
    },
    rewardData(){
      return groupInfoModule.rewardData;
    },
  },
  methods: {
    setRewardCondition(data: any){
      console.log("editRewardForm>>>setRewardCondition>>>>>>>>>", data)
    },
    editReward() {
      handleConfirm(
        "是否确定修改" + this.rewardInfoForm.giftPackageName + "活动配置吗 ?",
        "warning"
      )
        .then(() => {
          (this.$refs.rewardInfoForm as any).validate((valid: any) => {
            if (valid) {
              groupInfoModule.editReward(this.rewardInfoForm).then(() => {
                this.$message({
                  message: "礼包内容修改成功",
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
        })
        .catch(err => {
          console.log(err);
        });
    },
    initRewardInfoForm() {
      if (this.rewardData) {
        Object.keys(this.rewardInfoForm).map((item: any) => {
          const params = (this.rewardData as any)[item];
          (this.rewardInfoForm as any)[item] = params;
        });
      }
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