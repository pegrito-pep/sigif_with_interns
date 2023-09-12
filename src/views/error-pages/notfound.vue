<template>
  <div class="not-found">
      <h1>
          Oups une erreur est survenue !
      </h1>
      <p>
          Ceci est peut-être dû au fait que cette page ne soit pas accessible ou à des problèmes de connexion internet
      </p>
      <button @click="$router.back()">
          Retour
      </button>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
    .not-found{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: calc(100vh - 200px);
        width: 100%;
        text-align: center;
    }
    .not-found h1{
        margin-bottom: 2rem;
    }
    .not-found p{
        width: 80%;
        text-align: center;
    }
    .not-found button{
        padding: 0 30px;
        margin-bottom: 1.5rem;
        height: 45px;
        font-size: 1.05rem;
        font-weight: bold;
        color: white;
        background: #F5365C;
        border: none;
        border-radius: 8px;
    }
</style>