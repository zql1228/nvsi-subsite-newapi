# subsite

> a project

## Build Setup

```bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

志愿者账号：Kl123456
志愿者密码：Kl123456

## 接口详情

### login.vue(登录)

- LoginVolFortisWeb(用户登录)
  - 入参：
    - areaid: 区域 id
    - username: 用户名
    - password: 密码
    - code: 图片验证码
    - imgkey: 图片验证码缓存 key
  - 出参：
    - albp0003: 志愿者姓名
    - albp0004: 证件类型
    - albp0005: 加密证件号
    - albp0006: 性别
    - albp0010: 加密手机号
    - albp0019: 受邀加入项目(系统默认刷 1)
    - albp0020: 服务区域
    - albp0024: 志愿者服务证
    - albp0025: 服务区域名
    - albp0028: 居住区域
    - albp0029: 志愿者编号
    - albp0034: 注册日期
    - albp0052: 用户名
    - albp0057: 注册区域
    - albp0063: 实名认证状态
    - albp0084: 昵称
    - albp0087: 账号主体(1 志愿者，2 队伍)
    - albp0089: 服务时长
    - albp0090: 志愿者状态
    - albp0093: 已支取总时长
    - albp0094: 可支取总时长
    - albp0095: 未到岗次数
    - albp0098: 队伍邀请志愿者加入项目权限(0 需要本人同意，1 默认同意，2 默认拒绝)
    - albp0099: 队伍邀请志愿者加入队伍权限(0 默认同意，1 默认拒绝)
    - axaa0001: 证件号码行政划区(省)
    - axaa0002: 证件号码行政划区(市)
    - axaa0003: 证件号码行政划区(区)
    - beanname: "lbp01_110101"
    - cardno: 脱敏证件号
    - createtime: 注册时间
    - id: 流水号
    - isdelete: 用户状态(0 有效用户，1 无效用户)
    - source: 数据来源(0PC，1 小程序，2app)
    - telephone: 脱敏手机号

### projectInfo.vue(项目详情)

- getProjectInfoFortisWeb(查询项目详情)
  - createtime 改为 albx0031:项目发布日期
  - serviceobj 改为 albx0009:服务类别
  - zyzbz 改为 albx0019:志愿者保障
  - types 改为 albx0014:服务对象
- 新增接口 volunteerAndPostRelationShipFortisWeb，查询志愿者和项目关系
  - 入参：
    - proId:项目 id(this.projectid)
    - albx0021:项目区域划(this.projectInfo.albx0021)
    - volNum:志愿者编号(this.userInfo.albp0029)
  - 出参：
    - data: null，志愿者和项目没有关系
    - data: { albx0085: codeValue, gwid: 岗位 id }
      - albx0085:用户和对应岗位的关系
      - gwid:和用户有关的岗位 id

### usercenter.vue(用户个人中心)

- LoginVolFortisWeb 接口
  - albp0055 改为 id 志愿者 id
  - albp0056 改为 albp0087 用户类型(1 志愿者，2 队伍)
  - albp0058(0 表示无效用户，1 表示有效用户) 改为 isdelete(0 表示有效用户，1 表示无效用户)

### myproject.vue(我的项目)

- listVolMyProjectApplyFortisWeb(查询志愿者待定项目列表)
  - 待定列表志愿者只有四种操作：
    - 同意(志愿者被邀请加入项目时才有)
    - 拒绝(志愿者被邀请加入项目时才有)
    - 删除(相当于取消申请)
    - 更换岗位(只能更换同一个项目下的其他岗位)
  - 入参
    - volNum: 志愿者编号(this.userInfo.albp0029)
    - ablx0084: 项目状态(默认传 A)
  - 出参
    - albp0003: 姓名
    - albp0005: 加密证件号
    - albp0006: 志愿者性别
    - albp0010: 志愿者加密手机号
    - albp0020: 志愿者区域
    - albp0089: 志愿者服务时长(志愿者服务总时长)
    - albp3309: 队伍 id
    - albx0002: 项目名称
    - albx0021: 所属区域
    - albx0025: 项目联系人
    - albx0026: 脱敏联系人手机号
    - albx0027: 联系人手机号是否公开
    - albx0029: 联系人座机号是否公开
    - albx0052: 岗位 id
    - albx0053: 志愿者编号
    - albx0056: 申请时间(邀请时间)
    - albx0057: 项目 id
    - albx0083: 服务时长(单个项目服务时长)
    - albx0084: 招募状态(一级代码)
    - albx0085: 招募状态(二级代码)
    - beanname: "lbx74"
    - createtime: 创建时间
    - id: 流水号(系统自动生成)
    - isdelete: 是否删除(0 否，1 是)
- listVolMyProjectsFortisWeb(查询志愿者已加入项目列表)
  - 已加入项目项目只有两种操作：
    - 申请时长：加入项目后可以申请时长
    - 评价：项目结项以后可以评价
  - 入参：
    - cardno: 志愿者加密证件号
    - albx0084: 项目状态(默认传 B)
  - 出参：
    - albx0002: 项目名称
    - albx0021: 所属区域
    - albx0026: 脱敏联系人手机号
    - albx0027: 联系人手机是否公开
    - albx0055: 加入时间
    - albx0057: 项目 id
    - albx0061: 志愿者在该项目服务时长
    - albx0062: 所属团体名称
    - albx0072: 项目状态
    - albx0083: 志愿者在该岗位服务时长
    - beanname: "lbx02_110101"

### myproject.vue(我的队伍)

- quertWaitTeamPageWeb(查询志愿者待定队伍)
  - 待定队伍只有一种操作
    - 删除：取消申请
  - 入参：
    - idCard: 志愿者加密证件号
    - pageSize: 分页数据
    - pageNum: 分页数据
  - 出参:
    - albp3305: 申请时间
    - albp3306: 联系人脱敏手机号
    - albp3307: 审核状态(1 已加入，2 申请中，3 被拒绝，4 无关系)
    - albp3308: 队伍名称
- queryMyTeamPageWeb(查询志愿者已加入队伍)
  - 已加入队伍有两种操作
    - 申请时长：加入队伍可以评价
    - 评价：项目结项或者补录才能评价
  - 入参:
    - cardno: 志愿者加密证件号
    - pageSize: 分页数据
    - pageNum: 分页数据
  - 出参:
    - albe0002: 队伍名称
    - albe0012: 队伍区域
    - albe0019: 联系人手机号
    - albe0132: 队伍 id
