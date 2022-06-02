<template>
  <div id="error">
    <!--中间部分-->
    <div class="main">
      <div
        class="mid"
        style="text-align: center;padding-top: 50px;margin-bottom: 231px;"
      >
        <img src="../assets/img/error.png" alt="" />
        <div style="margin: 20px auto;">
          <div>
            对不起，您输入的有误！请进入【<a
              href="https://chinavolunteer.mca.gov.cn"
              style="color: red;"
              target="_blank"
              >志愿者总站</a
            >】后再操作！
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "error",
  data: function() {
    return {};
  },
  methods: {}
};
</script>
