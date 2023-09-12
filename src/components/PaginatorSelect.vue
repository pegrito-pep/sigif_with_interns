<template>
    <div>
        <div class="d-flex justify-content-between mx-2">
            <b-pagination  active-class="bg-danger" active @input="(page) => {$emit('pageChanged', page)}" v-model="current" :total-rows="total" :per-page="limiter" :limit="3"></b-pagination>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        total: {type: Number, required: true},
        limit: {type: Number, default: 12},
        offset: {type: Number, default: 0},
        page: {type:Number, default: 1},
    },
    data: () => ({
        limiter: 20,
        current: 1
    }),
    mounted() {
        this.limiter = this.limit
        this.current = this.page
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
            this.$emit('limitChangedSelect', val)
        }
    }
}
</script>

<style>
    /*.p-display{
        display: table-row;
    }*/
</style>