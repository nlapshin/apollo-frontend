<template>
  <div class="hello">
    <button v-on:click="runQuery">Run Query</button>
    <button v-on:click="runMutation">Run Mutation</button>

    <div>
      {{query}}
    </div>
    
  </div>
</template>

<script>
import gql from 'graphql-tag'
import { useQuery, useMutation, useResult } from '@vue/apollo-composable'

export default {
  name: 'HelloWorld',
  setup () {
    const { result, refetch: runQuery }  = useQuery(gql`
      query {
        animals {
          id
          name
          age
        }
      }
    `)

    const query = useResult(result)

    const { mutate: runMutation } = useMutation(gql`
      mutation addAnimal($animal: AnimalInput!) {
        addAnimalAsInput(animal: $animal) {
          id
        }
      }
    `, {
      variables: {
        "animal": {
          "name": "test",
          "type": "dog",
          "age": 12,
          "legs": 4
        }
      }
    })

    return {
      query,
      runQuery,
      runMutation
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
