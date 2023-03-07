<template>
  <el-form ref="formRef"
           :model="form"
           label-position="top"
           label-width="120px"
           class="stylePreviewBox">
    <el-row :gutter="10">
      <el-col :xs="24" :lg="12">
        <el-form-item label="Button按钮">
          <CButton></CButton>
        </el-form-item>

        <el-form-item label="链接">
          <Clink></Clink>
        </el-form-item>

        <el-form-item label="单选框与多选框">
          <CRadio></CRadio>
        </el-form-item>

        <el-form-item label="输入框-数字输入框-Select选择器-Cascader级联选择器">
          <CInput></CInput>
        </el-form-item>

        <el-form-item label="Switch 开关 - 滑块">
          <CSwitch></CSwitch>
        </el-form-item>

        <el-form-item label="日期选择器">
          <CDatePicker></CDatePicker>
        </el-form-item>

        <el-form-item label="树形结构">
          <CTree></CTree>
        </el-form-item>

        <!-- <el-form-item label="Transfer 穿梭框">
          <CTransfer></CTransfer>
        </el-form-item> -->

        <el-form-item label="Tabs 标签页">
          <CTabs></CTabs>
        </el-form-item>

        <el-form-item label="Dialog 对话框">
          <CDialog></CDialog>
        </el-form-item>

        <el-form-item label="折叠面板">
          <CCollapse></CCollapse>
        </el-form-item>
      </el-col>

      <el-col :xs="24" :lg="12">
        <el-form-item label="表格">
          <CTable></CTable>
        </el-form-item>

        <el-form-item label="Tag 标签 -Progress 进度条 - Result 结果">
          <CTag></CTag>
        </el-form-item>

        <el-form-item label="Alert 警告 - Notification 通知">
          <CAlert></CAlert>
        </el-form-item>

        <el-form-item label="Timeline 时间线 - 卡片">
          <CTimeline></CTimeline>
        </el-form-item>

        <el-form-item label="Avatar 头像">
          <CAvatar></CAvatar>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script lang="ts" setup>
  import CButton from '@/components/stylePreview/CButton.vue';
  import Clink from '@/components/stylePreview/Clink.vue';
  import CRadio from '@/components/stylePreview/CRadio.vue';
  import CInput from '@/components/stylePreview/CInput.vue';
  import CSwitch from '@/components/stylePreview/CSwitch.vue';
  import CDatePicker from '@/components/stylePreview/CDatePicker.vue';
  import CTree from '@/components/stylePreview/CTree.vue';
  import CTable from '@/components/stylePreview/CTable.vue';
  import CTag from '@/components/stylePreview/CTag.vue';
  import CAlert from '@/components/stylePreview/CAlert.vue';
  import CTimeline from '@/components/stylePreview/CTimeline.vue';
  import CTabs from '@/components/stylePreview/CTabs.vue';
  import CDialog from '@/components/stylePreview/CDialog.vue';
  import CCollapse from '@/components/stylePreview/CCollapse.vue';
  import CAvatar from '@/components/stylePreview/CAvatar.vue';
import { reactive } from 'vue';
  const form = reactive({})
</script>

<style lang="scss">
.stylePreviewBox{
  .el-form-item__label{
    font-size: 18px;
    font-weight: bold;
  }
}
</style>
