<template>
  <van-form @submit="onSubmit">
    <van-field
      v-model="application"
      readonly
      name="application"
      label="应用："
      placeholder="请选择应用"
    >
      <template #extra>
        <div class="tips">仅限在企业内分享</div>
      </template>
    </van-field>
    <van-field
      readonly
      clickable
      name="sendScope"
      :value="selectedDeptUserList.join(',')"
      label="发送范围："
      right-icon="arrow"
      placeholder="选择部门或成员"
      @click="choosePerson"
    />

    <van-field
      v-model="title"
      clearable
      name="title"
      label="标题："
      placeholder="请填写标题"
      :rules="[{ required: true }]"
    />
    <van-field
      v-model="author"
      clearable
      name="author"
      label="作者："
      placeholder="请填写作者"
      :rules="[{ required: true }]"
    />
    <van-field
      v-model="content"
      name="content"
      rows="9"
      autosize
      type="textarea"
      maxlength="500"
      placeholder="请输入公告内容"
      show-word-limit
      :rules="[{ required: true }]"
    />
    <van-button block type="primary" native-type="submit" color="#4776bc">
      发送
    </van-button>
  </van-form>
</template>

<script>
import Vue from "vue";
import { Form, Field, Button, Picker, Popup } from "vant";
import { initWxConfig, selectEnterpriseContact } from "weixin/weixin.js";

//Vant组件注册
Vue.use(Form).use(Field).use(Button).use(Picker).use(Popup);

export default {
  data() {
    return {
      wx: null,
      application: "公告",
      title: "",
      author: "",
      content: "",
      selectedDeptUserList: [],
      selectedDepartmentIds: [],
      selectedUserIds: [],
    };
  },
  created() {
    initWxConfig()
      .then((wx) => {
        this.wx = wx;
      })
      .catch((err) => {
        alert(err);
      });
  },
  mounted() {},
  methods: {
    onSubmit(values) {
      // console.log("submit", values);
      alert(JSON.stringify(values));
    },
    choosePerson() {
      selectEnterpriseContact(this.wx, this.selectedDepartmentIds,this.selectedUserIds)
        .then((res) => {
          //选择的部门、人员名称
          this.selectedDeptUserList = res.deptAndUser;
          //选择的部门ID
          this.selectedDepartmentIds = res.deptIds;
          //选择的人员ID
          this.selectedUserIds = res.userIds;
        })
        .catch((err) => {
          alert(err);
        });
    },
  },
};
</script>

<style>
@import url(~assets/css/sendmsg/sendmsg.css);
</style>
