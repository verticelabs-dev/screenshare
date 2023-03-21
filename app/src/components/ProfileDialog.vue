<template>
    <Modal v-on:close="close" size="medium">
        <template v-slot:header>
            <h3 class="friends-list-title">Profile</h3>
            <hr class="friends-list-title-line" />
        </template>
        <template v-slot:body>
            <div>
                <section>
                    <v-text-field label="Display Name"></v-text-field>
                </section>
            </div>
        </template>
    </Modal>
</template>

<script>
import Modal from "./modal";

export default {
    components: {
        Modal,
    },
    created() {
        document.body.addEventListener("keyup", (e) => {
            if (e.key === "Escape") {
                this.close();
            }
        });
    },
    beforeDestroy() {
        document.body.removeEventListener("keyup", (e) => {
            if (e.key === "Escape") {
                this.close();
            }
        });
    },
    data() {
        return {};
    },
    methods: {
        close() {
            this.$emit("close");
        },
    },
};
</script>

<style scoped lang="scss">

</style>
