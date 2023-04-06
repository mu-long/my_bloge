<template>
  <div class="post_detail">
    <!-- 面板 -->
    <Panel />
    <div class="layui-container">
      <div class="layui-row layui-col-space15">
        <div class="layui-col-md8 content detail">
          <div class="fly-panel detail-box">
            <!-- 文章标题 -->
            <h2>《{{post.title}}》</h2>

            <!-- 操作帖子 -->
            <div class="operate_post">
              <!-- 帖子状态 -->
              <div class="post_state">
                <!-- <span class="layui-badge">审核中</span> -->
                <span
                  class="layui-badge layui-bg-green fly-detail-column"
                  v-if="post.column === 'ask'"
                >提问</span>
                <span
                  class="layui-badge layui-bg-green fly-detail-column"
                  v-else-if="post.column === 'share'"
                >分享</span>
                <span
                  class="layui-badge layui-bg-green fly-detail-column"
                  v-else-if="post.column === 'discuss'"
                >讨论</span>
                <span
                  class="layui-badge layui-bg-green fly-detail-column"
                  v-else-if="post.column === 'advise'"
                >建议</span>
                <span
                  class="layui-badge layui-bg-green fly-detail-column"
                  v-else-if="post.column === 'logs'"
                >动态</span>
                <span
                  class="layui-badge layui-bg-green fly-detail-column"
                  v-else-if="post.column === 'notice'"
                >公告</span>

                <span
                  class="layui-badge"
                  style="background-color: #999;"
                  v-if="post.isEnd === 0"
                >未结</span>
                <span
                  class="layui-badge"
                  style="background-color: #5FB878;"
                  v-else
                >已结</span>

                <span
                  class="layui-badge layui-bg-black"
                  v-show="post.isTop === 1"
                >置顶</span>

                <span class="layui-badge layui-bg-red">精帖</span>
                <template v-if="post.tages && post.tages.length > 0">
                  <span
                    v-for="(tag, index) in post.tages"
                    :key="'tag'+index"
                    :class="tag.class"
                  >{{tag.name}}</span>
                </template>
              </div>

              <!-- 操作按钮 -->
              <div
                class="operate_btn"
                data-id="123"
              >
                <router-link
                  tag="span"
                  :to="{name: 'editPost', params: {tid: tid, post: post}}"
                  class="layui-btn layui-btn-xs layui-btn-normal"
                  type="edit"
                  v-show="post.isEnd === 0 && post.uid._id === userInfo._id"
                >编辑</router-link>
                <span
                  class="layui-btn layui-btn-xs layui-btn-danger"
                  type="del"
                >删除</span>
                <span
                  class="layui-btn layui-btn-xs layui-bg-black"
                  type="set"
                  field="stick"
                  rank="1"
                >置顶</span>
                <!-- <span class="layui-btn layui-btn-xs jie-admin" type="set" field="stick" rank="0" style="background-color:#ccc;">取消置顶</span> -->
                <span
                  class="layui-btn layui-btn-xs layui-btn-warm"
                  type="set"
                  field="status"
                  rank="1"
                >加精</span>
                <!-- <span class="layui-btn layui-btn-xs jie-admin" type="set" field="status" rank="0" style="background-color:#ccc;">取消加精</span> -->
              </div>

              <!-- 回复与人气 -->
              <span class="reply_hot">
                <span
                  title="阅读量"
                  class="hot"
                >
                  <i class="iconfont icon-yulan"></i>{{post.reads}}
                </span>
                <span
                  title="回复"
                  class="reply"
                  @click="goReply"
                >
                  <i class="iconfont icon-xiaoxi2"></i>{{post.answer}}
                </span>
                <span
                  title="人气"
                  class="hot"
                >
                  <i class="iconfont icon-icon-test"></i>{{post.reads * post.answer}}
                </span>
                <span
                  title="点赞"
                  class="like"
                  @click="handleLikePost"
                >
                  <i
                    class="iconfont"
                    :class="post.isLike ? 'icon-like-fill' : 'icon-like'"
                  ></i>{{post.likes}}
                </span>
                <span
                  title="收藏"
                  class="collect"
                  @click="handleCollectPost"
                >
                  <i
                    class="iconfont"
                    :class="post.isCollect ? 'icon-shoucang2' : 'icon-shoucang1'"
                  ></i>{{post.collects}}
                </span>
              </span>
            </div>

            <!-- 作者信息 -->
            <div class="detail_about">
              <div class="left">
                <!-- 头像 -->
                <a
                  class="fly-avatar"
                  href="javascript:;"
                >
                  <img :src="post.uid ? post.uid.pic : '/img/avatar/默认男头.png'">
                </a>
              </div>

              <div class="right">
                <!-- 作者 -->
                <div class="user">
                  <a
                    href="javascript:;"
                    class="authorName"
                  >
                    <cite>{{post.uid ? post.uid.username : '未知'}}</cite>
                    <i
                      class="iconfont icon-vrenzhengguanli approve"
                      title="已认证"
                    ></i>
                    <i
                      class="layui-badge vip"
                      v-if="post.uid && post.uid.isVip !== 0 ? post.uid.isVip : false"
                    >VIP {{post.uid.isVip}}</i>
                  </a>
                  <!-- 帖子发布时间 -->
                  <span>{{post.created | formattingTime }}</span>
                </div>
                <!-- 悬赏 -->
                <div class="reward">
                  <span style="padding-right: 10px; color: #FF7200">悬赏：{{post.integral}} 积分</span>
                </div>
              </div>
            </div>

            <!-- 文章信息 -->
            <div
              class="detail_body photos"
              v-html="content"
            >
            </div>
          </div>

          <!-- 回帖 -->
          <div
            class="fly-panel reply_post"
            id="reply_post"
          >
            <fieldset
              class="layui-elem-field layui-field-title"
              style="text-align: center;"
            >
              <legend>回帖</legend>
            </fieldset>

            <ul>
              <!-- 评论列表 -->
              <li
                class="reply_item"
                v-for="(item, index) in comments"
                :key="'comment' + index"
                :class="'reply_item' + index"
              >
                <div class="detail_about reply_user">
                  <div class="left">
                    <!-- 头像 -->
                    <a
                      class="fly-avatar"
                      href="javascript:;"
                    >
                      <img :src="item.cuid ? item.cuid.pic : '/img/avatar/默认男头.png'">
                    </a>
                  </div>

                  <div class="right">
                    <!-- 作者信息 -->
                    <div class="user">
                      <a
                        href="javascript:;"
                        class="authorName"
                      >
                        <cite>{{item.cuid ? item.cuid.username : '未知'}}</cite>
                        <i
                          class="iconfont icon-vrenzhengguanli approve"
                          title="已认证"
                        ></i>
                        <i
                          class="layui-badge vip"
                          v-if="item.cuid && item.cuid.isVip !== 0 ? item.cuid.isVip : false"
                        >VIP {{item.cuid.isVip}}</i>
                      </a>

                      <span v-if="item.cuid._id === item.uid">(楼主)</span>
                      <!--
                      <span style="color:#5FB878">(管理员)</span>
                      <span style="color:#FF9E3F">（社区之光）</span>
                      <span style="color:#999">（该号已被封）</span>
                      -->
                    </div>

                    <!-- 帖子发布时间 -->
                    <div class="publish_time">
                      <span>{{item.created | formattingTime}}</span>
                    </div>

                    <div
                      class="adopt_box"
                      v-show="item.isAdopt === 1"
                    >
                      <i
                        class="iconfont icon-badge adopt"
                        title="最佳答案"
                      ></i>
                      <div class="adopt2">已采纳</div>
                    </div>
                  </div>
                </div>

                <!-- 回复内容 -->
                <div class="reply_content">
                  <p v-convertHtml="item.content"></p>
                </div>

                <!-- 操作回复 -->
                <div class="operate_reply">
                  <div class="left">
                    <span
                      title="点赞"
                      :class="{'isLike': item.isLike === 1}"
                      @click="likeComment(item)"
                    >
                      <i class="iconfont icon-dianzan"></i>
                      <em>{{item.likes}}</em>
                    </span>
                    <span
                      title="回复"
                      class="reply"
                      @click="replyComment(item)"
                    >
                      <i class="iconfont icon-xiaoxi2"></i>
                      回复
                    </span>
                    <span
                      v-show="item.hasChild"
                      :data-itemclass="'reply_item' + index"
                      @click="handleLookReply($event, item, index)"
                    >查看回复</span>
                  </div>
                  <div class="right">
                    <!-- 评论本人可以编辑 删除 -->
                    <span
                      type="edit"
                      v-show="post.isEnd === 0 && userInfo && item.cuid._id === userInfo._id"
                      @click="editComment(item)"
                    >编辑</span>
                    <span
                      type="del"
                      v-show="post.isEnd === 0 && userInfo && item.cuid._id === userInfo._id"
                      @click="deleteComment(item)"
                    >删除</span>
                    <!-- 楼主可以采纳 -->
                    <span
                      class="adopt"
                      type="adopt"
                      v-show="post.isEnd === 0 && userInfo && post.uid && post.uid._id === userInfo._id && item.isAdopt === 0"
                      @click="setAdopt(item)"
                    >采纳</span>
                  </div>
                </div>

                <!-- 子评论 -->
                <ul
                  class="reply_child_box"
                  :class="{'showChildReply': lookReply && lookReplyIndex === index}"
                  v-show="item.hasChild"
                >
                  <li
                    class="reply_item reply_child"
                    v-for="(child, index2) in childComments"
                    :key="'comment' + index2"
                  >
                    <div class="detail_about reply_user">
                      <div class="left">
                        <!-- 头像 -->
                        <a
                          class="fly-avatar"
                          href="javascript:;"
                        >
                          <img :src="child.cuid ? child.cuid.pic : '/img/avatar/默认男头.png'">
                        </a>
                      </div>

                      <div class="right">
                        <!-- 作者信息 -->
                        <div class="user">
                          <a
                            href="javascript:;"
                            class="authorName"
                          >
                            <cite>{{child.cuid ? child.cuid.username : '未知'}}</cite>
                            <i
                              class="iconfont icon-vrenzhengguanli approve"
                              title="已认证"
                            ></i>
                            <i
                              class="layui-badge vip"
                              v-if="child.cuid && child.cuid.isVip !== 0 ? child.cuid.isVip : false"
                            >VIP
                              {{child.cuid.isVip}}</i>
                          </a>

                          <span v-if="child.cuid._id === child.uid">(楼主)</span>
                          <!--
                          <span style="color:#5FB878">(管理员)</span>
                          <span style="color:#FF9E3F">（社区之光）</span>
                          <span style="color:#999">（该号已被封）</span>
                          -->
                        </div>

                        <!-- 帖子发布时间 -->
                        <div class="publish_time">
                          <span>{{child.created | formattingTime}}</span>
                        </div>

                        <div
                          class="adopt_box"
                          v-show="child.isAdopt === 1"
                        >
                          <i
                            class="iconfont icon-badge adopt"
                            title="最佳答案"
                          ></i>
                          <div class="adopt2">已采纳</div>
                        </div>
                      </div>
                    </div>

                    <!-- 回复内容 -->
                    <div class="reply_content">
                      <p v-convertHtml="child.content"></p>
                    </div>

                    <!-- 操作回复 -->
                    <div class="operate_reply">
                      <div class="left">
                        <span
                          title="点赞"
                          :class="{'isLike': child.isLike === 1}"
                          @click="likeComment(child)"
                        >
                          <i class="iconfont icon-dianzan"></i>
                          <em>{{child.likes}}</em>
                        </span>
                        <span
                          title="回复"
                          class="reply"
                          @click="replyComment(item, child)"
                        >
                          <i class="iconfont icon-xiaoxi2"></i>
                          回复
                        </span>
                      </div>
                      <div class="right">
                        <!-- 评论本人可以编辑 删除 -->
                        <span
                          type="edit"
                          v-show="post.isEnd === 0 && userInfo && child.cuid._id === userInfo._id"
                          @click="editComment(child)"
                        >编辑</span>
                        <span
                          type="del"
                          v-show="post.isEnd === 0 && userInfo && child.cuid._id === userInfo._id"
                          @click="deleteComment(item, child)"
                        >删除</span>
                        <!-- 楼主可以采纳 -->
                        <span
                          class="adopt"
                          type="adopt"
                          v-show="post.isEnd === 0 && userInfo && post.uid && post.uid._id === userInfo._id && child.isAdopt === 0"
                          @click="setAdopt(child)"
                        >采纳</span>
                      </div>
                    </div>
                  </li>
                </ul>
              </li>

              <!-- 无数据时 沙发 -->
              <li
                class="sofa"
                v-if="comments.length === 0"
              >居然没有回复？快来抢沙发吧！</li>

              <!-- 纯HTML标签 测试使用 不显示 -->
              <li
                class="reply_item reply_child"
                v-show="false"
              >
                <div class="detail_about reply_user">
                  <div class="left">
                    <!-- 头像 -->
                    <a
                      class="fly-avatar"
                      href="javascript:;"
                    >
                      <img src="/img/avatar/默认男头.png">
                    </a>
                  </div>

                  <div class="right">
                    <!-- 作者信息 -->
                    <div class="user">
                      <a
                        href="javascript:;"
                        class="authorName"
                      >
                        <cite>admin</cite>
                        <i
                          class="iconfont icon-vrenzhengguanli approve"
                          title="已认证"
                        ></i>
                        <i class="layui-badge vip">VIP 0</i>
                      </a>

                      <span>(楼主)</span>
                      <!--
                      <span style="color:#5FB878">(管理员)</span>
                      <span style="color:#FF9E3F">（社区之光）</span>
                      <span style="color:#999">（该号已被封）</span>
                      -->
                    </div>

                    <!-- 帖子发布时间 -->
                    <div class="publish_time">
                      <span>2022-09-01</span>
                    </div>

                    <div class="adopt_box">
                      <i
                        class="iconfont icon-badge adopt"
                        title="最佳答案"
                      ></i>
                      <div class="adopt2">已采纳</div>
                    </div>
                  </div>
                </div>

                <!-- 回复内容 -->
                <div class="reply_content">
                  <p>回复内容</p>
                </div>

                <!-- 操作回复 -->
                <div class="operate_reply">
                  <div class="left">
                    <span title="点赞">
                      <i class="iconfont icon-dianzan"></i>
                      <em>66</em>
                    </span>
                    <span
                      title="回复"
                      class="reply"
                    >
                      <i class="iconfont icon-xiaoxi2"></i>
                      回复
                    </span>
                  </div>
                  <div class="right">
                    <!-- 评论本人可以编辑 删除 -->
                    <span type="edit">编辑</span>
                    <span type="del">删除</span>
                    <!-- 楼主可以采纳 -->
                    <span
                      class="adopt"
                      type="adopt"
                    >采纳</span>
                  </div>
                </div>
              </li>

            </ul>

            <!-- 分页 -->
            <Paging
              v-show="comments.length !== 0"
              :justifyContent="'center'"
              :showEnd='true'
              :total='total'
              :current='current'
              :size='size'
              @changeCurrent='changeCurrent'
              @changeLimit='changeLimit'
            />

            <!-- 输入框 -->
            <div class="layui-form layui-form-pane input_block">
              <!-- 提示 -->
              <div
                class="tip"
                v-show="Object.keys(editOption).length !== 0"
              >
                <b>正在修改评论：</b><span v-convertHtml="editOption.content"></span>
                <button
                  type="button"
                  class="layui-badge layui-bg-green fly-detail-column"
                  @click="cancelEditComment"
                >取消修改</button>
              </div>
              <ValidationObserver
                action
                tag="form"
                v-slot="{ validate }"
                ref="observer_ref"
              >
                <!-- 文本编辑器 -->
                <div class="layui-form-item layui-form-text">
                  <Editor
                    @changeContent='changeContent'
                    :initContent='replyText'
                  />
                </div>

                <!-- 验证码 -->
                <div class="layui-form-item">
                  <ValidationProvider
                    rules="required|length:5"
                    v-slot="{ errors }"
                    ref="code_ref"
                  >
                    <label class="layui-form-label">验证码：</label>
                    <div class="layui-input-inline">
                      <input
                        type="text"
                        name="验证码"
                        required
                        lay-verify="required"
                        placeholder="请输入验证码"
                        autocomplete="off"
                        class="layui-input"
                        v-model.trim='code'
                      />
                    </div>
                    <div
                      class="layui-form-mid layui-word-aux svg"
                      title="点击获取验证码"
                      v-html="svg"
                      @click="_getCaptcha()"
                      v-if="svg"
                    ></div>
                    <div
                      class="
                      layui-form-mid
                      layui-word-aux"
                      v-else
                    >服务器错误，验证码获取失败！</div>
                    <div class="layui-form-mid layui-word-aux">{{ errors[0] }}</div>
                  </ValidationProvider>
                </div>

                <!-- 提交回复 -->
                <div class="layui-form-item">
                  <input type="hidden">
                  <button
                    type="button"
                    class="layui-btn"
                    @click="validate().then(submit)"
                  >提交回复</button>
                </div>
              </ValidationObserver>
            </div>
          </div>
        </div>

        <!-- 右侧边栏 -->
        <div class="layui-col-md4">
          <!-- 本周热议 -->
          <HotList />
          <!-- 广告区域 -->
          <Ads />
          <!-- 微信公众号 -->
          <div
            class="fly-panel"
            style="padding: 20px 0; text-align: center;"
          >
            <img
              src
              style="max-width: 100%;"
              alt="layui"
            >
            <p style="position: relative; color: #666;">微信扫码关注 layui 公众号</p>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getPostDetail } from '@/api/content'
import { setLikePost, setCollectPost } from '@/api/user'
import { addPostComments, getPostComments, getChlidComments, updatePostComment, deletePostComment, setAdoptComment, setLikeComment } from '@/api/comments'
import convertHtml from '@/utils/convertHtml'
import { scrollToElem } from '@/utils/index'
import Panel from '@/components/Panel.vue'
import Editor from '@/components/modules/editor/index.vue'
import Ads from '@/components/sidebar/Ads.vue'
import HotList from '@/components/sidebar/HotList.vue'
import CodeMixin from '@/mixin/code'
import Paging from '@/components/modules/paging/index.vue'

export default {
  name: 'PostDetail', // 文章详情
  mixins: [CodeMixin], // 混入
  components: {
    Panel, // 面板
    Editor, // 文本编辑器
    Paging, // 分页
    HotList, // 热门列表
    Ads // 广告
  },
  data () {
    return {
      total: 0, // 总条数
      size: 5, // 每页条数
      current: 1, // 当前的页码
      replyText: '', // 评论回复文本
      post: {}, // 文章数据
      tid: '', // 文章id
      cid: '', // 评论id
      editOption: {}, // 记录编辑选项
      comments: [], // 评论列表
      childComments: [], // 子评论列表
      lookReply: false, // 查看回复
      lookReplyIndex: null,
      submitType: 'reply' // 提交评论类型 (普通评论 reply ；修改编辑评论 editReply ；回复评论 childReply)
    }
  },
  computed: {
    // 用户信息
    userInfo () {
      return this.$store.state.userInfo
    },
    // 文章信息
    content () {
      if (typeof this.post.content === 'undefined' || this.post.content.trim() === '') {
        return ''
      }
      return convertHtml(this.post.content)
    }
  },
  watch: {
    // 监测文章id变化时
    tid (newVal, oldVal) {
      // 获取文章详情
      this._getPostDetail()
      // 获取评论列表
      this._getPostComments()
    }
  },
  mounted () {
    // 接受路由传递参数
    const { tid } = this.$route.params
    console.log('this.$route.params ==>', this.$route.params)
    if (tid) this.tid = tid

    // 获取文章详情
    this._getPostDetail()
    // 获取评论列表
    this._getPostComments()
  },
  methods: {
    // 文章点赞
    async handleLikePost () {
      const isLogin = this.$store.state.isLogin
      if (isLogin) {
        await setLikePost({ pid: this.tid, isLike: this.post.isLike }).then(res => {
          if (res.code === 200) {
            this.$pop({ msg: res.msg })
            // 更新本地状态
            this.post.isLike = !this.post.isLike
            if (this.post.isLike) {
              this.post.likes += 1
            } else {
              this.post.likes -= 1
            }
          } else {
            this.$pop({ msg: res.msg, type: 'shake' })
          }
        })
      } else {
        this.$pop({ msg: '请先登录后再进行点赞！' })
      }
    },

    // 文章 收藏 & 取消收藏
    async handleCollectPost () {
      const isLogin = this.$store.state.isLogin
      if (isLogin) {
        const options = {
          tid: this.tid,
          title: this.post.title,
          isCollect: this.post.isCollect ? this.post.isCollect : 0
        }
        await setCollectPost(options).then(res => {
          if (res.code === 200) {
            // 更新本地状态
            this.post.isCollect = !this.post.isCollect
            if (this.post.isCollect) {
              this.post.collects += 1
            } else {
              this.post.collects -= 1
            }

            this.$pop({ msg: res.msg })
          } else {
            this.$pop({ msg: res.msg, type: 'shake' })
          }
        })
      } else {
        this.$pop({ msg: '请先登录后再进行收藏！' })
      }
    },

    // 改变 当前的页码
    changeCurrent (val) {
      this.current = val
      // 定时器作用：延时发送请求，使 当前页码与限制条数 数据更新完成，再发送请求，减少请求次数
      setTimeout(() => {
        // 获取评论列表
        this._getPostComments()
      }, 200)
    },

    // 改变 每页条数
    changeLimit (val) {
      // 设置为第一页
      this.current = 1
      this.size = val
      console.log('改变 每页条数 ==> ', this.size)
      setTimeout(() => {
        // 获取评论列表
        this._getPostComments()
      }, 200)
    },

    // 改变 评论回复文本
    changeContent (val) {
      this.replyText = val
    },

    // 跳转到回复框
    goReply () {
      // 动态滚动到输入框的位置
      scrollToElem('.input_block')
    },

    // 获取文章详情
    async _getPostDetail () {
      await getPostDetail(this.tid).then(res => {
        if (res.code === 200) {
          this.post = res.data
        } else {
          this.$pop({ msg: res.msg, type: 'shake' })
        }
      })
    },

    // 获取评论列表
    async _getPostComments () {
      // 重置数据
      this.cid = '' // 评论id
      this.editOption = {} // 记录编辑选项
      this.childComments = [] // 子评论列表
      this.lookReply = false // 查看回复
      this.lookReplyIndex = null
      this.submitType = 'reply' // 提交评论类型

      await getPostComments({
        tid: this.tid,
        page: this.current,
        limit: this.size
      }).then(res => {
        if (res.code === 200) {
          this.comments = res.data
          this.total = res.total
        } else {
          this.$pop({ msg: res.msg, type: 'shake' })
        }
      })
    },

    // 获取子评论列表
    async _getChlidComments (fid) {
      await getChlidComments({
        tid: this.tid, // 文章id
        fid: fid // 评论父id
      }).then(res => {
        if (res.code === 200) {
          this.childComments = res.data
        } else {
          this.$pop({ msg: res.msg, type: 'shake' })
        }
      })
    },

    // 提交评论
    async submit () {
      // 用户未登录
      const { isLogin, userInfo } = await this.$store.state
      if (!isLogin) return this.$pop({ msg: '登录后，即可发表评论！', type: 'shake' })
      // 用户禁言状态判断
      if (userInfo.status !== 0) return this.$pop({ msg: '您已被禁言，请联系管理员...', type: 'shake' })

      if (this.replyText === '') return this.$pop({ msg: '评论内容不能为空！', type: 'shake' })
      if (this.code === '') return this.$pop({ msg: '请填写验证码！', type: 'shake' })

      // 如果校验失败
      const isValid = await this.$refs.observer_ref.validate()
      if (!isValid) {
        return
      }

      // 判断提交类型
      if (this.submitType === 'editReply' && Object.keys(this.editOption).length !== 0) {
        // 编辑评论
        // 判断用户是否修改了内容
        if (this.replyText === this.editOption.content) {
          return this.$pop({ msg: '您还没有修改评论哦~', type: 'shake' })
        }

        // 更新评论
        await updatePostComment({
          submitType: this.submitType, // 提交类型
          cid: this.editOption._id, // 当前评论的id
          tid: this.tid,
          content: this.replyText,
          sid: this.sid,
          code: this.code
        }).then(res => {
          if (res.code === 200) {
            this.$pop({ msg: res.msg })
            // 跳转到第一页
            this.changeCurrent(1)
            // 动态滚动到评论列表的位置
            scrollToElem('#reply_post')
            // 刷新图形验证码
            this._getCaptcha()
            // 重置表单
            requestAnimationFrame(() => {
              if (this.$refs.observer_ref) {
                this.$refs.observer_ref.reset()
              }
            })
            this.editOption = {}
            this.replyText = ''
          } else {
            this.$pop({ msg: res.msg, type: 'shake' })
          }
        })

        // 恢复默认评论类型
        this.submitType = 'reply'

        return
      }

      // 添加评论 与 添加子评论
      await addPostComments({
        submitType: this.submitType, // 提交类型
        tid: this.tid,
        content: this.replyText,
        sid: this.sid,
        code: this.code,
        fid: this.cid
      }).then(res => {
        if (res.code === 200) {
          this.$pop({ msg: res.msg })
          // 跳转到第一页
          this.changeCurrent(1)
          // 获取子评论列表
          // this._getChlidComments(this.cid)
          /*
            // 添加新的评论到评论列表
            res.data.cuid = cuid
            // 删除数组最后一个元素
            this.comments.pop()
            // 数组前面添加一个元素
            this.comments.unshift(res.data)
          */
          // 动态滚动到评论列表的位置
          scrollToElem('#reply_post')
          // 重置表单
          requestAnimationFrame(() => {
            if (this.$refs.observer_ref) {
              this.$refs.observer_ref.reset()
            }
          })
          this.replyText = ''
          this.cid = ''
          // 刷新图形验证码
          this._getCaptcha()
        } else {
          // 评论失败！
          this.$pop({ msg: res.msg, type: 'shake' })
        }
      })

      // 恢复默认评论类型
      this.submitType = 'reply'
    },

    // 回复评论
    replyComment (item, child) {
      console.log('回复评论==> ', item)
      // 修改提交类型
      this.submitType = 'childReply'
      this.cid = item._id

      // 如果是子评论
      if (child) {
        item = child
      }

      // 插入@ + name 到 content
      if (this.replyText.trim() === '' && Object.keys(this.editOption).length === 0) {
        // 评论框为空 并且 不是编辑评论 `@admin `
        this.replyText = `@${item.cuid.username} `
      } else {
        // 评论框不为空
        const reg = /^@[\S]+/g
        if (reg.test(this.replyText)) {
          // 测试通过
          this.replyText = this.replyText.replace(reg, `@${item.cuid.username} `)
        } else {
          // 测试不通过，不是以@开头 `@admin 文本内容`
          if (this.replyText !== '') {
            this.replyText = `@${item.cuid.username} ${this.replyText}`
          }
        }
      }
      // 动态滚动到输入框的位置
      scrollToElem('.input_block')
      // 聚焦输入框
      document.getElementById('textEdit').focus()
    },

    // 查看回复
    async handleLookReply (e, item, index) {
      // 控制打开与关闭
      this.lookReply = !this.lookReply

      // 是否发送请求
      if (this.lookReplyIndex !== index) {
        this.lookReply = true

        // 获取子评论列表
        this._getChlidComments(item._id)
      }
      this.lookReplyIndex = index

      console.log('查看回复 ==> ', e.target.dataset.itemclass)
      // 获取当前评论的class
      const itemClass = e.target.dataset.itemclass
      setTimeout(() => {
        // 动态滚动到当前评论位置
        scrollToElem(`.${itemClass}`)
      }, 500)
    },

    // 取消编辑评论
    cancelEditComment () {
      this.replyText = ''
      this.editOption = {}
      this.$pop({ msg: '已取消修改！' })
    },

    // 编辑评论
    editComment (item) {
      this.replyText = item.content
      // 修改提交类型
      this.submitType = 'editReply'
      // 动态滚动到输入框的位置
      scrollToElem('.input_block')
      // 获取焦点
      document.querySelector('#textEdit').focus()
      // 记录编辑选项
      this.editOption = item
      console.log('记录编辑选项 ==> ', this.editOption)
    },

    // 删除评论
    async deleteComment (item, child) {
      console.log('删除评论==> ', item)
      // 如果 child存在说明删除的是子评论
      if (child) {
        item = child
      }
      this.$confirm('确定要删除此评论，及其回复评论吗？！', async () => {
        await deletePostComment({ cid: item._id, hasChild: item.hasChild }).then(res => {
          if (res.code === 200) {
            this.$pop({ msg: res.msg })
            // 获取评论列表
            this._getPostComments()
          } else {
            this.$pop({ msg: res.msg, type: 'shake' })
          }
        })
      })
    },

    // 采纳为最佳答案
    setAdopt (item) {
      this.$confirm('确定采纳为最佳答案并结帖吗？', async () => {
        // 发送采纳最佳答案请求
        await setAdoptComment({
          tid: this.tid,
          cid: item._id
        }).then(res => {
          if (res.code === 200) {
            this.$pop({ msg: res.msg })
            this.post.isEnd = 1
            item.isAdopt = 1
            // 动态滚动到评论列表的位置
            scrollToElem('#reply_post')
          } else {
            this.$pop({ msg: res.msg, type: 'shake' })
          }
        })
        console.log('采纳最佳答案_id ==> ', item._id)
      })
    },

    // 评论点赞
    async likeComment (item) {
      console.log('评论点赞 ==> ', item)
      await setLikeComment({ cid: item._id }).then(res => {
        if (res.code === 200) {
          this.$pop({ msg: res.msg })
          item.isLike = 1
          item.likes += 1
        } else {
          this.$pop({ msg: res.msg, type: 'shake' })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
// @import '../../css/layuiReset.scss';
.layui-form .layui-word-aux[data-v-5bf16334] {
  color: #ff5722 !important;
  font-weight: 600;
}
.layui-elem-field legend {
  margin-left: 0;
}

.layui-container {
  margin-top: 20px;

  .detail {
    margin-top: 7.5px;
    padding: 20px;
    background: #fff;
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);

    h2 {
      font-size: 24px;
      line-height: 36px;
    }

    .operate_post {
      position: relative;
      padding: 13px 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .layui-btn + .layui-btn {
        margin-left: 0;
      }
      span {
        margin-right: 10px;
        margin-bottom: 5px;
      }

      .post_state span {
        margin-right: 5px;
      }

      .operate_btn {
        margin: 0 20px;
      }

      .reply_hot {
        .iconfont {
          margin-right: 3px;
          vertical-align: bottom;
          font-size: 22px;
          color: #999;
        }

        .reply i {
          color: #1e9fff;
        }

        .hot i {
          color: red;
        }

        .like i {
          color: #c00;
        }

        .collect i {
          color: orange;
        }

        a,
        span {
          margin-right: 5px;
          cursor: pointer;
        }
        // a:hover {
        //   color: var(--themeColor);
        // }
      }
    }

    .detail_about {
      position: relative;
      display: flex;
      justify-content: start;
      align-items: center;
      line-height: 20px;
      padding: 15px;
      font-size: 13px;
      background-color: #f8f8f8;
      color: #999;
      border: 1px solid red;

      img {
        width: 45px;
        height: 45px;
        border-radius: 100%;
      }
      .right {
        margin-left: 15px;

        .authorName {
          color: #01aaed;
        }
        .approve {
          margin-left: 5px;
          vertical-align: middle;
          font-size: 20px;
          color: #ffb800;
        }
        .vip {
          margin-left: 5px;
          margin-right: 10px;
        }
        .reward,
        .publish_time {
          margin-top: 5px;
        }
      }
    }
    .reply_user {
      position: relative;
      border: none;
      background: #fff;

      .adopt {
        position: absolute;
        top: 20px;
        right: 15px;
        font-size: 80px;
        color: #58a571;
      }
      .adopt2 {
        position: absolute;
        top: 10px;
        right: 10px;
        width: 90px;
        height: 30px;
        line-height: 26px;
        background: #fff;
        border: 2px solid #58a571;
        text-align: center;
        font-size: 24px;
        font-weight: bold;
        color: #58a571;
      }
    }

    .detail_body {
      margin: 20px 0 0;
      min-height: 306px;
      line-height: 26px;
      font-size: 16px;
      color: #333;
      word-wrap: break-word;
    }

    .reply_post {
      .sofa {
        padding: 15px 0;
        text-align: center;
        color: #999;
        font-size: 16px;
      }

      .reply_item {
        padding: 20px 0 10px;
        border-bottom: 3px dotted #dfdfdf;

        .reply_content {
          padding: 15px;
          font-family: '杨任东_竹石体_Regular';
          font-size: 20px;
        }

        .operate_reply {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px;

          .iconfont {
            font-size: 24px;
            vertical-align: sub;
          }
          span {
            margin-right: 20px;
            color: #999;
            cursor: pointer;
          }
          .left span:hover {
            color: #c00;
          }
          .left .reply:hover {
            color: #1e9fff !important;
          }
          .isLike {
            color: #c00;
          }
          .right span:hover {
            color: #666;
          }
        }
      }

      .reply_child_box {
        height: 0;
        opacity: 0;
        transition: all 0.2s ease-in;
        overflow: hidden;

        .reply_child {
          margin: 0 30px;
          &:last-child {
            border-bottom: 0;
          }
        }
      }
      .showChildReply {
        height: 100%;
        opacity: 1;
        transition: all 0.2s ease-in;
      }
    }

    .input_block {
      margin-top: 15px;

      .tip {
        padding: 10px;
        text-align: center;
        color: #999;
        b {
          color: red;
        }
        span {
          margin-right: 5px;
        }
        button {
          cursor: pointer;
        }
      }

      .svg {
        cursor: pointer;
        padding: 0 !important;
      }
    }
  }
}
</style>
