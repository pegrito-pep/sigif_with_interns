<template>
    <div>
        <hr v-if="hr === 'top'">
        <div class="d-flex justify-content-between mx-2">
            <div v-if="noControl === false" class="mr-2 m-0">
                <!--<span class="text-muted text-small mr-2">{{$t('data.pagination_affichage_de')}} {{ offset + 1 }} - {{ last }} {{$t('data.pagination_de')}} {{ total }} {{$t('data.pagination_elements')}} </span>-->
                <div class="d-flex justify-content-center align-items-center">
                    <span class="text-muted text-small mr-2">affichage de {{ offset + 1 }} - {{ last }} de {{ total }} éléments </span>
                </div>
            </div>
            <b-pagination  active-class="bg-danger" active @input="(page) => {$emit('pageChanged', page)}" v-model="current" :total-rows="total" :per-page="limiter" :limit="3"></b-pagination>
        </div>
        <hr v-if="hr === 'bottom'" class="mt-0">
    </div>
</template>

<script>
export default {
    props: {
        total: {type: Number, required: true},
        limit: {type: Number, default: 12},
        offset: {type: Number, default: 0},
        page: {type:Number, default: 1},
        hr: {type:[String, Boolean], default: false},
        noControl: {type:Boolean, default: false},
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
            this.$emit('limitChanged', val)
        }
    }
}
</script>

<style>
    /*.p-display{
        display: table-row;
    }*/
</style>