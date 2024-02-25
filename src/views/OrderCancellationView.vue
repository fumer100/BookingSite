<template>
    <h1>Moechten sie Ihren Auftrag #12321232 Stornieren? </h1>
    <h2>Beachten sie ,dass blablabla poopa, wenn sie auf stornieren drücken.</h2>
    <h3>zudem werden keine Kosten rückerstattet</h3>
    <v-row justify="center">
        <v-col
            cols="2"
            md="5"
            lg="5">
            <button type="button" @click="cancellation">Stornieren</button>

        </v-col>    
    </v-row>
</template>

<script lang="ts" setup>
    function cancellation(){
        //deleteOrderFunction
    }
</script>