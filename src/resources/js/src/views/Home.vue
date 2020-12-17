<template>
    <b-container class="bv-example-row g-p-16">
        <div>
            <div>
                <b-jumbotron
                    header="Welcome to my blog"
                    lead="Check for latest post on my blog"
                >
                    <p>Give any feedback</p>
                    <b-button variant="primary" href="#">More Info</b-button>
                </b-jumbotron>
            </div>
        </div>
        <b-row v-for="(blog, idx) in blogs" :key="idx">
            <b-col v-if="!loading">
                <div>
                    <b-card :title="blog.title" tag="article" class="mb-2">
                        <b-card-text v-if="blog.content">
                           {{blog.content.substr(0, 120) + (blog.content.length > 120 ? '...' : '')}}
                        </b-card-text>

                        <b-button :to="`blogs/${blog.id}`" variant="primary"
                            >Read More</b-button
                        >
                    </b-card>
                </div>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import Axios from "axios";
import AppButton from "../components/AppButton.vue";
export default {
    components: {
        AppButton
    },
    data: () => {
        return {
            blogs: [],
            loading: true,
        };
    },
    methods: {
        getBlogs() {
            Axios.get("/api/blogs").then(res => {
               this.blogs = res.data.data;
               this.loading = false;
            });
        }
    },

    mounted() {
        this.loading = true;
        this.getBlogs();
    }
};
</script>

<style lang="scss" scoped>
$color-primary: #5452f6;
$color-white: #ffffff;
.app-container-home {
    .donation-badge {
        padding: 16px;
        width: 50%;

        @media only screen and (max-width: 768px) {
            width: 100%;
        }
    }
    .section-home {
        display: flex;
        .sh-left {
            flex: 0 0 50%;
            @media only screen and (max-width: 768px) {
                flex: 0 0 100%;
            }

            .section-title {
                font-weight: 600;
                color: $color-primary;
            }
            .section-content p {
                color: $color-primary;
            }
        }
        .sh-right {
            @media only screen and (max-width: 768px) {
                display: none;
            }
            flex: 0 0 calc(50% - 16px);

            .app-container-image {
                img {
                    width: 100%;
                }
            }
        }
    }
    .app-image-bottom {
        margin-top: 32px;
        img {
            width: 50%;
        }
    }
}
</style>
