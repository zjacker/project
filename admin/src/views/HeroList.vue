<template>
  <div class="about">
    <h1>分类列表</h1>
    <el-table :data="heroes">
      <el-table-column prop="_id" label="ID" width="230"></el-table-column>
      <el-table-column prop="name" label="分类名称"></el-table-column>
      <el-table-column prop="avatar" label="图片">
        <template slot-scope="scope">
          <img :src="scope.row.avatar"  style="max-height:3rem">
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button
            @click="$router.push(`/heroes/edit/${scope.row._id}`)"
            type="text"
            size="small"
          >编辑</el-button>
          <el-button @click="remove(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      heroes: []
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get("rest/heroes");
      this.heroes = res.data;
    },
    async remove(row) {
      this.$confirm(`是否删除分类 "${row.name}"`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          await this.$http.delete(`rest/heroes/${row._id}`);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.fetch();
        })
        .catch(() => {});
    }
  },
  created() {
    this.fetch();
  }
};
</script>
