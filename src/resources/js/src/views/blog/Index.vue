<template>
<b-container class="height-block g-margin-mt-16">
   <b-row >
            <b-col>
                <div>
                    <b-card :title="blog.title" tag="article" class="mb-2">
                        <b-card-text>
                           {{blog.content}}
                        </b-card-text>
                    </b-card>
                </div>
            </b-col>
        </b-row>
</b-container>
</template>

<script>
import Axios from "axios"
export default {
  data: () => {
    return {
      blog: {}
    }
  },
  methods: {

    getBlog() {
      Axios.get(`/api/blogs/${this.$route.params.id}`).then(res => {
        this.blog = res.data.data;
      });
    }
  },

  mounted() {
    this.getBlog();
  }
}
</script>

<style>

.height-block {
  min-height: 500px;
}

</style>