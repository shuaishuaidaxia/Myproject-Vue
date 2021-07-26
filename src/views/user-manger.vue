<template>
  <div>
    <div>
      <a-button   type="primary"  @click="handleAdd">新增用户</a-button>
      <a-input style="width: 20%; margin-left: 30px" ref="userNameInput" v-model="inputuserName" placeholder="input userName" @keyup.enter="oninputenter">
        <a-icon slot="prefix" type="user" />
        <a-tooltip slot="suffix" title="输入用户名按回车进行搜索">
          <a-icon type="info-circle" style="color: rgba(0,0,0,.45)" />
        </a-tooltip>
      </a-input>
    </div>
    <collection-create-form
      ref="collectionForm"
      :visible="visible"
      @cancel="handleCancel"
      @create="handleCreate"
    />
    <a-table bordered :data-source="getuserlist" :columns="columns" rowKey="id" :pagination="pagination" @change="handleTableChange" >
      <template slot="name" slot-scope="text, record">
        <editable-cell :text="text" @change="onCellChange(record.id, 'name', $event)" />
      </template>
      <template slot="operation" slot-scope="text, record">
        <a-popconfirm
          v-if="getuserlist.length"
          title="Sure to delete?"
          @confirm="() => onDelete(record.id)"
        >
          <a href="javascript:;">Delete</a>
        </a-popconfirm>
      </template>
    </a-table>
  </div>
</template>
<script>
// 编辑框
import { mapActions } from 'vuex'
import EditableCell from '../components/EditableCell'
import CollectionCreateForm from '../components/CollectionCreateForm'

export default {
  components: {
    EditableCell,
    CollectionCreateForm
  },
  data () {
    return {
      visible: false,
      dataSource: this.$store.getters.getuserlist,
      count: 2,
      columns: [
        {
          title: 'id',
          dataIndex: 'id'
        },
        {
          title: 'name',
          dataIndex: 'name',
          width: '30%',
          scopedSlots: { customRender: 'name' }
        },
        {
          title: 'password',
          dataIndex: 'password'
        },
        {
          title: 'operation',
          dataIndex: 'operation',
          scopedSlots: { customRender: 'operation' }
        }
      ],
      // 分页
      pagination: {
        position: 'bottom',
        pageSize: 5,
        current: 1,
        total: 0,
        showSizeChanger: true, // 显示可改变每页数量
        loading: false
      },
      inputuserName: ''
    }
  },
  created () {
    this.changeSpinning()
    const par = this.onchangepagepar
    this.onhandchange(par)
  },
  methods: {
    ...mapActions(['Getuserlist', 'AddUser', 'UpdataUser', 'DeleteUser']),
    changeSpinning () {
      this.loading = !this.loading
    },
    showinfo (message) {
      this.$message.info(message)
    },
    onCellChange (id, dataIndex, value) {
      // 改变单元格值
      const target = this.getuserlist.find(item => item.id === id)
      if (target) {
        target[dataIndex] = value
        this.UpdataUser(target)
          .then((res) => {
            this.showinfo('修改成功!')
          })
          .catch(err => alert(err))
      }
    },
    onDelete (id) {
      // 删除
      const par = { userId: id }
      const pageinfo = this.onchangepagepar
      this.DeleteUser(par)
        .then(res => {
          this.showinfo('成功删除' + id + '!')
          this.onhandchange(pageinfo)
        })
        .catch(err => { alert(err) })
    },
    handleAdd () {
      // 添加
      this.showModal()
    },
    showModal () {
      console.log('弹窗')
      this.visible = true
    },
    handleCancel () {
      // 弹窗取消按钮
      this.visible = false
    },
    handleCreate () {
      // 弹窗确定按钮
      const form = this.$refs.collectionForm.form
      const pageinfo = this.onchangepagepar
      form.validateFields((err, values) => {
        if (err) {
          return
        }
        this.AddUser(values).then((res) => {
          console.log(this.pagination.total, 'toatal')
          this.showinfo('新增成功！')
          this.onhandchange(pageinfo)
        })
          .catch((res) => { console.log(res) })
        form.resetFields()
        this.visible = false
      })
    },
    handleTableChange (pagination) {
      // 分页改变
      this.changeSpinning()
      this.pagination = pagination
      const par = this.onchangepagepar
      this.Getuserlist(par).then((res) => {
        this.changeSpinning()
        this.pagination.total = res.total
      })
        .catch((res) => {
          alert(res)
        })
    },
    onhandchange (pageinfo) {
      console.log(pageinfo, 'onhanchang')
      this.changeSpinning()
      this.Getuserlist(pageinfo).then((res) => {
        this.changeSpinning()
        this.pagination.total = res.total
      })
        .catch((res) => {
          alert(res)
        })
    },
    oninputenter (e) {
      // 按下回车
      console.log(e)
      const par = this.onchangepagepar
      this.onhandchange(par)
    }
  },
  computed: {
    getuserlist () {
      return this.$store.getters.getuserlist
    },
    onchangepagepar () {
      return { pageNum: this.pagination.current, pageSize: this.pagination.pageSize, userName: this.inputuserName }
    }
  }

}
</script>
<style>
.editable-cell {
  position: relative;
}

.editable-cell-input-wrapper,
.editable-cell-text-wrapper {
  padding-right: 24px;
}

.editable-cell-text-wrapper {
  padding: 5px 24px 5px 5px;
}

.editable-cell-icon,
.editable-cell-icon-check {
  position: absolute;
  right: 0;
  width: 20px;
  cursor: pointer;
}

.editable-cell-icon {
  line-height: 18px;
  display: none;
}

.editable-cell-icon-check {
  line-height: 28px;
}

.editable-cell:hover .editable-cell-icon {
  display: inline-block;
}

.editable-cell-icon:hover,
.editable-cell-icon-check:hover {
  color: #108ee9;
}

.editable-add-btn {
  margin-bottom: 8px;
}
</style>
