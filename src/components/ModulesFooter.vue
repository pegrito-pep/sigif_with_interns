
<template>
    <div class="footer">
        <div class="content">
            <p>Copyright &copy; <span>2015 tous droits reservés Réalisations MINFOF</span> </p>
            <div class="liens">
                <a href="#">MINFOF</a>
                <a href="#">SIGIF Informations publiques</a>
                <a href="#">Mentions légales</a>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    name: 'ModulesFooter',
    data() {
        return{

        }
    },
}
</script>

<style scoped>
    .footer {
        padding: 0 3%;
        height: 50px;
        width: 100%;
        display: flex;
        align-items: center;
        background-image: url(/img/images/image.png);
        background-repeat: no-repeat;
        background-size: cover;
        overflow: hidden;
        
    }

    .content{
        width: 100%;
        display: flex;
        padding-top: 10px;
        justify-content: space-between;
    }
    .liens a{
        padding-left: 20px;
        color: black;
        text-decoration: none;
    }
    .liens a:hover{
        text-decoration: underline;
        font-weight: 600;
    }

    @media screen and (max-width: 1000px)  {
        .footer{
            margin-top: 80px;
        }
    }
</style>