<template>
    <div>
        <div class="d-flex align-items-center">
            <div v-if="noControl === false" class="mr-2 m-0 mt-n3">
                <span class="text-muted text-small mr-2">affichage de {{ offset + 1 }} - {{ last }} de {{ total }} élements </span>
               <!-- <button class="btn btn-outline-dark btn-xs dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{{ limit }} <i class="ik ik-chevron-down mr-0 align-middle"></i></button>
                <div class="dropdown-menu dropdown-menu-right">
                    <a v-for="i in [15, 25, 35, 50, 100]" @click.prevent="changeLimit(i)" :key="i" class="dropdown-item" href="#">{{ i }}</a>
                </div>-->
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        total: {type: Number, required: true},
        limit: {type: Number, default: 20},
        offset: {type: Number, default: 0},
        page: {type:Number, default: 1},
        hr: {type:[String, Boolean], default: false},
        noControl: {type:Boolean, default: false},
    },
    data: () => ({
        limiter: 20,
    }),
    mounted() {
        this.limiter = this.limit
    },
    computed: {
        last() {
            const last = this.offset + this.limiter
            if (last > this.total) {
                return this.total
            }
            return last
        }
    },
    methods: {
        changeLimit(val) {
            this.limiter = val 
            this.$emit('limitChanged', val)
        }
    }
}
</script>

<style>

</style>