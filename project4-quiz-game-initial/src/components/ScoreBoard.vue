<template>
    <div>
        <section class="score">
            Player <span>{{ this.winCount }}</span> x 
            <span>{{ this.loseCount }}</span> Computer
        </section>
    </div>
</template>

<script lang="ts">

    export default{
        props: ['winCount', 'loseCount']

    }

</script>

<style lang="sass">


</style>