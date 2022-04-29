<template>
  <div class="hello">
    <button v-on:click="runQuery">Run Query</button>
    <button v-on:click="runMutation">Run Mutation</button>

    <br>

    <div>
      {{query}}
    </div>

    <br>

    <div>
      {{newAnimals}}
    </div>
    
  </div>
</template>

<script>
import { watch, ref } from "vue";
import gql from 'graphql-tag'
import { useQuery, useMutation, useSubscription, useResult } from '@vue/apollo-composable'

export default {
  name: 'HelloWorld',
  setup () {
    const newAnimals = ref([]);

    const { result, refetch: runQuery }  = useQuery(gql`
      query {
        animals {
          id
          name
          age
        }
      }
    `)

    // null, {
    //   pollInterval: 2000
    // }

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

    const { result: subs } = useSubscription(gql`
      subscription animalAdded {
        animalAdded {
          id
          name
        }
      }
    `);

    watch(
      subs,
      data => {
        newAnimals.value.push(data.animalAdded)
      },
      {
        lazy: true // Don't immediately execute handler
      }
    );


    return {
      query,
      runQuery,
      runMutation,
      newAnimals
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
