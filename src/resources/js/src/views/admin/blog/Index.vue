<template>
    <div class="app-container-content">
        <div class="g-margin-mb-16">
            <app-filter>
                
                <div class="g-link g-margin-ml-8">
                   <b-button @click="add()"  variant="primary">Tambah</b-button>
                   <b-form v-if="loadingAdd">
                       <div  style="width=100%; margin-top: 8px;">
                       <b-form-row>
                           <b-input  style="width=100%" placeholder="Title" v-model="blog.title" ></b-input>
                       </b-form-row>
                       </div>
                       <div style="width=100%; margin-top: 8px;">
                        <b-form-row>
                            <b-textarea  st v-model="blog.content" placeholder="Content"></b-textarea>
                        </b-form-row>
                        </div>

                       <b-button @click="save" variant="primary">Save</b-button>
                   </b-form>
                </div>
            </app-filter>
        </div>
        <div class="content">
            <table class="g-table">
                <thead class="g-table-head g-p-16 g-bg-primary">
                    <tr>
                        <th
                            class="g-table-col g-text-align-left g-p-16 g-fs-md g-fw-700 g-color-white"
                        >
                            No.
                        </th>
                        <th
                            class="g-table-col g-text-align-left g-p-16 g-fs-md g-fw-700 g-color-white"
                        >
                            Title
                        </th>
                        <th
                            class="g-table-col g-text-align-left g-p-16 g-fs-md g-fw-700 g-color-white"
                        >
                            Content
                        </th>
                        
                        <th
                            
                            class="g-table-col g-p-8 g-fs-md g-fw-700 g-color-white"
                        >
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody v-if="!loading">
                    <tr
                       
                        class="g-table-row"
                        v-for="(blog, idx) in blogs"
                        :key="idx"
                    >
                        <td class="g-table-col g-p-8">{{ idx + 1 }}</td>
                        <td class="g-table-col g-p-8">
                            <b-input v-model="blogs[idx].title">

                            </b-input>
                        </td>
                        <td class="g-table-col g-p-8">
                            <b-textarea v-model="blogs[idx].content">
                           
                            </b-textarea>
                        </td>
                        <td g-table-col g-p-8>
                            <b-row>
                                <b-col> 
                                    <b-button variant="primary" @click="update(idx)">Update</b-button>
                                </b-col>
                           <b-col>
                           <b-button variant="danger" @click="destroy(idx)">Delete</b-button>
                           </b-col>
                            </b-row>
                        </td>
                    </tr>
                </tbody>
               
            </table>

            <div
                v-if="loading"
                class="app-loading-wrapper g-flex g-flex-jc-center g-flex-ai-center"
            >
                <app-loading />
            </div>
        </div>
        <div
            v-if="total > per_page"
            class="app-pagination g-flex g-flex-ai-center g-flex-jc-flex-end g-margin-mt-8"
        >
            <div
                class="g-link"
                :class="{ 'g-margin-ml-8': idx > 0 }"
                v-for="(link, idx) in links"
                :key="idx"
            >
                <app-button
                    v-if="
                        (link.url &&
                            last_page >= link.label &&
                            Math.abs(link.label - current_page) <= 2) ||
                            link.label == 'Previous' ||
                            link.label == 'Next'
                    "
                    :disabled="!link.url || link.active"
                    @click="getBlogs(link.url)"
                >
                    {{ link.label }}
                </app-button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import AppFilter from "../../../components/elements/AppFilter.vue";
import { mapGetters, mapActions } from "vuex";

import AppButton from "../../../components/AppButton.vue";
import AppLoading from "../../../components/AppLoading.vue";
import Axios from 'axios';
export default {
    components: {
        AppButton,
        AppFilter,
        AppLoading
    },

    data() {
        return {
            blogs: [],
            loadingUpdate: false,
           loading: false,
           total: 0,
           per_page: 5,
            url: `/api/blogs`,
            blog: {},
            loadingAdd: false,
            links: [],
        };
    },
    computed: {
        ...mapGetters({
            authenticated: "auth/authenticated",
            user: "auth/user"
        }),
        totalblog() {
            return this.blogs.reduce((curr, acc) => {

                return curr + (parseInt(acc.amount) + parseInt(acc.unique_code));
            }, 0);
        }
    },

    watch: {},

    methods: {
        ...mapActions({
            signOutAction: "auth/signOut"
        }),

        add() {
            this.loadingAdd = true;
        },
        save() {
            Axios.post(`/api/blogs`, this.blog).then(res => {
                console.log("Res;", res);
                this.getBlogs();
                this.loadingAdd = false;
            })
        },

        update(idx) {
            let blog = this.blogs[idx];

            Axios.put(`/api/blogs/${blog.id}`, blog).then(res => {
                console.log("Rsponse: ", res);
            });
        },

        destroy(idx) {
            Axios.delete(`/api/blogs/${this.blogs[idx].id}`).then(res => {
                this.blogs.splice(idx, 1);
            });
        },
       
        goRoute(path) {
            this.$router.push(path).catch(() => {});
        },

        async signOut() {
            await this.signOutAction(this.user);

            this.$router.replace({ name: "Home" });
        },
        getBlogs(url) {
            console.log("aa");
            this.loading = true;
            axios
                .get(`${url}?per_page=${this.per_page}`)
                .then(res => {
                    this.blogs = res.data.data;
					 this.links = res.data.meta.links;

                    this.from = res.data.meta.from;
                    this.last_page = res.data.meta.last_page;
                    this.current_page = res.data.meta.current_page;
                    this.total = res.data.meta.total;
                    this.loading = false;
                });
        },

        parseThousand(number) {
            if (number) return number.toLocaleString("id");
            else return number;
        }
    },
    mounted() {
        if (!this.user) {
            this.$router.replace({ name: "Home" });
        }
        this.getBlogs(this.url);
    }
};
</script>

<style lang="scss" scoped>
table {
}
</style>
