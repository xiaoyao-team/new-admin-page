<template>
  <div v-show="contationData">
    <el-form label-position="left" >
      <el-form-item label="活动条件配置 :"></el-form-item>
      <section v-for="(item,index) in contationData" :key="index">
        <el-col style="marginBottom: 20px">
          <el-checkbox  v-model='item.checked'>{{item.title}}</el-checkbox>
        </el-col>
        <div v-show="item.checked">
          <el-row :gutter="20">
          <el-col :span='item.layout==="row"?8:24'  v-for="(msg,order) in item.conditionList"  :key='order'>
            <el-form-item :label="msg.label" style="marginLeft:32px">
              <!-- typy: 1 输入框-->
              <el-input v-show="msg.type===1" style="width:80px" v-model="msg.value" ></el-input>
              <!-- typy: 2 下拉框-->
              <el-select v-show="msg.type===2" style="width:150px" placeholder="请选择" v-model="msg.value">
                <el-option
                  v-for="item in msg.options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <!-- typy: 3 日期时间选择框-->
              <el-date-picker
                v-if="msg.type===3"
                v-model="msg.value"
                type="datetimerange"
                value-format="yyyy-MM-dd HH:mm:ss"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
              <!-- typy: 4 上传-->
              <el-upload
                v-show="msg.type===4"
                class="upload-demo"
                ref="upload"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :file-list="msg.fileList"
                :auto-upload="false">
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                <!-- <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button> -->
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
              <!-- typy: 5 -->
              <el-table
                v-show="msg.type===5"
                :data="msg.tableData"
                border
                style="width: 100%">
                <el-table-column
                  align="center"
                  prop="userSelect"
                  label="玩家抽取"
                  width="80">
                  <template slot-scope="scope">
                    <div>
                      <el-input size="mini" v-model="scope.row.userSelect" ></el-input>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  align="center"
                  prop="systemSelect"
                  label="系统抽取"
                  width="80">
                  <template slot-scope="scope">
                    <div>
                      <el-input size="mini" v-model="scope.row.systemSelect" ></el-input>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  align="center"
                  prop="beginTime"
                  label="抽取开始时间">
                  <template slot-scope="scope">
                    <div>
                      <el-date-picker
                        size="mini"
                        style="width: 100% !important;"                        
                        v-model="scope.row.beginTime"
                        type="datetime"
                        placeholder="选择日期时间">
                      </el-date-picker>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  align="center"
                  prop="endTime"
                  label="抽取结束时间">
                  <template slot-scope="scope">
                    <div>
                      <el-date-picker
                        size="mini"
                        style="width: 100% !important;"
                        v-model="scope.row.endTime"
                        type="datetime"
                        placeholder="选择日期时间">
                      </el-date-picker>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  align="center"
                  prop="publisdTime"
                  label="系统公布时间">
                  <template slot-scope="scope">
                    <div>
                      <el-date-picker
                        style="width: 100% !important;"
                        size="mini"
                        v-model="scope.row.publisdTime"
                        type="datetime"
                        placeholder="选择日期时间">
                      </el-date-picker>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  align="center"
                  width="106">
                  <template slot="header" slot-scope="scope">
                    <el-button
                      size="mini"
                      @click="handleEdit(index,scope.row)">添加竞猜</el-button>
                  </template>
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      type="danger"
                      @click="handleDelete(scope.$index, index)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-form-item>
          </el-col>
        </el-row>
        </div>
      </section>
    </el-form>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: ["contationData",],
  data() {
    return {
      
    }
  },
  watch: {
    // "contationData":{
      // handler(newValue,oldValue){
      //   if (!oldValue.length) {
      //     this.$emit('setCondition',newValue)
      //   }
      // },
      // deep: true
    // }
  },
  methods: {
    handleChange(index: any){
      this.$set(this.contationData[index], 'checked', true);
      console.log(index,this.contationData[index])
    },
    handleRemove(file: any, fileList: any) {
      console.log(file, fileList);
    },
    handlePreview(file: any) {
      console.log(file);
    },
    handleEdit(index: any){
      this.contationData[index].conditionList[0].tableData.push(
        {
          userSelect: 5,
          systemSelect: 5,
          beginTime: "2021-01-01 00:00:00",
          endTime: "2021-01-01 00:30:00",
          publisdTime: "2021-01-01 01:00:00",
        }
      )
    },
    handleDelete($index: any,index: any){
      this.contationData[index].conditionList[0].tableData.splice($index,1)
    }
  }
});
</script>

<style lang="scss" scoped>
.el-date-editor .el-input .el-input--mini .el-input--prefix .el-input--suffix .el-date-editor--datetime .el-input{
  
}
</style>