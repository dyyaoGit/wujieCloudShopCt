<template>
    <div class="addBrand">
        <div v-if="$route.name === 'registerAddBrand'">
            <h3 class="title">无界云店入驻申请</h3>
            <el-steps :active="2" finish-status="success">
                <el-step title="1.注册用户"></el-step>
                <el-step title="2.添加品牌"></el-step>
                <el-step title="3.品牌审核通过"  ></el-step>
                <el-step title="4.入驻成功"  ></el-step>
            </el-steps>
        </div>
        <div :class="{'form-wrap': $route.name === 'registerAddBrand'}">
            <el-form :model="formData" label-width="100px" label-position="right">
                <el-form-item label="品牌名">
                    <el-input v-model="formData.name"></el-input>
                </el-form-item>
                <el-form-item label="品牌宣传语">
                    <el-input v-model="formData.title"></el-input>
                </el-form-item>
                <el-form-item label="品牌图片">
                    <bgDiv :imgStr="formData.logo"></bgDiv>
                    <imgUpload @uploadSuccess="upload" :max="1"></imgUpload>
                </el-form-item>
                <el-form-item label="品牌描述">
                    <el-input type="textarea" v-model="formData.content" :rows="4"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="danger" class="bottom-btn" @click="saveEdit" v-if="$route.name == 'editBrand'">保存更改</el-button>
                    <el-button type="danger" class="bottom-btn" @click="save" v-else>保存</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<style>
    .addBrand {
        padding: 0 50px;
    }
    .addBrand .el-step__head.is-success {
        color: #409eff;
        border-color: #409eff;
    }
    .addBrand .el-step__title.is-success {
        color: #409eff;
    }
</style>
<style scope>
    .title {
        text-align: center;
    }
    .form-wrap {
        margin-top: 20px;
        padding: 32px 20px 0 0;
        border: 1px dashed #888;
        border-radius: 5px;
    }
</style>

<script>
    import imgUpload from '@/components/imgUpload'
    import bgDiv from '@/components/bgDiv'

    export default {
        components: {imgUpload, bgDiv},
        data() {
            return {
                formData: {
                    name: "",
                    title: "",
                    logo: "",
                    content: "",
                    status: 0,  //商户为0,平台为1
                    user_id: this.$route.query.user
                },
                imgList: []
            };
        },
        methods: {
            upload(imgList) {
                this.formData.logo = imgList[0]
            },
            save() {
                if(this.$route.name === 'registerAddBrand'){  //注册时添加品牌
                    this.$axios.post('registorAddBrand', this.formData, res => {
                        if(res.ret === true){
                            console.log(res)
                            // this.$router.push()
                        }
                    })
                }
                else {  //注册后添加品牌
                    this.$axios.post('addBrand', this.formData, res => {
                        if(res.ret == true){
                            this.$message.success('品牌添加成功，正在为您跳转品牌列表...')
                            setTimeout(() => {this.$router.back()}, 1500)
                        }
                    })
                }
            },
            saveEdit() {
                this.$axios.post('updateBrand', this.formData, res => {
                    if(res.ret == true){
                        this.$message.success('品牌修改成功，正在为您跳转品牌列表...')
                        setTimeout(() => {this.$router.back()}, 1500)
                    }
                })
            },
            getEditData() {
                this.$axios.get('brandManage', {id: this.$route.query.id}, res => {
                    this.formData = res.data[0];
                    this.imgList.push(res.data[0].logo)  //此处必须用push，否则vue无法检测到数组的变动
                })
            }
        },
        mounted() {
            if(this.$route.name === 'editBrand'){
                this.getEditData();
            }
        }
    }
</script>
